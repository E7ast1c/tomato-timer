package middleware

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"runtime/debug"
	"time"

	"github.com/sirupsen/logrus"
)

// responseWriter is a minimal wrapper for http.ResponseWriter that allows the
// written HTTP status code to be captured for logging.
type responseWriter struct {
	http.ResponseWriter
	status      int
	wroteHeader bool
}

func wrapResponseWriter(w http.ResponseWriter) *responseWriter {
	return &responseWriter{ResponseWriter: w}
}

func (rw *responseWriter) Status() int {
	return rw.status
}

func (rw *responseWriter) WriteHeader(code int) {
	if rw.wroteHeader {
		return
	}

	rw.status = code
	rw.ResponseWriter.WriteHeader(code)
	rw.wroteHeader = true
}

// LoggingMiddleware logs the incoming HTTP request & its duration.
func (mw *middleware) LoggingMiddleware(logger *logrus.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if err := recover(); err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					logger.Errorf("Error level = %s, message = %s, debug stack = %s",
						logrus.ErrorLevel, err, debug.Stack(),
					)
				}
			}()

			// read body for logging and overwrite for further
			bodyRaw, err := io.ReadAll(r.Body)
			if err != nil {
				logrus.Error("read body failed")
				return
			}
			r.Body = io.NopCloser(bytes.NewReader(bodyRaw))
			err = r.Body.Close()
			if err != nil {
				logrus.Error("Could not close body")
				return
			}

			rHeaders, err := json.Marshal(r.Header)
			if err != nil {
				logrus.Error("Could not Marshal Req Headers")
				return
			}

			start := time.Now()
			wrapped := wrapResponseWriter(w)
			next.ServeHTTP(wrapped, r)
			logrus.Infof("status=%d, method=%s, path=%s, headers=%s, body=%s, duration=%v\n",
				wrapped.status, r.Method, r.URL.EscapedPath(), string(rHeaders), string(bodyRaw), time.Since(start),
			)
		}

		return http.HandlerFunc(fn)
	}
}
