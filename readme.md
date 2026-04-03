## AI Ticket Analyzer System

A full-stack application that analyzes user support tickets, classifies them into categories, assigns priority, extracts keywords, and stores them in a database.

⸻

🚀 Features
	•	📥 Submit support tickets
	•	🧠 Automatic ticket analysis (category, priority, keywords)
	•	💾 Store tickets in MySQL database
	•	📊 View all submitted tickets
	•	⚡ Real-time frontend + backend integration

⸻

🏗️ Tech Stack

Frontend
	•	React.js
	•	Axios

Backend
	•	Node.js
	•	Express.js

Database
	•	MySQL

⸻

📁 Project Structure
backend/
├── controllers/
│   └── ticketController.js
├── services/
│   └── analyzer.js
├── models/
│   └── db.js
├── routes/
│   └── ticketRoutes.js
├── config/
│   └── dbConfig.js
├── app.js

frontend/
├── src/
│   └── App.js

🔹 Database design

CREATE DATABASE ticketdb;

USE ticketdb;
```
CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TEXT,
  category VARCHAR(50),
  priority VARCHAR(50),
  keywords TEXT,
  urgency VARCHAR(50),
  confidence FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

🔹 4. Frontend Setup
cd frontend
npm install
npm start

🔹 2. Backend Setup
cd backend
npm install

🔌 API Endpoints

🔹 Analyze Ticket

POST /tickets/analyze

Request Body:
{
  "message": "My app is crashing on login"
}
Response:
{
  "category": "Technical",
  "priority": "High",
  "keywords": ["crashing", "login"],
  "urgency": "Immediate",
  "confidence": 0.87
}

🧠 Architecture Overview

Frontend (React)
        ↓
API Layer (Express Routes)
        ↓
Controller Layer
        ↓
Service Layer (Analyzer Logic)
        ↓
Database Layer (MySQL)


🧩 Design Notes

🔹 1. Modular Design
	•	Code is separated into controllers, services, and routes
	•	Improves scalability and maintainability

🔹 2. Analyzer Logic
	•	Rule-based classification using keyword matching
	•	Easily extendable to AI/LLM-based systems

🔹 3. Database Design
	•	Structured schema for storing analyzed ticket data
	•	JSON used for flexible keyword storage

🔹 4. Error Handling
	•	Validation for missing/invalid input
	•	Proper HTTP status codes (400, 500)

🔹 5. Scalability
	•	Service layer allows easy integration of:
	•	OpenAI / LLM APIs
	•	Advanced NLP models


Design Decisions
	•	Layered Architecture: Separated frontend, backend, services, and database for maintainability and scalability.
	•	RESTful API Structure: Simple, consistent endpoints (POST /tickets/analyze, GET /tickets) for ease of integration with React frontend.
	•	Data Model: Chose a relational MySQL table for tickets with columns for message, category, priority, keywords, urgency, and confidence. This structure ensures data integrity, allows sorting/filtering, and makes analytics straightforward.
	•	Analyzer Design: Implemented a rule-based keyword matching system for ticket classification and priority assignment. This was simple to implement, interpretable, and sufficient for a small-scale prototype.

Trade-offs
	•	Rule-based analysis vs AI/ML: Chose a keyword-based approach due to time constraints and simplicity. While fast and interpretable, it cannot handle nuanced language or unseen phrases as well as an LLM or trained ML model.
	•	Frontend integration: Used React with Axios directly rather than introducing a state management library (like Redux) to keep the project lightweight and focused on core features.
	•	Dockerization: Used Docker Compose for frontend, backend, and MySQL for reproducibility, though it adds a learning curve for first-time users.

Limitations
	•	The ticket analyzer is not fully AI-powered; complex or ambiguous tickets may be misclassified.
	•	No authentication or role-based access — all users can submit or view tickets.
	•	Scalability: Keyword-based analysis may become inefficient for very large ticket volumes.
	•	UI: The frontend is basic and functional but lacks advanced dashboard features or search/filtering options.

Future Improvements
	•	Integrate OpenAI GPT or ML/NLP models for more accurate and context-aware ticket classification.
	•	Add authentication and authorization to secure ticket submissions and admin views.
	•	Enhance the frontend UI/UX with dashboards, charts, and ticket filtering.
	•	Optimize database queries and implement caching for large-scale deployments.
	•	Add automated testing and CI/CD for production readiness.
