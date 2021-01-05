package main

import (
	"context"
	"github.com/gorilla/handlers"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"tomato-timer/server/dao"
	"tomato-timer/server/helpers"
	"tomato-timer/server/routes"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	sigWatcher(cancel)

	conn := dao.ConnectDB()
	go conn.CloseConn(ctx)

	r := routes.Handlers(conn)
	http.Handle("/", r)
	logReq := handlers.LoggingHandler(os.Stdout, r)
	log.Panic(http.ListenAndServe(":"+helpers.GetConfig().PORT, logReq))
}

func sigWatcher(cancel context.CancelFunc) {
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM, syscall.SIGKILL)

	go func(context.CancelFunc) {
		for s := range sigs {
			log.Printf("handle sig = %s \n", s)
			cancel()
			return
		}
	}(cancel)
}
