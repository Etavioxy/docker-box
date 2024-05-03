package handler

import (
	"app/config"

	"fmt"
	"github.com/gofiber/fiber/v2"
	"io/ioutil"
	"log"
	"os/exec"
)

func GetCommands(c *fiber.Ctx) error {
	workspaceID := c.Params("workspaceid")
	url := fmt.Sprintf("%s/v2/_catalog", registry)
	response, err := fetch(url)
	if err != nil {
		log.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	defer response.Body.Close()
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.Send(data)
}

func GetCommandHelp(c *fiber.Ctx) error {
	workspaceID := c.Params("workspaceid")
	command := c.Params("command")
	cmd := exec.Command("docker", "exec", config.Config("REGISTRY"), command, "--help")
	output, err := cmd.Output()
	if err != nil {
		log.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.Send(output)
}

func ExecuteCommand(c *fiber.Ctx) error {
	workspaceID := c.Params("workspaceid")
	command := c.Params("command")
	workspaceDir := fmt.Sprintf("%s/workspace/%s/%s", config.Config("WEBDAV_HOST"), workspaceID, c.Body("dir"))
	cmd := exec.Command("docker", "run", "--rm", "-v", fmt.Sprintf("%s:/app", workspaceDir), fmt.Sprintf("%s/%s", config.Config("REGISTRY"), command), c.Body("arg"))
	output, err := cmd.Output()
	if err != nil {
		log.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.Send(output)
}
