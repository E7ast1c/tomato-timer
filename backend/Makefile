GO_BUILD_ENV := CGO_ENABLED=0 GOOS=linux GOARCH=amd64
DOCKER_BUILD=$(shell pwd)/server/cmd/.docker_build
DOCKER_CMD=$(DOCKER_BUILD)/tomato-timer

docker_build:
	docker build -t tomato-timer:latest .

docker_run:
	docker run -dp 8081:8081 --env-file .env tomato-timer:latest

lint:
	golangci-lint run -v -c=.golangci.yml --tests=false