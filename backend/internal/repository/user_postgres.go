package repository

import (
	"database/sql"
	"errors"
	"github.com/jinzhu/gorm"
	models "tomato-timer-server/internal/models"
)

type UserPostgres struct {
	DB *gorm.DB
}

func (up *UserPostgres) GetAllUsers() ([]models.User, error) {
	users := &[]models.User{}
	result := up.DB.Find(users)
	if result.Error != nil {
		return *users, result.Error
	}
	if result.RecordNotFound() {
		return *users, sql.ErrNoRows
	}
	return *users, nil
}

func (up *UserPostgres) GetUserDataByEmail(email string) (*models.User, error) {
	user := &models.User{}
	if err := up.DB.Where("Email = ?", email).First(user).Error;
		errors.Is(err, sql.ErrNoRows) {
		return nil, errors.New("email address not found")
	} else if err != nil {
		return nil, err
	}

	return user, nil
}

func (up *UserPostgres) GetUserDataByID(id uint) (*models.User, error) {
	user := &models.User{}
	if err := up.DB.Where("ID = ?", id).First(user).Error;
		errors.Is(err, sql.ErrNoRows) {
		return nil, errors.New("email address not found")
	} else if err != nil {
		return nil, err
	}

	return user, nil
}

func (up *UserPostgres) SetUserDataByID(user *models.User) error {
	return nil
}

func (up *UserPostgres) CreateUser(user *models.User) (*models.User, error) {
	res := up.DB.Create(user)
	if res.Error != nil {
		return nil, res.Error
	}
	return res.Value.(*models.User), nil
}
