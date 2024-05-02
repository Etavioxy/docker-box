package handler

import (
	"app/config"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/proxy"
)

func ProxyWebdav() func(*fiber.Ctx) error {
	// Setup the proxy middleware
	// see https://docs.gofiber.io/api/middleware/proxy/
	return proxy.Balancer(proxy.Config{
		Servers: []string{config.Config("WEBDAV_HOST")},
		ModifyRequest: func(c *fiber.Ctx) error {
			c.Path(
				c.Path()[len("/api/webdav"):],
			)
			return nil
		},
	})
}
