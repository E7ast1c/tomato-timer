package helpers

import (
	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"
	"log"
)

type config struct {
	URI string `env:"URI" envDefault:"host=5432 user=postgres dbname=postgres sslmode=disable password=12345"`
	PORT string `env:"PORT" envDefault:"8080"`
}

func GetConfig() config {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	var cfg config
	if err := env.Parse(&cfg); err != nil {
		log.Fatalf("parse env error %s\n", err)
	}
	log.Printf("read config values %+v \n", cfg)

	return cfg
}
