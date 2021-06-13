package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/sirupsen/logrus"
)

type HealthReport struct {
	status int
	errors map[string]string
}

func NewHealthErrors() *HealthReport {
	return &HealthReport{errors: map[string]string{}}
}

func (h Handler) HealthCheck() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		serviceErrors := NewHealthErrors()
		checkDBConnection(serviceErrors, h)

		if len(serviceErrors.errors) != 0 {
			serviceErrors.status = http.StatusInternalServerError
		} else {
			serviceErrors.status = http.StatusOK
		}

		w.WriteHeader(serviceErrors.status)
		err := json.NewEncoder(w).Encode(serviceErrors.errors)
		if err != nil {
			logrus.Error(err)
		}
	}
}

func checkDBConnection(hs *HealthReport, h Handler) {
	sr := h.Repo.ServiceRepo
	err := sr.HealthCheck()
	if err != nil {
		hs.errors["checkDBConnection"] = fmt.Sprintf("Checking DB connect failed: %s", err)
	}
}
