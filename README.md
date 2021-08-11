#           Mahamud Arteh (artehs-games1997 API)


## Project Background

For this project, I have set-up an API (Application-Programming-Interface, and it's purpose is to mimick the transfer of information from the back-end (database) of a web-service, to the front-end (user interface). I have used MVC principles to facilitate the handling of information, and to isolate queries and endpoints. There is both a test and development database, and the purpose of the test files is to ensure the functionality of the processes that interact with both incoming queries and the DBMS (DataBase Management System), which is PostgresQL. 

    ** MINIMUM Node and Postgres requirements ** 
    [Node 7.18.1] & [Postgres 13.3]

    
## Installation/Cloning

    1 - clone this repository - https://github.com/Arteh97/be-nc-games.git

    2 - run "npm i" in the terminal to install the required dependencies

    3 - create these 2 files in the repository:

    [file name = '.env.test' && file contents = PGDATABASE=nc_games],

    [file name = '.env.development' && file contents = PGDATABASE=nc_games_test]



## Commands to run seeds & test app functionality

    1 - npm setup-dbs 
        (sets up databases)

    2 - npm run seed 
        (seeds database and populates tables)

    3 - npm run test app 
        (checks if endpoints are working) *optional*

    4 - npm run test utils 
        (checks if utils functions are working) *optional*
}


## Author

Mahamud Arteh,
artehrush@gmail.com,
@NthingPrsonal - Twitter & Instagram,



