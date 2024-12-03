import express from "express";
import { BASEURL } from "../util/url.mjs";
import { ObjectId } from "mongodb";
import { expenses } from "../util/data.mjs";
import { expensesDB } from "../models/expense.model.mjs";
import mongoose from "mongoose";
const router = express.Router();
router.use(express.json());
export default router;

router.post("/filterMonth", async (req, res) => {
  const { userId, subDate } = req.body;

  try {
    const expenses = await expensesDB.find({
      $and: [{ userId}, {'subDate.month':subDate.month},{'subDate.year':subDate.year}],
    });

    if (expenses.length) {
      res.status(200).json(expenses);
    } else {
      res.status(404).json("لا يوجد معاملات فى هذا الشهر");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("يوجد خطأ");
  }
});
