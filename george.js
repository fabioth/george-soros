require('dotenv').config()
const fs = require('fs');
const Telegraf = require('telegraf');
const commandParts = require('telegraf-command-parts');
const CDP = require('chrome-remote-interface');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(commandParts());

bot.command(['chart', 'c'], (ctx) => {
    var args = ctx.state.command.args.split(' ');

    var symbol = args[0] || 'AAPL';
    var interval = args[1] || 'D';

    var aliases = [{"unit": "USDCHF", "symbol": "oanda:USDCHF"}, {"unit": "USDHKD", "symbol": "oanda:USDHKD"}, {"unit": "XAGJPY", "symbol": "oanda:XAGJPY"}, {"unit": "XCUUSD", "symbol": "oanda:XCUUSD"}, {"unit": "DE30EUR", "symbol": "oanda:DE30EUR"}, {"unit": "CHFZAR", "symbol": "oanda:CHFZAR"}, {"unit": "USDNOK", "symbol": "oanda:USDNOK"}, {"unit": "CADSGD", "symbol": "oanda:CADSGD"}, {"unit": "USDHUF", "symbol": "oanda:USDHUF"}, {"unit": "EURJPY", "symbol": "oanda:EURJPY"}, {"unit": "EU50EUR", "symbol": "oanda:EU50EUR"}, {"unit": "XAUSGD", "symbol": "oanda:XAUSGD"}, {"unit": "XAUNZD", "symbol": "oanda:XAUNZD"}, {"unit": "XAUXAG", "symbol": "oanda:XAUXAG"}, {"unit": "WTICOUSD", "symbol": "oanda:WTICOUSD"}, {"unit": "DE10YBEUR", "symbol": "oanda:DE10YBEUR"}, {"unit": "EURCAD", "symbol": "oanda:EURCAD"}, {"unit": "HK33HKD", "symbol": "oanda:HK33HKD"}, {"unit": "GBPJPY", "symbol": "oanda:GBPJPY"}, {"unit": "USDTRY", "symbol": "oanda:USDTRY"}, {"unit": "EURPLN", "symbol": "oanda:EURPLN"}, {"unit": "GBPZAR", "symbol": "oanda:GBPZAR"}, {"unit": "USB05YUSD", "symbol": "oanda:USB05YUSD"}, {"unit": "NZDCAD", "symbol": "oanda:NZDCAD"}, {"unit": "SOYBNUSD", "symbol": "oanda:SOYBNUSD"}, {"unit": "US30USD", "symbol": "oanda:US30USD"}, {"unit": "SUGARUSD", "symbol": "oanda:SUGARUSD"}, {"unit": "UK100GBP", "symbol": "oanda:UK100GBP"}, {"unit": "XAUEUR", "symbol": "oanda:XAUEUR"}, {"unit": "XAGGBP", "symbol": "oanda:XAGGBP"}, {"unit": "EURNZD", "symbol": "oanda:EURNZD"}, {"unit": "XAUCHF", "symbol": "oanda:XAUCHF"}, {"unit": "USB02YUSD", "symbol": "oanda:USB02YUSD"}, {"unit": "CN50USD", "symbol": "oanda:CN50USD"}, {"unit": "SGDJPY", "symbol": "oanda:SGDJPY"}, {"unit": "AUDCAD", "symbol": "oanda:AUDCAD"}, {"unit": "XAGUSD", "symbol": "oanda:XAGUSD"}, {"unit": "NL25EUR", "symbol": "oanda:NL25EUR"}, {"unit": "US2000USD", "symbol": "oanda:US2000USD"}, {"unit": "CHFJPY", "symbol": "oanda:CHFJPY"}, {"unit": "EURSGD", "symbol": "oanda:EURSGD"}, {"unit": "HKDJPY", "symbol": "oanda:HKDJPY"}, {"unit": "AUDUSD", "symbol": "oanda:AUDUSD"}, {"unit": "XAUAUD", "symbol": "oanda:XAUAUD"}, {"unit": "CADJPY", "symbol": "oanda:CADJPY"}, {"unit": "CADCHF", "symbol": "oanda:CADCHF"}, {"unit": "XPTUSD", "symbol": "oanda:XPTUSD"}, {"unit": "SGDCHF", "symbol": "oanda:SGDCHF"}, {"unit": "USDCNH", "symbol": "oanda:USDCNH"}, {"unit": "CORNUSD", "symbol": "oanda:CORNUSD"}, {"unit": "BCOUSD", "symbol": "oanda:BCOUSD"}, {"unit": "CHFHKD", "symbol": "oanda:CHFHKD"}, {"unit": "EURUSD", "symbol": "oanda:EURUSD"}, {"unit": "GBPCAD", "symbol": "oanda:GBPCAD"}, {"unit": "XAUGBP", "symbol": "oanda:XAUGBP"}, {"unit": "XAGNZD", "symbol": "oanda:XAGNZD"}, {"unit": "EURHUF", "symbol": "oanda:EURHUF"}, {"unit": "EURCZK", "symbol": "oanda:EURCZK"}, {"unit": "GBPPLN", "symbol": "oanda:GBPPLN"}, {"unit": "AUDHKD", "symbol": "oanda:AUDHKD"}, {"unit": "XPDUSD", "symbol": "oanda:XPDUSD"}, {"unit": "SPX500USD", "symbol": "oanda:SPX500USD"}, {"unit": "GBPSGD", "symbol": "oanda:GBPSGD"}, {"unit": "USDSEK", "symbol": "oanda:USDSEK"}, {"unit": "EURGBP", "symbol": "oanda:EURGBP"}, {"unit": "XAUHKD", "symbol": "oanda:XAUHKD"}, {"unit": "GBPNZD", "symbol": "oanda:GBPNZD"}, {"unit": "NZDCHF", "symbol": "oanda:NZDCHF"}, {"unit": "NZDHKD", "symbol": "oanda:NZDHKD"}, {"unit": "USB30YUSD", "symbol": "oanda:USB30YUSD"}, {"unit": "XAGAUD", "symbol": "oanda:XAGAUD"}, {"unit": "XAGCHF", "symbol": "oanda:XAGCHF"}, {"unit": "EURHKD", "symbol": "oanda:EURHKD"}, {"unit": "EURAUD", "symbol": "oanda:EURAUD"}, {"unit": "XAUJPY", "symbol": "oanda:XAUJPY"}, {"unit": "USB10YUSD", "symbol": "oanda:USB10YUSD"}, {"unit": "USDCZK", "symbol": "oanda:USDCZK"}, {"unit": "TWIXUSD", "symbol": "oanda:TWIXUSD"}, {"unit": "IN50USD", "symbol": "oanda:IN50USD"}, {"unit": "GBPAUD", "symbol": "oanda:GBPAUD"}, {"unit": "USDPLN", "symbol": "oanda:USDPLN"}, {"unit": "GBPHKD", "symbol": "oanda:GBPHKD"}, {"unit": "XAUUSD", "symbol": "oanda:XAUUSD"}, {"unit": "JP225USD", "symbol": "oanda:JP225USD"}, {"unit": "NZDSGD", "symbol": "oanda:NZDSGD"}, {"unit": "ZARJPY", "symbol": "oanda:ZARJPY"}, {"unit": "AUDSGD", "symbol": "oanda:AUDSGD"}, {"unit": "EURDKK", "symbol": "oanda:EURDKK"}, {"unit": "FR40EUR", "symbol": "oanda:FR40EUR"}, {"unit": "XAGSGD", "symbol": "oanda:XAGSGD"}, {"unit": "EURTRY", "symbol": "oanda:EURTRY"}, {"unit": "USDJPY", "symbol": "oanda:USDJPY"}, {"unit": "USDCAD", "symbol": "oanda:USDCAD"}, {"unit": "AUDJPY", "symbol": "oanda:AUDJPY"}, {"unit": "SGDHKD", "symbol": "oanda:SGDHKD"}, {"unit": "XAGCAD", "symbol": "oanda:XAGCAD"}, {"unit": "AUDNZD", "symbol": "oanda:AUDNZD"}, {"unit": "USDDKK", "symbol": "oanda:USDDKK"}, {"unit": "CADHKD", "symbol": "oanda:CADHKD"}, {"unit": "USDINR", "symbol": "oanda:USDINR"}, {"unit": "AUDCHF", "symbol": "oanda:AUDCHF"}, {"unit": "XAUCAD", "symbol": "oanda:XAUCAD"}, {"unit": "USDTHB", "symbol": "oanda:USDTHB"}, {"unit": "GBPCHF", "symbol": "oanda:GBPCHF"}, {"unit": "TRYJPY", "symbol": "oanda:TRYJPY"}, {"unit": "NZDJPY", "symbol": "oanda:NZDJPY"}, {"unit": "EURSEK", "symbol": "oanda:EURSEK"}, {"unit": "USDSGD", "symbol": "oanda:USDSGD"}, {"unit": "USDZAR", "symbol": "oanda:USDZAR"}, {"unit": "NATGASUSD", "symbol": "oanda:NATGASUSD"}, {"unit": "WHEATUSD", "symbol": "oanda:WHEATUSD"}, {"unit": "NAS100USD", "symbol": "oanda:NAS100USD"}, {"unit": "EURZAR", "symbol": "oanda:EURZAR"}, {"unit": "USDMXN", "symbol": "oanda:USDMXN"}, {"unit": "GBPUSD", "symbol": "oanda:GBPUSD"}, {"unit": "NZDUSD", "symbol": "oanda:NZDUSD"}, {"unit": "XAGEUR", "symbol": "oanda:XAGEUR"}, {"unit": "UK10YBGBP", "symbol": "oanda:UK10YBGBP"}, {"unit": "AU200AUD", "symbol": "oanda:AU200AUD"}, {"unit": "EURCHF", "symbol": "oanda:EURCHF"}, {"unit": "SG30SGD", "symbol": "oanda:SG30SGD"}, {"unit": "EURNOK", "symbol": "oanda:EURNOK"}, {"unit": "XAGHKD", "symbol": "oanda:XAGHKD"}, {"unit": "USDSAR", "symbol": "oanda:USDSAR"}, {"unit": "SPX", "symbol": "OANDA:SPX500USD"}, {"unit": "btc", "symbol": "BITSTAMP:BTCUSD"}, {"unit": "eth", "symbol": "bitstamp:ethusd"}, {"unit": "gold", "symbol": "OANDA:XAUUSD"}, {"unit": "shell", "symbol": "NYSE:RDS.A"}];

    var findSymbol = aliases.filter(p => p.unit.toUpperCase() == symbol.toUpperCase());

    var correctSymbol = (findSymbol.length > 0) ? findSymbol[0].symbol : symbol;
    
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

        const timeout = ms => new Promise(res => setTimeout(res, ms));

        try {
            await Page.enable();
            await Page.navigate({url: 'https://www.tradingview.com/widgetembed/?frameElementId=tradingview_c4872&symbol='+ correctSymbol +'&interval='+ interval +'&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=RSI%40tv-basicstudies&theme=dark&style=1&timezone=Europe%2FBerlin&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en'});
            await Page.loadEventFired();
            await Emulation.setDeviceMetricsOverride(device);
            await Emulation.setVisibleSize({width: 960, height: 750});
            await timeout(500);
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