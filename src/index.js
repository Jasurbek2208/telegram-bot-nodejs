const { Telegraf, Markup } = require("telegraf");
// const config = require("config");
// const { openai } = require("./openai")
const { replyToUser, postPortfolioToServer } = require("./utils/functions");

// const bot = new Telegraf(config.get("TELEGRAM_BOT_TOKEN"));
const bot = new Telegraf(process.env("TELEGRAM_BOT_TOKEN"));

bot.start((ctx) => {
  // Using a more readable multiline array for the keyboard options
  const keyboard = Markup.keyboard([
    ["👋 Say Hello", "⚠️ Help!"],
    ["🔗 Bot Commands"],
  ]).resize();

  ctx.reply("Assalamu Alaykum!", keyboard);
});

bot.on("text", async (ctx) => {
  const userMessage = ctx.message.text;

  switch (userMessage) {
    case "👋 Say Hello":
      await replyToUser(ctx, "Hello there!");
      break;

    case "⚠️ Help!":
      await replyToUser(ctx, "Helping !");
      break;

    default:
      try {
        // Get the user ID as the user identifier
        const user = ctx.message.from.id;
        await replyToUser(ctx, userMessage);
        // await openai.getChatToGPT(ctx, userMessage, user)
      } catch (error) {
        await replyToUser(ctx, `Error in sending text: \n${error}`);
      }
      break;
  }
});

bot.on("photo", async (ctx) => {
  const caption = ctx.message.caption || "";
  const [title, project_link, github_link] = caption.split("§");
  const img = ctx.message.photo[ctx.message.photo.length - 1].file_id;

  const data = { title, img, project_link, github_link };

  postPortfolioToServer(ctx, data)
});

bot.launch()
  .then(() => {
    console.log("Telegram bot is running.");
  })
  .catch((err) => {
    console.error("Error launching Telegram bot:", err);
  });
