package dao

import "tomato-timer/server/models"

func GetAllUsers() map[string]interface{} {
	res := db.Find(&[]models.User{})
	if res.Error != nil {
		return map[string]interface{}{"status": false}
	}

	return map[string]interface{}{"status": true, "users": res.Value}
}
