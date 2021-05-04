package string

import "strings"

func IsEmptyOrWhitespace(target *string) bool {
	if strings.TrimSpace(*target) == "" {
		return true
	}
	return false
}