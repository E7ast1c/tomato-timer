package handler

import (
	"encoding/json"
	"fmt"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"
	auth "tomato-timer-server/internal/auth"
	"tomato-timer-server/internal/models"
)


type ErrorResponse struct {
	Err string
}

//type error interface {
//	Error() string
//}
//
//func AfterAuthorization(w http.ResponseWriter, r *http.Request)  {
//	w.Write([]byte("Not Implemented"))
//}
//

func (h Handler) HealthCheck(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(fmt.Sprintf("Ready to fight %v", time.Now())))
}

func (h Handler) GetUserSettings() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		auth := auth.NewAuth(h.Repo, h.Config)
		userToken := auth.JWTExtractData
		userFromToken := userToken(r)

		user, err := h.Repo.UserOperations.GetUserDataByID(userFromToken.UserID)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			var resp = map[string]interface{}{"status": false, "message": "Can`t get user data"}
			json.NewEncoder(w).Encode(resp)
			return
		}

		var resp = map[string]interface{}{"status": false, "message": "logged in"}
		resp["user"] = user.NewUserResponseData()
		json.NewEncoder(w).Encode(resp)
	}
}

func (h Handler) CreateUser() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		user := &models.User{}
		if r.ContentLength == 0 {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(models.Exception{Message: "empty body"})
			return
		}

		err := json.NewDecoder(r.Body).Decode(user)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(models.Exception{Message: "json unmarshall error"})
			return
		}

		pass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			fmt.Println(err)
			err := ErrorResponse{
				Err: "Password Encryption  failed",
			}
			json.NewEncoder(w).Encode(err)
		}

		user.Password = string(pass)

		createdUser, err := h.Repo.UserOperations.CreateUser(user)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(models.Exception{Message: err.Error()})
			return
		}

		err = json.NewEncoder(w).Encode(createdUser)
		if err != nil {
			logrus.Infof("json Encoding error = %s", err)
		}
	}
}

func (h Handler) Login() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user := &models.User{}
		err := json.NewDecoder(r.Body).Decode(user)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			var resp = map[string]interface{}{"status": false, "message": "Invalid request"}
			json.NewEncoder(w).Encode(resp)
			return
		}

		dbUser, dbErr := h.Repo.UserOperations.GetUserDataByEmail(user.Email)
		if dbErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			resp := map[string]interface{}{"status": false, "message": dbErr}
			json.NewEncoder(w).Encode(resp)
			return
		}

		errf := bcrypt.CompareHashAndPassword([]byte(dbUser.Password),[]byte(user.Password))
		if errf != nil && errf == bcrypt.ErrMismatchedHashAndPassword {
			w.WriteHeader(http.StatusBadRequest)
			var resp = map[string]interface{}{"status": false, "message": "Invalid login credentials. Please try again"}
			json.NewEncoder(w).Encode(resp)
			return
		}

		auth := auth.NewAuth(h.Repo, h.Config)
		token, tErr := auth.JWTCreate(*dbUser)
		if dbErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			resp := map[string]interface{}{"status": false, "message": tErr}
			json.NewEncoder(w).Encode(resp)

			return
		}

		var resp = map[string]interface{}{"status": false, "message": "logged in"}
		resp["token"] = token
		resp["user"] = user.NewUserResponseData()
		err = json.NewEncoder(w).Encode(resp)
		if err != nil {
			logrus.Infof("json Encoding error = %s", err)
		}
	}
}

func errorWrapper() {

}