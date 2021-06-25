package handler

import (
	config "tomato-timer-server/config"
	dao "tomato-timer-server/internal/repository"

	"gorm.io/gorm"
)

type Handler struct {
	Repo      dao.Repository
	DB        *gorm.DB
	Config    config.APIServer
}

func NewHandler(repo dao.Repository, db *gorm.DB, apiConfig config.APIServer) *Handler {
	return &Handler{Repo: repo, DB: db, Config: apiConfig}
}
