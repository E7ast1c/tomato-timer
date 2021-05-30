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

func GetConfig() AppConfig {
	port := env.GetEnvString("PORT")
	signSecret := env.GetEnvString("SIGN_SECRET")
	uri := env.GetEnvString("DB_URI")

	return AppConfig{
		DBConfig:  DBConfig{Uri: uri},
		ApiServer: ApiServer{
			Port:       port,
			SignSecret: signSecret,
		},
	}
}