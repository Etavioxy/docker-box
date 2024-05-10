package handler

import (
	"app/config"

	"fmt"
	"log"
	"os/exec"

	"github.com/gofiber/fiber/v2"
)

/*
func GetCommands(c *fiber.Ctx) error {
	// workspaceID := c.Params("workspaceid")
	url := fmt.Sprintf("%s/v2/_catalog", config.Config("REGISTRY_HOST"))
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
*/

func GetCommandHelp(c *fiber.Ctx) error {
	// workspaceID := c.Params("workspaceid")
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
	type Cmd struct {
		Arg string `json:"arg"`
		Dir string `json:"dir"`
	}
	p := new(Cmd)
	if err := c.BodyParser(p); err != nil {
		return err
		// return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't create product", "data": err})
	}

	workspaceID := c.Params("workspaceid")
	command := c.Params("command")
	workspaceDir := fmt.Sprintf("%s/workspace/%s/%s", config.Config("WEBDAV_HOST"), workspaceID, p.Dir)
	cmd := exec.Command("docker", "run", "--rm", "-v", fmt.Sprintf("%s:/app", workspaceDir), fmt.Sprintf("%s/%s", config.Config("REGISTRY"), command), p.Arg)
	output, err := cmd.Output()
	if err != nil {
		log.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.Send(output)
}
