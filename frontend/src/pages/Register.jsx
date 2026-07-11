import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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
                "/auth/register",
                formData
            );

            alert(res.data.message);

            navigate("/login");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                    "Registration Failed"
            );

        }

    };

   return (

<div className="auth-page">

<div className="left-side">

<h1>Expense Tracker</h1>

<p>

Create your account and start managing your expenses smarter.

</p>

</div>

<div className="right-side">

<div className="auth-card">

<h2>Create Account 🚀</h2>

<p className="subtitle">

Register to continue

</p>

<form onSubmit={handleSubmit}>

<input

type="text"

name="name"

placeholder="Full Name"

value={formData.name}

onChange={handleChange}

required

/>

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

Register

</button>

</form>

<p>

Already have an account?

<Link to="/login">

Login

</Link>

</p>

</div>

</div>

</div>

);
}

export default Register;