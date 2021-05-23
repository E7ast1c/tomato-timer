package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type HealthState struct {
	status int
	error []string
}

func (h Handler) HealthCheck() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		serviceErrors := &HealthState{}
		checkDBConnection(serviceErrors, h)

		if len(serviceErrors.error) > 0 {
			serviceErrors.status = http.StatusInternalServerError
		} else {
			serviceErrors.status = http.StatusOK
		}
		w.WriteHeader(serviceErrors.status)
		json.NewEncoder(w).Encode(serviceErrors)
	}
}

func checkDBConnection(hs *HealthState, h Handler) {
	sr := h.Repo.ServiceRepo
	err := sr.HealthCheck(); if err != nil {
		hs.error = append(hs.error, fmt.Sprintf("Checking DB connect: %s", err.Error()))
	}
}


