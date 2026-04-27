# Digital Waiting Room

Web-based application for managing patient flow in a medical practice.

This project was developed as part of the module **“Project: Software Development”** in the Software Engineering program at IU International University.

The application enables digital patient registration, automatic prioritization in a waiting list, and assignment to examination rooms.

---

## Project Goal

In many medical practices, patient flow is still managed manually, for example using paper lists or simple spreadsheets. This often leads to unclear states, inefficient room coordination, and unnecessary waiting times.

The goal of this application is to develop a digital dashboard that supports the following:

- digital patient registration  
- transparent waiting list management  
- overview of examination rooms  
- structured organization of patient flow  

The application does **not process medical data** and is intended solely for organizational purposes within a medical practice.

---

## Main Features

### Patient Management
- Registration of new patients  
- Automatic recording of arrival time  

### Waiting List
- Display of all waiting patients  
- Automatic sorting by arrival time (FIFO principle)  

### Room Management
- Three examination rooms  
- Display of room status (available / occupied)  

### Patient Flow
- Assignment of the next waiting patient to a room  
- Display of the currently treated patient  
- Completion of a treatment  

### Dashboard
- Overview of the waiting list  
- Status of examination rooms  
- Currently active treatments  

---

## Technology Stack

The application is based on a classic client-server architecture.

### Frontend
- React  
- Vite  
- CSS  

The frontend is implemented as a Single Page Application (SPA) and communicates with the backend via a REST API.

### Backend
- Node.js  
- Express  

The backend implements the application’s business logic and provides REST endpoints.

### Database
- SQLite  

Data is stored locally in a SQLite database.

### ORM
- Prisma  

Prisma is used to abstract communication between the application and the database.

### Testing
- Jest  

Jest is used for unit testing of the backend logic.
