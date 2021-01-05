package dao

import (
	"context"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	log "github.com/sirupsen/logrus"
	"tomato-timer/server/helpers"
	"tomato-timer/server/models"
)

type Conn struct {
	DB *gorm.DB
}

const dialect = "postgres"

func ConnectDB() Conn {
	db, err := gorm.Open(dialect, helpers.GetConfig().URI)
	if err != nil {
		log.Fatalf("db connect error %s\n", err)
	}

	db.AutoMigrate(&models.User{})

	log.Infof("PG DB successfully connected \n", db)

	return Conn{DB: db}
}

func (conn Conn) CloseConn(ctx context.Context) {
	select {
	case <-ctx.Done():
		{
			conn.DB.Close()
			log.Printf("Connection to DB closed")
		}
	}
}
