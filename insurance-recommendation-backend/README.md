# Turners Insurance Recommendation – Backend

This is the backend for the Turners Insurance Recommendation App. It’s built with **Node.js** and **Express**, and powers the AI chatbot (Tina) and insurance-related calculations.

## 📦 Features

- REST API for AI chatbot (Tina)
- Integration with:
  - Google Generative AI (for recommendations)
  - Custom Vision AI (for vehicle type detection – WIP)
- CORS and environment-based configuration

## 🚀 Local Development

### Prerequisites

- Node.js v20+
- npm

### Steps

```bash
# Navigate to the backend folder
cd insurance-recommendation-backend

# Install dependencies
npm install

# Run with nodemon (development)
npm run dev
```

API runs at: [http://localhost:3002](http://localhost:3002)

---

## 🐳 Docker Setup

### Build the Docker image

```bash
docker build -t insurance-backend .
```

### Run the container

```bash
docker run -p 3002:3002 insurance-backend
```

> Make sure any `.env` file required (e.g., for API keys) is available and configured.

---

## ⚙️ Tech Stack

- Node.js
- Express
- Google Generative AI
- Custom Vision AI (in development)
