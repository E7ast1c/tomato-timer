package auth

import (
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"time"
	"tomato-timer-server/config"
	"tomato-timer-server/internal/models"
	dao "tomato-timer-server/internal/repository"
)

type Auth struct {
	Repo   dao.Repository
	Config config.ApiServer
}

func NewAuth(Repo dao.Repository, apiConfig config.ApiServer) *Auth {
	return &Auth{
		Repo:   Repo,
		Config: apiConfig,
	}
}

func (a *Auth) JWTExtractData(r *http.Request) *models.UserToken {
	ctxUserValue := r.Context().Value("user")
	userToken := ctxUserValue.(*models.UserToken)
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
