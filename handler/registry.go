package handler

import (
	"app/config"

	"fmt"

	"github.com/gofiber/fiber/v2"

	"io"
	"log"
	"net/http"
)

func GetRegistryData(c *fiber.Ctx) error {
	url := fmt.Sprintf("%s/%s", config.Config("REGISTRY_HOST"), c.Params("*"))
	response, err := http.Get(url)
	if err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch data",
		})
	}
	defer response.Body.Close()
	data, err := io.ReadAll(response.Body)
	if err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch data",
		})
	}
	//fmt.Println(string(data))
	return c.Send(data)
}
