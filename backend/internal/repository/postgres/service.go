package postgres

import "github.com/jinzhu/gorm"

type Service struct {
	DB *gorm.DB
}

func (s *Service) HealthCheck() error {
	err := s.DB.DB().Ping(); if err != nil {
		return err
	}
	return nil
}
