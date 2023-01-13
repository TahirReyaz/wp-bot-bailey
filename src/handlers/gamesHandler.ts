import { proto, WASocket } from "@adiwajshing/baileys";

import { queryHandler } from "./queryHandler";

export const gamesHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string
) => {
  const { queryArray, query } = queryHandler(command);
  switch (queryArray[0]) {
    ///////////////////////////////TRUTH OR DARE: TRUTH///////////////////////////////
    case ".truth":
    case "bottruth":
      //   truthOrDare(client, message.chatId, "Truth");
      break;
    ////////////////////////////////TRUTH OR DARE: DARE///////////////////////////////
    case ".dare":
    case "botdare":
      //   truthOrDare(client, message.chatId, "Dare");
      break;
    /////////////////////////////////WOULD YOU RATHER/////////////////////////////////
    case ".wyr":
    case "botwyr":
      //   wouldYouRather(client, message.chatId);
      break;
  }
};
