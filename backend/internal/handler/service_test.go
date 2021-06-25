package handler

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
	"tomato-timer-server/config"
	"tomato-timer-server/internal/repository/postgres"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
	gpostgres "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

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
	apiConfig := config.NewAPIConfig()

	return NewHandler(*repo, gdb, apiConfig.APIServer), gdb, nil
}

func TestHealthCheck(t *testing.T) {
	a := assert.New(t)
	t.Run("Ok", func(t *testing.T) {
		h, _, err := newMockHandler()
		if err != nil {
			a.Fail("newMockHandler error = %s\n", err)
		}

		expectedStatusCode := http.StatusOK
		expectedResponse := "{}\n"

		if err != nil {
			a.Fail("newMockHandler error = %s\n", err)
		}

		ts := httptest.NewServer(h.HealthCheck())
		defer ts.Close()

		res, err := http.Get(ts.URL)
		if err != nil {
			a.Fail("get fail", err)
		}

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		defer res.Body.Close()

		a.Equal(expectedResponse, string(body))
		a.Equal(expectedStatusCode, res.StatusCode)
	})
	t.Run("DB Closed Server error", func(t *testing.T) {
		h, _, err := newMockHandler()
		if err != nil {
			a.Fail("newMockHandler error = %s\n", err)
		}
		db, err := h.DB.DB()
		if err != nil {
			a.Fail("DB.DB error = %s\n", err)
		}
		_ = db.Close()

		expectedStatusCode := http.StatusInternalServerError
		expectedResponse := "{\"checkDBConnection\":\"Checking DB ping failed: sql: database is closed\"}\n"

		ts := httptest.NewServer(h.HealthCheck())
		defer ts.Close()

		res, err := http.Get(ts.URL)
		if err != nil {
			a.Fail("get fail", err)
		}

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		defer res.Body.Close()

		a.Equal(expectedResponse, string(body))
		a.Equal(expectedStatusCode, res.StatusCode)
	})
}
