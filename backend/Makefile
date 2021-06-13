GO_BUILD_ENV := CGO_ENABLED=0 GOOS=linux GOARCH=amd64
DOCKER_BUILD=$(shell pwd)/server/cmd/.docker_build
DOCKER_CMD=$(DOCKER_BUILD)/tomato-timer

$(DOCKER_CMD): clean
	mkdir -p $(DOCKER_BUILD)
	$(GO_BUILD_ENV) go build -v -o $(DOCKER_CMD) ./server/cmd/

clean:
	rm -rf $(DOCKER_BUILD)

heroku: $(DOCKER_CMD)
	heroku container:push web

local: $(DOCKER_CMD)


local: $(DOCKER_CMD)

lint:
	golangci-lint run -v -c=.golangci.yml --tests=false