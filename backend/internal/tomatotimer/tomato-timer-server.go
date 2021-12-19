package tomatotimer

import (
	"context"
	"net/http"
	"time"

	"tomato-timer/backend/config"
	"tomato-timer/backend/internal/handler"
	"tomato-timer/backend/internal/models"
	"tomato-timer/backend/internal/repository/postgres"
	graceful_shutdown "tomato-timer/backend/pkg/graceful-shutdown"

	"github.com/gofiber/fiber/v2"
)

func (app *App) RunServer(conf config.AppConfig, ctx context.Context) (*fiber.App, error) {
	closer := graceful_shutdown.New()

	db, err := postgres.PGConnect(conf.DBConfig)
	if err != nil {
		return nil, err
	}
	closer.Subscribe("postgres", func() error {
		pdb, _ := db.DB()
		return pdb.Close()
	})

	err = db.AutoMigrate(&models.User{})
	if err != nil {
		return nil, err
	}

	repo := postgres.NewPGRepository(db)

	fApp := fiber.New(fiber.Config{
		Prefork:                   false,
		ServerHeader:              "Tomato-timer backend",
		StrictRouting:             true,
		ReadTimeout:               5 * time.Second,
		WriteTimeout:              5 * time.Second,
	})

	handle := handler.NewHandler(*repo, db, conf, nil)
	handler.Handlers(handle, fApp)

	closer.Subscribe("httpServer", func() error {
		return fApp.Shutdown()
	})

	if err := fApp.Listen(handle.Config.APIServer.Port); err != nil && err != http.ErrServerClosed {
		return nil, err
	}

	return fApp, nil
}