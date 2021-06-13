package auth

import (
	"net/http"
	"time"
	"tomato-timer-server/config"
	"tomato-timer-server/internal/middleware"
	"tomato-timer-server/internal/models"
	dao "tomato-timer-server/internal/repository"

	"github.com/dgrijalva/jwt-go"
)

type Auth struct {
	Repo   dao.Repository
	Config config.APIServer
}

func NewAuth(repo dao.Repository, apiConfig config.APIServer) *Auth {
	return &Auth{
		Repo:   repo,
		Config: apiConfig,
	}
}

const OneHour = time.Minute * 60

func (a *Auth) JWTExtractData(r *http.Request) *models.UserToken {
	ctxUserValue := r.Context().Value(middleware.UserClaimName)
	userToken := ctxUserValue.(*models.UserToken)
	return userToken
}

func (a *Auth) JWTCreate(user *models.User) (string, error) {
	expiresAt := time.Now().Add(OneHour).Unix()
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
