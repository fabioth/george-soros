# George Soros the Tradingview bot

The George Soros Tradingview bot is named after the Hungarian-American billionaire investor and philanthropist. This bot captures screenshots from the free tradingview widget and will send them via your telegram bot to the proper channel.

## Getting Started

### Prerequisites

This bot is based on NodeJS and uses a Chrome headless browser. To run this bot the chrome browser needs to be running in headless mode. More information about chrome headless can be found [here](https://developers.google.com/web/updates/2017/04/headless-chrome).

Create an Telegram bot token. [more information](https://core.telegram.org/bots)

Install NodeJS. [Download here](https://nodejs.org/en/)


### Installing
To install this project serveral steps are needed. 

```
npm install
```

Next create an .env file with the following content

```
BOT_TOKEN=<api token here>
```

## Built With

* [NodeJS](https://nodejs.org/en/) - JavaScript runtime
* [Telegraf](https://telegraf.js.org/#/) - Telegram bot framework for NodeJS
* [Chrome remote interface](https://github.com/cyrus-and/chrome-remote-interface) - Interface to interact with the chrome browser

## Authors

* **Michele Marotto**

## Acknowledgments

* Hat tip to anyone whose code was used
