package middleware

import (
	"tomato-timer/backend/pkg/env"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func (mw *middleware) Cors() fiber.Handler {
	config := cors.Config{
		AllowMethods:     "POST, GET, OPTIONS",
		AllowHeaders:     "Accept, Content-Type, Content-Length, Accept-Encoding, X-Access-Token",
		AllowCredentials: true,
	}
	if mw.Config.Environment == env.Development {
		config.AllowOrigins = "*"
		return cors.New(config)
	} else {
		config.AllowOrigins = mw.Config.APIServer.OriginUrl
		return cors.New()
	}
}
