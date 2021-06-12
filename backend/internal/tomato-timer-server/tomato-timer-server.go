package tomato_timer_server

import (
	"context"
	"github.com/sirupsen/logrus"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
	config "tomato-timer-server/config"
	handler "tomato-timer-server/internal/handler"
	"tomato-timer-server/internal/repository/postgres"
	"tomato-timer-server/internal/routes"
)

func (app *App) RunServer(config config.AppConfig, ctx context.Context) error {
	db, err := postgres.PGConnect(config.DBConfig)
	if err != nil {
		return err
	}

	go postgres.CloseConn(ctx, db)

	repo := postgres.NewPGRepository(db)
	handler := handler.NewHandler(*repo, config.ApiServer)
	r := routes.Handlers(handler)

	srv := &http.Server{
		Handler:      r,
		Addr:         ":"+config.ApiServer.Port,
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
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM, syscall.SIGKILL)
	<-sigs
	go cancelFunc()
	time.Sleep(3 * time.Second)
	logrus.Fatal("received shutdown signal")
}

