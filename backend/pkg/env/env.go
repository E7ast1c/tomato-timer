package env

import (
	"log"
	"os"
)

func MustEnvString(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalf("getenv %s failed \n", key)
	}
	return value
}

const (
	Production = "Production"
)
