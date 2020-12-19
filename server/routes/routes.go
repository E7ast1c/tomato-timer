package routes

import (
	"github.com/gorilla/mux"
	"tomato-timer/server/auth"
	"tomato-timer/server/controllers"
	"tomato-timer/server/middleware"
)

func Handlers() *mux.Router {

	r := mux.NewRouter().StrictSlash(true)
	r.Use(middleware.CommonMiddleware)

	r.HandleFunc("/health-check", controllers.HealthCheck).Methods("GET")
	r.HandleFunc("/register", controllers.CreateUser).Methods("POST")
	r.HandleFunc("/login", controllers.Login).Methods("POST")

	// Auth route
	s := r.PathPrefix("/auth").Subrouter()
	s.Use(auth.JwtVerify)
	s.HandleFunc("/users", controllers.FetchUsers).Methods("GET")
	//s.HandleFunc("/user/{id}", controllers.GetUser).Methods("GET")
	//s.HandleFunc("/user/{id}", controllers.UpdateUser).Methods("PUT")
	//s.HandleFunc("/user/{id}", controllers.DeleteUser).Methods("DELETE")
	//s.HandleFunc("/user/{id}", controllers.UpdateUserSettings).Methods("PUT")
	return r
}
