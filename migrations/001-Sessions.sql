-- Up
CREATE TABLE SessionTbl(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_key TEXT,
    session_state TEXT
);

INSERT INTO SessionTbl(session_key, session_state) values ('bruno', 'bruno@antunes.pt');

-- Down
DROP TABLE SessionTbl;