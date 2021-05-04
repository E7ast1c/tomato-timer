package routes

import (
	"github.com/gorilla/mux"
	auth "tomato-timer-server/internal/auth"
	"tomato-timer-server/internal/handler"
	"tomato-timer-server/internal/middleware"
)

func Handlers(handler *handler.Handler) *mux.Router {
	r := mux.NewRouter().StrictSlash(true)
	r.Use(middleware.CommonMiddleware)

	auth := auth.NewAuth(handler.Repo, handler.Config)

	r.HandleFunc("/health-check", handler.HealthCheck).Methods("GET")
	r.HandleFunc("/register", handler.CreateUser()).Methods("POST")
	r.HandleFunc("/login", handler.Login()).Methods("POST")

	// Auth route
	s := r.PathPrefix("/auth").Subrouter()
	s.Use(auth.JwtVerify)
	s.HandleFunc("/get-user-settings", handler.GetUserSettings()).Methods("GET")
	//s.HandleFunc("/users", handler.FetchUsers(conn)).Methods("GET")
	//s.HandleFunc("/user/{id}", handler.GetUser).Methods("GET")
	//s.HandleFunc("/user/{id}", handler.UpdateUser).Methods("PUT")
	//s.HandleFunc("/user/{id}", handler.DeleteUser).Methods("DELETE")
	//s.HandleFunc("/user/{id}", handler.UpdateUserSettings).Methods("PUT")
	return r
}
