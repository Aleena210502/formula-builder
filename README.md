# 📘 **Formula Builder – MERN Stack Application**

A dynamic web application for creating variables, composing formulas, and evaluating expressions using both predefined and runtime contextual inputs.

This project is part of an internship assignment and demonstrates full-stack development skills using the **MERN stack** (MongoDB, Express, React, Node.js) with **Bootstrap** UI.

---

## 🚀 **Features**

### 🔹 Variables Management

* Create **Constant** variables (fixed numeric value).
* Create **Dynamic** variables (computed using other variables).
* Prevents duplicate names & enforces **UPPERCASE** variable names.
* Detects **circular dependencies** in dynamic variable expressions.
* Inline editing and deletion.
* Shows all variables in a table with type badges.

### 🔹 Formula Builder

* Create formulas using:

  * Variables
  * Mathematical expressions
  * Contextual runtime placeholders (`{{#placeholder}}`)
* Validates all referenced variables.
* Shows all formulas as Bootstrap cards.
* Delete formulas anytime.

### 🔹 Formula Execution

* Detects placeholders & opens a modal for user inputs.
* Replaces contextual values.
* Resolves all dynamic variables recursively.
* Evaluates final math expression using **PEMDAS**.
* Returns final numeric result or descriptive error message.

---

## 🛠️ **Tech Stack**

### **Frontend**

* React.js
* Bootstrap 5
* Axios
* Modular component-based architecture

### **Backend**

* Node.js + Express.js
* MongoDB + Mongoose
* Recursive evaluator with safe expression parsing

---

## 📂 **Project Structure**

```
formula-builder/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── utils/
    │   └── App.js
    └── public/
```

---

## ⚙️ **Installation & Setup**

### 1️⃣ Clone the repository

```
git clone <your-repository-url>
cd formula-builder
```

---

## 🔧 **Backend Setup (Node + Express)**

```
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGO_URI=your-mongodb-connection-string
```

Start backend:

```
npm run dev
```

It runs at:
👉 **[http://localhost:5000](http://localhost:5000)**

---

## 🎨 **Frontend Setup (React + Bootstrap)**

```
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:

```
npm start
```

Runs at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📌 **Environment Variables**

### Backend (`backend/.env`)

```
PORT=5000
MONGO_URI=<MongoDB Atlas or Local MongoDB URL>
```

### Frontend (`frontend/.env`)

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🧪 **Postman / Thunder Client API Testing**

### Variables API

| METHOD | ENDPOINT           | DESCRIPTION       |
| ------ | ------------------ | ----------------- |
| GET    | /api/variables     | Get all variables |
| POST   | /api/variables     | Create variable   |
| PUT    | /api/variables/:id | Update variable   |
| DELETE | /api/variables/:id | Delete variable   |

### Formulas API

| METHOD | ENDPOINT                  | DESCRIPTION      |
| ------ | ------------------------- | ---------------- |
| GET    | /api/formulas             | Get all formulas |
| POST   | /api/formulas             | Create formula   |
| DELETE | /api/formulas/:id         | Delete formula   |
| POST   | /api/formulas/:id/execute | Execute formula  |

---

# 📝 **Future Enhancements**

* User authentication (JWT)
* History of executed formulas
* Export formulas as PDF
* Dark mode
* Drag-and-drop formula builder

---

# 🏁 **Conclusion**

This project demonstrates:

* Full MERN stack mastery
* Recursive computation logic
* Expression parsing & validation
* Clean UI using Bootstrap
* Production-ready architecture

