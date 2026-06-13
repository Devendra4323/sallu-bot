const { Telegraf, Markup } = require('telegraf');
const path = require('path');

// --- CONFIGURATION ---
const TOKEN = "8715171203:AAGy_iMja9G0QXivtlW_bzj5o6X5ZhCds3k";
const ADMIN_ID = 5719967199;
// Using path.join ensures Vercel finds the file regardless of its internal structure
const QR_CODE_PATH = path.join(process.cwd(), 'api', 'code.jpeg');
const GLOBAL_PRICE = "149rs";

const bot = new Telegraf(TOKEN);

// --- DATA ---
const RAW_DEMO_PHOTOS = [
     "AgACAgUAAxkBAAO8aer8Xb4IA_YiQtfw7spbd4HT_X4AAl3IMRswXXFW5q5BKkdhps4BAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAO9aer8XYf51rqwpfSJYm00qJAcmDIAAjHFMRsboEhWDDFZFubg5VMBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAO-aer8XS0KCt8oUy2rtpP5nGMXkMkAAl7IMRswXXFWKd08dJ23zZEBAAMCAAN5AAM7BA",
        "AgACAgQAAxkBAAO_aer8XU6oNmOnVWuwhG1xl4EynQIAAqrHMRti6nlSMbpeldGpvGMBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAO9aer8XYf51rqwpfSJYm00qJAcmDIAAjHFMRsboEhWDDFZFubg5VMBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPBaer8XcNpcprL48QXtZm_wiBrZ2cAAte9MRsDWuhVygZ_ybkmPMIBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPCaer8XZcfzP6Ff-LI8W5nzzMKaYcAAta9MRsDWuhVxYC08X6m80EBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPDaer8XS9ns8NWaY8jFp_0N1lpieYAAri8MRtE52FVKvTz3U5s-gkBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPEaer8XWO-mRhrL4_5xVoR5GwKwVcAAra8MRtE52FVPPWN5tseHvEBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPFaer8XePeiMyvV3t3RqGfx1-y_QoAArW8MRtE52FVL7Wgz53KQhABAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPGaer8XcL6WHq8NlQ1_5llOj_Sl0sAAp_CMRvwv1FVQ5S9iszMun8BAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPHaer8XQ1glNvVHdSbfdTGpsbUaGgAApzCMRvwv1FVGtQEB7W_lYwBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPIaer8XfRotukY4-9zJ8hiiHK7jCUAAqDCMRvwv1FVSyaPYK2Sc9UBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPJaer8XYhBeEcokrNGNBG9SKW_yRYAAnO_MRu-oUlV-4KfG1xf48YBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPKaer8XeBX_XUX8fEx3neYX6tv2UMAAnW_MRu-oUlVFuJAKuSO2fkBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPLaer8Xd4zSGx1R-Oi8aAY7LjIOm0AAo7CMRvk09lV22esPU2S5doBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPMaer8XS5_VW9gAaeAqZTZUieoCSgAAgHIMRvPpWlVuDYfPjPPN0cBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPNaer8XX_sF5_HYQE4PvwWnASdfmoAAoLDMRtqBdlV90o8FE8moKABAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPOaer8XUe_r0fO7Q2HhMhUo7MXdksAAlTCMRss39lVkKMuNhe2CH4BAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPPaer8XSjEWMYYBYW1B_QxNcBldokAAoHDMRtqBdlVtLMjr9_grhEBAAMCAAN5AAM7BA",
        "AgACAgUAAxkBAAPQaer8XQABJe80YrCI5a8MxTIJShdJAALvDWsbExIpVdEoVfmQriNCAQADAgADeQADOwQ",
        "AgACAgUAAxkBAAPRaer8XW1udGM_AqR2R5q1qtpBPvcAAu0NaxsTEilVFR2VZ-wbFbgBAAMCAAN5AAM7BA",
];

const CHANNELS = {
    "indian": { name: "Indian All Types Primium", link: "https://t.me/+KbKruxgpui05YTA5" },
    "leaked": { name: "Indian Best", link: "https://t.me/y9PAbFkNZ1g1ZWE9" },
    "family": { name: "Real Family", link: "https://t.me/Ultimateplike" },
    "mom": { name: "Mom Son", link: "https://t.me/+--DW0-cWo-M2MGI9" },
    "cuck": { name: "Cuckold", link: "https://t.me/hootwifexxx" },
    "nude": { name: "Indian Girl Nude", link: "https://t.me/+1jEzt0m9d0c0ZDI1" },
    "incest": { name: "Incest", link: "https://t.me/+UrGILZ52EDliZDNl" },
    "hidden": { name: "Hidden Cam", link: "https://t.me/+_C73rc3bq9kwMjU1" },
    "forced": { name: "Forced", link: "https://t.me/BondagePunishment" },
    "aunty": { name: "Aunty",  link: "https://t.me/mallukambichttttt" },
    "sleeping": { name: "Sleeping Family",  link: "https://t.me/+4dfAPps7IbZlZTY1" },
    "teen": { name: "Teen",  link: "https://t.me/+oqsm6F3fxwBjYWY1" },
    "gf": { name: "Gf Bf",  link: "https://t.me/Ocmasala007" },
    "desi": { name: "Desi Village",  link: "https://t.me/withoffuss2" },
    "snap": { name: "Snapchat & Insta",  link: "https://t.me/+link3" },
    "vip": { name: "VIP collection",  link: "https://t.me/+XqwmNQQ82oVlMDg1" },
    "shemale": { name: "Indina Shemale",  link: "https://t.me/+nS5YVGjqJIVkOTJl" },
    "2026 NEW": { name: "NEW 2026",  link: "https://t.me/+W5_sDHIANw4zMDdl" },
};

