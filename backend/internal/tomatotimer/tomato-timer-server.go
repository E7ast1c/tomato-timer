package tomatotimer

import (
	"context"
	"os"
	"os/signal"
	"syscall"
	"time"
	"tomato-timer/backend/config"
	"tomato-timer/backend/internal/handler"
	"tomato-timer/backend/internal/repository/postgres"
	"tomato-timer/backend/internal/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
)

func (app *App) RunServer(conf config.AppConfig, ctx context.Context) error {
	db, err := postgres.PGConnect(conf.DBConfig)
	if err != nil {
		return err
	}

	go postgres.CloseConn(ctx, db)
	repo := postgres.NewPGRepository(db)

	fApp := fiber.New(fiber.Config{
		Prefork:                   false,
		ServerHeader:              "Tomato-timer backend",
		StrictRouting:             true,
		ReadTimeout:               5 * time.Second,
		WriteTimeout:              5 * time.Second,
	})

	handle := handler.NewHandler(*repo, db, conf.APIServer, nil)
	routes.Handlers(handle, fApp)

	err = fApp.Listen(handle.Config.Port)
	if err != nil {
		return err
	}

	return nil
}

// GracefulShutdown TODO: finish, not right work now
func (app *App) GracefulShutdown(cancelFunc context.CancelFunc) {
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
	<-sigs
	logrus.Warn("received shutdown signal")
	cancelFunc()
	logrus.Warn("shutting down!")
}
