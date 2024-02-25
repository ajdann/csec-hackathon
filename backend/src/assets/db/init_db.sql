CREATE DATABASE IF NOT EXISTS csec_hackathon;

USE csec_hackathon;

CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
    isDeleted BOOLEAN DEFAULT false,
    createdOn DATETIME DEFAULT (CURRENT_DATE()),
    updatedOn DATETIME,
    name VARCHAR(255),
)

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
    roleId VARCHAR(255),
    FOREIGN KEY (roleId) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS dataColumns (
    id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
    isDeleted BOOLEAN DEFAULT false,
    createdOn DATETIME DEFAULT (CURRENT_DATE()),
    updatedOn DATETIME,
    name VARCHAR(255)
)

CREATE TABLE IF NOT EXISTS permissions (
    columnId VARCHAR(255),
    FOREIGN KEY (columnId) REFERENCES dataColumns(id),
    roleId VARCHAR(255),
    FOREIGN KEY (roleId) REFERENCES roles(id)
)