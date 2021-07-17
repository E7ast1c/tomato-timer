package auth

import (
	"time"
	"tomato-timer/backend/config"
	"tomato-timer/backend/internal/models"
	dao "tomato-timer/backend/internal/repository"

	"github.com/dgrijalva/jwt-go"
)

type Auth struct {
	Repo   dao.Repository
	Config config.APIServer
}

func New(repo dao.Repository, apiConfig config.APIServer) *Auth {
	return &Auth{
		Repo:   repo,
		Config: apiConfig,
	}
}

const OneHour = time.Minute * 60

func (a *Auth) JWTCreate(user *models.User) (string, error) {
	tk := &models.UserToken{
		UserID: user.Model.ID,
		Name:   user.Name,
		Email:  user.Email,
		StandardClaims: &jwt.StandardClaims{
			ExpiresAt:  time.Now().Add(OneHour).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, tk)
	return token.SignedString([]byte(a.Config.SignSecret))
}