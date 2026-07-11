const express=require("express");
const router=express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const{addExpense, displayExpense,updateExpense, deleteExpense}=require("../controllers/expense.controller");


router.post("/",authMiddleware,addExpense);
router.get("/",authMiddleware,displayExpense);
router.patch("/:id",authMiddleware,updateExpense);
router.delete("/:id",authMiddleware,deleteExpense);

module.exports=router;
