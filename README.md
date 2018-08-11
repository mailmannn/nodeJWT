# NodeJWT
Small example of JWT use for authentication in a small NodeJS rest API using mongoDB.


## Clone and run the application

Clone:

````
git clone https://github.com/mailmannn/nodeJWT.git

````

Build and run the application (first time so that docker image is build) :


````
make docker-build-start

````

Start application (after first time):

````
make docker-start

````


Stop the application and remove containers:´´

````
make docker-stop 

````

#Notes: 
  - the persistence on the Database is on using a docker volume, so no problem with removing the containers
  - Node aplication uses nodemon so you can change code and files will be reloaded without need for any otehr action.
