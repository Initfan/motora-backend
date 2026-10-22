# Motora

Motora is an application designed to help online motorcycle taxi drivers and delivery couriers manage their income, operating expenses, and motorcycle maintenance in one platform.

Motora uses a **separate frontend and backend architecture**, allowing each component to be developed, maintained, and improved independently.

## Repositories

This project consists of two separate repositories:

| Repository | Technologies | Description |
|---|---|---|
| **Frontend** | Flutter, Dart | Mobile application for drivers |
| **Backend** | Bun, ElysiaJS, TypeScript, Prisma, PostgreSQL | REST API, business logic, and data management |

- **Frontend repository:** `github.com/Initfan/motora`
- **Backend repository:** `github.com/Initfan/motora-backend`

Replace both placeholders with the actual GitHub repository URLs.

## Features

The planned and developing features include:

- Driver profile management.
- Motorcycle registration and management.
- Work session tracking.
- Income tracking, including bonuses, tips, and incentives.
- Operating expense tracking.
- Net income calculation.
- Daily income goal tracking.
- Motorcycle service history and component condition tracking.
- Maintenance reminders based on mileage or time intervals.

> Feature implementation status may vary depending on the current state of each repository. Features that are incomplete or not yet integrated with the API should not be considered production-ready.

## Tech Stack

### Frontend

- Flutter
- Dart
- REST API
- HTTP client for backend communication

### Backend

- Bun
- ElysiaJS
- TypeScript
- Prisma ORM
- PostgreSQL

## Architecture

The frontend and backend are developed and run independently.

```text
Motora
│
├── Frontend Repository
│   └── Flutter Mobile App
│       ├── UI / Screens
│       ├── Components / Widgets
│       ├── State Management
│       └── API Client
│
└── Backend Repository
    └── Bun + ElysiaJS
        ├── REST API
        ├── Business Logic
        ├── Authentication
        ├── Prisma ORM
        └── PostgreSQL
```

### Communication Flow

```text
Flutter Application
        │
        │ HTTP / JSON
        ▼
ElysiaJS REST API
        │
        │ Prisma ORM
        ▼
PostgreSQL Database
```

The frontend sends HTTP requests to the backend. The backend validates incoming requests, processes business logic, interacts with the database, and returns responses to the frontend.

## Prerequisites

Make sure the following tools are installed:

- Git
- Flutter SDK and Dart SDK
- Android Studio or an Android device for running the application
- Bun
- PostgreSQL
- Access to both the frontend and backend repositories

## Installation

### 1. Clone the Backend Repository

```bash
git clone <BACKEND_REPOSITORY_URL>
cd <BACKEND_FOLDER_NAME>
```

Install the dependencies:

```bash
bun install
```

### 2. Configure the Backend

Create a `.env` file based on `.env.example`, if the example file is available.

Example environment variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/motora"
PORT=3000
JWT_SECRET="REPLACE_WITH_A_SECURE_SECRET"
```

Adjust these values to match your local environment and backend configuration. Never commit real credentials or secret keys to a public repository.

Generate the Prisma client according to the repository configuration:

```bash
bunx prisma generate
```

If the project uses Prisma migrations and the migrations are available, run:

```bash
bunx prisma migrate dev
```

Start the backend using a script defined in `package.json`. For example, if a `dev` script is configured:

```bash
bun run dev
```

The backend will run on the configured port, such as `3000`.

### 3. Clone the Frontend Repository

Open a new terminal:

```bash
git clone <FRONTEND_REPOSITORY_URL>
cd <FRONTEND_FOLDER_NAME>
```

Install the Flutter dependencies:

```bash
flutter pub get
```

### 4. Configure the API Connection

Configure the frontend API base URL to point to the running backend.

Example base URLs:

| Environment | Example Base URL |
|---|---|
| Android Emulator | `http://10.0.2.2:3000` |
| Flutter Web or desktop on the same machine | `http://localhost:3000` |
| Physical Android device | `http://COMPUTER_IP_ADDRESS:3000` |

These URLs are examples. Use the host and port that match your backend configuration and testing environment.

Make sure the backend is accessible from the device running the application. For physical devices, the computer and device generally need to be connected to the same network, and the firewall must allow the connection.

### 5. Run the Frontend

Check the available devices:

```bash
flutter devices
```

Run the application:

```bash
flutter run
```

**Note:** The API configuration file, base URL storage method, and backend scripts must match the actual implementation in each repository.

## Database

The backend uses PostgreSQL with Prisma ORM.

The data models planned or used in the project include:

- `User` — user account information.
- `Driver` — driver profile and related information.
- `Motorcycle` — motorcycle details.
- `WorkSession` — driver work sessions.
- `Income` — income and expense summaries for each work session.
- `MotorComponent` — motorcycle components and maintenance schedules.

Relationships, field names, and implementation status should follow the latest Prisma schema in the backend repository.

## Usage Flow

The intended application workflow is:

1. Register or sign in to the application.
2. Complete the driver profile.
3. Register a motorcycle.
4. Start a work session.
5. Record income and operating expenses.
6. Complete the work session and review the results.
7. Monitor motorcycle condition and maintenance schedules.

The available workflow depends on the features and API endpoints that have actually been implemented.

## Development

### Frontend

Run static code analysis:

```bash
flutter analyze
```

Run the available tests:

```bash
flutter test
```

### Backend

Run a script defined in `package.json`, such as:

```bash
bun run dev
```

Check the available scripts for testing, linting, and database migrations before running them. Do not assume a script exists without verifying the project configuration.

## Roadmap

- [x] Improve authentication and account management.
- [x] Integrate the frontend with the REST API.
- [x] Implement motorcycle management.
- [x] Implement work session tracking.
- [x] Implement net income calculation and daily goal tracking.
- [x] Add transaction and expense history.
- [ ] Add motorcycle service and maintenance records.
- [ ] Implement maintenance reminders.
- [ ] Improve testing and overall application quality.

This roadmap represents planned development and does not imply that all features are already complete.

## Contributing

Contributions, suggestions, and bug reports are welcome.

Since the frontend and backend are maintained in separate repositories, please submit contributions to the repository relevant to your changes.

1. Fork the repository you want to contribute to.
2. Create a new branch.
3. Make your changes and run the relevant tests.
4. Submit a Pull Request with a clear description of your changes.

## License

The project's license is determined by the `LICENSE` file available in the relevant repository. If the license has not yet been selected, choose one and add the appropriate `LICENSE` file before declaring a specific license.

## Author

**Initfan**

GitHub: [https://github.com/Initfan](https://github.com/Initfan)
