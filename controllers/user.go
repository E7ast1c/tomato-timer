package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"
	"tomato-timer/server/dao"
	"tomato-timer/server/models"
)

type ErrorResponse struct {
	Err string
}

type error interface {
	Error() string
}

func AfterAuthorization(w http.ResponseWriter, r *http.Request)  {
	w.Write([]byte("Not Implemented"))
}

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(fmt.Sprintf("All Ok %v", time.Now())))
}

func CreateUser(conn dao.Conn) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		user := &models.User{}
		json.NewDecoder(r.Body).Decode(user)

		pass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			fmt.Println(err)
			err := ErrorResponse{
				Err: "Password Encryption  failed",
			}
			json.NewEncoder(w).Encode(err)
		}

		user.Password = string(pass)

		createdUser := conn.DB.Create(user)
		var errMessage = createdUser.Error

		if createdUser.Error != nil {
			fmt.Println(errMessage)
		}
		json.NewEncoder(w).Encode(createdUser)
	}
}

func Login(conn dao.Conn) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user := &models.User{}
		err := json.NewDecoder(r.Body).Decode(user)
		if err != nil {
			var resp = map[string]interface{}{"status": false, "message": "Invalid request"}
			json.NewEncoder(w).Encode(resp)
			return
		}
		resp := FindOne(conn, user.Email, user.Password)
		json.NewEncoder(w).Encode(resp)
	}
}


func FindOne(conn dao.Conn ,email, password string) map[string]interface{} {
	user, err := conn.GetUserByEmail(email)
	if err != nil {
		return map[string]interface{}{"status": false, "message": err}
	}

	expiresAt := time.Now().Add(time.Minute * 10000).Unix()

	errf := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if errf != nil && errf == bcrypt.ErrMismatchedHashAndPassword {
		var resp = map[string]interface{}{"status": false, "message": "Invalid login credentials. Please try again"}
		return resp
	}

	tk := &models.Token{
		UserID: user.ID,
		Name:   user.Name,
		Email:  user.Email,
		StandardClaims: &jwt.StandardClaims{
			ExpiresAt: expiresAt,
		},
	}

	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)

	tokenString, error := token.SignedString([]byte("secret"))
	if error != nil {
		fmt.Println(error)
	}

	var resp = map[string]interface{}{"status": false, "message": "logged in"}
	resp["token"] = tokenString
	resp["user"] = user
	return resp
}

func FetchUsers(conn dao.Conn) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		res := conn.GetAllUsers()
		if err := json.NewEncoder(w).Encode(res); err != nil {
			log.Errorf("FetchUsers error = %v", err)
		}
	}
}