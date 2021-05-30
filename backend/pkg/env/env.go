package env

import "os"

func GetEnvString(key string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return ""
}
