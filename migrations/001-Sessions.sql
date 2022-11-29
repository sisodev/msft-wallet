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
    cooperateTitle TEXT,
    dateOfBirth TEXT,
    emailAddress TEXT,
    domicile TEXT,
    phoneNumber TEXT,
    privilegedSigner TEXT
);

INSERT INTO SessionTbl(session_key, session_state) values ('bruno', 'bruno@antunes.pt');
INSERT INTO UserTbl(session_key, firstName, cooperateTitle, dateOfBirth, emailAddress, domicile, phoneNumber, privilegedSigner) values ('5a851c88-3590-4ed1-97a1-0002d680e3b0', 'Arulmigu', 'Mr', '05/11/1988', 'bala@gmail.com', 'UK', '333333333333', 'No');

-- Down
DROP TABLE SessionTbl;

DROP TABLE UserTbl;