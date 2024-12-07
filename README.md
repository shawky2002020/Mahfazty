# 🪙 **Mahfazty**  
### *An Intuitive Expense Tracker Application*

---

## 📜 **Overview**

**Mahfazty** is a modern, user-friendly web application designed to help individuals manage their expenses efficiently. With **Mahfazty**, you can track income, categorize spending, and gain insightful analytics into your financial habits. The platform is built with a clean UI/UX and ensures a smooth, responsive experience for users.

---

## ✨ **Key Features**

- 📊 **Expense Management**: Add, edit, and delete your expenses with ease.
- 📅 **Monthly Reports**: View summarized reports of your spending habits on a monthly basis.
- 🗂 **Categorization**: Organize expenses into predefined or custom categories.
- 📈 **Interactive Charts**: Visualize your expenses using beautiful pie charts and bar graphs.
- 🌐 **Responsive Design**: Works seamlessly on all devices – desktops, tablets, and mobile phones.
- 🔐 **Secure Storage**: All data is securely stored for privacy and reliability.

---

## 🛠️ **Tech Stack**

### **Frontend**:
- Angular (vXX)
- HTML5, CSS3, TypeScript
- Bootstrap (for styling and responsiveness)

### **Backend**:
- Node.js with Express.js
- RESTful APIs

### **Database**:
- MongoDB (NoSQL Database)

### **Other Tools**:
- Git for version control
- npm for package management
- ngx-charts for data visualization

---

## 🚀 **How to Run Locally**

Follow these steps to set up and run **Mahfazty** on your local machine:

### **Prerequisites**
Make sure you have the following tools installed:
- [Node.js](https://nodejs.org/) (LTS version)
- npm (comes with Node.js)
- MongoDB installed and running locally

### **Clone the Repository**

```bash
git clone https://github.com/<your-username>/mahfazty.git
cd mahfazty
## 🚀 **Available Scripts**

The following **npm scripts** are defined for the project. Use them to streamline development, testing, and deployment:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "cd frontend && npm start & cd backend && npm start",
  "start": "cd backend/src && node index.mjs",
  "prebuild": "cd backend && npm install && npm run build",
  "build": "cd frontend && npm install && npm run build"
}
