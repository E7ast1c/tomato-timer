package tomatotimer

import (
	"net/http"

	"gorm.io/gorm"
)

type App struct {
	httpServer *http.Server
	DB         *gorm.DB
}

func NewApp() *App {
	return &App{
		httpServer: nil,
		DB:         nil,
	}
}
