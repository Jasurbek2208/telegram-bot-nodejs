const { Telegraf } = require('telegraf');
const schedule = require('node-schedule');

const bot = new Telegraf('5833819728:AAH1dRS8nucWa5_Mh_CmoKUJOIx5uTsYg6I');
const sourceChannelUsername = '@OrderCrafters';
const destinationChannelUsername = '@testgroupforbotjasur';

// Middleware to forward posts
bot.on('text', async (ctx) => {
    const sourceChannelId = await ctx.telegram.getChat(sourceChannelUsername).then(chat => chat.id);
    const destinationChannelId = await ctx.telegram.getChat(destinationChannelUsername).then(chat => chat.id);

    if (ctx.message.chat.id === sourceChannelId) {
        const messageId = ctx.message.message_id;
        ctx.telegram.forwardMessage(destinationChannelId, sourceChannelId, messageId);
    }
});

async function getUpdates() {
  const offset = 0; // Set an initial offset

  //while (true) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&limit=1&timeout=30`);
      const data = await response.json();
     // console.log(data)
      bot.telegram.sendMessage(destinationChannelUsername, data.result[0].message.text);

    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  //}
}

// Schedule post forwarding every 1 minute
schedule.scheduleJob('* * * * *', () => {
  getUpdates()
    
    // You can add additional logic here if needed
});

// Start the bot
bot.launch().then(() => {
    console.log('Bot is running');
});
