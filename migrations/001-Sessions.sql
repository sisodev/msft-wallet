-- Up
CREATE TABLE SessionTbl(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_key TEXT,
    session_state TEXT
);

CREATE TABLE UserTbl(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_key TEXT,
    firstName TEXT,
    dateOfBirth TEXT,
    emailAddress TEXT,
    domicile TEXT,
    privilegedSigner TEXT
);

INSERT INTO SessionTbl(session_key, session_state) values ('bruno', 'bruno@antunes.pt');
INSERT INTO UserTbl(session_key, firstName, dateOfBirth, emailAddress, domicile,  privilegedSigner) values ('5a851c88-3590-4ed1-97a1-0002d680e3b0', 'Arulmigu', '05/11/1988', 'bala@gmail.com', 'UK','No');

-- Down
DROP TABLE SessionTbl;

DROP TABLE UserTbl;