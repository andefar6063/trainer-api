const openai = require("openai");

const client = new openai.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.createClient = async (req, res) => {
    res.status(200).send("Client")
}
