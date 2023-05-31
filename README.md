# Brian - The Image Sharing Bot

![avatar](resources/avatar.png)

This bot is a simple discord bot designed to take images from any channel on your discord server and publish them to a specified channel.

The bot was designed for the particular use case that you want to share content with a wider range of people on your discord server with a simple reply to the image in question.

## Installation

This bot is designed to be run locally on your machine. There is no public service available.

### Requirements

- **NodeJS**

You may the latest version of Nodejs from the link here: https://nodejs.org/en/download

- **Discord Application and Bot**

Please refer to the latest information regarding building and deploying Discord bots from the discord developer portal:
https://discord.com/developers/docs/getting-started

### Process

download the project files and install the dependencies using `npm install`

once all of the dependencies are installed, run `npm start`

Next nagivate to the config.js file and change the `targetChannel` variable name to the channel ID of the channel you would like to have the images posted to. channelIDs can be found by putting discord into *developer mode* and right clicking on any channel in the sidebar

## Usage

In order to use the bot, select a message that contains an image and reply to the message with text starting with "post".

This text prompt can be configured using the config.js file by modifying the `startKeyword` variable. Any text supplied to the reply text after "post" will be included as text in the reposted message along with the image from the original post.

