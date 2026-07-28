# 🚀 LearnStep - Gamified Computer Science Learning Platform

LearnStep is a production-ready educational platform designed to make learning Computer Science intuitive, interactive, and fun for school students and beginners.

---

## 🏛 Architecture Overview

LearnStep follows a decoupled **Client-Server Architecture** with a Java Spring Boot REST API backend, MySQL relational database, and an interactive React SPA frontend powered by custom micro-animations and gamification mechanics.

```
+-------------------------------------------------------------------------+
|                              LEARNSTEP SPA                              |
|   (React 18, React Router 6, Tailwind CSS, Lucide Icons, Framer Motion) |
+-------------------------------------------------------------------------+
       |                                                    |
  REST API (Axios + JWT Auth Header)                   WebSocket / Event Stream
       |                                                    |
+-------------------------------------------------------------------------+
|                          SPRING BOOT BACKEND                            |
| (Spring Security, JWT Filters, JPA/Hibernate, Spring Validation, REST) |
+-------------------------------------------------------------------------+
       |                                                    |
  JPA / JDBC                                           AWS S3 SDK
       |                                                    |
+----------------------+                            +---------------------+
|    MYSQL DATABASE    |                            |   AWS S3 BUCKET     |
| (Normalized Schema)  |                            | (Illustrations/Assets)|
+----------------------+                            +---------------------+
```

---

## 📂 Project Folder Structure

```text
learnstep/
├── backend/                             # Java Spring Boot 3.x Backend
│   ├── pom.xml                          # Maven dependencies & build config
│   └── src/
│       ├── main/
│       │   ├── java/com/learnstep/
│       │   │   ├── LearnstepApplication.java
│       │   │   ├── config/              # App & Web MVC configurations
│       │   │   ├── security/            # Spring Security, JWT Auth filter, token providers
│       │   │   ├── entity/              # JPA Domain Model Entities (User, Lesson, Quiz, etc.)
│       │   │   ├── repository/          # Spring Data JPA Repositories
│       │   │   ├── dto/                 # Data Transfer Objects (Requests/Responses)
│       │   │   ├── service/             # Business Logic & Gamification Engine Services
│       │   │   ├── controller/          # REST API Controllers (@RestController)
│       │   │   └── exception/           # Custom Exception Handlers & @ControllerAdvice
│       │   └── resources/
│       │       ├── application.yml      # Spring Boot environment properties
│       │       └── db/migration/        # Database initialization scripts
│       └── test/                        # Unit and integration test suites
│
└── frontend/                            # React.js SPA Frontend
    ├── package.json                     # Node dependencies & script runners
    ├── vite.config.js                   # Vite bundler configuration
    ├── index.html                       # HTML5 template with Google Fonts (Fredoka, Outfit)
    └── src/
        ├── assets/                      # Gamification badges, avatars, audio SFX, icons
        ├── components/                  # Modular React UI components
        │   ├── common/                  # Navbar, Footer, Modal, Button, Card, ProgressBar
        │   ├── dashboard/               # XP Counter, Streak Widget, Daily Goals, Level Banner
        │   ├── roadmap/                 # Interactive Node Map, Topic Nodes, Lock Badges
        │   ├── lesson/                  # Digital Textbook view, Drag-Drop, Packet Sim, Flashcards
        │   ├── quiz/                    # Quiz Player, MCQ, Drag-Drop, Match, XP Payout Modal
        │   ├── ai/                      # StepAI Chat Drawer, Doubt Resolver, Analogy Generator
        │   └── admin/                   # Lesson Editor, Quiz Creator, Student Management
        ├── context/                     # AuthContext, GamificationContext, ThemeContext
        ├── hooks/                       # Custom hooks (useAuth, useStreak, useAudioSFX)
        ├── pages/                       # Route components (Landing, Roadmap, Lesson, Admin, etc.)
        ├── services/                    # Axios API client instances & endpoints
        ├── styles/                      # Design system tokens, glassmorphism, animations
        └── utils/                       # XP algorithms, date formatters, audio triggers
```

---

## 🎨 Design System & Gamification Mechanics

- **Theme Palette**:
  - `Playful Purple`: `#6C5CE7` (Primary Brand & Accent)
  - `Cyber Mint`: `#00B894` (Success, Correct Answers & XP)
  - `Electric Yellow`: `#FDCB6E` (Badges, Stars & Streaks)
  - `Coral Orange`: `#FF7675` (Alerts, Level Up & Warm Highlights)
  - `Soft Cream / Slate Dark`: `#F8F9FA` / `#1E1F29` (Background modes)
- **Typography**: Fredoka / Outfit (Friendly, rounded headers with maximum legibility for young learners)
- **Gamification Engine**:
  - Base XP: 50 XP per completed lesson module.
  - Quiz Multipliers: 100% score = 1.5x XP bonus + "Perfectionist" badge.
  - Streak System: 3-day streak unlocks bonus avatar frames.

---

## 🚦 Module Progression Roadmap

1. **Module 1**: Architecture & Folder Structure *(Completed)*
2. **Module 2**: Database Schema (SQL Script & ERD mapping)
3. **Module 3**: Spring Boot Backend & Security Setup
4. **Module 4**: Frontend UI/UX Design System & Global Styles
5. **Module 5**: Authentication & User Roles (Student & Admin)
6. **Module 6**: Student Dashboard & Interactive Learning Roadmap
7. **Module 7**: Interactive Lesson Engine ("Digital Textbook Comes Alive")
8. **Module 8**: Gamified Quiz System (5 Question Types)
9. **Module 9**: Progress Tracking, Daily Streaks & Badges
10. **Module 10**: Admin Management Panel
11. **Module 11**: StepAI Learning Assistant
12. **Module 12**: AWS Deployment & Production Guide
