const Expense = require("../models/Expense");
var getDaysInMonth = require("date-fns/getDaysInMonth");
// expenses: POST
const addExpense = (req, res) => {
  const { title, amount, date } = req.body;
  title && amount
    ? new Expense({ title, amount, date: !date && new Date() })
        .save()
        .then(() =>
          res.status(201).json({ success: true, message: "Expense Added!" })
        )
        .catch(() =>
          res.status(500).json({ success: false, message: "Server Error!" })
        )
    : (res.status(400), res.json({ message: "Incorrect Data!" }));
};

// expenses: GET
const getExpenses = (req, res) =>
  Expense.find({})
    .then((data) =>
      res.status(200).json({
        success: true,
        data: data.map((item) => ({
          id: item._id,
          title: item.title,
          amount: item.amount,
          date: `${item.date.getDate()}/${
            item.date.getMonth() + 1
          }/${item.date.getFullYear()}`,
        })),
        total: data.reduce((total, item) => total + item.amount, 0),
      })
    )
    .catch(() =>
      res.status(500).json({ success: false, message: "Server Error!" })
    );

// expenses: PUT
const editExpense = (req, res) => {
  const { _id, title, amount, date } = req.body;
  Expense.updateOne({ _id }, { title, amount, date })
    .then(() =>
      res.status(200).json({ success: true, message: "Expense Edited!" })
    )
    .catch(() =>
      res.status(500).json({ success: false, message: "Server Error!" })
    );
};

// expenses: DELETE
const deleteExpense = (req, res) => {
  const { _id } = req.body;
  Expense.deleteOne({ _id })
    .then(() =>
      res.status(200).json({ success: true, message: "Expense Deleted!" })
    )
    .catch(() =>
      res.status(500).json({ success: false, message: "Server Error!" })
    );
  // res.status(404).json({success:false,message:'Not Found'})
};

// expense: GET
const getExpense = (req, res) =>
  Expense.findOne({ _id: req.params.id })
    .then((data) =>
      res.status(200).json({
        id: data._id,
        title: data.title,
        amount: data.amount,
        date: data.date,
      })
    )
    .catch(() => res.status.json({ message: "Server Error!" }));

const getCurrentMonthExpenses = (req, res) => {
  const date = new Date();
  Expense.find({
    date: {
      $gte: `${date.toISOString().slice(0, 7)}-01T00:00:00.000Z`,
      $lte: `${date.toISOString().slice(0, 7)}-${getDaysInMonth(
        date
      )}T23:59:59.999Z`,
    },
  })
    .then((data) =>
      res.status(200).json({
        success: true,
        data: data.map((item) => ({
          id: item._id,
          title: item.title,
          amount: item.amount,
          date: `${item.date.getDate()}/${
            item.date.getMonth() + 1
          }/${item.date.getFullYear()}`,
        })),
        total: data.reduce((total, item) => total + item.amount, 0),
      })
    )
    .catch(() =>
      res.status(500).json({ success: false, message: "Server Error" })
    );
};

const getLastMonthExpenses = (req, res) => {
  const date = new Date();
  const lastMonthDate = new Date(
    `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
  );
  Expense.find({
    date: {
      $gte: `${lastMonthDate.toISOString().slice(0, 7)}-01T00:00:00.000Z`,
      $lte: `${lastMonthDate.toISOString().slice(0, 7)}-${getDaysInMonth(
        lastMonthDate
      )}T23:59:59.999Z`,
    },
  })
    .then((data) =>
      res.status(200).json({
        success: true,
        data: data.map((item) => ({
          id: item._id,
          title: item.title,
          amount: item.amount,
          date: `${item.date.getDate()}/${
            item.date.getMonth() + 1
          }/${item.date.getFullYear()}`,
        })),
        total: data.reduce((total, item) => total + item.amount, 0),
      })
    )
    .catch(() =>
      res.status(500).json({ success: false, message: "Server Error" })
    );
};
module.exports = {
  addExpense,
  getExpenses,
  editExpense,
  deleteExpense,
  getExpense,
  getCurrentMonthExpenses,
  getLastMonthExpenses,
};
