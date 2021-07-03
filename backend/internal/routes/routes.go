package routes

import (
	_ "tomato-timer/backend/cmd/docs"
	"tomato-timer/backend/internal/handler"

	swagger "github.com/arsmn/fiber-swagger/v2"
	"github.com/gofiber/fiber/v2"
)

func Handlers(handle *handler.Handler, fApp *fiber.App) {

	//mw := middleware.NewMiddleware(handle.Config)

	fApp.Get("/swagger/*", swagger.Handler) // default

	//fApp.Get("/swagger/*", swagger.New(swagger.Config{ // custom
	//	URL: "http://localhost:" + handle.Config.Port + "/swagger/doc.json",
	//	DeepLinking: false,
	//}))

	//r.HandleFunc("*", httpSwagger.Handler(
	//	httpSwagger.URL("http://localhost:" + handle.Config.Port + "/swagger/doc.json"),
	//)).Methods("GET")

	//	r.PathPrefix("/swagger").Handler(httpSwagger.WrapHandler)
	// r.Use(mw.CommonMiddleware)
	//fApp.Use(mw.LoggingMiddleware(logrus.StandardLogger()))

	fApp.Get("/health-check", handle.HealthCheck)

	fApp.Post("/register", handle.RegisterUser)
	fApp.Post("login", handle.Login)

	//
	//// Auth route
	//s := r.PathPrefix("/auth").Subrouter()
	//s.Use(mw.JwtVerify)
	//s.HandleFunc("/get-user-settings", handle.GetUserSettings()).Methods("GET")
	//s.HandleFunc("/set-user-settings", handle.SetUserSetting()).Methods("POST")
}
