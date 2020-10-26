CREATE DATABASE IF NOT EXISTS alien_db;
USE alien_db;
DROP TABLE IF EXISTS Posts;
CREATE TABLE Posts (
    id int AUTO_INCREMENT NOT NULL,
    date varchar(255),
    city varchar(255),
    state varchar(255),
    shape varchar(255),
    duration varchar(255),
    summary TEXT,
    datePosted varchar(255),
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);


DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id int AUTO_INCREMENT NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

