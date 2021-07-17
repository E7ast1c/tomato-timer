package middleware

import (
	"tomato-timer/backend/internal/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
)

// AccessToken access header token key
const AccessToken = "x-access-token"

func (mw *middleware) New() fiber.Handler {
	return func(fc *fiber.Ctx) error {
		// Don't execute middleware if Next returns true
		auth := fc.Get(AccessToken)

		// Check if the header contains a min length.
		if len(auth) <= 25 {
			return Unauthorized(fc)
		}

		userTk := &models.UserToken{}
		claims, err := jwt.ParseWithClaims(auth, userTk, func(token *jwt.Token) (interface{}, error) {
			return []byte(mw.Config.SignSecret), nil
		})
		if err != nil {
			return Unauthorized(fc)
		}

		logrus.Info(claims.Claims.(*models.UserToken))
		fc.Locals(mw.ContextUser, claims.Claims.(*models.UserToken))
		return fc.Next()
	}
}

var Unauthorized = func(c *fiber.Ctx) error {
	return c.SendStatus(fiber.StatusUnauthorized)
}