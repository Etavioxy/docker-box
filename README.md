# Docker Box 🐳

[中文](#中文)

Docker Box is an online Docker image deployment platform designed for self-hosted cloud services. It offers both PaaS and SaaS features, allowing users to execute commands and obtain results through the Workspace page using the provided online file directory.

## Features
- **Workspace Integration**: Users can leverage the Workspace page to select an image and execute commands, obtaining immediate execution results.
- **Platform for Docker Application Developers**: Docker Box provides an online platform for developers to publish and deploy their Docker applications.
- **Express JWT Integration**: User login status and automatic login are maintained using the express-jwt library.
- **Backend Caching for Docker Registry Server**: Docker Box implements a caching mechanism to optimize file operations by proxying the WebDAV protocol.
- **Docker-in-Docker Implementation**: Docker Box solves the issue of workspace operation permissions by leveraging Docker-in-Docker functionality.

## Getting Started
To get started with Docker Box, follow the instructions below:

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Configure the necessary environment variables, such as the Docker Registry server details and JWT secret.
4. Start the application using `npm start`.
5. Access Docker Box through your preferred web browser.

For docker publisher, [API docs] here.

## Usage
Once Docker Box is up and running, you can perform the following actions:

1. **Login**: Log in to your Docker Box account using your credentials or create a new account if you don't have one.
2. **Workspace**: Navigate to the Workspace page, where you can browse the online file directory and select the desired Docker image.
3. **Execute Commands**: Choose the Docker image you want to work with and execute commands directly from the Workspace page. The results will be displayed in real-time.
4. **Application Deployment**: If you are a Docker application developer, Docker Box provides a platform for publishing and deploying your applications. Follow the provided guidelines to release your Docker images.

## Contributing
We welcome contributions to Docker Box! If you want to contribute to this project, please read the [Contributing Guide](./.github/contributing.md).

## License
MIT.

🚀 Start exploring Docker Box and simplify your Docker image deployments!

---

# 中文

Docker Box 是一个为自部署云服务打造的在线 Docker 镜像使用服务器，可以提供 PaaS 和 SaaS 特点。用户可以通过 Workspace 页面提供的在线文件夹选择镜像执行命令，并得到执行结果。

## 特点
- **Workspace 集成**：用户可以通过 Workspace 页面选择镜像并执行命令，即时获取执行结果。
- **Docker 应用开发平台**：Docker Box 为开发者提供在线发布的平台，用于发布和部署 Docker 应用。
- **Express JWT 集成**：使用 express-jwt 维护登录状态和自动登录功能。
- **后端缓存优化**：通过代理 WebDAV 协议，使用后端缓存式请求 Docker Registry 服务器，优化文件操作体验。
- **Docker in Docker 实现**：通过 Docker in Docker 实现，解决 Workspace 操作权限问题。

## 快速上手
要开始使用 Docker Box，请按照以下步骤进行操作：

1. 将该仓库克隆到您的本地机器。
2. 使用 `npm install` 命令安装所需的依赖项。
3. 配置必要的环境变量，例如 Docker Registry 服务器的详细信息和 JWT 密钥。
4. 使用 `npm start` 命令启动应用程序。
5. 通过您选择的 Web 浏览器访问 Docker Box。

对docker编写者，[API文档]

## 使用方法
Docker Box 启动后，您可以执行以下操作：

1. **登录**：使用您的凭据登录 Docker Box 帐户，如果没有帐户，可以创建一个新帐户。
2. **Workspace**：转到 Workspace 页面，在线文件夹中浏览并选择所需的 Docker 镜像。
3. **执行命令**：选择要使用的 Docker 镜像，并直接在 Workspace 页面上执行命令。结果将实时显示。
4. **应用部署**：如果您是 Docker 应用开发者，Docker Box 提供了发布和部署应用的平台。按照提供的指南发布您的 Docker 镜像。

## 贡献
我们欢迎对 Docker Box 的贡献！如果您想为该项目做出贡献，请按照以下步骤进行操作：

1. 在 GitHub 上 fork 该仓库。
2. 为您的功能或错误修复创建一个新分支。
3. 开发和测试您的代码更改。
4. 提交 pull request，解释您的更改并提供任何必要的文档。

## 许可证
MIT.

🚀 开始探索 Docker Box！
