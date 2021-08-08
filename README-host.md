#           Northcoders (nc-games API)


## Project Background

For this project, I have set-up an API (Application-Programming-Interface, and it's purpose is to mimick the transfer of information from the back-end (database) of a web-service, to the front-end (user interface). I have used MVC principles to facilitate the handling of information, and to isolate queries and endpoints. There is both a test and development database, and the purpose of the test files is to ensure the functionality of the functions that interact with both incoming queries and the DBMS (DataBase Management System), which is PostgresQL. 

## Installation/Cloning

        ** MINIMUM Node and Postgres requirements ** 
            [Node 7.18.1] & [Postgres 13.3]

Step 1: clone this repository - https://github.com/Arteh97/be-nc-games.git

Step 2: run "npm i" in the terminal to install the required dependencies

Step 3: Setup the databases and run the seeds: {
    1 - create these 2 files in the repository:
    '.env.test' - fileContents = PGDATABASE=nc_games
    '.env.development' - fileContents = PGDATABASE=nc_games_test

## Setup the Databases and Run Seeds

    2 - npm setup-dbs 
        (sets up databases)

    3 - npm run seed 
        (seeds database and populates tables)

    4 - npm run test app 
        (checks if endpoints are working) *optional*

    5 - npm run test utils 
        (checks if utils functions are working) *optional*
}


## Author

Mahamud Arteh,
artehrush@gmail.com,
@NthingPrsonal - Twitter & Instagram,



