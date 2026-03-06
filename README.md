Appointment Management Backend API
Overview

This project is an Appointment Management System built using Node.js, Express, and MongoDB.
The main focus of this project is backend API development, while the frontend provides a basic interface to interact with the APIs.

The system allows users to register, authenticate, and submit appointment requests.
Administrators can manage users and monitor appointment queries.

The backend exposes REST APIs that can be consumed by the frontend or any external API client.

Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

bcrypt (Password Hashing)

Cookie-based Authentication

React.js (Basic UI)

Features

User authentication (Register / Login / Logout)

Secure password hashing using bcrypt

JWT-based authentication

Cookie-based authentication

Role-based access control

Appointment query submission

Admin APIs for managing users

Admin APIs for viewing and deleting queries

RESTful API structure

Role-Based Access

The system supports three types of user roles:

Admin

Admin users have elevated permissions and can:

View all registered users

View all submitted appointment queries

Delete queries when required

Manage system data

Teacher

Teachers can:

Login to the system

View appointment requests submitted to them

Respond or manage appointment requests

Student

Students can:

Register and login

Submit appointment requests

View their own submitted queries

Maintain there Profile 

Role-based access is implemented using middleware that checks the user role before allowing access to protected routes.

Project Structure
Assignment/
│
├── Back-end/
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── config
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── Frontend/
│   ├── adminPanel
│   ├── AppointmentPage
│   └── Dashboard
Installation
Clone the repository
git clone https://github.com/mohitkumar64/Assignment.git

Move into the project folder

cd Assignment
Backend Setup

Move to backend directory

cd Back-end

Install dependencies

npm install
Environment Variables

Create a .env file or add:

Mongouri=your_mongodb_connection_string
SECRET=your_secret_key
Run the Backend Server

Start the development server

npm run dev

Server will run at:

http://localhost:5000
Frontend Setup

Move to frontend folder

cd Frontend

Install dependencies

npm install

Run the Vite server

npm run dev
API Endpoints
Authentication
GET    /api/v1/me
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
Admin Routes
GET      /api/v1/admin/getAllusers
GET      /api/v1/admin/getquery
DELETE   /api/v1/admin/deletequery/:id

These routes require Admin role authentication.

API Testing

APIs can be tested using:

Postman

Thunder Client (VS Code extension)

A Postman Collection containing Admin APIs is included in the repository to simplify testing.

Common APIs such as authentication and appointment submission can be tested using the frontend UI or manually through Postman.

Because the application uses cookie-based authentication, users must login first to receive the authentication cookie before accessing protected routes.

Author

Mohit Kumar
