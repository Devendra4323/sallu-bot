const { Telegraf, Markup } = require('telegraf');

// --- CONFIGURATION ---
const TOKEN = process.env.BOT_TOKEN; // Best practice: use environment variables
const ADMIN_ID = 5719967199;
const QR_CODE_PATH = "./api/code.jpeg"; // Ensure this file exists in /api folder
const GLOBAL_PRICE = "149rs";

const bot = new Telegraf(TOKEN);

// --- DATA ---
const RAW_DEMO_PHOTOS = [
    "AgACAgUAAxkBAAO8aer8Xb4IA_YiQtfw7spbd4HT_X4AAl3IMRswXXFW5q5BKkdhps4BAAMCAAN5AAM7BA",
    "AgACAgUAAxkBAAO9aer8XYf51rqwpfSJYm00qJAcmDIAAjHFMRsboEhWDDFZFubg5VMBAAMCAAN5AAM7BA",
    "AgACAgUAAxkBAAO-aer8XS0KCt8oUy2rtpP5nGMXkMkAAl7IMRswXXFWKd08dJ23zZEBAAMCAAN5AAM7BA",
    "AgACAgQAAxkBAAO_aer8XU6oNmOnVWuwhG1xl4EynQIAAqrHMRti6nlSMbpeldGpvGMBAAMCAAN5AAM7BA",
];

const CHANNELS = {
    "indian": { name: "Indian All Types Mix", link: "https://t.me/+2kLBJdAkHXVkN2Q1" },
    "leaked": { name: "Indian Leaked", link: "https://t.me/pornxnow_official" },
    "family": { name: "Real Family", link: "https://t.me/Ultimateplike" },
    "mom": { name: "Mom Son", link: "https://t.me/+--DW0-cWo-M2MGI9" },
    "cuck": { name: "Cuckold", link: "https://t.me/hootwifexxx" },
    "nude": { name: "Indian Girl Nude", link: "https://t.me/+1jEzt0m9d0c0ZDI1" },
    "incest": { name: "Incest", link: "https://t.me/+UrGILZ52EDliZDNl" },
    "hidden": { name: "Hidden Cam", link: "https://t.me/rainbowUnicornsandangels" },
    "forced": { name: "Forced", link: "https://t.me/BondagePunishment" },
    "aunty": { name: "Aunty",  link: "https://t.me/desioldaunty" },
    "sleeping": { name: "Sleeping Family",  link: "https://t.me/+4dfAPps7IbZlZTY1" },
    "teen": { name: "Teen",  link: "https://t.me/+1jEzt0m9d0c0ZDI1" },
    "gf": { name: "Gf Bf",  link: "https://t.me/Ultimateplike" },
    "desi": { name: "Desi Village",  link: "https://t.me/withoffuss2" },
    "snap": { name: "Snapchat & Insta",  link: "https://t.me/+link3" },
    "vip": { name: "VIP collection",  link: "https://t.me/addlist/2__SaYAEpEg5ZTM1" },
    "shemale": { name: "Indina Shemale",  link: "https://t.me/+nS5YVGjqJIVkOTJl" },
};

// State handling (WARNING: This will reset frequently in Serverless)
const userState = {};

const getMainKeyboard = () => {
    const buttons = Object.entries(CHANNELS).map(([key, d]) => [
        Markup.button.callback(`${d.name} `, `view_${key}`)
    ]);
    buttons.push([Markup.button.callback("👉View Demo Screenshots👈", "start_demo")]);
    return Markup.inlineKeyboard(buttons);
};

// --- HANDLERS ---
bot.start((ctx) => ctx.replyWithMarkdownV2("🥵 **Welcome\\!** 🥵\nAll Types Content: 149rs Only", getMainKeyboard()));

bot.action('go_back', async (ctx) => {
    await ctx.answerCbQuery();
    if (ctx.callbackQuery.message.photo) {
        await ctx.deleteMessage();
        return ctx.replyWithMarkdownV2("🥵 **Welcome\\!** 🥵\nSelect a channel:", getMainKeyboard());
    }
    return ctx.editMessageText("Select a channel:", getMainKeyboard());
});

