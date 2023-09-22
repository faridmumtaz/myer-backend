const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Expense",
  mongoose.Schema({
    title: { type: String },
    amount: { type: Number },
    date: { type: Date },
  })
);
