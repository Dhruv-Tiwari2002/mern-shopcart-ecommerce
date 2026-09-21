🛒 ShopCart - Full-Stack MERN E-Commerce Platform

A production-ready, full-stack web application built to deliver a seamless shopping experience. It features secure user authentication, global state management for cart operations, and a dynamic product catalog.

🔗 Live Demo

Check out the live website here: https://mern-shopcart-ecommerce.vercel.app/

✨ Features

Secure User Authentication: Registration and login functionality using secure credentials and CORS-enabled cross-origin requests.

Dynamic Product Catalog: Browse a complete inventory filtered by categories with dynamic routing handling the UI.

Global Cart State: Efficient cart management (Add, Update, Remove) powered by Redux Toolkit.

Responsive UI: Modern, clean, and mobile-friendly interface designed with Tailwind CSS.

RESTful API: Robust Express backend communicating securely with a cloud-hosted MongoDB cluster.

🛠️ Tech Stack

Frontend: React.js (Bootstrapped with Vite), Redux Toolkit, Tailwind CSS, React Router DOM

Backend: Node.js, Express.js, CORS

Database: MongoDB Atlas (Cloud-hosted)

Deployment: Vercel (Frontend - complete with vercel.json SPA routing), Render (Backend)

📂 Folder Structure

mern-shopcart-ecommerce/
├── backend/
│   ├── config/          # Database connection setup
│   ├── controllers/     # Route logic (auth, products, cart)
│   ├── models/          # MongoDB Mongoose schemas
│   ├── routes/          # Express API routes
│   └── server.js        # Main entry point & CORS configuration
│
└── frontend/
    ├── public/          # Static assets
    ├── src/
    │   ├── components/  # Reusable React components
    │   ├── pages/       # Page views (Home, Login, Register, Products)
    │   ├── redux/       # Redux store and slices (state management)
    │   ├── App.jsx      # Main application routing
    │   └── main.jsx     # Vite React mounting point
    ├── vercel.json      # Vercel SPA routing configuration
    └── package.json     # Frontend dependencies


🚀 Local Development Setup

To run this project locally on your machine, follow these steps:

1. Clone the repository:

git clone https://github.com/Dhruv-Tiwari2002/mern-shopcart-ecommerce.git
cd mern-shopcart-ecommerce


2. Setup the Backend:

cd backend
npm install


Create a .env file in the backend folder and add the following variables:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key


Start the backend server:

npm start


3. Setup the Frontend:
Open a new terminal window and navigate to the frontend directory:

cd frontend
npm install


Start the Vite development server:

npm run dev


🧠 Deployment Notes

CORS: The backend is configured to accept credentials from both localhost:5173 and the production Vercel URL.

SPA Routing: The frontend utilizes a vercel.json rewrite rule to redirect all unhandled paths to index.html, ensuring React Router works correctly in production without throwing 404 errors on page refresh.
