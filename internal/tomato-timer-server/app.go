package tomato_timer_server

import (
	"github.com/jinzhu/gorm"
	"net/http"
)

type App struct {
	httpServer *http.Server
	DB         *gorm.DB
}

func NewApp() *App  {
	return &App {
		httpServer: nil,
		DB:         nil,
	}
}