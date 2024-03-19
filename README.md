# Hacker News Feed Project

![Screenshot 2024-03-19 at 07 56 44](https://github.com/alhuissi/hackernews-monorepo/assets/30061055/1b0dee9a-654c-44b8-a8bd-ece4ac764d91)

Hacker News Feed Project

## Prerequisites

- Docker and Docker Compose
- Node v20.1.0
- Git

## Cloning the Repository

```bash
git clone https://github.com/alhuissi/hackernews-monorepo
cd hackernews-monorepo
```

## Running the Project

This project uses Docker Compose to simplify the running of the multi-container application. Follow these steps to get the project up and running:

1. **Build and Start the Containers**

```bash
docker-compose up --build
```

This command builds the images for the server and client.

2. **Accessing the Application**

After the containers are up and running, you can access:
- The client application at [http://localhost:3001](http://localhost:3001)
- The server API at [http://localhost:3000](http://localhost:3000)

## Development Workflow

### Running Tests

To run tests for the server component, you can use the following command:

```bash
docker-compose exec server npm test
```

### Running Linters

To ensure code quality and consistency, we use linters for both the server and client. Run the following commands to execute linters:

- **Server:**

```bash
docker-compose exec server npm run lint
```

### GitHub Actions Configuration

The CI workflow is defined in `.github/workflows/nodejs.yml` for the server. It sets up the project, installs dependencies, and runs tests and linters.

## Additional Notes

- **Database Initialization**: On the first run, the server application automatically initializes the database schema based on the entity definitions, thanks to TypeORM's `synchronize: true` setting. This setting should probably be set off in production. After that, the backend fetches the data from Hacker News once every hour.

