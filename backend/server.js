const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { spawn } = require("child_process");

dotenv.config();
console.log("in server.js file");
connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/lend", require("./routes/lendMoneyRoutes"));
app.use("/api/borrow", require("./routes/borrowMoneyRoutes"));
app.use("/api/chatbot", require("./routes/gemini_route_inte"));

// New route for lender matching
app.post("/api/match-lenders", (req, res) => {
    const borrowerRequest = req.body;

    // Step 1: Run outlier detection script
    const outlierProcess = spawn("python", ["C:\\Users\\pavan\\OneDrive\\Desktop\\Phase-1\\backend\\controllers\\outlier.py"]);

    let outlierResult = "";

    outlierProcess.stdout.on("data", (data) => {
        outlierResult += data.toString();
    });

    outlierProcess.stderr.on("data", (data) => {
        console.error(`Error in outlier.py: ${data}`);
    });

    outlierProcess.on("close", (code) => {
        if (code === 0) {
            if (outlierResult.includes("flagged as an anomaly")) {
                return res.status(400).json({ error: "Loan application flagged as fraudulent." });
            } else {
                // Step 2: If normal, proceed with lender matching
                const lenderProcess = spawn("python", ["C:\\Users\\pavan\\OneDrive\\Desktop\\Phase-1\\backend\\controllers\\find_lenders.py"]);

                let lendersData = "";

                lenderProcess.stdout.on("data", (data) => {
                    lendersData += data.toString();
                });

                lenderProcess.stderr.on("data", (data) => {
                    console.error(`Error in find_lenders.py: ${data}`);
                });

                lenderProcess.on("close", (code) => {
                    if (code === 0) {
                        res.send(lendersData);
                    } else {
                        res.status(500).json({ error: "Lender matching failed." });
                    }
                });

                // Send borrower request to lender matching script
                lenderProcess.stdin.write(JSON.stringify(borrowerRequest));
                lenderProcess.stdin.end();
            }
        } else {
            res.status(500).json({ error: "Outlier detection failed." });
        }
    });

    // Send borrower request to outlier detection script
    outlierProcess.stdin.write(JSON.stringify(borrowerRequest));
    outlierProcess.stdin.end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));