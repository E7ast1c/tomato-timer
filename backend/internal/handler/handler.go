package handler

import (
	"tomato-timer/backend/config"
	dao "tomato-timer/backend/internal/repository"

	"gorm.io/gorm"
)

type Handler struct {
	Repo   dao.Repository
	DB     *gorm.DB
	Config config.APIServer
}

func NewHandler(repo dao.Repository, db *gorm.DB, apiConfig config.APIServer) *Handler {
	return &Handler{Repo: repo, DB: db, Config: apiConfig}
}

type ResponseTemplate struct {
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

func Response(message string, data interface{}) ResponseTemplate {
	return ResponseTemplate{
		Message: message,
		Data:    data,
	}
}
