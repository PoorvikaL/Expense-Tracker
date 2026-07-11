import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = async () => {

        try {

            await api.get("/auth/logout");

            navigate("/login");

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <nav className="navbar">

            <div>

                <h2>💰 Expense Tracker</h2>

            </div>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>

        </nav>

    );

}

export default Navbar;