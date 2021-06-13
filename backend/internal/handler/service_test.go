package handler

import (
	"github.com/DATA-DOG/go-sqlmock"
	gpostgres "gorm.io/driver/postgres"
	"gorm.io/gorm"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
	"tomato-timer-server/config"
	"tomato-timer-server/internal/repository/postgres"
)

func newMockHandler() (*Handler, *gorm.DB, error) {
	db, _, err := sqlmock.New()
	if err != nil {
		return nil, nil, err
	}
	
	gdb, err := gorm.Open(gpostgres.New(gpostgres.Config{
		Conn:                 db,
	}), &gorm.Config{})
	repo := postgres.NewPGRepository(gdb)
	apiConfig := config.NewApiConfig()

	return NewHandler(*repo, apiConfig.ApiServer), gdb, nil
}

func TestHealthCheck(t *testing.T) {
	t.Run("positive", func(t *testing.T) {
		h, _, err := newMockHandler()
		if err != nil {
			t.Fatalf("newMockHandler error = %s\n", err)
		}

		ts := httptest.NewServer(h.HealthCheck())
		defer ts.Close()

		res, err := http.Get(ts.URL)
		if err != nil {
			t.Fatal(err)
		}
		if res.StatusCode != http.StatusOK {
			t.Errorf("response code != 200 %d\n", res.StatusCode)
		}

		defer res.Body.Close()
		_, err = ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
	})
}
