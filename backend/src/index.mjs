import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbconnect } from "../config/db.mjs";
import { expenses } from "../util/data.mjs";
import expenseRouter from "../routers/expense.router.mjs";
import chartRouter from "../routers/chart.router.mjs";
import userRouter from "../routers/users.router.mjs";
import filterRouter from "../routers/filter.router.mjs";
import { ObjectId } from "mongodb";

//Configurations
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

//Cors
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

//DataBase
 dbconnect();
 app.listen(PORT, (req, res) => {
  console.log("Listening on port ", PORT);
});

//Routers
app.use("/api/expense", expenseRouter);
app.use("/api/chart", chartRouter);
app.use("/api/user",userRouter);
app.use("/api/filter",filterRouter);


