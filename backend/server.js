const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

dotenv.config();

// DNS Fix
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Expense Tracker Backend Running 🚀");
});

// Routes
app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/expenses", require("./routes/expense.routes"));
// app.use("/api/display", require("./routes/expense.routes"));
// app.use("/api/update", require("./routes/expense.routes"));
// app.use("/api/delete", require("./routes/expense.routes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});