import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export const fetchGPTPrompt = async (prompt) => {
    const options2 = {
        model: "text-davinci-003",
        prompt,
        temperature: 0.6,
        max_tokens: 2024,
    }
    try {
        const completion = await openai.createCompletion(options2);
        const result = completion.data.choices[0].text;
        console.log("result: ", result);
        return result;

    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.log(error.response.status, error.response.data);

        } else {
            console.log(`Error with OpenAI API request: ${error.message}`);
        }
    }

}

export default async function (req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    const animal = req.body.animal || '';
    if (animal.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid animal",
            }
        });
        return;
    }

    try {
        // ADD DALL-E Here - Generate image based on text
        const style = "For kids, cartoon, simple, minimalistic, colorful, Kid Friendly"
        // const dallePrompt = style + fetchGPTPrompt("Tell us a math story about the number PI for kids")
        const dallePrompt = style + "Tell us a math story about the number PI for kids" 


        const params = {
            prompt: dallePrompt,
            n: 1,
            size: "1024x1024",
        }

        const response = await openai.createImage(params);
        const agentImg = response.data.data[0].url;
        console.log(dallePrompt)
        console.log(agentImg)

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
}

// function generatePrompt(animal) {
//     const capitalizedAnimal =
//         animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//     return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }
