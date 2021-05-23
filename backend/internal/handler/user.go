package handler

import (
	"encoding/json"
	"errors"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	auth "tomato-timer-server/internal/auth"
	"tomato-timer-server/internal/models"
	"tomato-timer-server/pkg/exception"
)

type userPayload map[string]interface{}

func afterAuthorization(w http.ResponseWriter, up userPayload) {
	respException := exception.NewResponseException(w)
	err := json.NewEncoder(w).Encode(up)
	if err != nil {
		respException.ErrBadRequest(err, "encode user payload failed")
		return
	}
}

func (h Handler) GetUserSettings() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		auth := auth.NewAuth(h.Repo, h.Config)
		userToken := auth.JWTExtractData

		respException := exception.NewResponseException(w)

		user, err := h.Repo.UserRepo.GetUserDataByID(userToken(r).UserID)
		if err != nil {
			respException.ErrBadRequest(err, "can`t get user data")
			return
		}

		afterAuthorization(w, map[string]interface{}{"user": user.NewUserResponseData()})
	}
}

func (h Handler) RegisterUser() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user := &models.User{}
		respException := exception.NewResponseException(w)

		if r.ContentLength == 0 {
			respException.ErrBadRequest(errors.New("empty body"), "")
			return
		}

		err := json.NewDecoder(r.Body).Decode(user)
		if err != nil {
			respException.ErrBadRequest(err, "json unmarshall error")
			return
		}

		pass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			respException.ErrBadRequest(err, "password encryption failed")
			return
		}

		user.Password = string(pass)

		createdUser, err := h.Repo.UserRepo.CreateUser(user)
		if err != nil {
			respException.ErrBadRequest(err, "create user failed")
			return
		}

		auth := auth.NewAuth(h.Repo, h.Config)
		token, tErr := auth.JWTCreate(*createdUser)
		if tErr != nil {
			respException.ErrBadRequest(tErr, "jwt create")
			return
		}

		afterAuthorization(w, map[string]interface{}{
			"token": token,
			"user":  createdUser.NewUserResponseData()})
	}
}

func (h Handler) Login() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user := &models.User{}
		respException := exception.NewResponseException(w)

		err := json.NewDecoder(r.Body).Decode(user)
		if err != nil {
			respException.ErrBadRequest(err, "decode user")
			return
		}

		dbUser, dbErr := h.Repo.UserRepo.GetUserDataByEmail(user.Email)
		if dbErr != nil {
			respException.ErrBadRequest(dbErr, "db user")
			return
		}

		errf := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password))
		if errf != nil && errf == bcrypt.ErrMismatchedHashAndPassword {
			respException.ErrBadRequest(errf, "invalid login credentials")
			return
		}

		auth := auth.NewAuth(h.Repo, h.Config)
		token, tErr := auth.JWTCreate(*dbUser)
		if tErr != nil {
			respException.ErrBadRequest(tErr, "jwt create")
			return
		}

		afterAuthorization(w, map[string]interface{}{
			"token": token,
			"user":  dbUser.NewUserResponseData()})
	}
}