const userState = {};

const getMainKeyboard = () => {
    const buttons = Object.entries(CHANNELS).map(([key, d]) => [
        Markup.button.callback(`${d.name} `, `view_${key}`)
    ]);
    buttons.push([Markup.button.callback("👉View Demo Screenshots👈", "start_demo")]);
    return Markup.inlineKeyboard(buttons);
};

// --- HANDLERS ---

bot.start((ctx) => {
    return ctx.replyWithMarkdownV2("🥵 **Welcome\\!** 🥵\nAll Types Content: 149rs Only", getMainKeyboard());
});

bot.action('go_back', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        if (ctx.callbackQuery.message.photo) {
            await ctx.deleteMessage();
            return ctx.replyWithMarkdownV2("🥵 **Welcome\\!** 🥵\nSelect a channel:", getMainKeyboard());
        }
        return ctx.editMessageText("Select a channel:", getMainKeyboard());
    } catch (e) { console.error(e); }
});

bot.action('start_demo', async (ctx) => {
    try {
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
    } catch (e) { console.error(e); }
});

bot.action('next_demo', async (ctx) => {
    const userId = ctx.from.id;
    if (!userState[userId]) userState[userId] = { demo_index: 0 };
    
    let idx = (userState[userId].demo_index + 1) % RAW_DEMO_PHOTOS.length;
    userState[userId].demo_index = idx;

    try {
        await ctx.answerCbQuery();
        await ctx.editMessageMedia({
            type: 'photo',
            media: RAW_DEMO_PHOTOS[idx],
            caption: `🖼 **Demo Preview** (${idx + 1}/${RAW_DEMO_PHOTOS.length})`,
            parse_mode: 'Markdown'
        }, Markup.inlineKeyboard([
            [Markup.button.callback("Next ➡️", "next_demo")],
            [Markup.button.callback("⬅️ Back to Menu", "go_back")]
        ]));
    } catch (e) { console.error(e); }
});

bot.action(/^view_(.+)$/, async (ctx) => {
    try {
        await ctx.answerCbQuery();
        const key = ctx.match[1];
        const ch = CHANNELS[key];
        if (ch) {
            return ctx.editMessageText(`**Channel:** ${ch.name}\n**Price:** ${GLOBAL_PRICE}`, {
                parse_mode: 'Markdown',
                ...Markup.inlineKeyboard([
                    [Markup.button.callback(`💳 Pay ₹${GLOBAL_PRICE}`, `pay_${key}`)],
                    [Markup.button.callback("⬅️ Back", "go_back")]
                ])
            });
        }
    } catch (e) { console.error(e); }
});

bot.action(/^pay_(.+)$/, async (ctx) => {
    try {
        await ctx.answerCbQuery();
        const key = ctx.match[1];
        const userId = ctx.from.id;
        if (!userState[userId]) userState[userId] = {};
        userState[userId].buying = key;

        await ctx.reply(" Pay on this QR Code and send screenshot here..");
        
        return await ctx.replyWithPhoto({ source: QR_CODE_PATH });
    } catch (e) {
        console.error("QR Send Error:", e);
        return ctx.reply("⚠️ QR Error. Please ensure code.jpeg is in the api folder.");
    }
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
            ...Markup.inlineKeyboard([
                [
                    Markup.button.callback("✅ Approve", `approve_${userId}_${buying}`),
                    Markup.button.callback("❌ Reject", `reject_${userId}`)
                ]
            ])
        });
    }
});

bot.action(/^approve_(\d+)_(.+)$/, async (ctx) => {
    try {
        await ctx.answerCbQuery();
        const targetId = ctx.match[1];
        const chKey = ctx.match[2];
        const ch = CHANNELS[chKey];

        if (ch) {
            await ctx.editMessageCaption(`✅ Approved: ${ch.name}`);
            await ctx.telegram.sendMessage(targetId, `🚀 **Verified!** Access granted to: **${ch.name}**`, 
                Markup.inlineKeyboard([[Markup.button.url("🔗 Join Channel", ch.link)]])
            );
        }
    } catch (e) { console.error(e); }
});

bot.action(/^reject_(\d+)$/, async (ctx) => {
    try {
        await ctx.answerCbQuery();
        const targetId = ctx.match[1];
        await ctx.editMessageCaption("❌ Rejected.");
        await ctx.telegram.sendMessage(targetId, "❌ **Rejected!** Please send a real screenshot.");
    } catch (e) { console.error(e); }
});

// --- VERCEL EXPORT ---
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await bot.handleUpdate(req.body);
            res.status(200).send('OK');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Error');
        }
    } else {
        res.status(200).send('Bot is Running');
    }
};
