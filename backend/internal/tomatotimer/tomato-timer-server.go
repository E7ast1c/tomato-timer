package tomatotimer

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
	config "tomato-timer-server/config"
	handler "tomato-timer-server/internal/handler"
	"tomato-timer-server/internal/repository/postgres"
	"tomato-timer-server/internal/routes"

	"github.com/sirupsen/logrus"
)

func (app *App) RunServer(conf config.AppConfig, ctx context.Context) error {
	db, err := postgres.PGConnect(conf.DBConfig)
	if err != nil {
		return err
	}

	go postgres.CloseConn(ctx, db)
	repo := postgres.NewPGRepository(db)
	handle := handler.NewHandler(*repo, db, conf.APIServer)
	r := routes.Handlers(handle)

	srv := &http.Server{
		Handler:      r,
		Addr:         ":" + conf.APIServer.Port,
		WriteTimeout: 5 * time.Second,
		ReadTimeout:  5 * time.Second,
	}
	err = srv.ListenAndServe()
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
