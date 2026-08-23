// Global Eleventy data file. Reads data/archery.db (built by
// db/build-db.mjs) and returns one flat, joined object per record --
// templates never need to know a database was involved.
//
// Team members are nested as `participants: [...]` ordered by `position`,
// each carrying their own club and leg_scores for that record.

import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data", "archery.db");

export default function () {
  const db = new Database(dbPath, { readonly: true, fileMustExist: true });

  const records = db.prepare(`
    SELECT r.id, r.scope, r.category, r.format, r.result_score, r.variant_key,
              d.key AS discipline_key, d.team_size,
               c.city AS competition_city, c.label AS competition_label,
               c.label_en AS competition_label_en, c.label_pl AS competition_label_pl,
              city.name AS city_name, city.name_en AS city_name_en, city.name_pl AS city_name_pl,
           c.date_start, c.date_end, c.date_raw
    FROM records r
    JOIN disciplines d ON d.id = r.discipline_id
    LEFT JOIN competitions c ON c.id = r.competition_id
            LEFT JOIN cities city ON city.id = c.city
    ORDER BY r.scope, r.category, r.format, r.id
  `).all();

  const participantStmt = db.prepare(`
        SELECT rp.position, rp.leg_scores,
          a.first_name || ' ' || a.surname AS athlete_name,
          a.first_name_latin || ' ' || a.surname_latin AS athlete_name_latin,
          cl.name AS club_name, cl.name_en AS club_name_en, cl.name_pl AS club_name_pl
    FROM record_participants rp
    JOIN athletes a ON a.id = rp.athlete_id
    LEFT JOIN clubs cl ON cl.id = rp.club_id
    WHERE rp.record_id = ?
    ORDER BY rp.position
  `);

  const i18nStmt = db.prepare(`
    SELECT locale, notes FROM record_i18n WHERE record_id = ?
  `);

  const result = records.map((r) => {
    const notes = {};
    for (const row of i18nStmt.all(r.id)) notes[row.locale] = row.notes;

    return {
      ...r,
      participants: participantStmt.all(r.id),
      notes, // { en, ua, pl } -- only populated when a footnote exists
    };
  });

  db.close();
  return result;
}
