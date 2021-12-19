package handler

import (
	_ "tomato-timer/backend/cmd/docs"
	"tomato-timer/backend/internal/middleware"

	swagger "github.com/arsmn/fiber-swagger/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Handlers(handle *Handler, fApp *fiber.App) *fiber.App {
	mw := middleware.New(handle.Repo,handle.DB, handle.Config, handle.Options.ContextUser)

	fApp.Use(mw.Cors())
	fApp.Use(logger.New())

	// Base routes
	fApi := fApp.Group("/api")
	fApi.Get("/swagger/*", swagger.Handler) // default
	fApi.Get("/swagger/*", swagger.New(swagger.Config{ // custom
		URL:         "http://localhost" + handle.Config.APIServer.Port + "/swagger/doc.json",
		DeepLinking: false,
	}))
	fApi.Get("/health-check", handle.HealthCheck)
	fApi.Post("/register", handle.RegisterUser)
	fApi.Post("/login", handle.Login)

	// Auth routes
	authRoute := fApi.Group("/auth")
	authRoute.Use(mw.AuthRoute())
	authRoute.Get("/get-user-settings", handle.GetUserSettings)
	authRoute.Post("/set-user-settings", handle.SetUserSetting)

	return fApp
}
