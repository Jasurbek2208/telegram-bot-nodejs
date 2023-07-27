const axios = require("axios")
require('dotenv').config();
// const config = require("config")

class Generalfunctions {
    // Helper function to send a reply to the user
    async replyToUser(ctx, message, isHTML = false) {
        try {
            await ctx.reply(message, { parse_mode: isHTML ? 'HTML' : 'MarkdownV2' });
        } catch (error) {
            await ctx.reply(`Error in sending text: \n${error}`, { parse_mode: 'HTML' });
        }
    }


    // Sending post to portfolio api server
    async postPortfolioToServer(ctx, data) {
        try {
            // const res = await axios.post(`${config.get("BASE_BACKEND_API_URL")}/portfolio`, data, {
            const res = await axios.post(`${process.env("BASE_BACKEND_API_URL")}/portfolio`, data, {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: config.get('USER_BEARER_TOKEN'),
                    Authorization: process.env('USER_BEARER_TOKEN'),
                },
            });
            // await generalFunctions.replyToUser(ctx, res.data.message += `\n\nView this post:\n${config.get("BASE_BACKEND_API_URL")}/portfolios/${res.data.data.id}`);
            await generalFunctions.replyToUser(ctx, res.data.message += `\n\nView this post:\n${process.env("BASE_BACKEND_API_URL")}/portfolios/${res.data.data.id}`);
        } catch (error) {
            await generalFunctions.replyToUser(ctx, `<b>Error: </b> \n${error.response.data.message}`);
        }
    }
}

const generalFunctions = new Generalfunctions();
module.exports = generalFunctions