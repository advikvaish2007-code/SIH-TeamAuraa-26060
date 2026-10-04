# PolarOps Full-Stack Application

PolarOps is an integrated operations management platform for remote Antarctic research stations.

## Architecture

This is ONE unified full-stack web application with the following components:
- **Frontend**: Next.js (React 19, Tailwind CSS v4)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (currently configured to use SQLite for rapid local development)
- **Offline Storage**: Dexie (IndexedDB) with persistent sync queue

## Development Setup

1. **Install Root Dependencies**
   ```powershell
   npm install
   ```

2. **Frontend Setup**
   Ensure dependencies are installed:
   ```powershell
   cd frontend
   npm install
   cd ..
   ```

3. **Backend Setup**
   Ensure Python virtual environment is set up and dependencies are installed:
   ```powershell
   cd backend
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   python -m app.seed  # Seeds the database with Maitri/Bharati
   cd ..
   ```

## Running the Application

To start the unified application (both frontend and backend concurrently):
```powershell
npm run dev
```

- Frontend runs at: `http://localhost:3000`
- Backend API runs at: `http://localhost:8000/api`
- Backend Swagger Docs at: `http://localhost:8000/docs`

## Features

- **Offline-First Capabilities**: Performs local updates instantly in Dexie and synchronizes with the FastAPI backend when the connection is restored.
- **Dynamic Station Switcher**: Full context switching between Maitri and Bharati operational data.
- **Persistent Sync Queue**: All mutations are queued across page reloads to ensure robust connection recovery in extreme environments.
