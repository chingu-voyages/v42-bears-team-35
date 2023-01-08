# E-Commerce Site - Server

## Tech Stack

![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)\
![typeorm](https://img.shields.io/badge/TypeORM-E83524?style=flat-square)\
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

## Installation

Make sure you have installed postgres, you can install it from this [link](https://www.postgresql.org/download/)

Once intalled open pgAdmin and on your local host create a new database.

Clone the GitHub project and inside the ```server``` directory run the following command to install all of the required dependencies:

```cmd
npm install
```

### List of available commands

- Build from TypesCript

```cmd
npm run build
```

- Start the server (has to be previously build)

```cmd
npm start
```

- On development environment so the server will auto build and start on save

```cmd
npm run dev
```

- To run the linter to check for errors in the code

```cmd
npm run lint
```

- To run the lint and fix all the errors that can be automatically fixed

```cmd
npm run lint:fix
```


## Environment variables

For this project to work you will need to create a ```.env``` file on the server's root.

The following variables are required for the project to run:

```.env
PORT = <Port number in which the server will be running>
DB_HOST = <Host where the PostgreSQL is running usually will be localhost>
DB_PORT = <Port where the PostgreSQL is listening usually will be 5432>
DB_USER = <Username of the PostgreSQL usually is postgres>
DB_PASSWORD = <The password of the PostgreSQL username>
DB_NAME = <The name of the database created>
```