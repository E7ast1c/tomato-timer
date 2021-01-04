package models

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"time"
)

type User struct {
	gorm.Model
	Name               string
	Email              string `gorm:"type:varchar(100);unique_index"`
	Password           string `json:"Password"`
	DefaultDuration    time.Duration
	LongBreakDuration  time.Duration
	ShortBreakDuration time.Duration
	TickTrack          string
	AlarmTrack         string
}

type Token struct {
	UserID uint
	Name   string
	Email  string
	*jwt.StandardClaims
}

type Exception struct {
	Message string `json:"message"`
}
