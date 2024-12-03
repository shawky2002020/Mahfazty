import express from "express";
import { BASEURL } from "../util/url.mjs";
import { expenses } from "../util/data.mjs";
import {expensesDB} from  "../models/expense.model.mjs"
import auth from "../middlewares/auth.mjs";
const router = express.Router();
router.use(express.json())
router.use(auth);
export default router

//get Monthly expenses
router.get('/month', async (req, res) => {
  let { userId } = req.query;
  userId = userId.trim();

  try {
    const monthlyOutcomeTotals = await expensesDB.aggregate([
      {
        $match: { userId: userId, type: "صرف" } // Filter documents by userId and type
      },
      {
        $group: {
          _id: { month: { $month: "$date" } }, // Group by month
          totalAmount: { $sum: "$amount" } // Sum the amount for each month
        }
      },
      { $sort: { "_id.month": 1 } } // Sort by month
    ]);

    const monthlyIncomeTotals = await expensesDB.aggregate([
      {
        $match: { userId: userId, type: "دخل" } // Filter documents by userId and type
      },
      {
        $group: {
          _id: { month: { $month: "$date" } }, // Group by month
          totalAmount: { $sum: "$amount" } // Sum the amount for each month
        }
      },
      { $sort: { "_id.month": 1 } } // Sort by month
    ]);

    // Initialize an array with 12 zeros (for net amounts of each month)
    const monthlyNetTotals = new Array(12).fill(0);

    // Populate the net totals by subtracting outcome from income
    monthlyOutcomeTotals.forEach((outcome) => {
      const monthIndex = outcome._id.month - 1; // Convert 1-based to 0-based
      monthlyNetTotals[monthIndex] -= outcome.totalAmount; // Subtract outcome
    });

    monthlyIncomeTotals.forEach((income) => {
      const monthIndex = income._id.month - 1; // Convert 1-based to 0-based
      monthlyNetTotals[monthIndex] += income.totalAmount; // Add income
    });

    res.status(200).json(monthlyNetTotals); // Return the net totals for each month
  } catch (error) {
    console.error(error);
    res.status(400).send("Error occurred while calculating monthly net totals");
  }
});

//get Year expenses
router.get('/year',async(req,res)=>{
  try {
    const expensesByYear = await Expense.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" } }, // Group by year
          totalAmount: { $sum: "$amount" },  // Sum the amount
          expenses: { $push: "$$ROOT" }      // Include all expense data
        },
      },
      { $sort: { "_id.year": 1 } }, // Sort by year
    ]);
  } catch (error) {
    
  }
})

// //get Day expenses
// router.get('/day',(req,res)=>{
//   let dayExpenses=Array(31).fill(0);
//   expenses.forEach((expense)=>{
//     console.log('amount',expense.amount);
    
//     let date=expense.date;
//     let dayNum= parseInt(date.slice(date.length-2,date.length))
//     dayExpenses[dayNum]+=100;
//   })
//   res.send (dayExpenses);
// })




// //get Year expenses
// router.get('/year',(req,res)=>{
//   let yearExpenses=Array(80).fill(0); //lw 3omrak aktar mn 80 sana m3lsh
//   expenses.forEach((expense)=>{
//     let date=expense.date;
//     let yearNum= parseInt(date.slice(0,4))
//     yearExpenses[yearNum]+=expense.amount;
//   })
//   res.send (yearExpenses)
// })

// //get Day expenses
// router.get('/day',(req,res)=>{
//   let dayExpenses=Array(31).fill(0);
//   expenses.forEach((expense)=>{
//     console.log('amount',expense.amount);
    
//     let date=expense.date;
//     let dayNum= parseInt(date.slice(date.length-2,date.length))
//     dayExpenses[dayNum]+=100;
//   })
//   res.send (dayExpenses);
// })


