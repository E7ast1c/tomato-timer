package exception

import (
	"encoding/json"
	"net/http"
	"runtime/debug"

	"github.com/sirupsen/logrus"
)

type fields struct {
	Error   string `json:"error ,omitempty"`
	Message string `json:"message ,omitempty"`
}

func ErrBadRequest(w http.ResponseWriter, err error, msg string) {
	logrus.Errorf("error = %s, message = %s, stack = %s", err, msg, string(debug.Stack()))

	exceptionWithFields, mErr := json.Marshal(fields{
		Error:   err.Error(),
		Message: msg,
	})
	if mErr != nil {
		logrus.Errorf("on encoding response err = %s, stack = %s", mErr, string(debug.Stack()))
	}

	w.WriteHeader(http.StatusBadRequest)
	if _, err := w.Write(exceptionWithFields); err != nil {
		logrus.Errorf("on write response err = %s, stack = %s", err, string(debug.Stack()))
	}
}

// ErrForbidden acces declined, returns with error code 403 Unauthorized
func ErrForbidden(w http.ResponseWriter, message string) {
	logrus.Errorf("status forbidden, message = %s", message)

	exceptionWithFields, err := json.Marshal(fields{
		Message: message,
	})
	if err != nil {
		logrus.Errorf("on encoding response err = %s, stack = %s", err, string(debug.Stack()))
	}

	w.WriteHeader(http.StatusForbidden)
	_, err = w.Write(exceptionWithFields)
	if err != nil {
		logrus.Errorf("on write response err = %s, stack = %s", err, string(debug.Stack()))
	}
}
