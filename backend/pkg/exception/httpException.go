package exception

import (
	"encoding/json"
	"github.com/sirupsen/logrus"
	"net/http"
	"runtime/debug"
)

type ResponseException struct {
	Writer http.ResponseWriter
}

func NewResponseException(writer http.ResponseWriter) *ResponseException {
	return &ResponseException{Writer: writer}
}

type fields struct {
	Error   string `json:"error,omitempty""`
	Message string `json:"message,omitempty"`
}


func (e ResponseException) ErrBadRequest(err error, msg string) {
	logrus.Errorf("error = %s, message = %s, stack = %s", err, msg, string(debug.Stack()))

	exceptionWithFields, mErr := json.Marshal(fields{
		Error:   err.Error(),
		Message: msg,
	})
	if mErr != nil {
		logrus.Errorf("on encoding response err = %s, stack = %s", mErr, string(debug.Stack()))
	}

	e.Writer.WriteHeader(http.StatusBadRequest)
	if _, err := e.Writer.Write(exceptionWithFields); err != nil {
		logrus.Errorf("on write response err = %s, stack = %s", err, string(debug.Stack()))
	}
}

// ErrForbidden acces declined, returns with error code 403 Unauthorized
func (e ResponseException) ErrForbidden(Message string) {
	logrus.Errorf("status forbidden, message = %s", Message)

	exceptionWithFields, err := json.Marshal(fields{
		Message: Message,
	})
	if err != nil {
		logrus.Errorf("on encoding response err = %s, stack = %s", err, string(debug.Stack()))
	}

	e.Writer.WriteHeader(http.StatusForbidden)
	_, err = e.Writer.Write(exceptionWithFields)
	if err != nil {
		logrus.Errorf("on write response err = %s, stack = %s", err, string(debug.Stack()))
	}
}
