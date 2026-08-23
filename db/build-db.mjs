// Compiles db/schema.sql + keyed db/seed/*.js modules into data/archery.db.
// Run this before `eleventy build` / `eleventy --serve` (wire into
// package.json: "prestart"/"prebuild" scripts, or npm-run-all).
//
// The .db file itself is a build artifact: gitignore it. Only schema.sql
// and db/seed/*.js are source of truth and get committed / reviewed in PRs.

import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dbPath = path.join(root, "data", "archery.db");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });
fs.rmSync(dbPath, { force: true }); // always rebuild from source, no drift

const db = new Database(dbPath);
db.pragma("foreign_keys = ON");

const schema = fs.readFileSync(path.join(root, "db", "schema.sql"), "utf8");
const seedDir = path.join(root, "db", "seed");
const [{ default: athletes }, { default: cities }, { default: clubs },
	{ default: competitions }, { default: disciplines }, { default: menRecords },
	{ default: womenRecords }, { default: mixedRecords }, { default: masters50Records }, { default: recordI18n }] =
	await Promise.all([
		import(path.join(seedDir, "athletes.js")),
		import(path.join(seedDir, "cities.js")),
		import(path.join(seedDir, "clubs.js")),
		import(path.join(seedDir, "competitions.js")),
		import(path.join(seedDir, "disciplines.js")),
		import(path.join(seedDir, "records-men.js")),
		import(path.join(seedDir, "records-women.js")),
		import(path.join(seedDir, "records-mixed.js")),
		import(path.join(seedDir, "records-masters50.js")),
		import(path.join(seedDir, "record-i18n.js")),
	]);

db.exec(schema);
const insert = (table, columns, values) => {
	const placeholders = columns.map(() => "?").join(", ");
	db.prepare(`INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})`).run(values);
};
const ids = (table) => new Map(db.prepare(`SELECT key, id FROM ${table}`).all().map((row) => [row.key, row.id]));
const ref = (map, key, label) => {
	if (key == null) return null;
	const id = map.get(key);
	if (id == null) throw new Error(`Unknown ${label} key: ${key}`);
	return id;
};

db.transaction(() => {
	for (const row of athletes) insert("athletes", ["key", "first_name", "surname", "first_name_latin", "surname_latin"], [row.key, row.first_name, row.surname, row.first_name_latin, row.surname_latin]);
	for (const row of cities) insert("cities", ["key", "name", "name_en", "name_pl"], [row.key, row.name, row.name_en, row.name_pl]);
	const cityIds = ids("cities");
	for (const row of clubs) insert("clubs", ["key", "name", "name_en", "name_pl", "city"], [row.key, row.name, row.name_en, row.name_pl, ref(cityIds, row.city, "city")]);
	for (const row of competitions) insert("competitions", ["key", "city", "label", "label_en", "label_pl", "date_start", "date_end", "date_raw"], [row.key, ref(cityIds, row.city, "city"), row.label, row.label_en, row.label_pl, row.date_start, row.date_end, row.date_raw]);
	for (const row of disciplines) insert("disciplines", ["key", "team_size"], [row.key, row.team_size]);

	const athleteIds = ids("athletes");
	const clubIds = ids("clubs");
	const competitionIds = ids("competitions");
	const disciplineIds = ids("disciplines");
	for (const row of [...menRecords, ...womenRecords, ...mixedRecords, ...masters50Records]) {
		insert("records", ["key", "scope", "category", "format", "discipline_id", "competition_id", "result_score", "variant_key"], [row.key, row.scope, row.category, row.format, ref(disciplineIds, row.discipline, "discipline"), ref(competitionIds, row.competition, "competition"), row.result_score, row.variant_key ?? null]);
		const recordId = db.prepare("SELECT id FROM records WHERE key = ?").get(row.key).id;
		for (const participant of row.participants) insert("record_participants", ["record_id", "athlete_id", "club_id", "position", "leg_scores"], [recordId, ref(athleteIds, participant.athlete, "athlete"), ref(clubIds, participant.club, "club"), participant.position, participant.leg_scores ?? null]);
	}
	const recordIds = ids("records");
	for (const row of recordI18n) insert("record_i18n", ["record_id", "locale", "notes"], [recordIds.get(row.record), row.locale, row.notes]);
})();
db.close();

console.log(`Built ${dbPath} from db/schema.sql + db/seed/*.js`);
