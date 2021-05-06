package tomato_timer_server

import (
	"context"
	"github.com/gorilla/handlers"
	"github.com/sirupsen/logrus"
	"io"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"syscall"
	"time"
	config "tomato-timer-server/config"
	handler "tomato-timer-server/internal/handler"
	dao "tomato-timer-server/internal/repository"
	"tomato-timer-server/internal/routes"
)

func (app *App) RunServer(config config.AppConfig, ctx context.Context) error {
	db, err := dao.PGConnect(config.DBConfig)
	if err != nil {
		return err
	}

	go dao.CloseConn(ctx, db)

	repo := dao.NewPGRepository(db)
	handler := handler.NewHandler(*repo, config.ApiServer)
	r := routes.Handlers(handler)

	http.Handle("/", r)

	logFormatterParams := handlers.LogFormatterParams{
		Request:    nil,
		URL:        url.URL{},
		TimeStamp:  time.Time{},
		StatusCode: 0,
		Size:       0,
	}
	stdLoggerOut := logrus.StandardLogger().Out
	logFormatter := handlers.LogFormatter(stdLoggerOut, logFormatterParams)

	logReq := handlers.CustomLoggingHandler(logrus.StandardLogger().Out, r, logFormatter )

	err = http.ListenAndServe(":"+config.ApiServer.Port, logReq)
	if err != nil {
		return err
	}
	return nil
}

func (app *App) GracefulShutdown(cancelFunc context.CancelFunc) {
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM, syscall.SIGKILL)
	<-sigs
	logrus.Info("received shutdown signal")
	cancelFunc()
}

