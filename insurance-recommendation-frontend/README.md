# Turners Insurance Recommendation – Frontend

This is the frontend for the Turners Insurance Recommendation App. It’s built with **React** using **Vite** and provides a user-friendly interface for interacting with AI-powered insurance tools.

## 📦 Features

- Navigation bar with a dropdown to choose tools
- AI chatbot interface (Tina) for personalized insurance recommendations
- Image upload interface for vehicle-based premium estimation (in development)
- Responsive design

## 🚀 Local Development

### Prerequisites

- Node.js v20+
- npm

### Steps

```bash
# Navigate to the frontend folder
cd insurance-recommendation-frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

Access the app at: [http://localhost:5173](http://localhost:5173)

---

## 🐳 Docker Setup

### Build the Docker image

```bash
docker build -t insurance-frontend .
```

### Run the container

```bash
docker run -p 5173:5173 insurance-frontend
```

> Ensure the backend is running and accessible at the expected API URL from the frontend.

---

## ⚙️ Tech Stack

- React (Vite)
- CSS Modules
- Font Awesome
