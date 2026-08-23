-- archery-records relational schema
-- Design notes:
--  * athletes/clubs/competitions are entities referenced by id -> no name duplication
--  * "Вправа" (discipline) is a closed vocabulary, same tripling problem as
--    category/scope/format -> store a KEY here, put the 3-locale label in
--    _data/translations.js next to category/scope/format, not in this DB.
--  * record_participants is the join table: it exists for BOTH individual
--    (1 row) and team (2-4 rows) records, carrying the per-athlete club and
--    per-athlete leg sub-scores ("287,284,289,287"), which vary per record
--    even for the same athlete -> cannot live on the athlete row.
--  * Dates on the source site are frequently partial ("?.2023") or ranges
--    ("21-26.02.2012") -> keep date_raw as the safe fallback, populate
--    date_start/date_end only when cleanly parseable.
-- todo, update description of record_i18n
--  * record_i18n is the ONLY table that triples per locale, and only for
--    free-text footnotes/notes -- everything else is written once.

PRAGMA foreign_keys = ON;

CREATE TABLE athletes (
  id        INTEGER PRIMARY KEY,
  key       TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  surname TEXT NOT NULL,
  first_name_latin TEXT NOT NULL,
  surname_latin TEXT NOT NULL
);

CREATE TABLE cities (
  id  INTEGER PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE,
  name_en TEXT,
  name_pl TEXT
);

CREATE TABLE clubs (
  id   INTEGER PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE,
  name_en TEXT,
  name_pl TEXT,
  city INTEGER REFERENCES cities(id)
);


CREATE TABLE competitions (
  id          INTEGER PRIMARY KEY,
  key         TEXT NOT NULL UNIQUE,
  city        INTEGER REFERENCES cities(id),
  label       TEXT,        -- cup/competition name, or country for foreign events
  label_pl    TEXT,
  label_en    TEXT,
  date_start  TEXT,        -- ISO date (YYYY-MM-DD), nullable
  date_end    TEXT,        -- ISO date (YYYY-MM-DD), nullable
  date_raw    TEXT NOT NULL -- original string, always kept as fallback
);

CREATE TABLE disciplines (
  id        INTEGER PRIMARY KEY,
  key       TEXT NOT NULL UNIQUE,  -- e.g. 'team_elim_m3x4', 'individual_70m'
                                     -- label lives in _data/translations.js
                                     -- under translations.disciplines[key][locale]
  team_size INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE records (
  id             INTEGER PRIMARY KEY,
  key            TEXT NOT NULL UNIQUE,
  scope          TEXT NOT NULL CHECK (scope IN ('regional','national','world')),
  category       TEXT NOT NULL,      -- men | women | mixed | cadets | juniors | masters50
  format         TEXT NOT NULL CHECK (format IN ('indoor','outdoor')),
  discipline_id  INTEGER NOT NULL REFERENCES disciplines(id),
  competition_id INTEGER REFERENCES competitions(id),
  result_score   INTEGER NOT NULL,
  variant_key    TEXT               -- groups records into a table variant
);

CREATE TABLE record_participants (
  id         INTEGER PRIMARY KEY,
  record_id  INTEGER NOT NULL REFERENCES records(id) ON DELETE CASCADE,
  athlete_id INTEGER NOT NULL REFERENCES athletes(id),
  club_id    INTEGER REFERENCES clubs(id),
  position   INTEGER NOT NULL DEFAULT 1,  -- order within team; 1 for individual
  leg_scores TEXT                          -- e.g. '287,284,289,287'; nullable
);

CREATE TABLE record_i18n (
  record_id INTEGER NOT NULL REFERENCES records(id) ON DELETE CASCADE,
  locale    TEXT NOT NULL CHECK (locale IN ('en','ua','pl')),
  notes     TEXT,
  PRIMARY KEY (record_id, locale)
);

CREATE INDEX idx_records_scope_category_format ON records(scope, category, format);
CREATE INDEX idx_participants_record ON record_participants(record_id);
CREATE INDEX idx_participants_athlete ON record_participants(athlete_id);
