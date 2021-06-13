package models

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
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
func (user *User) NewUserResponseData() *UserResponseData {
	return &UserResponseData{
		Name:          user.Name,
		Email:         user.Email,
		TimerSettings: user.TimerSettings,
	}
}

type UserToken struct {
	UserID uint
	Name   string
	Email  string
	*jwt.StandardClaims
}
