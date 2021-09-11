# Reviews-Atelier

<img width="590" alt="Screen Shot 2021-08-24 at 21 59 59" src="https://user-images.githubusercontent.com/81060184/132963292-ac5b11ac-ce26-4629-a33d-8820373af7ac.png">


## ETL STEPS

### Extraction
 - getting the CSV files from the existing database

### Transform
- create the schema with desired columns

### Load
- import the csv files into vs code:
  - brew install postgresql
  - brew services start postgresql
  - enter the db: psql postgres
  - show all users: \du
  - quit current session : \q
  - select/rejoin an instance: psql postgresql -U (db name)
  - list db: \l
  - select a database: \c testdb
  - running the sql file: psql -u postgres psql < server/schema.sql (not sure)
  - show tables: \dt+
  - drop table: DROP TABLE (table name)
  - show data in table: TABLE (table name);
  - show schema: \d (table name);
  - show number of rows: select count(*) from (table name);
  - check current db and user: \c
  - connection info: \conninfo

- run the command to seed a file

### Ubuntu:
 - sudo su - postgres
 - psql --> to enter psql shell
 - \q --> exit psql
 - exit --> exit postgres
