CREATE TABLE interviews_questions (
    id          integer PRIMARY KEY,
    title       varchar(40) NOT NULL,
    body        varchar(500),
    source      varchar(100),
    created     date
);
