package middleware

import (
	"context"
	"encoding/json"
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"strings"
	"tomato-timer-server/internal/models"
)

const headerTokenName = "x-access-token"

func (mw *middleware) JwtVerify(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		var header = r.Header.Get(headerTokenName) //Grab the token from the header

		header = strings.TrimSpace(header)

		if header == "" {
			//UserToken is missing, returns with error code 403 Unauthorized
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode(models.Exception{Message: "Missing auth token"})
			return
		}

		userToken := &models.UserToken{}
		parsedToken, err := jwt.ParseWithClaims(header, userToken, func(token *jwt.Token) (interface{}, error) {
			return []byte(mw.config.SignSecret), nil
		})

		if err != nil {
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode(models.Exception{Message: err.Error()})
			return
		}

		if !parsedToken.Valid {
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode(models.Exception{Message: "Invalid token"})
			return
		}

		ctx := context.WithValue(r.Context(), "user", userToken)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
