package dao

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	log "github.com/sirupsen/logrus"
	"tomato-timer/server/helpers"
	"tomato-timer/server/models"
)

var db = ConnectDB()

func ConnectDB() *gorm.DB {
	dbcnfg := helpers.GetConfig().DBConfig

	dbURI := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s",
		dbcnfg.DBHost, dbcnfg.DBUser, dbcnfg.DBName, dbcnfg.DBPassword)

	db, err := gorm.Open("postgres", dbURI); if err != nil {
		log.Fatalf("db connect error %s\n", err)
	}

	db.AutoMigrate(
		&models.User{})

	log.Infof("PG DB successfully connected \n", db)
	return db
}