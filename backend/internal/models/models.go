package models

import (
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name          string            `gorm:"type:varchar(50)"`
	Email         string            `gorm:"type:varchar(320);unique_index;" validate:"required,email,min=4,max=32"`
	Password      string            `json:"Password" validate:"required,min=6,max=16"`
	TimerSettings UserTimerSettings `gorm:"embedded"`
}

type UserTimerSettings struct {
	DefaultDuration    int16  `gorm:"type:smallint;default:25"`
	LongBreakDuration  int16  `gorm:"type:smallint;default:15"`
	ShortBreakDuration int16  `gorm:"type:smallint;default:5"`
	TickTrack          string `gorm:"type:varchar(50)"`
	AlarmTrack         string `gorm:"type:varchar(50)"`
}

type UserMin struct {
	Name     string `json:"Name" validate:"required,min=4,max=16"`
	Email    string `json:"Email" validate:"required,email,min=6,max=32"`
	Password string `json:"Password" validate:"required,min=6,max=16"`
}

type UserResponseData struct {
	Name          string
	Email         string `gorm:"type:varchar(100);unique_index"`
	TimerSettings UserTimerSettings
}

// SanitizeUserData cleaning user sensitive data as password and etc
func (user *User) SanitizeUserData() *UserResponseData {
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
