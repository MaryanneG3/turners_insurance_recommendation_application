# Turners Insurance Recommendation Application

## Overview
The **Turners Insurance Recommendation Application** is a web-based tool designed to provide insurance recommendations based on user input. The application features an AI-driven recommendation system, an insurance premium calculator, and a mock job interview AI.

The project consists of two main components:
- **Frontend:** Built with React and Vite.
- **Backend:** A Node.js and Express-based API.

## Features
### **1. Insurance Recommendation AI**
- Located in the **Tools** dropdown menu.
- Provides personalized insurance recommendations based on user responses.

### **2. Insurance Premium Calculator**
- Allows users to estimate insurance premiums.

### **3. AI Job Interviewer**
- Conducts mock job interviews to help users prepare for real interviews.

## Folder Structure
```plaintext
├── README.md
├── docker-compose.yml
├── insurance-recommendation-backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│       ├── index.js
│       ├── controllers/
│       │   ├── interviewerController.js
│       │   └── tinaController.js
│       └── routes/
│           ├── interviewerRoutes.js
│           └── tinaRoutes.js
└── insurance-recommendation-frontend/
    ├── README.md
    ├── Dockerfile
    ├── package.json
    ├── vite.config.js
    ├── src/
        ├── App.jsx
        ├── components/
        ├── layouts/
        ├── pages/
            ├── homepage/
            ├── insurancePremiumCalculator/
            ├── insuranceRecommendationAI/
            └── mockInterviewpage/
```

## Installation & Running the Application
### **1. Prerequisites**
Ensure you have the following installed:
- Node.js (v20.18.0)
- Docker
- Docker Compose

### **2. Clone the Repository**
```sh
git clone https://github.com/your-repo/maryanneg3-turners_insurance_recommendation_application.git
cd maryanneg3-turners_insurance_recommendation_application
```

### **3. Run with Docker Compose**
```sh
docker-compose up --build
```

This will start both the frontend and backend services.

### **4. Running Locally Without Docker**
#### **Backend**
```sh
cd insurance-recommendation-backend
npm install
npm start
```

#### **Frontend**
```sh
cd insurance-recommendation-frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173/`.

## Accessing Features
### **1. Insurance Recommendation AI**
- Navigate to the **Tools** dropdown menu in the navbar.
- Click on **Insurance Recommendation AI** to start the questionnaire.

### **2. Insurance Premium Calculator**
- Navigate to the **Tools** dropdown menu.
- Click **Insurance Premium Calculator** to input vehicle details and get an estimate.

### **3. AI Job Interviewer**
- Navigate to the **Tools** dropdown menu.
- Click **Mock Interview AI** to simulate a job interview experience.

## Contributing
Pull requests are welcome. Please open an issue first to discuss any major changes.

## License
This project is licensed under the MIT License.

