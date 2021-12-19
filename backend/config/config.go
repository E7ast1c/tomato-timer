package config

import (
	"tomato-timer/backend/pkg/env"
	"tomato-timer/backend/pkg/http"
)

type AppConfig struct {
	DBConfig    DBConfig
	APIServer   APIServer
	Version     string `env:"DB_URI"`
	Environment string `env:"ENV"`
}

type DBConfig struct {
	URI string `env:"DB_URI"`
}

type APIServer struct {
	Port       string `env:"API_PORT"`
	SignSecret string `env:"API_SIGN_SECRET"`
	OriginUrl  string `env:"API_ORIGIN_URL"`
}

func NewAppConfig() AppConfig {
	return AppConfig{
		DBConfig: DBConfig{URI: env.MustEnvString("DB_URI")},
		APIServer: APIServer{
			Port:       http.PortCombiner(env.MustEnvString("API_PORT")),
			SignSecret: env.MustEnvString("API_SIGN_SECRET"),
			OriginUrl: env.MustEnvString("API_ORIGIN_URL"),
		},
		Version:     "1.0.0",
		Environment: env.MustEnvString("ENV"),
	}
}
