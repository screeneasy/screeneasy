CREATE TABLE interview_questions (
    id          SERIAL PRIMARY KEY,
    title       varchar(40) NOT NULL,
    body        varchar(500),
    source      varchar(100),
    created     date
);
