package handler

import (
	"app/database"
	"app/model"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
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
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := uint(claims["user_id"].(float64))
	workspace := new(model.Workspace)
	if err := c.BodyParser(workspace); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Bad Request")
	}
	workspace.UserID = userID
	database.DB.Create(workspace)
	return c.SendStatus(fiber.StatusCreated)
}

func DeleteWorkspace(c *fiber.Ctx) error {
	id := c.Params("id")
	database.DB.Delete(&model.Workspace{}, id)
	return c.Status(fiber.StatusOK).SendString("OK")
}
