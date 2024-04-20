# Restaurant Backend

This is the backend service for the restaurant project.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js >= 16
- PostgreSQL

## Clone

To get a local copy up and running, follow these simple steps:

```bash
git clone https://github.com/bimaatp23/restaurant-be.git
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
DB_HOST=<your-database-host>
DB_PORT=<your-database-port>
DB_NAME=<your-database-name>
DB_USER=<your-database-user>
DB_PASSWORD=<your-database-password>
SECRET_KEY=<your-secret-key>
```

## Usage

To start the server, run the following command:

```bash
npm start
```

The server will start at `http://localhost:3000`.

# API Documentation

- ***[Admin Service](ADMIN.md)***
- ***[Customer Service](CUSTOMER.md)***
- ***[Menu Service](MENU.md)***
- ***[Order Service](ORDER.md)***