CREATE DATABASE IF NOT EXISTS csec_hackathon;

USE csec_hackathon;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
    status INT CHECK(status IN (1, 2, 3)),
    isDeleted BOOLEAN DEFAULT false,
    createdOn DATETIME DEFAULT (CURRENT_DATE()),
    updatedOn DATETIME,
    name VARCHAR(255),
    surname VARCHAR(255),
    type INT CHECK(type IN (1, 2)),
    email VARCHAR(255),
    password VARCHAR(255),
);