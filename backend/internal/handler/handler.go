package handler

import (
	"tomato-timer/backend/config"
	dao "tomato-timer/backend/internal/repository"

	"gorm.io/gorm"
)

type Handler struct {
	Repo   dao.Repository
	DB     *gorm.DB
	Config config.AppConfig
	Options
}

func NewHandler(repo dao.Repository, db *gorm.DB,
	apiConfig config.AppConfig, opt *Options) *Handler {

	if opt == nil {
		opt = new(Options)
		opt.ContextUser = "user-context"
	}
	return &Handler{Repo: repo, DB: db, Config: apiConfig, Options: *opt}
}

type Options struct {
	ContextUser string
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
