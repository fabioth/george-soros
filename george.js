require('dotenv').config()
const fs = require('fs');
const Telegraf = require('telegraf');
const commandParts = require('telegraf-command-parts');
const CDP = require('chrome-remote-interface');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(commandParts());

bot.command(['chart', 'c'], (ctx) => {
    var args = ctx.state.command.args.split(' ');

    var symbol = args[0];
    var interval = args[1] || 'D';

    var aliases = [
        { "unit": "btc", "symbol": "bitstamp:btcusd" },
        { "unit": "eth", "symbol": "bitstamp:ethusd" }
    ];

    var findSymbol = aliases.filter(p => p.unit == symbol);

    var correctSymbol = (findSymbol.length > 0) ? findSymbol[0].symbol : "AAPL";
    
    console.log(ctx.message);

    CDP(async (client) => {
        const {Emulation, Page} = client;

        var device = {
            width: 960,
            height: 750,
            deviceScaleFactor: 3,
            mobile: false,
            fitWindow: false
        };

        try {
            await Page.enable();
            await Page.navigate({url: 'https://www.tradingview.com/widgetembed/?frameElementId=tradingview_c4872&symbol='+ correctSymbol +'&interval='+ interval +'&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=RSI%40tv-basicstudies&theme=dark&style=1&timezone=Europe%2FBerlin&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en'});
            await Page.loadEventFired();
            await Emulation.setDeviceMetricsOverride(device);
            await Emulation.setVisibleSize({width: 960, height: 750});
            const {data} = await Page.captureScreenshot();
            fs.writeFileSync('candle.png', Buffer.from(data, 'base64'));
        } catch (err) {
            console.error(err);
        } finally {
            await client.close();

            ctx.replyWithPhoto({ source: 'candle.png' });
        }
    }).on('error', (err) => {
            console.error(err);
    });

});

bot.launch();