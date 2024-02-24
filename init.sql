-- Enable Database encryption
SET GLOBAL default_table_encryption=ON;

-- Create the database
CREATE DATABASE IF NOT EXISTS data;

-- Create a user with limited privileges
CREATE USER IF NOT EXISTS 'csec'@'csec-network' IDENTIFIED BY 'supersecretpassword';

-- Grant necessary privileges to the user
GRANT SELECT, INSERT, UPDATE, DELETE ON your_database_name.* TO 'csec'@'%';

-- Additional security configurations
-- 1. Remove anonymous user access
DELETE FROM mysql.user WHERE User = '' AND Host = '%';


-- 3. Flush privileges to apply changes
FLUSH PRIVILEGES;

-- 4. Create your database schema (replace with your actual schema)
CREATE TABLE your_table_name (
  -- define your table columns here
);
