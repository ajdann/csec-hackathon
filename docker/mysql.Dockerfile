FROM mysql:8.0

# Set environment variables for database credentials
ENV MYSQL_DATABASE your_database_name
ENV MYSQL_USER your_username
ENV MYSQL_PASSWORD your_password
ENV MYSQL_ROOT_PASSWORD your_root_password

# Create the persistent data volume for the database
VOLUME /var/lib/mysql

# Initialize the database at container startup
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the port for connections
EXPOSE 3306

CMD ["mysqld"]
