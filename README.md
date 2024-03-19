# Hacker News Feed Project

Hacker News Feed Project

## Prerequisites

- Docker and Docker Compose
- Node v20.1.0
- Git

## Cloning the Repository

1. Clone the project repository from GitHub:

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

- **Client:**

```bash
docker-compose exec client npm run lint
```

### GitHub Actions Configuration

The CI workflow is defined in `.github/workflows/nodejs.yml` for the server. It sets up the project, installs dependencies, and runs tests and linters.

## Additional Notes

- **Database Initialization**: On the first run, the server application automatically initializes the database schema based on the entity definitions, thanks to TypeORM's `synchronize: true` setting. This setting should probably be set off in production. After that, the backend fetches the data from Hacker News once every hour.
- **Manual Database Actions**: If you need to perform manual actions on the database, such as inspecting tables or records, you can connect to the PostgreSQL container using tools like pgAdmin or command-line utilities.
- **Refreshing Data**: To manually trigger data refresh from the Hacker News API, you can restart the server container, which will execute the data fetching logic on startup.
