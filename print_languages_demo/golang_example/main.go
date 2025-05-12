package main
// https://dev.to/muhammedarifp/creating-a-simple-hello-world-web-application-with-docker-and-golang-1e14
// https://gobyexample.com/variables
// https://stackoverflow.com/questions/5885486/get-current-time-as-formatted-string-in-go
import (
    "fmt"
    "time"
)

func main() {
    fmt.Println("Hello ALS!")

    currentTime := time.Now()
    fmt.Println(currentTime.Format("2006-01-02"))
}