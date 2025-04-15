const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers["content-type"]);
  next();
});

const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const fileRoutes = require("./routes/FileRoutes");
const authRoutes = require("./routes/AuthRoutes");
const transactionRoutes = require("./routes/TransactionRoutes");
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`),
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
    status: "healthy",
  });
});
