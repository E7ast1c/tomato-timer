package repository

import (
	"github.com/jinzhu/gorm"
	models "tomato-timer-server/internal/models"
)

type PGRepository struct {
	UserOperations
}

func NewPGRepository(DB *gorm.DB) *PGRepository {
	return &PGRepository{UserOperations: &UserPostgres{DB: DB}}
}

type UserOperations interface {
	GetAllUsers() ([]models.User, error)
	GetUserDataByEmail(email string) (*models.User,error)
	GetUserDataByID(id uint) (*models.User, error)
	SetUserDataByID(user *models.User) error
	CreateUser(user *models.User) (*models.User, error)
}