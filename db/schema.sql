CREATE DATABASE IF NOT EXISTS alien_db;
USE alien_db;
-- If the table already exists, remove it before trying to create the table again
DROP TABLE IF EXISTS sightings;
-- Create the sightings table
-- Date / Time,City,State,Shape,Duration,Summary,Posted
CREATE TABLE sightings (
    id int NOT NULL AUTO_INCREMENT,
    date_and_time varchar(255) NOT NULL,
    city varchar(255),
    state varchar(255),
    shape varchar(255) NOT NULL,
    duration varchar(255),
    summary varchar(255),
    posted varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

