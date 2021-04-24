# Rest API SQL

Node Js, Express Js, REST APIS, SQL ORM Sequelize project.This project includes api processes that include users and courses.

## Install
    $ git clone https://github.com/TaylanMun/rest-api-sql.git
    $ cd rest-api-sql
    $ npm install

## Running the project
    $ npm run seed -> this command to create database and saves data in tables
    $ npm start

## Testing the project
    $ Import RESTAPI.postman_collection.json file to postman.

## Description
- CRUD operations with sequelize
- Validation
- Basic Authentication
- Basic Relational Database
- Global Error

---
## Requirements

For development, you will need Node.js and a node global package.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command. (LTS version)

    $ node --version
    v14.16.0

    $ npm --version
    7.7.6

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g