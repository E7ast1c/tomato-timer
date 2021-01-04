package main

import (
	"github.com/gorilla/handlers"
	"log"
	"net/http"
	"os"
	"tomato-timer/server/helpers"
	"tomato-timer/server/routes"
)

func main() {

	r := routes.Handlers()
	http.Handle("/", r)
	logReq := handlers.LoggingHandler(os.Stdout,r)
	log.Fatal(http.ListenAndServe(":"+helpers.GetConfig().PORT, logReq))
}