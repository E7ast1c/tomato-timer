package config

import (
	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"
	"log"
)

type AppConfig struct {
	DBConfig  DBConfig
	ApiServer ApiServer
}

type DBConfig struct {
	Uri string `env:"URI"`
}

type ApiServer struct {
	Port       string `env:"PORT"`
	SignSecret string `env:"SIGN_SECRET"`
}

func GetConfig() AppConfig {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error on loading .env file")
	}

	var cfg AppConfig
	if err := env.Parse(&cfg); err != nil {
		log.Fatalf("parse env error %s\n", err)
	}
	log.Printf("read AppConfig values = %+v \n", cfg)

	return cfg
}
