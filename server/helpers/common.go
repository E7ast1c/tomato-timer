package helpers

import "strings"

func IsEmptyOrWhitespace(target *string) bool {
	if strings.TrimSpace(*target) == "" {
		return true
	}
	return false
}

const (
	applicationJson string = "application/json"
	contentType     string = "Content-Type"
)

