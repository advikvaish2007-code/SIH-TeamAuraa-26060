# ❄️ PolarOps

### Offline-First Operations Platform for Indian Antarctic Research Stations

**Smart India Hackathon 2026 · Problem Statement 26060 · Team Auraa**

[🚀 Live Demo](https://sih-team-auraa-26060.vercel.app/) · [📦 GitHub Repository](https://github.com/advikvaish2007-code/SIH-TeamAuraa-26060)

---

## 🌍 The Problem

Operating a research station in Antarctica is fundamentally different from operating a normal facility.

Stations such as **Maitri and Bharati** operate in extreme environmental conditions with:

- Limited and unreliable satellite connectivity
- Extremely high communication latency
- Critical dependence on fuel and power
- Limited opportunities for physical resupply
- Multiple interconnected infrastructure systems
- A constant need for reliable operational decisions

A conventional cloud-first dashboard breaks down when connectivity disappears.

**PolarOps is designed around that constraint.**

---

## ❄️ What is PolarOps?

**PolarOps is an offline-first digital operations platform for managing remote Antarctic research stations.**

It provides Station Leaders with a single operational interface to monitor:

> **Station Health → Resources → Alerts → Connectivity → Personnel → Infrastructure**

The application continues functioning when the network is unavailable. Operational changes are stored locally and automatically synchronized with the backend when connectivity returns.

### The core idea

**The station should never stop working just because the internet does.**

---

## 🚀 Live Application

### 🖥️ PolarOps Dashboard

**[Open Live Demo →](https://sih-team-auraa-26060.vercel.app/)**

The current application provides an operational dashboard with station switching, telemetry, resource monitoring, alerts, connectivity status and offline synchronization.

---

# ⚡ Core Capabilities

| Capability | What PolarOps Does |
|---|---|
| 🛰️ **Offline-First Operations** | Stores actions locally and synchronizes them when connectivity returns |
| 📡 **Connectivity Monitoring** | Displays connection state, bandwidth and synchronization status |
| 🌡️ **Live Telemetry** | Monitors station temperature and power output |
| 🚨 **Operational Alerts** | Highlights critical conditions requiring attention |
| ⛽ **Resource Monitoring** | Tracks fuel reserves and consumption trends |
| 🗺️ **System Topology** | Visualizes the health of interconnected station subsystems |
| 📝 **Decision Briefs** | Generates compact operational summaries for HQ |
| 🏢 **Multi-Station Operations** | Supports switching between Maitri and Bharati |
| 🆘 **Emergency SOS** | Provides immediate access to emergency operations |
| 🔔 **Notifications** | Surfaces unread operational alerts |
| 👤 **Role-Based Interface** | Designed around Station Leader and HQ workflows |

---

# 🧠 Built Around One Principle

## **Offline First. Online When Available.**

Most modern dashboards assume:

```text
Internet → API → Database → UI
```

PolarOps reverses that assumption.

```text
                 ┌─────────────────────┐
                 │   PolarOps UI       │
                 │   Next.js / React   │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Local Storage     │
                 │   Dexie / IndexedDB │
                 └──────────┬──────────┘
                            │
                  Network Available?
                     /            \
                   YES             NO
                    │               │
                    ▼               ▼
             Sync with API      Keep Working
                    │
                    ▼
             ┌─────────────────┐
             │ FastAPI Backend │
             └─────────────────┘
```

### When the network is available

```text
User Action
     ↓
Local Database
     ↓
UI Updates Immediately
     ↓
Background Sync
     ↓
FastAPI
```

### When the network disappears

```text
User Action
     ↓
Local Database
     ↓
UI Updates Immediately
     ↓
Action Added to Sync Queue
     ↓
Network Returns
     ↓
Automatic Synchronization
```

The user does **not** have to wait for the server before continuing their work.

---

# 🛰️ System Architecture

```text
                         POLAROPS
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
      ANTARCTIC STATION                 HQ / CLOUD
             │                             │
     ┌───────┴────────┐                    │
     │                │                    │
     ▼                ▼                    ▼
 Next.js UI       Dexie.js             FastAPI
 React            IndexedDB            REST API
     │                │                    │
     │                │                    ▼
     │                │              Persistent
     │                │                Storage
     │                │
     └────── Sync ────┴────────────────────┘
```

### Frontend

The frontend is responsible for:

- Operational dashboard
- Telemetry visualization
- Alerts
- Inventory
- Station switching
- Connectivity indicators
- Offline data persistence
- Synchronization queue

### Backend

The FastAPI backend provides:

- REST APIs
- Centralized station data
- Synchronization endpoints
- Server-side operations
- Persistent storage

---

# 📊 Station Dashboard

The dashboard is designed to answer one question:

## **"What needs attention right now?"**

Instead of forcing the Station Leader to inspect raw data, PolarOps surfaces operational indicators directly.

### Current dashboard indicators

**🌡️ Outside Temperature**

`-17.2°C`

Provides environmental context for station operations.

**⚡ Power Output**

`94%`

Indicates current generator/power availability.

**⛽ Fuel Reserve**

`41 days`

Displays remaining fuel as operational time rather than simply showing a raw quantity.

**👥 Personnel**

`18 / 18`

Provides an immediate station headcount.

---

# 🚨 Smart Alerts

PolarOps converts raw operational measurements into actionable alerts.

Example:

```text
⚠ WARNING

Fuel reserve below 45 days

Current reserve: 41 days
Consumption: 1.6 days/day

Recommended action:
Review upcoming resupply requirements.
```

Alerts are categorized by severity and provide:

- Severity
- Timestamp
- Acknowledge action
- Details
- Operational context

The goal is to reduce the time between **detecting a problem and making a decision**.

---

# ⛽ Resource Intelligence

Fuel is not represented only as a quantity.

PolarOps translates resource availability into operational meaning.

```text
Fuel Available
      ↓
Consumption Rate
      ↓
Estimated Days Remaining
      ↓
Resupply Window
      ↓
Operational Risk
```

For example:

```text
Fuel Reserve
41 days

Daily Burn
1.6 days/day

Next Resupply Window
52 days

Status
⚠ Operational Risk
```

This makes the dashboard useful for planning rather than simply monitoring.

---

# 🗺️ System Topology

Antarctic station infrastructure is interconnected.

A failure in one subsystem can affect another.

PolarOps therefore provides a topology view of major systems:

```text
                 ┌──────────┐
                 │  POWER   │
                 └────┬─────┘
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       ┌──────┐   ┌──────┐   ┌────────┐
       │ HVAC │   │ HAB  │   │  LABS  │
       └──────┘   └──────┘   └────────┘
                       │
                       ▼
                  ┌─────────┐
                  │  STORE  │
                  └─────────┘
```

Each subsystem can be represented as:

- 🟢 Nominal
- 🟡 Degraded
- 🔴 Critical
- ⚫ Offline

This allows operators to understand **where a problem originates and what it may affect**.

---

# 📝 Daily Decision Brief

Communication bandwidth in Antarctica is a constraint.

Sending an entire dashboard state to HQ is inefficient.

PolarOps instead generates a compact operational summary containing the information HQ actually needs.

Example:

```text
STATION: MAITRI

STATUS: DEGRADED

Power: 94%
Fuel: 41 days
Personnel: 18/18
Temperature: -17.2°C

ALERTS:
1 critical
2 warnings

ACTION REQUIRED:
Fuel resupply review
```

### Design target

**~0.9 KB operational payload**

The idea is simple:

> **Send decisions, not dashboards.**

---

# 🏢 Multi-Station Operations

PolarOps supports multiple Antarctic stations from a single interface.

Currently represented:

### 🇮🇳 Maitri

India's primary Antarctic research station.

### 🇮🇳 Bharati

India's second permanent Antarctic research station.

The Station Leader can switch between station contexts without changing applications.

---

# 📡 Connectivity-Aware Interface

Connectivity is treated as an operational variable.

The interface exposes:

```text
● CONNECTED

Bandwidth: 2.4 Mbps
Last Sync: 14:32:08
Next Sync: 00:42
```

or:

```text
● OFFLINE

Local Mode Active

Pending Changes: 7
Last Sync: 14:21:33
```

This gives the operator immediate visibility into whether data is:

- Local
- Synchronized
- Pending
- Stale

---

# 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js |
| UI | React + TypeScript |
| Styling | Tailwind CSS |
| Local Storage | Dexie.js |
| Browser Database | IndexedDB |
| Backend | FastAPI |
| API | REST |
| Deployment | Vercel |
| UI Prototyping | v0 |

> **Note:** Add the exact database, authentication, charting and PWA technologies here once they are confirmed in the repository.

---

# 📂 Repository

```text
SIH-TeamAuraa-26060/
│
├── polar-ops/
│   │
│   ├── frontend/
│   │   └── Next.js application
│   │
│   ├── backend/
│   │   └── FastAPI application
│   │
│   └── ...
│
└── README.md
```

---

# 🚀 Running Locally

## 1. Clone the repository

```bash
git clone https://github.com/advikvaish2007-code/SIH-TeamAuraa-26060.git

cd SIH-TeamAuraa-26060
```

## 2. Start the frontend

```bash
cd polar-ops
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

## 3. Start the backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend:

```text
http://localhost:8000
```

> Update the commands above if the final repository structure or FastAPI entry point differs.

---

# 🔭 Roadmap

PolarOps is designed as a foundation for a larger Antarctic operations management system.

### Operations

- [ ] Complete Alerts workflow
- [ ] Task management
- [ ] Emergency drills
- [ ] Incident management

### Infrastructure

- [ ] Predictive maintenance
- [ ] Asset lifecycle tracking
- [ ] Advanced dependency analysis
- [ ] Equipment failure prediction

### Personnel

- [ ] Personnel roster
- [ ] Health and safety tracking
- [ ] Shift management
- [ ] Emergency personnel location

### Logistics

- [ ] Resupply planning
- [ ] Cargo tracking
- [ ] Weather-aware logistics
- [ ] Resource forecasting

### Platform

- [ ] Station Leader / HQ / Scientist roles
- [ ] Authentication
- [ ] Audit logs
- [ ] Exportable reports
- [ ] Progressive Web App
- [ ] Advanced synchronization conflict resolution

---

# 🏆 Why PolarOps?

Traditional dashboards assume reliable connectivity.

**Antarctica doesn't.**

PolarOps is designed around the operational realities of remote polar research:

> **Low bandwidth.**
>
> **Intermittent connectivity.**
>
> **Critical infrastructure.**
>
> **Limited resupply opportunities.**
>
> **Zero tolerance for operational blindness.**

Instead of building another cloud dashboard, PolarOps treats **connectivity itself as part of the system design.**

---

## 🔗 Links

**🚀 Live Demo:**  
https://sih-team-auraa-26060.vercel.app/

**📦 GitHub:**  
https://github.com/advikvaish2007-code/SIH-TeamAuraa-26060/

---

<div align="center">

### ❄️ PolarOps

**Operational intelligence for India's Antarctic frontier.**

**Smart India Hackathon 2026 · PS 26060 · Team Auraa**

</div>
