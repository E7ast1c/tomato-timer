package main

import (
	"context"
	"tomato-timer-server/config"
	tomatoTimerServer "tomato-timer-server/internal/tomatotimer"

	"github.com/sirupsen/logrus"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	appConfig := config.NewAPIConfig()
	app := tomatoTimerServer.NewApp()

	go app.GracefulShutdown(cancel)

	if err := app.RunServer(appConfig, ctx); err != nil {
		logrus.Fatalf("start server error = %s", err.Error())
	}
}
