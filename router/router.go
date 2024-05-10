package router

import (
	"app/handler"
	"app/middleware"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/logger"

	swagger "github.com/gofiber/contrib/swagger"
)

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
	user.Post("", handler.CreateUser)
	user.Patch("/:id", middleware.Protected(), handler.UpdateUser)
	user.Delete("/:id", middleware.Protected(), handler.DeleteUser)

	// Product
	//product := api.Group("/product")
	//product.Get("/", handler.GetAllProducts)
	//product.Get("/:id", handler.GetProduct)
	//product.Post("", middleware.Protected(), handler.CreateProduct)
	//product.Delete("/:id", middleware.Protected(), handler.DeleteProduct)

	workspace := api.Group("/workspace")
	workspace.Get("", handler.GetAllWorkspaces)
	workspace.Get("/:id", handler.GetWorkspaceByID)
	workspace.Post("", middleware.Protected(), handler.CreateWorkspace)
	workspace.Delete("/:id", middleware.Protected(), handler.DeleteWorkspace)

	workspaceCommand := api.Group("/workspace/:id/command")
	//workspaceCommand.Get("/", middleware.Protected(), handler.GetCommands)
	workspaceCommand.Get("/:command/help", middleware.Protected(), handler.GetCommandHelp)
	workspaceCommand.Post("/:command", middleware.Protected(), handler.ExecuteCommand)

	registry := api.Group("/registry")
	registry.Get("*", middleware.Protected(), cache.New(cache.Config{
		Expiration:   10 * time.Minute,
		CacheControl: true,
	}), handler.GetRegistryData)

	// https://github.com/gofiber/fiber/issues/1271
	webdav := api.Group("/webdav")
	webdav.Add("PROPFIND", "*", middleware.Protected(), handler.ProxyWebdav())
	webdav.Add("MKCOL", "*", middleware.Protected(), handler.ProxyWebdav())
	webdav.Add("COPY", "*", middleware.Protected(), handler.ProxyWebdav())
	webdav.Add("MOVE", "*", middleware.Protected(), handler.ProxyWebdav())
	webdav.All("*", middleware.Protected(), handler.ProxyWebdav())

	swaggerCfg := swagger.Config{
		BasePath: "/api",
		FilePath: "./docs/swagger.json",
		Path:     "/docs",
	}

	app.Use(swagger.New(swaggerCfg))
}
