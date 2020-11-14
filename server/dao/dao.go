package dao

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
	"tomato-timer/server/helpers"
	"tomato-timer/server/models"
)

func ConnectDB() *gorm.DB {
	dbcnfg := helpers.GetConfig().DBConfig

	dbURI := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s",
		dbcnfg.DBHost, dbcnfg.DBUser, dbcnfg.DBName, dbcnfg.DBPassword)

	db, err := gorm.Open("postgres", dbURI); if err != nil {
		log.Fatalf("db connect error %s\n", err)
	}

	// defer db.Close()

	db.AutoMigrate(
		&models.User{})

	fmt.Println("PG DB successfully connected \n", db)
	return db
}