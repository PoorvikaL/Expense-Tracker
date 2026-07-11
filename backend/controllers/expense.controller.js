const Expense = require("../models/expense");

// ========================
// Add Expense
// ========================

const addExpense = async (req, res) => {
    try {

        const expense = await Expense.create({
            ...req.body,
            user: req.user._id
        });

        res.status(201).json({
            message: "Expense Added Successfully",
            expense
        });

    } catch (err) {

        res.status(500).json({
            message: "Error creating expense",
            error: err.message
        });

    }
};

// ========================
// Display Expenses
// ========================

const displayExpense = async (req, res) => {
    try {

        const expenses = await Expense.find({
            user: req.user._id
        });

        res.status(200).json(expenses);

    } catch (err) {

        res.status(500).json({
            message: "Error fetching expenses",
            error: err.message
        });

    }
};

// ========================
// Update Expense
// ========================

const updateExpense = async (req, res) => {
    try {

        const expense = await Expense.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense Updated Successfully",
            expense
        });

    } catch (err) {

        res.status(500).json({
            message: "Error updating expense",
            error: err.message
        });

    }
};

// ========================
// Delete Expense
// ========================

const deleteExpense = async (req, res) => {
    try {

        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: "Error deleting expense",
            error: err.message
        });

    }
};

module.exports = {
    addExpense,
    displayExpense,
    updateExpense,
    deleteExpense
};