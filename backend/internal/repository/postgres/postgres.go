package postgres

import (
	"context"
	"log"
	"tomato-timer/backend/config"
	"tomato-timer/backend/internal/models"
	"tomato-timer/backend/internal/repository"

	"github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func NewPGRepository(db *gorm.DB) *repository.Repository {
	return &repository.Repository{UserRepo: &UserPostgres{DB: db}, ServiceRepo: &Service{DB: db}}
}

func PGConnect(dbConfig config.DBConfig) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(dbConfig.URI), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		return db, err
	}

	if mErr := db.AutoMigrate(&models.User{}); mErr != nil {
		return nil, mErr
	}

	logrus.Infof("PG DB successfully connected, with args %+v \n", db)

	return db, nil
}

func CloseConn(ctx context.Context, db *gorm.DB) {
	for range ctx.Done() {
		logrus.Warn("received done")
		pdb, err := db.DB()
		if err != nil {
			logrus.Errorf("error on closing conn, get DB  %s", err)
		}
		err = pdb.Close()
		if err != nil {
			logrus.Errorf("error on closing conn %s", err)
		}
		log.Printf("Connection to DB closed")
	}
}
