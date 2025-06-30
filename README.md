<div align="center">

# 💸 Mahfazty
### **Your Personal Finance Tracker**
*A modern, full-stack web application to manage, visualize, and analyze your income and expenses with ease.*

<br>

![Mahfazty Logo](frontend/src/assets/mahfazty.png)

<br>

[![MIT License](https://img.shields.io/badge/License-MIT-1e3a8a.svg?style=for-the-badge)](LICENSE)
[![Angular](https://img.shields.io/badge/Angular-17+-1e40af.svg?style=for-the-badge&logo=angular)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-1e3a8a.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-1e40af.svg?style=for-the-badge&logo=mongodb)](https://mongodb.com/)

</div>

---

<div align="center">
<h2>🌟 Why Choose Mahfazty?</h2>
<table>
<tr>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/-Secure-1e3a8a?style=for-the-badge&logo=shield" alt="Secure">
<br><strong>Bank-Level Security</strong>
<br>JWT authentication & encrypted data
</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/-Smart-1e40af?style=for-the-badge&logo=brain" alt="Smart">
<br><strong>Intelligent Insights</strong>
<br>Advanced analytics & visual reports
</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/-Modern-1e3a8a?style=for-the-badge&logo=rocket" alt="Modern">
<br><strong>Modern Design</strong>
<br>Responsive & intuitive interface
</td>
</tr>
</table>
</div>

---

## 🚀 **Key Features**

<table>
<tr>
<td width="50%">

### 🔐 **Security First**
- **JWT Authentication** - Secure login system
- **Protected Routes** - Role-based access control
- **Data Encryption** - Your financial data stays safe

### 💰 **Smart Finance Management**
- **Multi-Category Tracking** - Personal, charity, home expenses
- **Income Sources** - Salary, bonus, investments
- **Real-time Updates** - Instant transaction processing

</td>
<td width="50%">

### 📊 **Advanced Analytics**
- **Interactive Charts** - Pie charts, bar graphs, trends
- **Custom Filtering** - By month, type, category
- **Dashboard Overview** - Quick financial snapshot

### 🎨 **Beautiful Interface**
- **Responsive Design** - Works on all devices
- **Dark Blue Theme** - Professional and elegant
- **Smooth Animations** - Enhanced user experience

</td>
</tr>
</table>

---

<div align="center">
<h2>🛠️ **Technology Stack**</h2>
</div>

<table align="center">
<tr>
<th align="center" style="background-color: #1e3a8a; color: white;">🎨 Frontend</th>
<th align="center" style="background-color: #1e40af; color: white;">⚡ Backend</th>
<th align="center" style="background-color: #1e3a8a; color: white;">🗄️ Database</th>
</tr>
<tr>
<td align="center">
<img src="https://img.shields.io/badge/Angular-17+-DD0031?style=flat-square&logo=angular" alt="Angular"><br>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript" alt="TypeScript"><br>
<img src="https://img.shields.io/badge/RxJS-B7178C?style=flat-square&logo=reactivex" alt="RxJS"><br>
<img src="https://img.shields.io/badge/Charts.js-FF6384?style=flat-square&logo=chart.js" alt="Charts">
</td>
<td align="center">
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js" alt="Node.js"><br>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express" alt="Express"><br>
<img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens" alt="JWT"><br>
<img src="https://img.shields.io/badge/REST-02569B?style=flat-square&logo=rest" alt="REST API">
</td>
<td align="center">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb" alt="MongoDB"><br>
<img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose" alt="Mongoose"><br>
<img src="https://img.shields.io/badge/Cloud-4285F4?style=flat-square&logo=googlecloud" alt="Cloud"><br>
<img src="https://img.shields.io/badge/Secure-1e3a8a?style=flat-square&logo=security" alt="Secure">
</td>
</tr>
</table>

---

<div align="center">
<h2>📦 **Project Architecture**</h2>
</div>

```
🏗️ Mahfazty/
│
├── 🔧 backend/              # Node.js Express API Server
│   ├── 📄 models/           # Mongoose Data Models
│   │   ├── User.js          # User authentication model
│   │   └── Expense.js       # Transaction data model
│   ├── 🛣️ routers/          # API Route Handlers
│   │   ├── auth.js          # Authentication routes
│   │   ├── expense.js       # Transaction management
│   │   ├── chart.js         # Analytics endpoints
│   │   └── filter.js        # Data filtering
│   ├── 🛡️ middlewares/      # Security & Validation
│   └── ⚙️ util/             # Configuration & Utilities
│
├── 🎨 frontend/             # Angular Single Page Application
│   ├── src/app/
│   │   ├── 📱 pages/        # Application Views
│   │   │   ├── dashboard/   # Main dashboard
│   │   │   ├── expenses/    # Expense management
│   │   │   ├── income/      # Income tracking
│   │   │   └── wallet/      # Portfolio overview
│   │   ├── 🔧 services/     # API Integration Services
│   │   ├── 📋 interfaces/   # TypeScript Interfaces
│   │   ├── 🧩 partials/     # Reusable Components
│   │   └── 📊 data/         # API Configuration
│   └── 🖼️ assets/          # Static Resources
│
└── 📖 README.md
```

---

<div align="center">
<h2>⚡ **Quick Start Guide**</h2>
</div>

### 🚀 **1. Clone & Setup**
```bash
# Clone the repository
git clone https://github.com/yourusername/mahfazty.git
cd mahfazty
```

### 🔧 **2. Backend Configuration**
```bash
cd backend
npm install

# Create your environment file
echo "MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
PORT=5000" > .env

# Start the server
npm start
```

### 🎨 **3. Frontend Launch**
```bash
cd ../frontend
npm install

# Launch the application
ng serve

# 🎉 Visit http://localhost:4200
```

---

<div align="center">
<h2>🔐 **Environment Configuration**</h2>
</div>

Create a `.env` file in the `/backend` directory:

```env
# 🗄️ Database Configuration
MONGO_URI=mongodb://localhost:27017/mahfazty
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/mahfazty

# 🔐 Security Configuration
SECRET=your_super_secret_jwt_key_here

# 🚀 Server Configuration
PORT=5000
NODE_ENV=development
```

---

<div align="center">
<h2>🖥️ **API Documentation**</h2>
</div>

<table>
<tr>
<th>🔐 Authentication</th>
<th>💰 Transactions</th>
<th>📊 Analytics</th>
</tr>
<tr>
<td>

```http
POST /api/user/register
POST /api/user/login
GET  /api/user/profile
```

</td>
<td>

```http
POST /api/expense/add
GET  /api/expense/type
PUT  /api/expense/update
DELETE /api/expense/delete
```

</td>
<td>

```http
GET  /api/chart/month
GET  /api/chart/year
POST /api/filter/filterMonth
GET  /api/analytics/summary
```

</td>
</tr>
</table>

---

<div align="center">
<h2>📊 **Application Preview**</h2>
</div>

<table>
<tr>
<td align="center">
<img src="https://github.com/user-attachments/assets/4b92d61b-3efe-49e0-9bdf-4a47b3e27cd2" alt="Dashboard" width="400">
<br><strong>🏠 Dashboard Overview</strong>
</td>
<td align="center">
<img src="https://github.com/user-attachments/assets/6b123176-02ed-4a87-84ef-fc4e45f0cb24" alt="Login" width="400">
<br><strong>🔐 Secure Login</strong>
</td>
</tr>
<tr>
<td align="center">
<img src="https://github.com/user-attachments/assets/b3ae6759-6e77-423d-b9bd-447218864f00" alt="Expenses" width="400">
<br><strong>💸 Expense Tracking</strong>
</td>
<td align="center">
<img src="https://github.com/user-attachments/assets/30e2967c-4ef6-46c6-a113-5f39e8f07ee3" alt="Add Transaction" width="400">
<br><strong>➕ Quick Add</strong>
</td>
</tr>
<tr>
<td align="center" colspan="2">
<img src="https://github.com/user-attachments/assets/d2556a7e-b7ac-4828-9606-cd22e588edbc" alt="Wallet" width="400">
<br><strong>👛 Wallet Analytics</strong>
</td>
</tr>
</table>

---

<div align="center">
<h2>🤝 **Contributing**</h2>
</div>

<table align="center">
<tr>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/1-Fork-1e3a8a?style=for-the-badge&logo=github" alt="Fork">
<br>Fork the repository
</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/2-Branch-1e40af?style=for-the-badge&logo=git" alt="Branch">
<br>Create feature branch
</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/3-PR-1e3a8a?style=for-the-badge&logo=githubactions" alt="PR">
<br>Submit pull request
</td>
</tr>
</table>

**We welcome contributions!** For major changes, please open an issue first to discuss your ideas.

---

<div align="center">
<h2>📄 **License**</h2>

![MIT License](https://img.shields.io/badge/License-MIT-1e3a8a.svg?style=for-the-badge)

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

---

<h2>💡 **Support & Contact**</h2>

<table align="center">
<tr>
<td align="center">
<a href="https://github.com/yourusername/mahfazty/issues">
<img src="https://img.shields.io/badge/Issues-Report%20Bug-1e3a8a?style=for-the-badge&logo=github" alt="Issues">
</a>
</td>
<td align="center">
<a href="https://github.com/yourusername/mahfazty/discussions">
<img src="https://img.shields.io/badge/Discussions-Ask%20Question-1e40af?style=for-the-badge&logo=github" alt="Discussions">
</a>
</td>
<td align="center">
<a href="mailto:shawkyelsayed2002@gmail.com">
<img src="https://img.shields.io/badge/Email-Contact%20Us-1e3a8a?style=for-the-badge&logo=gmail" alt="Email">
</a>
</td>
</tr>
</table>

---

<h1 align="center">🌟 **Mahfazty** 🌟</h1>
<h3 align="center"><em>"Track your money, own your future!"</em></h3>

<div align="center">
<img src="https://img.shields.io/badge/Made%20with-❤️-1e3a8a?style=for-the-badge" alt="Made with Love">
<img src="https://img.shields.io/badge/Built%20for-Finance%20Freedom-1e40af?style=for-the-badge" alt="Built for Finance Freedom">
</div>

</div>
