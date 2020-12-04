PROJECT_NAME=$(shell basename $(PWD))

dev: clean build run

build:
	docker-compose build

clean:
	docker-compose stop -t0
	docker-compose rm -f

run:
	docker-compose up
