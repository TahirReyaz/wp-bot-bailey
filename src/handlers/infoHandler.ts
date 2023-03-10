import { proto, WASocket } from "@adiwajshing/baileys";
import axios from "axios";

import { queryHandler } from "./queryHandler";

export const infoHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  chatId: string
) => {
  const wikiEndpoint = "https://en.wikipedia.org/w/api.php?";
  const mathsEndpoint = "http://api.mathjs.org/v4/?expr=";

  const { queryArray, queryWithDesc, query, queryPart } = queryHandler(command);

  switch (queryArray[0]) {
    ////////////////////////////////////CALCULATE//////////////////////////////////////
    case "calc":
      axios
        .get(mathsEndpoint + encodeURIComponent(query) + "&precision=3")
        .then(async (response) => {
          await sock.sendMessage(
            chatId,
            { text: response.data.toString() },
            { quoted: message }
          );
        })
        .catch(async (error) => {
          console.log(error.response.data);

          await sock.sendMessage(
            chatId,
            { text: error.response.data },
            { quoted: message }
          );
        });
      break;
    /////////////////////////////////KANJI DEFINITION/////////////////////////////////
    case "kd":
    case "kanjidef":
    case "kanjidefine":
      // Get the response from the api
      axios
        .get(encodeURI("https://kanjiapi.dev/v1/kanji/" + query))
        .then(async ({ data: kanjiData }) => {
          let meaningString = "",
            kunString = "",
            onString = "";

          kanjiData.meanings.forEach(
            (meaning: string) => (meaningString += meaning + " | ")
          );
          kanjiData.kun_readings.forEach(
            (meaning: string) => (kunString += meaning + " | ")
          );
          kanjiData.on_readings.forEach(
            (meaning: string) => (onString += meaning + " | ")
          );

          // Set the fields to be sent in message
          const composeMsg = [
            " *Kanji* : ",
            query,
            "\n *Meanings* : ",
            meaningString,
            "\n *Kunyomi readings* : ",
            kunString,
            "\n *Onyomi readings* : ",
            onString,
          ];
          // Send the response to the sender
          await sock.sendMessage(
            chatId,
            { text: composeMsg.join("") },
            { quoted: message }
          );
        })
        .catch(async () => {
          // Send not found to sender
          await sock.sendMessage(
            chatId,
            { text: "Word not found.. Sorry" },
            { quoted: message }
          );
        });
      break;
    ////////////////////////////////////DICTIONARY////////////////////////////////////
    case "ed":
    case "engdef":
    case "englishdefine":
      // Get the response from the api
      axios
        .get("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + query)
        .then(async (response) => {
          // Set the fields of the message
          response.data[0].meanings.forEach(async (meaning: any) => {
            const composeMsg: string[] = [];
            composeMsg.push("*", meaning.partOfSpeech, "*\n\n");
            meaning.definitions.forEach((def: any) => {
              composeMsg.push(
                "*Definition*: ",
                def.definition,
                "\n*For Example*: ",
                def.example ? def.example : "Not Available????",
                "\n\n"
              );
            });
            composeMsg.push(
              "\n---------------------------------------------------\n"
            );
            // Send the response to the sender
            await sock.sendMessage(
              chatId,
              { text: composeMsg.join("") },
              { quoted: message }
            );
          });
        })
        .catch(async (err) => {
          await sock.sendMessage(
            chatId,
            {
              text:
                err.response.data.message +
                "\n\n" +
                err.response.data.resolution,
            },
            { quoted: message }
          );
        });
      break;
    /////////////////////////////////WIKIPEDIA SEARCH/////////////////////////////////
    case ".wiki":
      //   params = {
      //     origin: "*",
      //     format: "json",
      //     action: "query",
      //     prop: "extracts",
      //     exintro: true,
      //     explaintext: true,
      //     generator: "search",
      //     gsrlimit: 50,
      //     gsrsearch: query,
      //   };
      //   axios
      //     .get(wikiEndpoint, { params })
      //     .then((response) => {
      //       if (response.data.query) {
      //         // If the page is found then query exists
      //         const wikis = Object.values(response.data.query.pages);
      //         // Set the fields to be sent in message
      //         composeMsg = ["Checkout the menu for the page details????"]; // composeMsg will be used as description of the button options
      //         list = [
      //           {
      //             title: "Search Results????",
      //             rows: [],
      //           },
      //         ];
      //         wikis.forEach((wiki) => {
      //           list[0].rows.push({
      //             title: `WikiPage ${wiki.pageid}`,
      //             description: wiki.title,
      //           });
      //         });
      //         composeMsg.forEach((txt) => {
      //           msgString += txt;
      //         });
      //         sendListMenu(
      //           message.chatId,
      //           `Searched: '${query}'`,
      //           "subTitle",
      //           msgString,
      //           "Results",
      //           list
      //         );
      //       } else {
      //         sendReply(
      //           message.chatId,
      //           "Not found",
      //           message.id.toString(),
      //           "Error when sending Not found: "
      //         );
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      break;
    //////////////////////////////////WIKIPEDIA PAGE//////////////////////////////////
    case "wp":
    case "wikipage":
      //   RecievedMsgPermission = true;
      //   params = {
      //     origin: "*",
      //     format: "json",
      //     action: "query",
      //     prop: "pageimages|extracts",
      //     pithumbsize: 400,
      //     pageids: query,
      //     exintro: true,
      //     explaintext: true,
      //   };
      //   axios
      //     .get(wikiEndpoint, { params })
      //     .then((response) => {
      //       if (response.data.query) {
      //         // If the page is found then query exists
      //         const wiki = Object.values(response.data.query.pages);
      //         // Set the fields to be sent in message
      //         composeMsg = [
      //           "*Image File name* :\n",
      //           wiki[0].pageimage ? wiki[0].pageimage : "_No image found_ ???",
      //           "\n*Page ID* : ",
      //           wiki[0].pageid,
      //           "\n*Title* : ",
      //           wiki[0].title,
      //           "\n*Info* : ",
      //           wiki[0].extract,
      //         ];
      //         composeMsg.forEach((txt) => {
      //           msgString += txt;
      //         });
      //         // Send the response to the sender
      //         if (wiki[0].thumbnail) {
      //           sendImage(
      //             message.chatId,
      //             wiki[0].thumbnail.source,
      //             msgString,
      //             "Error when sending page details: "
      //           );
      //         } else {
      //           sendText(
      //             message.chatId,
      //             msgString,
      //             "Error when sending page details: "
      //           );
      //         }
      //       } else {
      //         sendText(
      //           message.chatId,
      //           `Searched query: ${query}\n_Page Not Found_\nCheck the syntax and page id\nDon't get confused with similar commands\nCheck them by sending *InfoHelp*`,
      //           "Error when sending page not found"
      //         );
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      break;
    //////////////////////////////////DETAILS ABOUT DEV AND CODE//////////////////////////////////
    case "tahir":
    case "about":
    case "dev":
      // Set the fields to be sent in message
      const composeMsg = [
        "```Welcome to the bot```\n",
        "- Created by Tahir",
        "- More about him on https://tahirreyaz.github.io/portfolio-1/",
        "- Created with node.js, Baileys, various APIs, npm packages and a little frustration",
        "- This is an open-source bot, so the code is available on github: https://github.com/TahirReyaz/wp-bot-bailey",
        "- Go ahead and give some stars",
        "- If there are no installation instructions, wait for him to upload them",
        "- If you want to report a bug or suggest a feature, you can do so here: https://github.com/TahirReyaz/wp-bot-bailey/issues",
      ];
      // Send the response to the sender
      await sock.sendMessage(
        chatId,
        { text: composeMsg.join("\n") },
        { quoted: message }
      );
      break;
  }
};
