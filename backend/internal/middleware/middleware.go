package middleware

import "tomato-timer-server/config"

type middleware struct {
	config config.APIServer
}

func NewMiddleware(argConfig config.APIServer) *middleware {
	return &middleware{config: argConfig}
}

type userClaim string

var UserClaimName userClaim = "user"
