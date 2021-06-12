package postgres

import "gorm.io/gorm"

type Service struct {
	DB *gorm.DB
}

func (s *Service) HealthCheck() error {
	db, err := s.DB.DB()
	pErr := db.Ping(); if pErr != nil {
		return err
	}
	return nil
}
