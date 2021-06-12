package postgres

import (
	"database/sql"
	"errors"
	"gorm.io/gorm"
	models "tomato-timer-server/internal/models"
)

type UserPostgres struct {
	DB *gorm.DB
}

const TableUsers = "users"

func (up *UserPostgres) GetAllUsers() ([]models.User, error) {
	users := &[]models.User{}
	result := up.DB.Find(users)
	if result.Error != nil {
		return *users, result.Error
	}
	if errors.Is(result.Error, gorm.ErrRecordNotFound ){
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

func (up *UserPostgres) GetUserDataByID(userID uint) (*models.User, error) {
	user := &models.User{}
	if err := up.DB.Where("ID = ?", userID).First(user).Error;
		errors.Is(err, sql.ErrNoRows) {
		return nil, errors.New("email address not found")
	} else if err != nil {
		return nil, err
	}

	return user, nil
}

func (up *UserPostgres) SetUserDataByID(userID uint, settings models.UserTimerSettings) error {
	//	user := &models.User{}
	// settingMap := make(map[string]string, 10)
	if err := up.DB.Table(TableUsers).Where("ID = ?", userID).
		Updates(models.UserTimerSettings{
			DefaultDuration:    settings.DefaultDuration,
			LongBreakDuration:  settings.LongBreakDuration,
			ShortBreakDuration: settings.ShortBreakDuration,
			TickTrack:          settings.TickTrack,
			AlarmTrack:         settings.AlarmTrack,
		}).Error; err != nil {
		return err
	}
	return nil
}

func (up *UserPostgres) CreateUser(user *models.User) (*models.User, error) {
	err := up.DB.Where("Email = ?", user.Email).First(user).Error
	if err == nil {
		return nil, errors.New("user already exist")
	}

	if errors.Is(err, sql.ErrNoRows) {
		res := up.DB.Create(user)
		if res.Error != nil {
			return nil, res.Error
		}
		return user, nil
	} else {
		return nil, err
	}
}
