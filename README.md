# 🚀 CollabSphere  
## Smart AI-Powered Project Collaboration Platform

---

## 🌍 Overview

**CollabSphere** is a full-stack AI-powered collaboration platform designed to help developers build stronger, smarter, and more reliable teams.

Unlike traditional collaboration tools, CollabSphere introduces an intelligent **AI Compatibility Score (0–100%)** that predicts how well two users will collaborate based on:

- Skill Match & Gaps  
- GitHub Contribution Balance  
- Past Collaboration History  
- Reliability Metrics  

This makes team formation data-driven, transparent, and optimized for success.

---

# ✨ Core Features

## 🔹 Verified Tech Profiles
- GitHub-integrated skill validation
- Reliability scoring
- Availability tracking
- Data-backed verification

---

## 🔹 AI Matchmaking Engine
- Suggests developers based on skill gaps
- Weighted compatibility scoring
- Intelligent team recommendations

---

## 🔹 Project Bazaar
- Post projects with structured Open Roles
- Invite recommended developers
- Organized collaboration feed

---

## 🔹 Real-Time Project Chat
- Project-based chat rooms
- Secure Socket.IO communication
- Live join updates
- Instant message delivery
- Dynamic compatibility refresh

---

## 🔹 AI Compatibility Score (Bonus Feature)

Every team member can view compatibility with collaborators.

### Example API Response

```json
{
  "compatibility": 84,
  "breakdown": {
    "skillScore": 25,
    "githubBalanceScore": 18,
    "collaborationScore": 30,
    "reliabilityScore": 11
  }
}
```

---

# 🧠 Compatibility Model

| Metric | Weight |
|--------|--------|
| Skill Match | 30% |
| GitHub Balance | 20% |
| Collaboration History | 35% |
| Reliability | 15% |

Score is:
- Mutual
- Dynamic
- Based on real collaboration data

---

# 🛠 Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- Socket.IO Client

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication

---

# 🏗 Project Structure

```
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
```

---

# 🔐 Security Features

- JWT-based authentication
- Protected project routes
- Middleware validation
- Secure socket room access
- Environment-based secrets
- No hardcoded credentials

---

# 📡 Key API Endpoints

### Get Project Users
```
GET /projects/:projectId/users
```

### Get Compatibility Between Two Users
```
GET /compatibility/:userAId/:userBId
```

---

# ⚡ Real-Time Workflow

1. User logs in (JWT secured)
2. User joins a project chat room
3. Project members are fetched
4. Compatibility scores calculated dynamically
5. Messages update instantly via WebSockets
6. New users trigger live compatibility refresh

---

# 🧪 Example Scenario

Project Members:
- Creator: Vaish
- Member: Pallu

Displayed:

```
Collaborators & Compatibility
Vaish — 87%
```

The compatibility score is mutual and data-driven.

---

# 🚀 Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/vaishnavi4049/DevCraft-DevDynasty.git
cd DevCraft-DevDynasty
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create a `.env` file inside `/backend`

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secure_jwt_secret
CLIENT_URL=http://localhost:5173
```

Then run:

```bash
npm start
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🌐 MongoDB Configuration

You can use:

## Option 1 — Local MongoDB
Make sure MongoDB service is running locally.

## Option 2 — MongoDB Atlas (Recommended)

Example URI:

```
mongodb+srv://username:password@cluster.mongodb.net/collabsphere
```

Replace inside `.env`:

```
MONGO_URI=your_atlas_connection_string
```

---

# 🔑 Environment Variables

| Variable | Description |

| MONGO_URI | MongoDB Atlas or local connection string |
| JWT_SECRET | Secret key for JWT token signing |

---

# 📄 .env.example (Template)

Create a file named `.env.example` in `/backend`:

```env
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/collabsphere
JWT_SECRET=your_super_secret_key_here
CLIENT_URL=http://localhost:5173
```

⚠ Never commit your real `.env` file.

Add this to `.gitignore`:

```
node_modules
.env
```

---

# 🍴 How To Fork This Repository

1. Click **Fork** (top-right corner of GitHub)
2. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/DevCraft-DevDynasty.git
```

3. Create a feature branch:

```bash
git checkout -b feature-name
```

4. Push changes:

```bash
git push origin feature-name
```

5. Open Pull Request

---

# 🌍 Deployment Guide

## 🔹 Backend (Render)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set Root Directory to `/backend`
4. Add environment variables:
   - MONGO_URI
   - JWT_SECRET
5. Deploy

---



# 🌟 Why CollabSphere?

✔ AI-driven compatibility prediction  
✔ Data-backed collaboration insights  
✔ Intelligent team formation  
✔ Real-time secure communication  
✔ Designed for productivity  

---

## 🏆 Bonus Achievement

This project fulfills:

> Compatibility Score: An AI score predicting how well two users might work together based on real collaboration history.

---

Built with ❤️ using MERN Stack + Intelligent Compatibility Logic.
