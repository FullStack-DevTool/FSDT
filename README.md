# 🚀 FullStack DevTool

FullStack DevTool is an entirely new type of interactive console that aggregates and **displays logs from multiple source applications** in an organized manner. Previously, a developer working on multiple interdependent applications had to split their attention across multiple interfaces to monitor all the logs. With **FullStack DevTool**, they can now track, organize, and filter them through a single, optimized interface.

FullStack DevTool also holds value for developers working on a single application at a time, as they can benefit from an unprecedented log management system (interactive log categorization, filtering, sorting, etc.).

With FullStack DevTool, there's no need to delete logs once development is complete. You can keep them, as they will never be visible in production and can be easily sorted as needed.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

To use this project correctly, follow these steps.

### Prerequisites

- NodeJS

### Installation

```bash
$ npm install @fullstack-devtool/sdk
$ npm install -D @fullstack-devtool/app
```

### Start

```bash
$ npm run fullstack-devtool
```

## Usage

```typescript
import FsdtLogger from "@fullstack-devtool/sdk";

const logger = new FsdtLogger("test-app-1", {
  port: 1234,
  connectionType: "source",
});

logger.info({ myVar: "myVar" });
```

## Contributing

For contributing, please follow the <a href="https://github.com/FullStack-DevTool/FSDT/blob/main/CONTRIBUTING">Contributing instructions</a> from the repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

We would like to express our gratitude to the following individuals and projects for their contributions and inspiration:

- The [Electron framework](https://github.com/electron/electron), which is the foundation of our desktop application
- The [WebSocket Library](https://github.com/websockets/ws)

Special thanks to the entire open-source community for their continuous support and for providing a rich ecosystem of tools and resources that make projects like this possible.
