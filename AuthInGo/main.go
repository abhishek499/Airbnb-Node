package main

import (
	"AuthInGo/app"
	"fmt"
)

func main() {
	fmt.Println("Hello World")

	cfg := app.Config{
		Addr: ":3001",
	}

	app := app.Application{
		Config: cfg,
	}

	app.Run()
}
