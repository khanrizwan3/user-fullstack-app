# My Fullstack User App

This is a full-stack application featuring a React frontend and a NestJS backend. This README provides information on how to set up, run, and contribute to the project.

## Technologies

- **Frontend:** React, Axios  
- **Backend:** NestJS, TypeScript, MongoDB
- **Development Tools:** Node.js, npm

## Getting Started

To get a local copy up and running, follow these steps.

### Frontend (React)

1. **Navigate to the frontend directory:**
```bash
cd auth-app-fe
```

Setup .env on root: ```bash
cp .env.example .env
```

Install dependencies: ```bash
npm install
```

Run FE: ```bash
npm start
```

Run all Test cases: ```bash
npm test
```

Start the React application: bash npm start This will start the application on http://localhost:3000.

Access the application: Open your browser and go to http://localhost:3000 to view the app, make sure the FE .env has set the api end point.

### Backend (NestJS)
Navigate to the backend directory: ```bash
 cd auth-backend
```

Setup .env on root: ```bash
cp .env.example .env
```

Install dependencies: ```bash
npm install
```

Run BE: ```bash
npm start
```

Run all Test cases: ```bash
npm test
```
Start the Nest application: bash npm start This will start the application on http://localhost:<to_port_set_env> make sure you set the api end point to FE.

