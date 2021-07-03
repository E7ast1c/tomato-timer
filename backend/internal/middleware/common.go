package middleware

import (
	"net/http"
)

// CommonMiddleware --Set content-type
func (mw *middleware) CommonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//	w.Header().Add("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		next.ServeHTTP(w, r)
	})
}
