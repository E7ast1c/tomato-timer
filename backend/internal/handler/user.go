package handler

import (
	"encoding/json"
	"net/http"
	"tomato-timer/backend/internal/auth"
	"tomato-timer/backend/internal/models"
	"tomato-timer/backend/pkg/exception"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

type userPayload map[string]interface{}

// afterAuthorization response wrapper
func afterAuthorization(w http.ResponseWriter, up userPayload) {
	err := json.NewEncoder(w).Encode(up)
	if err != nil {
		exception.ErrBadRequest(w, err, "encode user payload failed")
		return
	}
}

func (h *Handler) GetUserSettings() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		newAuth := auth.NewAuth(h.Repo, h.Config)
		userToken := newAuth.JWTExtractData

		user, err := h.Repo.UserRepo.GetUserDataByID(userToken(r).UserID)
		if err != nil {
			exception.ErrBadRequest(w, err, "get user data failed")
			return
		}

		afterAuthorization(w, map[string]interface{}{"ok": user.NewUserResponseData()})
	}
}

func (h *Handler) SetUserSetting() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		newAuth := auth.NewAuth(h.Repo, h.Config)
		userToken := newAuth.JWTExtractData

		userSettings := &models.UserTimerSettings{}
		err := json.NewDecoder(r.Body).Decode(userSettings)
		if err != nil {
			exception.ErrBadRequest(w, err, "decode user")
			return
		}

		err = h.Repo.UserRepo.SetUserDataByID(userToken(r).UserID, *userSettings)
		if err != nil {
			exception.ErrBadRequest(w, err, "set user data failed")
			return
		}

		afterAuthorization(w, map[string]interface{}{"ok": "set"})
	}
}

// RegisterUser godoc
// @Summary register new user
// @Accept  json
// @Produce  json
// max email length (rfc3696) 320 characters"
// @Param Email body models.UserMin true "User credentials"
// @Success 200 {object} ResponseTemplate
// @Failure 400,404 {object} ResponseTemplate
// @Failure 500 {object} ResponseTemplate
// @Failure default {object} string
// @Router /register [post]
func (h *Handler) RegisterUser(fCtx *fiber.Ctx) error {
	user := &models.User{}

	if err := fCtx.BodyParser(user); err != nil {
		return fCtx.Status(fiber.StatusBadRequest).
			JSON(Response("error on login request", err.Error()))
	}

	pass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return fCtx.Status(fiber.StatusInternalServerError).
			JSON(Response("password encryption failed", err.Error()))
	}

	user.Password = string(pass)

	createdUser, err := h.Repo.UserRepo.CreateUser(user)
	if err != nil {
		return fCtx.Status(fiber.StatusInternalServerError).
			JSON(Response("create user db record failed", err.Error()))
	}

	newAuth := auth.NewAuth(h.Repo, h.Config)
	token, tErr := newAuth.JWTCreate(createdUser)
	if tErr != nil {
		return fCtx.Status(fiber.StatusInternalServerError).
			JSON(Response("create user token failed", tErr.Error()))
	}

	return fCtx.JSON(Response("register successful", map[string]interface{}{
		"token": token,
		"user":  createdUser.NewUserResponseData()}))
}

// Login godoc
// @Summary user login
// @Accept  json
// @Produce  json
// max email length (rfc3696) 320 characters"
// @Param Email body models.UserMin true "User credentials"
// @Success 200 {object} ResponseTemplate
// @Failure 400,404 {object} ResponseTemplate
// @Failure 500 {object} ResponseTemplate
// @Failure default {object} string
// @Router /login [post]
func (h *Handler) Login(fCtx *fiber.Ctx) error {
	user := &models.User{}

	if err := fCtx.BodyParser(user); err != nil {
		return fCtx.Status(fiber.StatusBadRequest).
			JSON(Response("decode user failed", err.Error()))
	}

	dbUser, dbErr := h.Repo.UserRepo.GetUserDataByEmail(user.Email)
	if dbErr != nil {
		return fCtx.Status(fiber.StatusBadRequest).
			JSON(Response("db user get failed", dbErr.Error()))
	}

	cryptErr := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password))
	if cryptErr != nil && cryptErr == bcrypt.ErrMismatchedHashAndPassword {
		return fCtx.Status(fiber.StatusBadRequest).
			JSON(Response("invalid login credentials", dbErr))
	}

	newAuth := auth.NewAuth(h.Repo, h.Config)
	token, tErr := newAuth.JWTCreate(dbUser)
	if tErr != nil {
		return fCtx.Status(fiber.StatusInternalServerError).
			JSON(Response("jwt create failed", dbErr))
	}

	return fCtx.JSON(Response("login successful", map[string]interface{}{
		"token": token,
		"user":  dbUser.NewUserResponseData()}))
}
