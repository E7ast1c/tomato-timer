package http

// PortCombiner add ':' symbol if it missing
func PortCombiner(address string) string {
	if len(address) > 1 && address[0] != ':' {
		return ":"+address
	}
	return address
}
