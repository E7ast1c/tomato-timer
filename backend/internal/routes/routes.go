package routes

import (
	"tomato-timer-server/internal/handler"
	"tomato-timer-server/internal/middleware"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

func Handlers(handle *handler.Handler) *mux.Router {
	r := mux.NewRouter().StrictSlash(true)
	mw := middleware.NewMiddleware(handle.Config)

	r.Use(mw.CommonMiddleware)
	r.Use(mw.LoggingMiddleware(logrus.StandardLogger()))

	r.HandleFunc("/health-check", handle.HealthCheck()).Methods("GET")
	r.HandleFunc("/register", handle.RegisterUser()).Methods("POST")
	r.HandleFunc("/login", handle.Login()).Methods("POST")

	// Auth route
	s := r.PathPrefix("/auth").Subrouter()
	s.Use(mw.JwtVerify)
	s.HandleFunc("/get-user-settings", handle.GetUserSettings()).Methods("GET")
	s.HandleFunc("/set-user-settings", handle.SetUserSetting()).Methods("POST")
	return r
}
