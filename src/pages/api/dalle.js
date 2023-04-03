import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const fetchGPTPrompt = async (prompt) => {
    prompt += ". Please Make it only 3 Sentences"; 
    const options2 = {
        model: "text-davinci-003",
        prompt,
        temperature: 0.2, //change creativity
        max_tokens: 2024,
    }
    try {
        const completion = await openai.createCompletion(options2);
        const result = completion.data.choices[0].text;
        // console.log("result: ", result);
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

    // Get user prompt 
    const userPromt= req.body.userPromt|| '';
    if (userPromt.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid userPromt",
            }
        });
        return;
    }

    try {
        const style = "For kids, cartoon, simple, minimalistic, colorful, Kid Friendly: ";
        const generatedStory =  await fetchGPTPrompt(userPromt)
        const sentences = generatedStory.split(/\.|\?|!|\n/).filter((sentence) => sentence.trim() !== '');
        console.log("sentences:", sentences)


        // const dallePrompt = style + generatedStory
        const arrayOfImages = []

        for(let index in sentences ) {
            const params = {
                prompt: style + sentences[index],
                n: 1,
                size: "256x256",
            }
            const response = await openai.createImage(params);

            arrayOfImages.push(response.data.data[0].url)
        }

        const result = {
            img: arrayOfImages,
            data: sentences
        }

      
        res.status(200).json({
            result
        });
        // return response

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


// function generatePrompt(userPromt) {
//     const capitalizeduserPromt=
//         userPromt[0].toUpperCase() + userPromt.slice(1).toLowerCase();
//     return `Suggest three names for an userPromtthat is a superhero.

// userPromt: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// userPromt: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// userPromt: ${capitalizeduserPromt}
// Names:`;
// }
