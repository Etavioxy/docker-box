package handler

import (
	"app/config"

	"fmt"
	"github.com/gofiber/fiber/v2"

	"io/ioutil"
	"log"
	"net/http"
)

func GetRegistryData(c *fiber.Ctx) error {
	url := fmt.Sprintf("%s/%s", config.Registry, c.Params("*"))
	response, err := http.Get(url)
	if err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch data",
		})
	}
	defer response.Body.Close()
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch data",
		})
	}
	return c.JSON(data)
}
