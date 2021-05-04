package routes

import (
	"github.com/gorilla/mux"
	"tomato-timer-server/internal/handler"
	"tomato-timer-server/internal/middleware"
)

func Handlers(handler *handler.Handler) *mux.Router {
	r := mux.NewRouter().StrictSlash(true)
	r.Use(middleware.CommonMiddleware)

	mw := middleware.NewMiddleware(handler.Config)

	r.HandleFunc("/health-check", handler.HealthCheck).Methods("GET")
	r.HandleFunc("/register", handler.CreateUser()).Methods("POST")
	r.HandleFunc("/login", handler.Login()).Methods("POST")

	// Auth route
	s := r.PathPrefix("/auth").Subrouter()
	s.Use(mw.JwtVerify)
	s.HandleFunc("/get-user-settings", handler.GetUserSettings()).Methods("GET")
	return r
}
