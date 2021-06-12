package handler

import (
	"net/http"
	config "tomato-timer-server/config"
	dao "tomato-timer-server/internal/repository"
	"tomato-timer-server/pkg/exception"
)

type Handler struct {
	Repo   dao.Repository
	Config config.ApiServer
	Exception func(writer http.ResponseWriter) *exception.ResponseException
}

func NewHandler(Repo dao.Repository, apiConfig config.ApiServer) *Handler {
	return &Handler{Repo: Repo, Config: apiConfig}
}