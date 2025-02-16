const { GoogleGenerativeAI } = require("@google/generative-ai");
const { spawn } = require("child_process");
const path = require("path");

const gemini_response = async (req, res) => {
    console.log(req.body.prompt);
    console.log("in gemini controller");

    // Input borrower data
    const borrowerRequest = req.body; // Assuming borrower request comes in the body

    // Run the Python script
    const pythonProcess = spawn("python3", [path.join(__dirname, "lender_recommendation.py")]);

    // Pass borrower request as input to the Python script
    pythonProcess.stdin.write(JSON.stringify(borrowerRequest));
    pythonProcess.stdin.end();

    let pythonOutput = '';

    // Collect output from the Python script
    pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
    });

    // Handle any errors from the Python script
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data.toString()}`);
    });

    // When the Python script finishes
    pythonProcess.on('close', async (code) => {
        if (code === 0) {
            // Use the Python output to generate the prompt for Gemini API
            const staticPrompt = `You are a business consultant chatbot specializing in generating innovative business ideas and providing strategic execution advice. When a user describes their business interest, suggest a tailored business idea and provide actionable steps for execution, including tools and resources. Offer funding suggestions, target audience insights, and possible revenue models. Share marketing strategies, risk mitigation tips, and growth suggestions. Share helpful resources and success stories to inspire users.`;
            
            const prompt = `${staticPrompt} User Query: ${req.body.prompt} and lenders recommendation: ${pythonOutput} Please respond in 3 to 4 lines.`;

            // Generate content with Gemini API
            const genAI = new GoogleGenerativeAI("AIzaSyD3AjbtPaBPIgm6SzLRnYf342Hc5QmpJkAd");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(prompt);
            console.log(result.response.text());

            // Send the result as response
            return res.json({ message: result.response.text() });
        } else {
            console.error(`Python script failed with code: ${code}`);
            return res.status(500).json({ error: "Failed to generate lender recommendations." });
        }
    });
};

module.exports = { gemini_response };
