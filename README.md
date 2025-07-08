# Notes App 📝

A simple **Vue 3** single‑page application for creating, reading, updating and deleting personal notes. Styled with **Tailwind CSS v4** and managed with **Pinia** (state) — fully client‑side and deployed on **Vercel**.

---

## ✨ Demo

> [https://notes-azza.vercel.app](https://notes-azza.vercel.app/)

---

## Features

| Feature          | Description                                              |
| ---------------- | -------------------------------------------------------- |
| **Create**       | Add a new note (title & content) via smooth modal dialog |
| **Read**         | Responsive grid (1‑3 columns) displays all notes         |
| **Update**       | Edit existing note in place (modal pre‑filled)           |
| **Delete**       | Remove note instantly                                    |
| **Search**       | Real‑time filter by title **or** content                 |
| **Empty States** | Friendly messages when no notes or no search results     |

---

## Tech Stack

* **Vue 3** + Vite
* **Pinia** – global state
* **Tailwind CSS v4** – utility‑first styling
* **Vercel** – zero‑config deploy

---

## Local Setup

```bash
# 1. clone repository
$ git clone https://github.com/<your‑user>/notes‑app.git
$ cd notes‑app

# 2. install dependencies
$ npm install

# 3. run dev server
$ npm run dev
# open http://localhost:5173
```

### Build for production

```bash
npm run build
```

The static output will be in the **dist/** folder – automatically picked up by Vercel.

---

## Folder Structure (Key Files)

```
├─ src/
│  ├─ components/
│  │  └─ NoteModal.vue      # modal dialog component
│  ├─ stores/
│  │  └─ notes.js           # Pinia store (CRUD + persistence)
│  ├─ App.vue               # main page & layout
│  └─ assets/index.css      # Tailwind directives
├─ public/favicon.png       # custom favicon
└─ index.html               # Vite entry
```

---
