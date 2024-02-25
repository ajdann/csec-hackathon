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

-- Insert 1
INSERT INTO readings (target_names, hct, mcv, kreatinin, ast, alt, ldh, ck, kalij, natrij, laka, srednja, teska)
VALUES ('Patient A', 42.5, 90.3, 1.2, 25.6, 18.8, 240.7, 150.2, 4.1, 137.5, true, false, true);

-- Insert 2
INSERT INTO readings (target_names, hct, mcv, kreatinin, ast, alt, ldh, ck, kalij, natrij, laka, srednja, teska)
VALUES ('Patient B', 38.2, 92.8, 0.9, 22.3, 16.5, 215.4, 140.8, 4.5, 140.2, false, true, false);

-- Insert 3
INSERT INTO readings (target_names, hct, mcv, kreatinin, ast, alt, ldh, ck, kalij, natrij, laka, srednja, teska)
VALUES ('Patient C', 40.7, 88.6, 1.5, 28.9, 21.4, 260.1, 165.3, 3.8, 134.7, true, false, false);



INSERT INTO roles (name) VALUES ('labTechnician');
INSERT INTO roles (name) VALUES ('doctor');


INSERT INTO users (name, surname, type, email, password, roleId) 
VALUES 
    ('LabTech1', 'Surname1', 1, 'labtech1@example.com', '$2a$12$agl7cxvwrMHXdLBuczI1oO03Xv/ta3oII5z/TVGiCyrmPP/qv8geG', (SELECT id FROM roles WHERE name = 'labTechnician'));


INSERT INTO users (name, surname, type, email, password, roleId) 
VALUES 
    ('Doctor1', 'Surname1', 2, 'doctor1@example.com', '$2a$12$agl7cxvwrMHXdLBuczI1oO03Xv/ta3oII5z/TVGiCyrmPP/qv8geG', (SELECT id FROM roles WHERE name = 'doctor'));
