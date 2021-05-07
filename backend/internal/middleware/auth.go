package middleware

import (
	"context"
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"strings"
	"tomato-timer-server/internal/models"
	"tomato-timer-server/pkg/exception"
)

const headerTokenName = "x-access-token"

func (mw *middleware) JwtVerify(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		var header = r.Header.Get(headerTokenName) //Grab the token from the header
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

		ctx := context.WithValue(r.Context(), "user", userToken)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
