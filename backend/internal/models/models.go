package models

import (
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	Name          string            `gorm:"type:varchar(100)"`
	Email         string            `gorm:"type:varchar(100);unique_index"`
	Password      string            `json:"Password"`
	TimerSettings UserTimerSettings `gorm:"embedded"`
}

type UserTimerSettings struct {
	DefaultDuration    time.Duration `gorm:"type:bigint"`
	LongBreakDuration  time.Duration `gorm:"type:bigint"`
	ShortBreakDuration time.Duration `gorm:"type:bigint"`
	TickTrack          string        `gorm:"type:text"`
	AlarmTrack         string        `gorm:"type:text"`
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
