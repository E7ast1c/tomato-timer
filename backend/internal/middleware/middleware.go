package middleware

import "tomato-timer-server/config"

type middleware struct {
	config config.ApiServer
}

func NewMiddleware(config config.ApiServer) *middleware {
	return &middleware{config: config}
}

