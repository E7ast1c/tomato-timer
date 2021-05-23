package postgres

import (
	"context"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/sirupsen/logrus"
	"log"
	"tomato-timer-server/config"
	"tomato-timer-server/internal/models"
	"tomato-timer-server/internal/repository"
)

func NewPGRepository(DB *gorm.DB) *repository.Repository {
	return &repository.Repository{UserRepo: &UserPostgres{DB: DB}, ServiceRepo: &Service{DB: DB}}
}

func PGConnect(dbConfig config.DBConfig) (*gorm.DB, error) {
	db, err := gorm.Open("postgres", dbConfig.Uri)
	if err != nil {
		return db, err
	}

	db.AutoMigrate(&models.User{})

	logrus.Infof("PG DB successfully connected, with args %+v \n", db)

	return db, nil
}

func CloseConn(ctx context.Context, db *gorm.DB) {
	select {
	case <-ctx.Done():
		{
			err := db.Close()
			if err != nil {
				logrus.Errorf("error on closing conn %s", err)
			}
			log.Printf("Connection to DB closed")
		}
	}
}