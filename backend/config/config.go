package config

import (
	"tomato-timer/backend/pkg/env"
	"tomato-timer/backend/pkg/http"
)

type AppConfig struct {
	DBConfig  DBConfig
	APIServer APIServer
}

type DBConfig struct {
	URI string `env:"DB_URI"`
}

type APIServer struct {
	Port       string `env:"PORT"`
	SignSecret string `env:"SIGN_SECRET"`
}

func NewAppConfig() AppConfig {
	return AppConfig{
		DBConfig: DBConfig{URI: env.MustEnvString("DB_URI")},
		APIServer: APIServer{
			Port:       http.PortCombiner(env.MustEnvString("PORT")),
			SignSecret: env.MustEnvString("SIGN_SECRET"),
		},
	}
}
