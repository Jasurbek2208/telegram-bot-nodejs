const { Configuration, OpenAIApi } = require("openai");
const { Telegraf, Markup } = require("telegraf");
const config = require("config");
const axios = require("axios");

const openaiApiKey = config.get("OPENAI_API_KEY");
const telegramBotToken = config.get("TELEGRAM_BOT_TOKEN");

const configuration = new Configuration({
  apiKey: openaiApiKey,
});

const bot = new Telegraf(telegramBotToken);
const openai = new OpenAIApi(configuration);

async function getAssistantReply(prompt) {
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const assistantReply = res.data.choices[0].message.content;
    console.log(assistantReply);

    return assistantReply;
  } catch (error) {
    console.log(error);
    return "Error: Unable to generate response.";
  }
}

bot.start((ctx) => {
  const keyboard = Markup.keyboard([
    ["👋 Say Hello", "⚠️ Help!"],

    ["🔗 Bot Commands"],
  ]).resize();

  ctx.reply("Assalamu Alaykum!", keyboard);
});

bot.on("text", async (ctx) => {
  if (ctx.message.text === "👋 Say Hello") {
    await ctx.reply("Hello there!");
  } else if (ctx.message.text == "⚠️ Help!") {
    await ctx.reply("Helping !");
  } else {
    await ctx.reply("Tushunarliroq gap yoz!");
  }
});

bot.on("photo", async (ctx) => {
  try {
    //const userMessage = ctx.message.text;

    //const response = await getAssistantReply(userMessage);
    //await ctx.reply(response);

    const title = (await ctx.message.caption.split("§")[0]) || "";
    const img =
      (await ctx.message.photo[ctx.message.photo.length - 1].file_id) || "";
    const project_link = (await ctx.message.caption.split("§")[1]) || "";
    const github_link = (await ctx.message.caption.split("§")[2]) || "";

    const data = { title, img, project_link, github_link };
    console.log("kirdi", body);
    const res = await axios(
      "https://shomaqsudov-portfolio-backend.glitch.me/portfolio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFzdXJiZWsyMjA4IiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIl9pZCI6IjE2OTAyODcxNDE5MjUiLCJhY2Nlc3NfdG9rZW4iOm51bGwsImlhdCI6MTY5MDI4NzE0MSwiZXhwIjoxNjkwMjkwNzQxfQ._an480Z2OR7q5a45g_gG4CHbgrO2x7Ux4vEeNZmHXaI",
        },
        data,
      }
    );

    await ctx.reply(res.message);
  } catch (error) {
    await ctx.reply(`<b>Error: </b> \n${error.response.data.message}`, {
      parse_mode: "HTML",
    });
  }
});

bot
  .launch()
  .then(() => {
    console.log("Telegram bot is running.");
  })
  .catch((err) => {
    console.error("Error launching Telegram bot:", err);
  });
