package middleware

import (
	"context"
	"net/http"
	"strings"
	"tomato-timer-server/internal/models"
	"tomato-timer-server/pkg/exception"

	"github.com/dgrijalva/jwt-go"
)

const headerTokenName = "x-access-token"

func (mw *middleware) JwtVerify(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Grab the token from the header
		var header = r.Header.Get(headerTokenName)
		header = strings.TrimSpace(header)

		exp := exception.NewResponseException(w)

		if header == "" {
			exp.ErrForbidden("Missing auth token, userToken is missing")
			return
		}

		userToken := &models.UserToken{}
		parsedToken, err := jwt.ParseWithClaims(header, userToken, func(token *jwt.Token) (interface{}, error) {
			return []byte(mw.config.SignSecret), nil
		})

		if err != nil {
			exp.ErrBadRequest(err, "parse user claims failed")
			return
		}

		if !parsedToken.Valid {
			exp.ErrForbidden("Invalid token")
			return
		}

		ctx := context.WithValue(r.Context(), UserClaimName, userToken)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
