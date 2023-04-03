import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const fetchGPTPrompt = async (prompt) => {
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
        // ADD DALL-E Here - Generate image based on text
        const style = "For kids, cartoon, simple, minimalistic, colorful, Kid Friendly: ";
        const generatedStory =  await fetchGPTPrompt(userPromt)
        const sentences = generatedStory.split(/(\.|\?|!)/);
        console.log("sentences:", sentences)
        const dallePrompt = style + generatedStory


        // const truck_prompt = 
        // console.log('truck_prompt', truck_prompt)


        // const allePrompt = style + generatedStory


        const params = {
            prompt: dallePrompt.slice(0, 250),
            n: 6,
            size: "256x256",
        }

        const response = await openai.createImage(params);

        const arrayOfImages = []

        // console.log("For loop line 77")
        const resImageData = response.data.data
        for(let index in resImageData ){
            // console.log(resImageData[index].url)
            arrayOfImages.push(resImageData[index].url)
        }
        // console.log("Test 81 Images:", arrayOfImages)
        const result = {
            img: arrayOfImages,
            data: generatedStory
        }

        // console.log(dallePrompt)
        // console.log(agentImg)
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
