import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseForm from "../components/ExpenseForm";

function Dashboard() {

    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        try {
            const res = await api.get("/expenses");
            setExpenses(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const addExpense = async (expense) => {
        try {
            await api.post("/expenses", expense);
            fetchExpenses();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await api.delete(`/expenses/${id}`);
            fetchExpenses();
        } catch (err) {
            console.log(err);
        }
    };

    const updateExpense = async (id, expense) => {
        try {
            await api.patch(`/expenses/${id}`, expense);
            fetchExpenses();
        } catch (err) {
            console.log(err);
        }
    };

    // Statistics
    const totalExpense = expenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

    const totalCategories = new Set(
        expenses.map((item) => item.category)
    ).size;

    const highestExpense =
        expenses.length > 0
            ? Math.max(...expenses.map((e) => Number(e.amount)))
            : 0;

    return (
        <>
            <Navbar />

            <div className="dashboard">

                <div className="stats">

                    <div className="stat-card">
                        <h3>Total Expense</h3>
                        <h2>₹ {totalExpense}</h2>
                    </div>

                    <div className="stat-card">
                        <h3>Total Expenses</h3>
                        <h2>{expenses.length}</h2>
                    </div>

                    <div className="stat-card">
                        <h3>Categories</h3>
                        <h2>{totalCategories}</h2>
                    </div>

                    <div className="stat-card">
                        <h3>Highest Expense</h3>
                        <h2>₹ {highestExpense}</h2>
                    </div>

                </div>

                <ExpenseForm onAddExpense={addExpense} />

                <h2 className="expense-heading">
                    My Expenses
                </h2>

                <div className="expense-grid">

                    {expenses.length === 0 ? (

                        <div className="empty-state">

                            <h2>📭</h2>

                            <p>No Expenses Added Yet</p>

                        </div>

                    ) : (

                        expenses.map((expense) => (

                            <ExpenseCard
                                key={expense._id}
                                expense={expense}
                                onDeleteExpense={deleteExpense}
                                onUpdateExpense={updateExpense}
                            />

                        ))

                    )}

                </div>

            </div>
        </>
    );
}

export default Dashboard;