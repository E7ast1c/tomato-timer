package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

type HealthReport struct {
	status int
	errors map[string]string
}

func NewHealthErrors() *HealthReport {
	return &HealthReport{errors: map[string]string{}}
}

// HealthCheck godoc
// @Summary show a service health
// @Accept  json
// @Produce  json
// @Success 200 {object} HealthReport
// @Failure 400,404 {object} HealthReport
// @Failure 500 {object} HealthReport
// @Failure default {object} string
// @Router /health-check [get]
func (h *Handler) HealthCheck(fCtx *fiber.Ctx) error {
	serviceErrors := NewHealthErrors()
	checkDBConnection(serviceErrors, h)

	if len(serviceErrors.errors) != 0 {
		se, err := json.Marshal(serviceErrors.errors)
		if err != nil {
			return err
		}
		return fiber.NewError(http.StatusInternalServerError, string(se))
	}

	return fCtx.JSON(serviceErrors.errors)
}

// Version godoc
// @Summary show a service health
// @Accept  json
// @Produce  json
// @Success 200 {object} string
// @Failure 400,404 {object} HealthReport
// @Failure 500 {object} HealthReport
// @Failure default {object} string
// @Router /version [get]
func (h *Handler) Version(fCtx *fiber.Ctx) error {
	serviceErrors := NewHealthErrors()
	checkDBConnection(serviceErrors, h)

	if len(serviceErrors.errors) != 0 {
		se, err := json.Marshal(serviceErrors.errors)
		if err != nil {
			return err
		}
		return fiber.NewError(http.StatusInternalServerError, string(se))
	}

	return fCtx.JSON(serviceErrors.errors)
}

func checkDBConnection(hs *HealthReport, h *Handler) {
	db, err := h.DB.DB()
	if err != nil {
		hs.errors["checkDBConnection"] = fmt.Sprintf("Get DB connect failed: %s", err)
	}
	err = db.Ping()
	if err != nil {
		hs.errors["checkDBConnection"] = fmt.Sprintf("Checking DB ping failed: %s", err)
	}
}
