package main

import (
	"context"
	"tomato-timer/backend/config"
	"tomato-timer/backend/internal/tomatotimer"

	"github.com/sirupsen/logrus"
)

// @title Tomato-timer backend
// @version 1.1
// @description API Server for Tomato-timer

// @host localhost:8081
// @BasePath /
func main() {
	ctx, cancel := context.WithCancel(context.Background())
	appConfig := config.NewAppConfig()
	app := tomatotimer.NewApp()

	go app.GracefulShutdown(cancel)

	if err := app.RunServer(appConfig, ctx); err != nil {
		logrus.Fatalf("start server error = %s", err.Error())
	}
}
