package handler

import (
	"io"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
	"tomato-timer/backend/config"
	"tomato-timer/backend/internal/repository/postgres"
	"tomato-timer/backend/test"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	gpostgres "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func TestHealthCheck(t *testing.T) {
	t.Run("Ok", func(t *testing.T) {
		// Arrange
		assert := assert.New(t)
		testStruct := test.NewHandlerStruct("", "","/health-check",
			false, http.StatusOK, "{}")
		mockHandler, _, err := newMockHandler()
		if err != nil {
			assert.Fail("newMockHandler error = %s\n", err)
		}
		fiberGet := newFiberGet(testStruct.Route, mockHandler.HealthCheck)

		// ACT
		req := httptest.NewRequest("GET", testStruct.Route, nil)
		resp, _ := fiberGet.Test(req)

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			t.Fatal(err)
		}
		defer func(Body io.ReadCloser) {
			err = Body.Close()
			if err != nil {
				assert.Fail("error body resp close", err)
			}
		}(resp.Body)

		// ASSERT
		assert.Equal(testStruct.ExpectedBody, string(body))
		assert.Equal(testStruct.ExpectedCode, resp.StatusCode)
		assert.Nil(err)
	})
	t.Run("DB Closed Server error", func(t *testing.T) {
		// Arrange
		assert := assert.New(t)
		testStruct := test.NewHandlerStruct("", "","/health-check",
			false, http.StatusInternalServerError, "{\"checkDBConnection\":\"Checking DB ping failed: sql: database is closed\"}")
		mockHandler, _, err := newMockHandler()
		if err != nil {
			assert.Fail("newMockHandler error = %s\n", err)
		}
		fiberGet := newFiberGet(testStruct.Route, mockHandler.HealthCheck)

		// ACT
		db, err := mockHandler.DB.DB()
		if err != nil {
			assert.Fail("mock db fail", err)
		}
		_ = db.Close()

		req := httptest.NewRequest("GET", testStruct.Route, nil)
		resp, _ := fiberGet.Test(req)

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			t.Fatal(err)
		}
		defer func(Body io.ReadCloser) {
			err = Body.Close()
			if err != nil {
				assert.Fail("error body resp close", err)
			}
		}(resp.Body)

		// ASSERT
		assert.Equal(testStruct.ExpectedBody, string(body))
		assert.Equal(testStruct.ExpectedCode, resp.StatusCode)
		assert.Nil(err)
	})
}

func newMockHandler() (*Handler, *gorm.DB, error) {
	db, _, err := sqlmock.New()
	if err != nil {
		return nil, nil, err
	}

	gdb, gErr := gorm.Open(gpostgres.New(gpostgres.Config{
		Conn: db,
	}), &gorm.Config{})
	if gErr != nil {
		return nil, nil, err
	}

	repo := postgres.NewPGRepository(gdb)
	apiConfig := config.NewAppConfig()

	return NewHandler(*repo, gdb, apiConfig.APIServer), gdb, nil
}

func newFiberGet(path string, handler fiber.Handler) *fiber.App {
	fc := fiber.New()
	fc.Get(path, handler)
	return fc
}