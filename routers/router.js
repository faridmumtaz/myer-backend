const express = require("express");
const {
  addExpense,
  getExpenses,
  editExpense,
  deleteExpense,
  getExpense,
  getCurrentMonthExpenses,
  getLastMonthExpenses,
} = require("../controllers/expense");

const router = express.Router();

router
  .route("/")
  .get((req, res) => res.status(200).json({ message: "hello folks" }));

router
  .route("/expenses")
  .post(addExpense)
  .get(getExpenses)
  .put(editExpense)
  .delete(deleteExpense);

router.route("/expense/:id").get(getExpense);

router.route("/getCurrentMonthExpenses").get(getCurrentMonthExpenses);

router.route("/getLastMonthExpenses").get(getLastMonthExpenses);

module.exports = router;
