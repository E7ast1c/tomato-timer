package config

import (
	"tomato-timer/backend/pkg/env"
	"tomato-timer/backend/pkg/http"
)

const (
	EnvDBURI = "DB_URI"
)

type AppConfig struct {
	DBConfig  DBConfig
	APIServer APIServer

	Version     string
	Environment string
}

type DBConfig struct {
	URI string
}

type APIServer struct {
	Port       string
	SignSecret string
	OriginUrl  string
}

func NewAppConfig() AppConfig {
	return AppConfig{
		DBConfig: DBConfig{URI: env.MustEnvString("DB_URI")},
		APIServer: APIServer{
			Port:       http.PortCombiner(env.MustEnvString("API_PORT")),
			SignSecret: env.MustEnvString("API_SIGN_SECRET"),
			OriginUrl:  env.MustEnvString("API_ORIGIN_URL"),
		},
		Version:     "1.0.0",
		Environment: env.MustEnvString("API_ENV"),
	}
}
