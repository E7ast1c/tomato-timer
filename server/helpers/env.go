package helpers

import (
	"fmt"
	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"
	"log"
)

type dbconfig struct {
	DBName     string `env:"DBNAME" envDefault:"postgres"`
	DBPassword string `env:"DBPASSWORD" envDefault:"qwerty"`
	DBUser     string `env:"DBUSER" envDefault:"postgres"`
	DBType     string `env:"DBTYPE" envDefault:"postgres"`
	DBHost     string `env:"DBHOST" envDefault:"localhost"`
	DBPort     string `env:"DBPORT" envDefault:"5434"`
}

type config struct {
	PORT     string `env:"port" envDefault:"8080"`
	DBConfig dbconfig
}

func GetConfig() config {
	e := godotenv.Load(); if e != nil {
		log.Fatal("Error loading .env file")
	}

	var cfg config
	if err := env.Parse(&cfg); err != nil {
		fmt.Println("failed:", err)
	}
	fmt.Printf("read config values %+v \n", cfg)

	return cfg
}