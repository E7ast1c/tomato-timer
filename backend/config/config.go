package config

import (
	"tomato-timer/backend/pkg/env"
	"tomato-timer/backend/pkg/http"
)

const (
	EnvDbUri         = "DB_URI"
	EnvApiPORT       = "API_PORT"
	EnvApiSignSecret = "API_SIGN_SECRET"
	EnvApiOriginUrl  = "API_ORIGIN_URL"
	EnvApiEnv        = "API_ENV"

	Version         = "APP_VERSION"
	DeployTimestamp = "DEPLOY_TIMESTAMP"
)

type AppConfig struct {
	DBConfig  DBConfig
	APIServer APIServer

	Version         string
	Environment     string
	DeployTimestamp string
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
		DBConfig: DBConfig{URI: env.MustEnvString(EnvDbUri)},
		APIServer: APIServer{
			Port:       http.PortCombiner(env.MustEnvString(EnvApiPORT)),
			SignSecret: env.MustEnvString(EnvApiSignSecret),
			OriginUrl:  env.MustEnvString(EnvApiOriginUrl),
		},
		Version:     Version,
		Environment: env.MustEnvString(EnvApiEnv),
		DeployTimestamp: DeployTimestamp,
	}
}
