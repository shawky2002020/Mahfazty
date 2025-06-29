# 💸 Mahfazty

**Your Personal Finance Tracker**  
_A modern, full-stack web application to manage, visualize, and analyze your income and expenses with ease._

![Mahfazty Logo](frontend/src/assets/mahfazty.png)

---

## 🚀 Features

- **User Authentication:** Secure registration & login with JWT.
- **Expense & Income Management:** Add, filter, and categorize transactions (personal, charity, home, salary, bonus, etc.).
- **Wallet Overview:** Visualize your financial status with interactive charts.
- **Dashboard:** Quick entry for new transactions and summary stats.
- **Filtering:** Filter by month, type, and sub-type for detailed insights.
- **Responsive UI:** Beautiful, mobile-friendly Angular design.
- **Notifications:** Real-time feedback with Toastr.
- **Data Visualization:** Pie and advanced charts for income/expense breakdowns.

---

## 🛠️ Tech Stack

| Frontend                | Backend                | Database   |
|-------------------------|------------------------|------------|
| Angular 17+             | Node.js (Express)      | MongoDB    |
| TypeScript, RxJS        | JWT Auth, REST API     | Mongoose   |
| NgCharts, NgxCharts     |                        |            |
| Toastr, Animations      |                        |            |

---

## 📦 Project Structure

```
Mahfazty/
│
├── backend/         # Node.js Express API
│   ├── models/      # Mongoose models (User, Expense)
│   ├── routers/     # API routes (auth, expense, chart, filter)
│   ├── middlewares/ # Auth middleware
│   └── util/        # Data utilities, config
│
├── frontend/        # Angular SPA
│   ├── src/app/
│   │   ├── pages/   # Dashboard, Expenses, Income, Wallet, etc.
│   │   ├── services/# API services
│   │   ├── interfaces/
│   │   ├── partials/# Navbar, loading, buffer
│   │   └── data/    # API URLs
│   └── assets/      # Images, icons
│
└── README.md
```

---

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mahfazty.git
cd mahfazty
```

### 2. Backend Setup

```bash
cd backend
npm install
# Configure your .env (see below)
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
ng serve
# Visit http://localhost:4200
```

---

## 🔐 Environment Variables

Create a `.env` file in `/backend`:

```
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret
PORT=5000
```

---

## 🖥️ API Overview

- `POST /api/user/register` – Register new user
- `POST /api/user/login` – Login, returns JWT
- `POST /api/expense/add` – Add new expense/income
- `GET /api/expense/type` – Get expenses by type
- `POST /api/filter/filterMonth` – Filter by month
- `GET /api/chart/month|year` – Chart data

---

## 📊 Screenshots

<p align="center">
  <img src="frontend/src/assets/mahfazty.png" width="120" />
  <img src="frontend/src/assets/money.jpg" width="200" />
  <img src="frontend/src/assets/world.png" width="200" />
</p>

---

## 🧑‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

[MIT](LICENSE)

---

**Mahfazty** – _Track your money, own your future!_

---
