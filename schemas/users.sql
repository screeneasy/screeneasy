CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    username	varchar(40),
    password	varchar(40),
    email		varchar(40),
    twitter_id  varchar(40),
    github_id 	varchar(40),
    created     date
);