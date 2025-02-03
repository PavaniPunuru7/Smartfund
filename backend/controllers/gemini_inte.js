const { GoogleGenerativeAI } = require("@google/generative-ai");
const gemini_response=async(req,res)=>{
    console.log(req.body.prompt)
    console.log("in gemini controller")
    const genAI = new GoogleGenerativeAI("AIzaSyCCUZRSMqwqXN7_K6aP4y3oiJFf080sAfQ");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = req.body.prompt;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return res.json({message: result.response.text()})
}

module.exports = {gemini_response}