-- Enable Database encryption
SET GLOBAL default_table_encryption=ON;

-- Create the database
CREATE DATABASE IF NOT EXISTS csec_hackathon;

-- Create a user with limited privileges
CREATE USER IF NOT EXISTS 'csec'@'%' IDENTIFIED BY 'supersecretpassword';

-- Grant necessary privileges to the user
GRANT SELECT, INSERT, UPDATE, DELETE ON csec_hackathon.* TO 'csec'@'%';

-- Additional security configurations
-- 1. Remove anonymous user access
DELETE FROM mysql.user WHERE User = '' AND Host = '%';


-- 3. Flush privileges to apply changes
FLUSH PRIVILEGES;
-- 4. Create your database schema (replace with your actual schema)


USE csec_hackathon;

CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
    isDeleted BOOLEAN DEFAULT false,
    createdOn DATETIME DEFAULT (CURRENT_DATE()),
    updatedOn DATETIME,
    name VARCHAR(255)
);

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
);

CREATE TABLE IF NOT EXISTS permissions (
    columnId VARCHAR(255),
    FOREIGN KEY (columnId) REFERENCES dataColumns(id),
    roleId VARCHAR(255),
    FOREIGN KEY (roleId) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS readings (
    id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
    isDeleted BOOLEAN DEFAULT false,
    createdOn DATETIME DEFAULT (CURRENT_DATE()),
    updatedOn DATETIME,
    target_names VARCHAR(255),
    hct DECIMAL(5, 2),
    mcv DECIMAL(5, 2),
    kreatinin DECIMAL(5, 2),
    ast DECIMAL(5, 2),
    alt DECIMAL(5, 2),
    ldh DECIMAL(5, 2),
    ck DECIMAL(5, 2),
    kalij DECIMAL(5, 2),
    natrij DECIMAL(5, 2),
    laka BOOLEAN,
    srednja BOOLEAN,
    teska BOOLEAN
);