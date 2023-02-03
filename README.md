# whatsapp-bot

## Features

This project runs on node.js and uses a npm package called _baileys_ for interacting with WhatsApp.  
A user types certain commands and sends them to the user on WhatsApp and the bot reads those commands and replies accordingly.  
Various other packages and APIs are also used.  
Some of the cool features of this bot are:

- Getting the details of movies, anime and songs and get lyrics too
- Playing text based games such as Truth or Dare, Would you rather etc.
<!-- - Search and view wikipedia content on WhatsApp -->
- Tag everyone | admin only tag everyone
  <!-- - Correct grammar and translate sentences -->
  <!-- - Create stickers -->
  <!-- - Read text from Images -->
  <!-- - Convert Images and gifs to stickers -->
- Do mathematical calculations
- English Dictionary
- Details of kanji
- Check horoscope
<!-- - Discord like member roles and mentioning -->

## Installation

- clone or fork this repository
- run the command `cd wp-bot-bailey` to get inside the project folder
- run `npm install` to install the npm packages used in this project Make sure that you have installed **node** already
- Prepare a firebase project at [Firebase](https://firebase.google.com) and start the Realtime Database and copy the database end point (url) to be used in the _.env_ file in the next step
- Create a _.env_ file in the root folder of the project and set up the api keys and database url in it  
  `OMDB_API_KEY=<YOUR OMDB API KEY>`
  <!-- `OPENAI_API_KEY=<YOUR OPENAI API KEY>`   -->
  `FIREBASE_DOMAIN=<YOUR FIREBASE DATABASE URL>`  
  The firebase rtdb url looks like this: `https://<YOUR PROJECT NAME>.firebaseio.com`  
  You can get the OMDB api key at [OMDB](https://www.omdbapi.com/apikey.aspx). It is used for getting movie details
  <!-- You can get the OpenAi api key at [OpenAi](https://openai.com/api). It is used for AI/ML related functions -->
- As the project is made on typescript, you need to install typescript globally `npm install typescript --save-dev` and compile the files
- Now you are ready, run `npm start` to start the bot
- You will see a QR code in the terminal. Scan it in the _Linked devices_ menu in WhatsApp

### Now You are ready to go. Send `.hi` in any chat in WhatsApp
