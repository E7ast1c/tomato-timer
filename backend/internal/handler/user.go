package handler

import (
	"tomato-timer/backend/internal/auth"
	"tomato-timer/backend/internal/models"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

// GetUserSettings godoc
// @Summary get user settings
// @Accept  json
// @Produce  json
// @Success 200 {object} ResponseTemplate
// @Failure 400,404 {object} ResponseTemplate
// @Failure 500 {object} ResponseTemplate
// @Failure default {object} string
// @Router /auth/get-user-settings [get]
// @Security ApiKeyAuth
func (h *Handler) GetUserSettings(fCtx *fiber.Ctx) error {
	userTk := fCtx.Locals(h.ContextUser).(*models.UserToken)

	uSettings, err := h.Repo.UserRepo.GetUserDataByID(userTk.UserID)
	if err != nil {
		return fCtx.Status(fiber.StatusInternalServerError).
			JSON(Response("get user from db failed", err.Error()))
	}

	return fCtx.JSON(Response("user settings", map[string]interface{}{
		"settings": uSettings.TimerSettings,
	}))
}

// SetUserSetting godoc
// @Summary set custom user settings
// @Accept  json
// @Produce  json
// @Param DefaultDuration body models.UserTimerSettings true "User settings"
// @Success 200 {object} ResponseTemplate
// @Failure 400,404 {object} ResponseTemplate
// @Failure 500 {object} ResponseTemplate
// @Failure default {object} string
// @Router /auth/set-user-settings [post]
// @Security ApiKeyAuth
func (h *Handler) SetUserSetting(fCtx *fiber.Ctx) error {
		userTk := fCtx.Locals(h.ContextUser).(*models.UserToken)
		uSettings := models.UserTimerSettings{}
		if err := fCtx.BodyParser(&uSettings); err != nil {
			return fCtx.Status(fiber.StatusBadRequest).
				JSON(Response("error on login request", err.Error()))
		}

		err := h.Repo.UserRepo.SetUserDataByID(userTk.UserID, uSettings)
		if err != nil {
			return fCtx.Status(fiber.StatusInternalServerError).
				JSON(Response("set user settings db failed", err.Error()))
		}

		return fCtx.JSON(Response("user settings", map[string]interface{}{
			"settings": "successful updated",
		}))
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
	user := &models.UserMin{}
	if err := fCtx.BodyParser(user); err != nil {
		return fCtx.Status(fiber.StatusBadRequest).
			JSON(Response("error on login request", err.Error()))
	}

	if err := validator.New().Struct(user); err != nil {
		return err
	}

	pass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return fCtx.Status(fiber.StatusInternalServerError).
			JSON(Response("password encryption failed", err.Error()))
	}

	createdUser, err := h.Repo.UserRepo.CreateUser(&models.User{
		Name:          user.Name,
		Email:         user.Email,
		Password:      string(pass),
	})
	if err != nil {
		return fCtx.Status(fiber.StatusInternalServerError).
			JSON(Response("create user db record failed", err.Error()))
	}

	newAuth := auth.New(h.Repo, h.Config)
	token, tErr := newAuth.JWTCreate(createdUser)
	if tErr != nil {
		return fCtx.Status(fiber.StatusInternalServerError).
			JSON(Response("create user token failed", tErr.Error()))
	}

	return fCtx.JSON(Response("register successful", map[string]interface{}{
		"token": token,
		"user":  createdUser.SanitizeUserData()}))
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

	if err := validator.New().Struct(user); err != nil {
		return err
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

	newAuth := auth.New(h.Repo, h.Config)
	token, tErr := newAuth.JWTCreate(dbUser)
	if tErr != nil {
		return fCtx.Status(fiber.StatusInternalServerError).
			JSON(Response("jwt create failed", dbErr))
	}

	return fCtx.JSON(Response("login successful", map[string]interface{}{
		"token": token,
		"user":  dbUser.SanitizeUserData()}))
}
