# reviews-atelier

# ETL STEPS

## Extraction
 - getting the CSV files from the existing database

## Transform
- create the schema with desired columns

## Load
- import the csv files into vs code:
  - brew install postgresql
  - brew services start postgresql
  - enter the db: psql postgres
  - show all users: \du
  - quit current session : \q
  - select/rejoin an instance: psql postgresql -U (db name)
  - list db: \l
  - select a database: \c testdb
  - running the sql file: sudo -u postgres psql < server/schema.sql
  - show tables: \dt+
  - drop table: DROP TABLE (table name)
  - show data in table: TABLE (table name);

- run the command to seed a file