package main

import (
	"context"
	"github.com/sirupsen/logrus"
	"tomato-timer-server/config"
	tomato_timer_server "tomato-timer-server/internal/tomato-timer-server"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	appConfig := config.NewApiConfig()
	app := tomato_timer_server.NewApp()

	go app.GracefulShutdown(cancel)

	if err := app.RunServer(appConfig, ctx); err != nil {
		logrus.Fatalf("start server error = %s", err.Error())
	}
}


