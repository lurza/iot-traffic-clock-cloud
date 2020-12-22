--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE settings (
    id INTEGER PRIMARY KEY,
    key TEXT NOT NULL,
    value TEXT NOT NULL
);

CREATE TABLE alarms (
    id INTEGER PRIMARY KEY,
    destination TEXT NOT NULL,
    arrival_time TEXT NOT NULL
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE settings;
DROP TABLE alarms;