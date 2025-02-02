const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/lend",require("./routes/lendMoneyRoutes"));
app.use("/api/borrow",require("./routes/borrowMoneyRoutes"));



const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));