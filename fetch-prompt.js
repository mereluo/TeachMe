import { Configuration, OpenAIApi } from "openai";

const API_KEY = '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'

const configuration = new Configuration({
    // apiKey: process.env.API_KEY,
    apiKey: API_KEY
});
const openai = new OpenAIApi(configuration);

const prompts = ['What is a circle?', "What is PI?"]

const prompt = "Write 100 words story about PI for kids"

// const options = {
//     engine: 'davinci', 
//     prompt,
//     model: 'davinci',
//     maxTokens: 2024,
//     stop: '\n',
//     temperature: 0.7,
// };

const options2 = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.6,
    max_tokens: 512,
}

export const fetchPrompt = async (req, res) => {
    console.log('request body', req.body)
    console.log('HELLO 53')

    try {
        const completion = await openai.createCompletion(options2);
        const result = completion.data.choices[0].text;
        console.log("result: ", result);
        return res.status(200).json({ result });

    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }

    return res.json({ success: 'true' })
}

