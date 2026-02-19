CollabSphere - Smart AI-Powered Project Collaboration Platformp

Overview

CollabSphere is a full-stack collaboration platform designed to help developers build stronger teams through intelligent matchmaking and real-time communication.
Unlike traditional project platforms, CollabSphere introduces an AI-powered Compatibility Score that predicts how well two users might collaborate based on skills, experience, reliability, and past project history.
This makes team formation smarter, more data-driven, and more successful.

 Core Features

1. Comprehensive Tech Profiles: Users define "Verified Skills" (e.g. GitHub
integration) rather than just self-claimed titles.

2. The Matchmaking Algorithm: A logic engine that suggests teams based on
"Skill Gaps".

3. Project Bazaar: A structured feed where projects can post "Open Roles"

4. Real-Time Project Chat
Project-based chat rooms
Instant messaging using Socket.IO
Live user join updates
Smooth and responsive UI
Secure room-based communication

 5. AI Compatibility Score (Bonus Feature)
An intelligent 0–100% score that predicts how well two users might work together.
Every project member can view compatibility with other collaborators.
Compatibility Scoring Model
The score is calculated using weighted real-world collaboration metrics:


* Tech Stack
Frontend
React.js
Tailwind CSS
Axios
React Router
Socket.IO Client
Backend
Node.js
Express.js
MongoDB
Mongoose
Socket.IO
JWT Authentication

 Project Architecture
CollabSphere/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
│
└── README.md



 Key API Endpoints
 Get Project Users
GET /projects/:projectId/users

All team members
- Get Compatibility Between Two Users
GET /compatibility/:userAId/:userBId


Response:

{
  "compatibility": 84,
  "breakdown": {
    "skillScore": 25,
    "githubBalanceScore": 18,
    "collaborationScore": 30,
    "reliabilityScore": 11
  }
}

- Real-Time Workflow
User logs in securely (JWT)
User joins a project chat room
All project users are fetched (creator + team)
Compatibility scores are calculated dynamically
Messages update instantly via WebSockets
New users joining trigger live compatibility updates

- Example Scenario
Project Members:
Creator: Vaish
Member: Pallu
Both users see:

Collaborators & Compatibility
Vaish — 87%


The score is mutual and data-driven.

-Security Features
JWT-based authentication
Protected project routes
Auth middleware validation
User-specific socket room access
Secure API communication

 What Makes CollabSphere Unique?

Unlike traditional collaboration tools, CollabSphere:

✔ Uses real project data to predict collaboration success
✔ Encourages balanced and reliable team formation
✔ Rewards proven teamwork history
✔ Provides intelligent collaboration insights
✔ Aligns with AI-driven productivity principles

This directly fulfills the bonus requirement:

Compatibility Score: An AI score predicting how well two users might work together based on past project history.


- Installation & Setup
1️.Clone Repository
git clone [https://github.com/your-username/collabsphere.git](https://github.com/vaishnavi4049/DevCraft-DevDynasty)
cd collabsphere

2️. Backend Setup
cd backend
npm install
npm start

3️. Frontend Setup
cd frontend
npm install
npm run dev


Make sure MongoDB is running locally or configure your MongoDB Atlas URI.

📄 License

This project is licensed under the MIT License.

