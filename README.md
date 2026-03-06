# Appointment Management Backend API

## Overview

This project is an **Appointment Management system** built using **Node.js, Express, and MongoDB**.
The main focus of the project is the **backend architecture and API development**, while the frontend provides a **basic UI** to interact with the APIs.

The system allows users to register, authenticate, and book appointments, while administrators can manage users and view submitted appointment requests.

The backend exposes REST APIs that can be used by the provided UI or any external client application.


## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)
* Cookie-based authentication
* React.js

---

## Features

* User authentication (login/register)
* Secure password hashing using bcrypt
* JWT-based authentication
* Admin APIs for managing users
* Admin APIs for viewing and deleting submitted queries
* Cookie authentication support
* RESTful API structure
* student and teacher role for appointment

---

## Project Structure

Back-end/
│
├── controllers
├── routes
├── models
├── middleware
├── config
├── server.js
├── package.json
├── README.md
└── .env.example

Frontend/
|
├── adminPanel
├──Appointment Page
├──Dashboard


---

## Installation

Clone the repository

git clone https://github.com/mohitkumar64/Assignment.git

Move into the project folder

cd Assignment


move to Back-end

Install dependencies

npm install 


---

## Environment Variables

go in .env and put a mongouri
Monguri=your_mongodb_connection_string

---

## Run the Server

Start the development server

npm run dev

or

http://localhost:5000

---


move to Frontend

Install dependencies

npm install 

##Run the vite server 

npm run dev



## API Endpoints

### Authentication

GET /api/v1/me
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout

### Admin Routes

GET /api/v1/admin/getAllusers
GET /api/v1/admin/getquery
DELETE /api/v1/admin/deletequery/:id

---

## API Testing

You can test the APIs using:

* Postman
* Thunder Client (VS Code extension)

A Postman collection can be included in the repository for easier testing.

---

## Scalability Notes

If the system needs to scale for larger traffic, the following improvements can be implemented:

* Introduce **Redis caching** for frequently accessed data
* Use **load balancing** (NGINX / cloud load balancers)
* Split services into **microservices** (auth, users, queries)
* Use **containerization (Docker)** for easier deployment
* Implement **rate limiting and monitoring** for security and performance

---

## Author






Mohit kumar
