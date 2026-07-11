import { useState } from "react";

function ExpenseForm({ onAddExpense }) {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onAddExpense(formData);

        setFormData({
            title: "",
            amount: "",
            category: "",
        });
    };

    return (
        <div className="form-container">

            <h2>Add New Expense</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Expense Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Shopping</option>
                    <option>Medical</option>
                    <option>Bills</option>
                    <option>Entertainment</option>
                    <option>Other</option>
                </select>

                <button type="submit">
                    + Add Expense
                </button>

            </form>

        </div>
    );
}

export default ExpenseForm;