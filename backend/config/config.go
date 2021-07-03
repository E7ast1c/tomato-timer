package config

import "tomato-timer/backend/pkg/env"

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

const (
	defaultPort       = ":8080"
	defaultSignSecret = "secret"
	defaultURI        = "localhost"
)

func NewAPIConfig() AppConfig {
	port := env.GetEnvString("PORT", defaultPort)
	signSecret := env.GetEnvString("SIGN_SECRET", defaultSignSecret)
	uri := env.GetEnvString("DB_URI", defaultURI)

	return AppConfig{
		DBConfig: DBConfig{URI: uri},
		APIServer: APIServer{
			Port:       port,
			SignSecret: signSecret,
		},
	}
}
