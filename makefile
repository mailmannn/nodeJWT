#delete any nodejwt containers
docker-remove-all:
	docker rm -fv nodejwt &> /dev/null
	docker rm -fv nodejwtdb &> /dev/null

#build and start the nodejwt containers
docker-build-start:
	npm install
	docker-compose  up --build -d

#stop and remove nodejwt containers
docker-stop:
	docker-compose down
	docker ps -a

#start nodejwt without build
docker-start:
	docker-compose up -d

#pull node image for test env
docker-init:
	docker pull andrepinheiro/nodejwt:1.0
	docker pull mongo:3.0.15


