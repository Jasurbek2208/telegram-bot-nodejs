// const { Configuration, OpenAIApi } = require("openai");
// // const config = require("config");
// const { replyToUser } = require("./utils/functions")

// class OpenAI {
//     constructor(apiKey) {
//         const configuration = new Configuration({
//             apiKey
//         });
//         this.openai = new OpenAIApi(configuration)
//     }

//     async getChatToGPT(ctx, prompt = '', user = '') {
//         try {
//             const response = await this.openai.createChatCompletion({
//                 // model: config.get('GPT_MODEL'),
//                 model: process.env('GPT_MODEL'),
//                 messages: [{ role: "user", content: prompt }],
//                 user
//             })

//             const gptReply = response.data.choices[0].message.content

//             // Get the response from OpenAI
//             await replyToUser(ctx, gptReply)
//         } catch (error) {
//             // console.log(error.response.data.error)
//             await replyToUser(ctx, `<b>Error:</b> ${error.response.data.error.message}`, true)
//         }
//     }
// }

// // const openai = new OpenAI(config.get("OPENAI_API_KEY"));
// const openai = new OpenAI(process.env("OPENAI_API_KEY"));

// module.exports = { openai };