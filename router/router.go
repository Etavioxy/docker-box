package router

import (
	"app/handler"
	"app/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/cache"
)

import swagger "github.com/arsmn/fiber-swagger/v2"

// SetupRoutes setup router api
func SetupRoutes(app *fiber.App) {
	// Middleware
	api := app.Group("/api", logger.New())
	api.Get("/", handler.Hello)

	// Auth
	auth := api.Group("/auth")
	auth.Post("/login", handler.Login)

	// User
	user := api.Group("/user")
	user.Get("/:id", handler.GetUser)
	user.Post("/", handler.CreateUser)
	user.Patch("/:id", middleware.Protected(), handler.UpdateUser)
	user.Delete("/:id", middleware.Protected(), handler.DeleteUser)

	// Product
	product := api.Group("/product")
	product.Get("/", handler.GetAllProducts)
	product.Get("/:id", handler.GetProduct)
	product.Post("/", middleware.Protected(), handler.CreateProduct)
	product.Delete("/:id", middleware.Protected(), handler.DeleteProduct)

	workspace := api.Group("/workspace")
	workspace.Get("/", handler.GetAllWorkspaces)
	workspace.Get("/:id", handler.GetWorkspaceByID)
	workspace.Post("/", middleware.Protected(), handler.CreateWorkspace)
	workspace.Delete("/:id", middleware.Protected(), handler.DeleteWorkspace)

	workspaceCommand := api.Group("/workspace/:id/command")
	workspaceCommand.Get("/", handler.GetCommands)
	workspaceCommand.Get("/:command/help", handler.GetCommandHelp)
	workspaceCommand.Post("/:command", handler.ExecuteCommand)

	registry := api.Group("/webdav")
	registry.Get("*", cache.New(cache.Config{
		Expiration:   30,
		CacheControl: true,
	}), handler.GetRegistryData)

	webdav := api.Group("/webdav")
	webdav.All("*", handler.ProxyWebdav())

	app.Get("/docs/*", swagger.Handler) // default
}
