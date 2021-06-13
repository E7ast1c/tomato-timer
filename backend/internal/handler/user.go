package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	auth "tomato-timer-server/internal/auth"
	"tomato-timer-server/internal/models"
	"tomato-timer-server/pkg/exception"

	"golang.org/x/crypto/bcrypt"
)

type userPayload map[string]interface{}

// afterAuthorization response wrapper
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
		newAuth := auth.NewAuth(h.Repo, h.Config)
		userToken := newAuth.JWTExtractData

		user, err := h.Repo.UserRepo.GetUserDataByID(userToken(r).UserID)
		if err != nil {
			h.Exception(w).ErrBadRequest(err, "get user data failed")
			return
		}

		afterAuthorization(w, map[string]interface{}{"ok": user.NewUserResponseData()})
	}
}

func (h Handler) SetUserSetting() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		newAuth := auth.NewAuth(h.Repo, h.Config)
		userToken := newAuth.JWTExtractData

		userSettings := &models.UserTimerSettings{}
		err := json.NewDecoder(r.Body).Decode(userSettings)
		if err != nil {
			h.Exception(w).ErrBadRequest(err, "decode user")
			return
		}

		err = h.Repo.UserRepo.SetUserDataByID(userToken(r).UserID, *userSettings)
		if err != nil {
			h.Exception(w).ErrBadRequest(err, "set user data failed")
			return
		}

		afterAuthorization(w, map[string]interface{}{"ok": "set"})
	}
}

func (h Handler) RegisterUser() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user := &models.User{}

		if r.ContentLength == 0 {
			h.Exception(w).ErrBadRequest(errors.New("empty body"), "")
			return
		}

		err := json.NewDecoder(r.Body).Decode(user)
		if err != nil {
			h.Exception(w).ErrBadRequest(err, "json unmarshall error")
			return
		}

		pass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			h.Exception(w).ErrBadRequest(err, "password encryption failed")
			return
		}

		user.Password = string(pass)

		createdUser, err := h.Repo.UserRepo.CreateUser(user)
		if err != nil {
			h.Exception(w).ErrBadRequest(err, "create user failed")
			return
		}

		newAuth := auth.NewAuth(h.Repo, h.Config)
		token, tErr := newAuth.JWTCreate(createdUser)
		if tErr != nil {
			h.Exception(w).ErrBadRequest(tErr, "jwt create")
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

		err := json.NewDecoder(r.Body).Decode(user)
		if err != nil {
			h.Exception(w).ErrBadRequest(err, "decode user")
			return
		}

		dbUser, dbErr := h.Repo.UserRepo.GetUserDataByEmail(user.Email)
		if dbErr != nil {
			h.Exception(w).ErrBadRequest(dbErr, "db user")
			return
		}

		cryptErr := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password))
		if cryptErr != nil && cryptErr == bcrypt.ErrMismatchedHashAndPassword {
			h.Exception(w).ErrBadRequest(cryptErr, "invalid login credentials")
			return
		}

		newAuth := auth.NewAuth(h.Repo, h.Config)
		token, tErr := newAuth.JWTCreate(dbUser)
		if tErr != nil {
			h.Exception(w).ErrBadRequest(tErr, "jwt create")
			return
		}

		afterAuthorization(w, map[string]interface{}{
			"token": token,
			"user":  dbUser.NewUserResponseData()})
	}
}
