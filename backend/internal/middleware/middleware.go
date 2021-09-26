package middleware

import (
	"tomato-timer/backend/config"
	dao "tomato-timer/backend/internal/repository"

	"gorm.io/gorm"
)

type middleware struct {
	Repo   dao.Repository
	DB     *gorm.DB
	Config config.APIServer
	MiddlewareContext string
}

func New (repo dao.Repository, db *gorm.DB, config config.APIServer, mc string) *middleware {
	return &middleware{
		Repo:   repo,
		DB:     db,
		Config: config,
		MiddlewareContext: mc,
	}
}
