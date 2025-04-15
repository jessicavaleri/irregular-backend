const express = require("express");
const {
  createTransaction,
  getAllOrders,
} = require("../controllers/TransactionController");

const router = express.Router();

router.get("/", getAllOrders);
router.post("/", createTransaction);

module.exports = router;
