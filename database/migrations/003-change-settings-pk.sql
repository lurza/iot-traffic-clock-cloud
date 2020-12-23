--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE settings_copy( 
    key TEXT NOT NULL PRIMARY KEY,
    value TEXT NOT NULL
);

INSERT INTO settings_copy(key, value)
SELECT key, value FROM settings;

DROP TABLE settings;
ALTER TABLE settings_copy RENAME TO settings;