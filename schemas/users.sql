CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    twitter_id  varchar(40),
    created     date
);