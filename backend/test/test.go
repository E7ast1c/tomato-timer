package test

type HandlerCase struct {
	Description string

	// Test input
	Body string
	Route string

	// Expected output
	ExpectedError bool
	ExpectedCode  int
	ExpectedBody  string
}

func NewHandlerStruct(description string, body string, route string, expectedError bool, expectedCode int, expectedBody string) *HandlerCase {
	return &HandlerCase{Description: description, Body: body, Route: route, ExpectedError: expectedError, ExpectedCode: expectedCode, ExpectedBody: expectedBody}
}