# goTickets
Fullstack web application which uses **Node.js**, **NestJS**, **TypeScript**, **React**, **Vite**, **Material-UI**, **Jest**, **Vitest**, **Docker** (among other tools and libraries).

## Getting Started
1. **Clone the repository**: Start by cloning the repository to your local machine using git clone.

2. **Navigate to the project directory**: Once cloned, navigate to the project directory using the cd command.

3. **Create a .env file**: Use the .env.example file as a template to create a .env file in the project directory. This file will be used to store environment variables for the application.

3. **Run Docker Compose**: Execute the `docker-compose up` command in the project directory. Docker will take care of installing all necessary dependencies and get the application up and running. It also enables hot module replacement for a smoother development experience.

4. **Access the Application**: By default, the application's frontend should be accessible via your browser at `localhost:3000`. If you've made changes to the specified port in the Docker files or in `vite.config.ts`, make sure to adjust the URL accordingly.

## Linting and Testing
Linting and tests can ran locally in both the `backend` and `frontend` directories.

1. **Install Packages Locally**: Run `npm i` to install necessary packages locally.

2. **Run Linter**: Execute `npm run lint` to run the linting tool.

3. **Run Tests**: Use `npm run test` to execute the suite of tests for the project.

## Run the application without Docker
The application can be run without Docker.

1. **Ensure Packages Are Locally Installed**: If not, run `npm i` in both `backend` and `frontend` folders to install necessary packages locally.

2. **Run Backend Server**: Execute `npm run start` to start the backend server.

3. **Run Frontend Server**: Execute `npm run dev` to start the frontend server.

## Generating Sample Data
Predefined request collections for Postman and Thunder Client are provided in the `request-collections` folder. These collections can be used to generate sample data. However, it is not mandatory to use them for the application to run successfully.