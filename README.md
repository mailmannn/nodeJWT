# NodeJWT

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fc4e3d71117742949f96c4c8a17cb99d)](https://app.codacy.com/app/andrepinheiro.um/nodeJWT?utm_source=github.com&utm_medium=referral&utm_content=mailmannn/nodeJWT&utm_campaign=Badge_Grade_Settings)

Example of JWT use for authentication in a small NodeJS rest API using mongoDB, all using docker images and docker-compose.


## Clone and run the application

Clone:

````
git clone https://github.com/mailmannn/nodeJWT.git

````

build and run the application:


````
make docker-build-start

````


Stop the application and remove containers:

````
make docker-stop 

````

# Notes: 
  - Using a docker volume for DB persistence, so no problem with removing the containers.
  - Node aplication uses nodemon so you can change code and files will be reloaded without need for other action.
