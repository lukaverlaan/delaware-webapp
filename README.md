# Delaware Management - Web Application

**Note:** This repository is still under development: you cannot launch the web application yet, but it will be updated once the project has been completed.

This repository does not contain many commits because it was transferred from a group (school) repository.

## 📖 About The Project

This project is a modern web application developed for **delaware** as part of a group assignment at school.

The goal of the application is to provide a centralized platform for managing:
- Employees
- Tasks
- Planning
- Operational sites

The platform focuses on usability, scalability, and a clean user experience through a modern dashboard interface.

---

## ✨ Features

### Dashboard
- Overview statistics
- Upcoming tasks
- Notifications
- Task distribution charts

### User Management
- Employee overview
- User detail pages
- Role management
- Status indicators

### Site Management
- Interactive map integration
- Site capacity monitoring
- Health & activity status

### Planning & Tasks
- Task planning system
- Task assignment
- Schedule overview

---

## 🛠️ Built With

- HTML5
- CSS3
- TypeScript
- React
- Vite.js
- Leaflet Maps
- REST API

---

## 👨‍💻 Team Project

This application was developed as a collaborative school project for delaware.

### Team Members
- Luka Verlaan
- Johannes Verdonck
- Zander Van Kerckhove

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/lukaverlaan/delaware-webapp.git
```

Open the folder in a (bash) terminal

### Backend
Navigate to the *backend* folder

Create a `.env` (development) or `.env.test` (testing) file with the following template. Complete the environment variables with your secrets, credentials, etc.

```bash
# General configuration
NODE_ENV=development
PORT=3000

# Database configuration
DATABASE_URL=mysql://devusr:devpwd@localhost:3306/delaware

# CORS configuration
CORS_ORIGINS=["http://localhost:5173"]
CORS_MAX_AGE=10800

# Auth configuration
AUTH_JWT_SECRET=eensuperveiligsecretvoorindevelopment
```

Install dependencies:

```bash
pnpm install
```

Start the docker container:

```bash
docker compose up -d
```

Start the development server:

```bash
pnpm start:dev
```

### Frontend
Navigate to the *frontend* folder

Create a `.env` (development) or `.env.test` (testing) file with the following template. Complete the environment variables with your secrets, credentials, etc.

```bash
# Backend connection
VITE_API_URL='http://localhost:3000/api'
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

When you've completed these steps, you can visit the webapp by clicking [here](http://localhost:5173/)

---

## 📚 Learning Goals

This project helped me gain experience with:
- Frontend development
- UI/UX design
- Team collaboration
- Git & GitHub workflows
- Component-based architecture
- API integration

---

## 📄 License

This project was created for educational purposes.