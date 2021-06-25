package handler

import (
	"net/http"
	config "tomato-timer-server/config"
	dao "tomato-timer-server/internal/repository"
	"tomato-timer-server/pkg/exception"

	"gorm.io/gorm"
)

type Handler struct {
	Repo      dao.Repository
	DB        *gorm.DB
	Config    config.APIServer
	Exception func(writer http.ResponseWriter) *exception.ResponseException
}

func NewHandler(repo dao.Repository, db *gorm.DB, apiConfig config.APIServer) *Handler {
	return &Handler{Repo: repo, DB: db, Config: apiConfig}
}
