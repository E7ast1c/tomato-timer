package repository

import (
	"tomato-timer/backend/internal/models"
)

type UserRepo interface {
	GetAllUsers() ([]models.User, error)
	GetUserDataByEmail(email string) (*models.User, error)
	GetUserDataByID(id uint) (*models.User, error)
	SetUserDataByID(id uint, settings models.UserTimerSettings) error
	CreateUser(user *models.User) (*models.User, error)
}

type ServiceRepo interface {
	HealthCheck() error
}

type Repository struct {
	UserRepo
	ServiceRepo
}
