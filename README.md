
# 🏎️ Apex Tracker

F1 Data-Tracker für Teams, Fahrer und Fahrzeuge.
Modul 295 Projekt - BWZ Rapperswil-Jona

---

## Technologien

**Backend:** Next.js, TypeScript, NeDB, JWT
**Frontend:** Vite, TypeScript, HTML/CSS

---

## Installation

### 1. Repository klonen

```bash
git clone <repository-url>
cd m295-apex-tracker
```

### 2. Backend starten

```bash
cd backend
npm install
npm run dev
```

→ Läuft auf http://localhost:3000

### 3. Frontend starten (neues Terminal)

```bash
cd frontend
npm install
npm run dev
```

→ Läuft auf http://localhost:5173

---

## Konfiguration

Erstelle `backend/.env`:

```env
JWT_SECRET=dein-geheimer-schluessel-hier-mindestens-64-zeichen
```

---

## API Endpoints

| Methode | Endpoint               | Beschreibung                  |
| ------- | ---------------------- | ----------------------------- |
| POST    | `/api/auth/register` | Registrierung                 |
| POST    | `/api/auth/login`    | Login                         |
| GET     | `/api/garage`        | Favoriten abrufen             |
| PUT     | `/api/garage`        | Favorit hinzufügen/entfernen |

---

## Test-Login

| E-Mail            | Passwort  |
| ----------------- | --------- |
| admin@example.com | $user1234 |

---

## Autoren

Noel Oberlin & Felix Vogele
© 2025
