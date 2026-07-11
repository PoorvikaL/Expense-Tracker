import { useState } from "react";

function ExpenseCard({ expense, onDeleteExpense, onUpdateExpense }) {

    const [editing, setEditing] = useState(false);

    const [formData, setFormData] = useState({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleUpdate = async () => {

        await onUpdateExpense(expense._id, formData);

        setEditing(false);

    };

    return (

        <div className="expense-card">

            {

                editing ?

                <>

                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />

                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />

                    <button
                        className="save-btn"
                        onClick={handleUpdate}
                    >
                        Save
                    </button>

                </>

                :

                <>

                    <div className="expense-top">

                        <h3>{expense.title}</h3>

                        <span className="category">

                            {expense.category}

                        </span>

                    </div>

                    <h2 className="amount">

                        ₹ {expense.amount}

                    </h2>

                    <div className="btn-group">

                        <button
                            className="edit-btn"
                            onClick={() => setEditing(true)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => onDeleteExpense(expense._id)}
                        >
                            Delete
                        </button>

                    </div>

                </>

            }

        </div>

    );

}

export default ExpenseCard;