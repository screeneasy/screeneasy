CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    twitter_id  varchar(40),
    github_id 	varchar(40),
    created     date
);