import express from "express";
import { BASEURL } from "../util/url.mjs";
import { ObjectId } from "mongodb";
import { expenses } from "../util/data.mjs";
import auth from "../middlewares/auth.mjs";
import { expensesDB } from "../models/expense.model.mjs";
import mongoose from "mongoose";
const router = express.Router();
router.use(express.json());
router.use(auth)
export default router;


router.post("/", async (req, res) => {
  
  const { userId } = req.body;

  try {
    const expenses = await expensesDB.find({ userId });
    if (expenses) {
      res.status(200).json(expenses);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Error occured");
  }
});

//add expense
router.post("/add", async (req, res) => {
  const { body } = req;
  try {
    const newExpense = await expensesDB.create(body);
    res.status(200).json(expenses);
    console.log("done adding");
  } catch (err) {
    console.log(err);

    res.status(404).json(err);
  }
});

//delete expense
router.delete("/delete", async (req, res) => {  
  let { target } = req.query;
  target=target.trim()
  if (!ObjectId.isValid(target)) {
    return res.status(400).send("Invalid ID format");
  }

  try {
    const expFinded = await expensesDB.findOne({ _id: new ObjectId(target) });
    console.log("Expense found:", expFinded);

    if (expFinded) {
      const deletedExp = await expensesDB.deleteOne({ _id: new ObjectId(target) });
      
      return res.status(200).send({
        message: "تم الإزالة بنجاح",
        deletedExp,
      });
    } else {
      return res.status(404).send("Error 404 .. not found");
    }
  } catch (error) {
    console.error("Error deleting expense:", error);
    return res.status(500).send("العملية فشلت");
  }
});
//Get Type Expenses
router.get("/type", async (req, res) => {
  const { type, userId } = req.query;

  try {
    const expensesType = await expensesDB.find({
      $and: [{ userId }, { type }],
    });
    res
      .status(200)
      .json( expensesType );
  } catch (error) {
    console.log(error);

    res.status(404).send("Error Occured");
  }
});

//Get subType Expenses
router.get("/subtype", async (req, res) => {
  const { subType,userId } = req.query;

  try {
    const expenseSubType = await expensesDB.find({
      $and: [{ userId }, { subType }],
    });
    res.status(200).json(expenseSubType);
  } catch (error) {
    console.log(error);

    res.status(404).send("Error Occured");
  }
});



