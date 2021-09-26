package handler

import (
	"io/ioutil"
	"net/http"
	"strings"
	"testing"
	"tomato-timer/backend/config"
	"tomato-timer/backend/internal/models"
	"tomato-timer/backend/internal/repository"
	"tomato-timer/backend/test"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	gpostgres "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func TestLogin(t *testing.T) {
	const uri = "/login"
	testCases := []test.HandlerCase{
		{
			Description:   "successful",
			Body:          `{"Email": "test2352312@test.com","Password": "Test2352312"}`,
			Route:         uri,
			ExpectedError: false,
			ExpectedCode:  200,
			ExpectedBody:  "login successful",
		},
		{
			Description:   "incorrect password",
			Body:          `{"Email": "test2352312@test.com","Password": "Test111111"}`,
			Route:         uri,
			ExpectedError: false,
			ExpectedCode:  400,
			ExpectedBody:  "invalid login credentials",
		},
		{
			Description:   "incorrect email",
			Body:          `{"Email": "test111111@test.com","Password": "Test2352312"}`,
			Route:         uri,
			ExpectedError: false,
			ExpectedCode:  400,
			ExpectedBody:  "invalid login credentials",
		},
		{
			Description:   "less password",
			Body:          `{"Email": "test2352312@test.com","Password": "Test"}`,
			Route:         uri,
			ExpectedError: false,
			ExpectedCode:  400,
			ExpectedBody:  "validation failed",
		},
		{
			Description:   "without email",
			Body:          `{"Password": "Test2352312"}`,
			Route:         uri,
			ExpectedError: false,
			ExpectedCode:  400,
			ExpectedBody:  "validation failed",
		},
	}

	handler, _, err := setup()
	if err != nil {
		t.Fatal(err.Error())
	}
	fApp := Handlers(handler, fiber.New())

	for _, test := range testCases {
		req, _ := http.NewRequest(
			"POST",
			uri,
			strings.NewReader(test.Body),
		)
		req.Header.Add("Content-Type", "application/json")

		res, err := fApp.Test(req, -1)

		assert.Equalf(t, test.ExpectedError, err != nil, test.Description)

		if test.ExpectedError {
			continue
		}
		assert.Equalf(t, test.ExpectedCode, res.StatusCode, test.Description)
		body, err := ioutil.ReadAll(res.Body)
		assert.Nilf(t, err, test.Description)
		assert.Containsf(t, string(body), test.ExpectedBody,  test.Description)
	}
}

func setup() (*Handler, *gorm.DB, error) {
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

	repo := newMockRepository(gdb)
	apiConfig := config.AppConfig{
		DBConfig: config.DBConfig{URI: ""},
		APIServer: config.APIServer{
			Port:       "1234",
			SignSecret: "qwerty12345",
		},
	}

	return NewHandler(*repo, gdb, apiConfig.APIServer, nil), gdb, nil
}

func newMockRepository(db *gorm.DB) *repository.Repository {
	return &repository.Repository{UserRepo: &mockRepository{}, ServiceRepo: nil}
}

type mockRepository struct {}

func (m mockRepository) GetAllUsers() ([]models.User, error) {
	return nil, nil
}
func (m mockRepository) GetUserDataByEmail(email string) (*models.User, error) {
	const expectEmail =  "test2352312@test.com"
	if email == expectEmail {
		return &models.User{
			Name:          "Test",
			Email:         "test2352312@test.com",
			Password:      "$2a$10$LjNc4OAdPmmOPjHobZ8xA.4X0905fCjkK5ZCZCGMXF76/4DzDK1xe",
			TimerSettings: models.UserTimerSettings{
				DefaultDuration:    25,
				LongBreakDuration:  15,
				ShortBreakDuration: 5,
				TickTrack:          "",
				AlarmTrack:         "",
			},
		}, nil
	}
	return &models.User{}, gorm.ErrRecordNotFound
}

func (m mockRepository) GetUserDataByID(id uint) (*models.User, error) {
	return nil, nil
}
func (m mockRepository) SetUserDataByID(id uint, settings models.UserTimerSettings) error {
	return nil
}
func (m mockRepository) CreateUser(user *models.User) (*models.User, error) {
	return nil, nil
}