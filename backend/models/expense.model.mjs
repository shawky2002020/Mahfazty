import mongoose from "mongoose";

export class Expense {
  id;
  amount;
  date;
  name;
  type;
  subType;
  userId;
}

const subdate = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
});

const expensesSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  subDate: [subdate],
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  subType: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    ref: 'users', // optional, for referencing a User collection
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});



const expensesDB = mongoose.model('expenses',expensesSchema)
export{expensesDB,expensesSchema}