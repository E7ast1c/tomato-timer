package routes

import (
	_ "tomato-timer/backend/cmd/docs"
	"tomato-timer/backend/internal/handler"
	"tomato-timer/backend/internal/middleware"

	swagger "github.com/arsmn/fiber-swagger/v2"
	"github.com/gofiber/fiber/v2"
)

func Handlers(handle *handler.Handler, fApp *fiber.App) {
	mw := middleware.New(handle)

	fApp.Get("/swagger/*", swagger.Handler) // default

	fApp.Get("/swagger/*", swagger.New(swagger.Config{ // custom
		URL: "http://localhost" + handle.Config.Port + "/swagger/doc.json",
		DeepLinking: false,
	}))

	fApp.Get("/health-check", handle.HealthCheck)

	fApp.Post("/register", handle.RegisterUser)
	fApp.Post("login", handle.Login)

	// Auth routes
	authRoute := fApp.Group("/auth")
	authRoute.Use(mw.New())
	authRoute.Get("/get-user-settings", handle.GetUserSettings)
	authRoute.Post("/set-user-settings", handle.SetUserSetting)
}
