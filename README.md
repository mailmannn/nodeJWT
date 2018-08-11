# NodeJWT
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