bot.action('start_demo', async (ctx) => {
    await ctx.answerCbQuery();
    const userId = ctx.from.id;
    userState[userId] = { demo_index: 0 };
    await ctx.deleteMessage();
    return ctx.replyWithPhoto(RAW_DEMO_PHOTOS[0], {
        caption: `🖼 **Demo Preview** (1/${RAW_DEMO_PHOTOS.length})`,
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
            [Markup.button.callback("Next ➡️", "next_demo")],
            [Markup.button.callback("⬅️ Back to Menu", "go_back")]
        ])
    });
});

bot.action('next_demo', async (ctx) => {
    const userId = ctx.from.id;
    if (!userState[userId]) userState[userId] = { demo_index: 0 };
    let idx = (userState[userId].demo_index + 1) % RAW_DEMO_PHOTOS.length;
    userState[userId].demo_index = idx;
    try {
        await ctx.editMessageMedia({
            type: 'photo',
            media: RAW_DEMO_PHOTOS[idx],
            caption: `🖼 **Demo Preview** (${idx + 1}/${RAW_DEMO_PHOTOS.length})`,
            parse_mode: 'Markdown'
        }, Markup.inlineKeyboard([
            [Markup.button.callback("Next ➡️", "next_demo")],
            [Markup.button.callback("⬅️ Back to Menu", "go_back")]
        ]));
    } catch (e) { await ctx.answerCbQuery(); }
});

bot.action(/^view_(.+)$/, async (ctx) => {
    const key = ctx.match[1];
    const ch = CHANNELS[key];
    if (ch) {
        await ctx.answerCbQuery();
        return ctx.editMessageText(`**Channel:** ${ch.name}\n**Price:** ${GLOBAL_PRICE}`, {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback(`💳 Pay ₹${GLOBAL_PRICE}`, `pay_${key}`)],
                [Markup.button.callback("⬅️ Back", "go_back")]
            ])
        });
    }
});

bot.action(/^pay_(.+)$/, async (ctx) => {
    const key = ctx.match[1];
    const userId = ctx.from.id;
    if (!userState[userId]) userState[userId] = {};
    userState[userId].buying = key;
    await ctx.answerCbQuery();
    await ctx.reply("Pay on this QR Code and send screenshot here..");
    try {
        return ctx.replyWithPhoto({ source: QR_CODE_PATH });
    } catch (e) { return ctx.reply("⚠️ QR Error."); }
});

bot.on('photo', async (ctx) => {
    const userId = ctx.from.id;
    const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const buying = userState[userId]?.buying || 'unknown';
    if (userId !== ADMIN_ID) {
        await ctx.reply("⏳ Verifying...");
        return ctx.telegram.sendPhoto(ADMIN_ID, photoId, {
            caption: `🚨 **ORDER**\nUser: ${ctx.from.first_name}\nBuying: ${buying}`,
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([[
                Markup.button.callback("✅ Approve", `approve_${userId}_${buying}`),
                Markup.button.callback("❌ Reject", `reject_${userId}`)
            ]])
        });
    }
});

bot.action(/^approve_(\d+)_(.+)$/, async (ctx) => {
    const targetId = ctx.match[1];
    const chKey = ctx.match[2];
    const ch = CHANNELS[chKey];
    if (ch) {
        await ctx.editMessageCaption(`✅ Approved: ${ch.name}`);
        await ctx.telegram.sendMessage(targetId, `🚀 **Verified!** Access granted to: **${ch.name}**`, 
            Markup.inlineKeyboard([[Markup.button.url("🔗 Join Channel", ch.link)]])
        );
    }
    return ctx.answerCbQuery();
});

bot.action(/^reject_(\d+)$/, async (ctx) => {
    const targetId = ctx.match[1];
    await ctx.editMessageCaption("❌ Rejected.");
    await ctx.telegram.sendMessage(targetId, "❌ **Rejected!** Please send a real screenshot.");
    return ctx.answerCbQuery();
});

// --- VERCEL WEBHOOK HANDLER ---
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        await bot.handleUpdate(req.body);
        res.status(200).send('OK');
    } else {
        res.status(200).send('Bot is running');
    }
};
