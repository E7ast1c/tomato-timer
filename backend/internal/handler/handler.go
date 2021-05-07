package handler

import (
	config "tomato-timer-server/config"
	dao "tomato-timer-server/internal/repository"
)

type Handler struct {
	Repo   dao.PGRepository
	Config config.ApiServer
}

func NewHandler(Repo dao.PGRepository, apiConfig config.ApiServer) *Handler {
	return &Handler{Repo: Repo, Config: apiConfig}
}