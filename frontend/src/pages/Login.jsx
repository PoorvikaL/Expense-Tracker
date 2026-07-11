import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",
        password: "",

    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post(
                "/auth/login",
                formData
            );

            alert(res.data.message);

            navigate("/dashboard");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                    "Login Failed"
            );

        }

    };

    return (

<div className="auth-page">

<div className="left-side">

<h1>Expense Tracker</h1>

<p>

Track your daily expenses,
manage your budget and stay financially organized.

</p>

</div>

<div className="right-side">

<div className="auth-card">

<h2>Welcome Back 👋</h2>

<p className="subtitle">

Login to continue

</p>

<form onSubmit={handleSubmit}>

<input

type="email"

name="email"

placeholder="Email"

value={formData.email}

onChange={handleChange}

required

/>

<input

type="password"

name="password"

placeholder="Password"

value={formData.password}

onChange={handleChange}

required

/>

<button>

Login

</button>

</form>

<p>

Don't have an account?

<Link to="/register">

Register

</Link>

</p>

</div>

</div>

</div>

);
}

export default Login;