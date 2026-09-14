# 🌾 KisanBazar - Direct Farmer-to-Consumer Agri-Tech SaaS Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-brightgreen)](https://nodejs.org)
[![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-blue)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-forestgreen)](https://www.mongodb.com/cloud/atlas)
[![Voice Assistant](https://img.shields.io/badge/Voice%20Assistant-28%2B%20Indian%20Languages-orange)](#-multilingual-voice-assistant)
[![Deployment](https://img.shields.io/badge/Deployment-100%25%20FREE%20(Vercel%20%2F%20Render)-purple)](#-100-free-deployment-guide-step-by-step)

> **KisanBazar** is a world-class, full-stack Agri-Tech SaaS e-commerce web application designed for Final Year Resume & Portfolio presentation. It eliminates middlemen by connecting local farmers directly with consumers for fresh, organic produce.

---

## 🌟 Key Highlights & World-Class Features

- 🌾 **Direct Farmer-to-Consumer Marketplace (Zero Middlemen)**: Clean separation of Farmer vs. Consumer roles with distinct portals, dashboards, and direct ordering.
- 🎙️ **Multilingual Voice Assistant (28+ Indian Languages + English)**:
  - Speech Recognition (Speech-to-Text) & Voice Output (Text-to-Speech) built using browser Web Speech API (100% FREE).
  - Supports **Telugu (`te-IN`), Hindi (`hi-IN`), Tamil (`ta-IN`), Kannada (`kn-IN`), Malayalam (`ml-IN`), Marathi (`mr-IN`), Gujarati (`gu-IN`), Punjabi (`pa-IN`), Bengali (`bn-IN`), Odia (`or-IN`), Bhojpuri, English (`en-IN`)**, and all 28+ Indian state languages!
  - Voice navigation & voice-activated login assistance for farmers who cannot read/type English.
- ⚡ **1-Click Quick Demo Login Mode**:
  - Built-in instant login buttons (`🌾 Demo Farmer`, `🛒 Demo Consumer`, `👑 Demo Admin`) for recruiters and evaluators to test live deployments without registering.
- 💬 **Direct Messaging System**: Real-time communication between buyers and farmers for order negotiations and produce inquiry.
- 📊 **Farmer SaaS Dashboard & Plans**: Product management, inventory tracking, sales analytics, and SaaS subscription tiers.
- 💼 **Resume & Portfolio Showcase Ready**: Built with clean architecture, GitHub & LinkedIn developer social profile badges integrated into the UI.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Redux Toolkit, React Router v7, React Icons, Web Speech API.
- **Backend**: Node.js, Express.js (REST API), JWT Auth, Multer, Cookie-Parser, Mongoose.
- **Database**: MongoDB Atlas (Free Cloud Cluster).
- **Deployment**: Vercel / Render / Docker (100% Free Tiers).

---
## 📁 Repository Structure

```plaintext
├── api/                           # Backend Express API
│   ├── controllers/               # Route logic handlers
│   ├── db/                        # Mongoose DB connection
│   ├── models/                    # Data Schemas (User, Product, Order, etc.)
│   ├── routes/                    # API Endpoints
│   ├── index.js                   # Main Server Entrypoint
│   └── vercel.json                # API Vercel Serverless Config
├── client/                        # Frontend React Vite Client
│   ├── src/
│   │   ├── components/            # Reusable UI + Multilingual VoiceAssistant
│   │   ├── pages/                 # Public, Farmer, Consumer, and Admin pages
│   │   ├── redux/                 # Redux Toolkit Slices
│   │   └── config/                # API Config
│   └── package.json
├── vercel.json                    # Root Monorepo Vercel Deployment Config
├── render.yaml                    # Render Blueprint 1-Click Deployment Config
├── Dockerfile                     # Docker Container Config
├── docker-compose.yml             # Local/Cloud Docker Compose Stack
└── README.md
