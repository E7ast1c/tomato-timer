package config

import (
	env "tomato-timer-server/pkg/env"
)

type AppConfig struct {
	DBConfig  DBConfig
	ApiServer ApiServer
}

type DBConfig struct {
	Uri string `env:"DB_URI"`
}

type ApiServer struct {
	Port       string `env:"PORT"`
	SignSecret string `env:"SIGN_SECRET"`
}

const (
	defaultPort       = ":8080"
	defaultSignSecret = "secret"
	defaultUri        = "localhost"
)

func NewApiConfig() AppConfig {
	port := env.GetEnvString("PORT", defaultPort)
	signSecret := env.GetEnvString("SIGN_SECRET", defaultSignSecret)
	uri := env.GetEnvString("DB_URI", defaultUri)

	return AppConfig{
		DBConfig: DBConfig{Uri: uri},
		ApiServer: ApiServer{
			Port:       port,
			SignSecret: signSecret,
		},
	}
}
