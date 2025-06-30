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
![home](https://github.com/user-attachments/assets/4b92d61b-3efe-49e0-9bdf-4a47b3e27cd2)
![login](https://github.com/user-attachments/assets/6b123176-02ed-4a87-84ef-fc4e45f0cb24)

![expenses](https://github.com/user-attachments/assets/b3ae6759-6e77-423d-b9bd-447218864f00)
![add](https://github.com/user-attachments/assets/30e2967c-4ef6-46c6-a113-5f39e8f07ee3)
![wallet](https://github.com/user-attachments/assets/d2556a7e-b7ac-4828-9606-cd22e588edbc)

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
