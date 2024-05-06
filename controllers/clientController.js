const openai = require("openai");

const client = new openai.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

//Create thread
exports.createThread = async (req, res) => {
    try {
        const thread = await client.beta.threads.create();
        res.status(200).json({
            status: 'success',
            threadID: thread.id
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

//Add user message to thread
exports.userMessage = async (req, res) => {
    const { threadID, content } = req.body;
    try {
        const message = await client.beta.threads.messages.create(
            threadID,
            {
                role: "user",
                content: content
            }
        );
        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

//Run client
exports.runClient = async (req, res) => {
    const { threadID } = req.body;
    try {
        let run = await client.beta.threads.runs.createAndPoll(
            threadID,
            {
                assistant_id: process.env.ASSISTANT_ID,
            }
        );

        if (run.status === 'completed') {
            const messages = await client.beta.threads.messages.list(
                run.thread_id
            );
            let message_text;
            for (const message of messages.data.reverse()) {
                message_text = message.content[0].text.value
            }
            res.status(200).json({
                status: 'success',
                message: message_text
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Run did not complete successfully',
                runStatus: run.status
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};
