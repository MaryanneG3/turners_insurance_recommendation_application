# Turners Insurance Recommendation App

This full-stack web application helps users explore insurance options using smart AI-powered tools. It features a clean interface and two main tools designed to assist with insurance-related decisions. The entire application is containerized using Docker, making it easy to deploy and run consistently across different environments.

---

## 🔧 Tools Overview

Users can access tools via the **"Tools"** dropdown in the navigation bar.

### 1. 🧠 Insurance Recommendation AI – _Tina the Chatbot_

- **Purpose:** Helps users decide which insurance policy is right for them.
- **Functionality:**

  - Chat-based interface with **Tina**, an AI assistant.
  - Asks a series of questions about the user’s driving habits, vehicle, and needs.
  - Recommends a suitable insurance policy.
  - Explains the reasoning behind the recommendation.

- **Powered by:** Google Generative AI.

### 2. 🚗 Insurance Premium Calculator (Vehicle Detection)

- **Purpose:** Suggests an estimated insurance premium based on the vehicle type.
- **Functionality:**

  - Users upload a photo of a vehicle.
  - Uses **Custom Vision AI** to identify the type of vehicle.
  - Returns an estimated premium based on classification.

- **Status:** Under development — subject to refinement.

---

## ⚙️ Local Development Setup

### Prerequisites

- Node.js v20+ (for manual setup)
- Docker (for containerized setup)

### Manual (non-Docker) Setup

1. **Clone the repo**

```bash
git clone https://github.com/your-username/insurance-recommendation-app.git
cd insurance-recommendation-app
```

2. **Start the frontend**

```bash
cd insurance-recommendation-frontend
npm install
npm run dev
```

3. **Start the backend**

```bash
cd ../insurance-recommendation-backend
npm install
npm run dev
```

---

## 🐳 Docker Setup (Recommended)

For users who prefer Docker:

### Step 1: Build and run the containers

Ensure Docker is installed, then run:

```bash
# From the project root where docker-compose.yml exists (if added)
docker-compose up --build
```

If you're running services separately, you can also:

```bash
# Backend
cd insurance-recommendation-backend
docker build -t insurance-backend .
docker run -p 3002:3002 insurance-backend

# Frontend
cd ../insurance-recommendation-frontend
docker build -t insurance-frontend .
docker run -p 5173:5173 insurance-frontend
```

### Step 2: Access the app

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3002](http://localhost:3002)

> Make sure `.env` files (if used) are present inside both `frontend` and `backend` folders or set up with `docker-compose`.

---

## 📦 Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **AI:** Google Generative AI, Custom Vision
- **Containerization:** Docker

---

## 📌 Notes

- ✅ Insurance Recommendation AI is complete and functional.
- ⚠️ Insurance Premium Calculator is in active development.
- ❌ Mock Interview AI is not documented here.
