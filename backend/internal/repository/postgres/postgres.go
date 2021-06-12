package postgres

import (
	"context"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"tomato-timer-server/config"
	"tomato-timer-server/internal/models"
	"tomato-timer-server/internal/repository"
)

func NewPGRepository(DB *gorm.DB) *repository.Repository {
	return &repository.Repository{UserRepo: &UserPostgres{DB: DB}, ServiceRepo: &Service{DB: DB}}
}

func PGConnect(dbConfig config.DBConfig) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(dbConfig.Uri), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
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
}