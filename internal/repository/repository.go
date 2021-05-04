package repository

import (
	"context"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/sirupsen/logrus"
	log "github.com/sirupsen/logrus"
	"tomato-timer-server/config"
	"tomato-timer-server/internal/models"
)

func PGConnect(dbConfig config.DBConfig) (*gorm.DB, error) {
	db, err := gorm.Open("postgres", dbConfig.Uri)
	if err != nil {
		return db, err
	}

	db.AutoMigrate(&models.User{})

	log.Infof("PG DB successfully connected \n", db)

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
