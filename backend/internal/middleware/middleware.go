package middleware

import (
	"tomato-timer/backend/internal/handler"
)

type middleware struct {
	handler.Handler
}

func New(h *handler.Handler) *middleware {
	return &middleware{*h}
}
