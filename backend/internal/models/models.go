package models

import (
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	Name          string `gorm:"type:varchar(100)"`
	Email         string `gorm:"type:varchar(100);unique_index"`
	Password      string `json:"Password"`
	TimerSettings UserTimerSettings
}

type UserTimerSettings struct {
	DefaultDuration      time.Duration
	LongBreakDuration  time.Duration
	ShortBreakDuration time.Duration
	TickTrack          string
	AlarmTrack         string
}

type UserResponseData struct {
	Name          string
	Email         string `gorm:"type:varchar(100);unique_index"`
	TimerSettings UserTimerSettings
}

// NewUserResponseData cleaning user sensitive data as password and etc
func (User *User) NewUserResponseData() *UserResponseData {
	return &UserResponseData{
		Name:          User.Name,
		Email:         User.Email,
		TimerSettings: User.TimerSettings,
	}
}

type UserToken struct {
	UserID uint
	Name   string
	Email  string
	*jwt.StandardClaims
}

