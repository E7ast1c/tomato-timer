package auth

import (
	"context"
	"encoding/json"
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"strings"
	"time"
	"tomato-timer-server/config"
	"tomato-timer-server/internal/models"
	dao "tomato-timer-server/internal/repository"
)

const headerTokenName = "x-access-token"

type Auth struct {
	Repo   dao.PGRepository
	Config config.ApiServer
}
func NewAuth(Repo dao.PGRepository, apiConfig config.ApiServer) *Auth {
	return &Auth{
		Repo:   Repo,
		Config: apiConfig,
	}
}

//func NewAuth(repo dao.PGRepository, config config.ApiServer) *Auth {
//	return &Auth{Repo: repo, Config: config}
//}

func (a *Auth) JwtVerify(next http.Handler) http.Handler {
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
			return []byte(a.Config.SignSecret), nil
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

func (a *Auth) JWTExtractData(r *http.Request) *models.UserToken {
	ctxUserValue := r.Context().Value("user")
	userToken := ctxUserValue.(*models.UserToken)
	//userToken := context.WithValue(r.Context(), "user", ctxUserValue).Value()
	return userToken
}

func (a *Auth) JWTCreate(user models.User) (string, error) {
	expiresAt := time.Now().Add(time.Minute * 10000).Unix()
	tk := &models.UserToken{
		UserID: user.Model.ID,
		Name:   user.Name,
		Email:  user.Email,
		StandardClaims: &jwt.StandardClaims{
			ExpiresAt: expiresAt,
		},
	}

	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	return token.SignedString([]byte(a.Config.SignSecret))
}
