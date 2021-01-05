package dao

import (
	"database/sql"
	"errors"
	"tomato-timer/server/models"
)

func (conn Conn) GetAllUsers() map[string]interface{} {
	res := conn.DB.Find(&[]models.User{})
	if res.Error != nil {
		return map[string]interface{}{"status": false}
	}

	return map[string]interface{}{"status": true, "users": res.Value}
}

func (conn Conn) GetUserByEmail(email string) (*models.User,error) {
	user := &models.User{}
	if err := conn.DB.Where("Email = ?", email).First(user).Error;
	errors.Is(err, sql.ErrNoRows) {
		return nil, errors.New("email address not found")
	} else if err != nil {
		return nil, err
	}

	return user, nil
}