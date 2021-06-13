package handler

import (
	"net/http"
	config "tomato-timer-server/config"
	dao "tomato-timer-server/internal/repository"
	"tomato-timer-server/pkg/exception"
)

type Handler struct {
	Repo      dao.Repository
	Config    config.APIServer
	Exception func(writer http.ResponseWriter) *exception.ResponseException
}

func NewHandler(repo dao.Repository, apiConfig config.APIServer) *Handler {
	return &Handler{Repo: repo, Config: apiConfig}
}
