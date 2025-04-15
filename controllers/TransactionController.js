const Transaction = require("../models/Transaction");
const midtransClient = require("midtrans-client");

exports.createTransaction = async (req, res) => {
  try {
    const { first_name, amount, product_id } = req.body;
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });
    const order_id = "ORDER-" + new Date().getTime();
    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: first_name,
      },
      callbacks: {
        finish: `${process.env.CLIENT_URL}/product`,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    const newTransaction = new Transaction({
      ...req.body,
      midtrans_url: transaction.token,
      transaction_id: order_id,
    });
    await newTransaction.save();
    res.status(201).json({
      snap_token: transaction.token,
      transaction: newTransaction,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const data = await Transaction.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
