package handler

import (
	"app/database"
	"app/model"
	"time"

	"github.com/gofiber/fiber/v2"
)

func GetAllWorkspaces(c *fiber.Ctx) error {
	workspaces := []model.Workspace{}
	database.DB.Find(&workspaces)
	return c.JSON(workspaces)
}

func GetWorkspaceByID(c *fiber.Ctx) error {
	id := c.Params("id")
	workspace := model.Workspace{}
	result := database.DB.First(&workspace, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).SendString("404 - Not found")
	}
	return c.JSON(workspace)
}

func CreateWorkspace(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	workspace := new(model.Workspace)
	if err := c.BodyParser(workspace); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Bad Request")
	}
	workspace.UserID = userID
	workspace.CreatedAt = time.Now()
	database.DB.Create(workspace)
	return c.SendStatus(fiber.StatusCreated)
}

func DeleteWorkspace(c *fiber.Ctx) error {
	id := c.Params("id")
	database.DB.Delete(&model.Workspace{}, id)
	return c.Status(fiber.StatusOK).SendString("OK")
}
