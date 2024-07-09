# SOLINK - Developer Assessment

## Introduction

Although the application of the task can have a more in-depth approach, I decided to keep it simple and focus on the main requirements. There are a few things that I want in a real-world scenario, but I will list them in the "Future Improvements" section.

I've purposely left some things out of the application to keep it simple and focused on the main requirements. I've also added some comments in the code to explain some decisions and assumptions.

## Setup and Run

To run the application, you need to have the following tools installed:

- Node.js (v20.0.0 or higher) - [Download](https://nodejs.org/en/download/) - [NVM (Version Manager)](https://github.com/nvm-sh/nvm)
- NPM (v10.0.0 or higher) - [NVM (Version Manager)](https://github.com/nvm-sh/nvm)
- Postgres database
- Docker (optional - for running the database)

### Installation

Clone the repository to a local folder:

```bash
git clone https://github.com/OmnilinkDigital/solink-solcast.git
```

Navigate to the project folder and install the dependencies. Please note that you may need to use the `--legacy-peer-deps` flag if you are using a newer version of NPM. [See more](https://stackoverflow.com/a/66620869/7260876) about the issue.

```bash
cd solink-developer-assessment
npm install --legacy-peer-deps
```

You'll need to create a `.env` file in the root folder of the project. You can copy the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

The `.env` file should have the following variables:

```env
DATABASE_URL="postgres://<user>:<password>@<host>:<port>/<database>"
SOLCAST_API_URL="https://api.solcast.com.au"
SOLCAST_API_KEY="<your_api_key>"
APP_PORT=3000
```

### Starting the application (Development)

To start the application, you can run the following terminal command inside the project folder:

```bash
npm run dev
```

### Starting the application (Production)

Ideally, you would build the application and run it in a production environment. For now, we'll just run the application in the development mode. I've left the `start` script in the `package.json` file, but it's not recommended to use it in a real-world scenario. You should use a process manager like PM2 or Docker.

```bash
npm start
```

## Logging

We are using the `winston` library for logging. The logs are stored in the `logs` folder in the root of the project. To keep things simple for this demonstation, we are logging to the console and to a file. In a production environment, you should use a more robust solution. Two files are generated: `error.log` and `combined.log`.

[See more about Winston](https://github.com/winstonjs/winston)

The setup can be found in the `src/logger.ts` file.

## Future Improvements

There are many improvements that can be made to the application. I've left out some things to keep the application simple and focused on the main requirements. In a production environment, we would need to consider the following improvements:

- Use a process manager like PM2 or Docker to run the application in a production environment.
- Use a more robust logging solution instead of writing to files.
- Adding more build steps to the application, like minifying the code, using a bundler, etc.
- Add more tests to the application, including unit tests, integration tests, and end-to-end tests (if necessary).
- Add more error handling and validation to the application to prevent crashes and security vulnerabilities.
- Add more features to the application, like user authentication, authorization, and more.
- Add more documentation to the application, including API documentation, code comments, and more once the application grows.
- Add more monitoring and alerting to the application to keep track of the application's health and performance.
- Add Prettier and ESLint to the project to enforce code style and best practices across the codebase.
- Add Migration scripts to the project to manage the database schema changes.
