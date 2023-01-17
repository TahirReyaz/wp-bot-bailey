import { proto, WASocket } from "@adiwajshing/baileys";

import { sendRoast, sendTagAll } from "../helpers/miscHelpers";
import { queryHandler } from "./queryHandler";

export const miscHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  chatId: string
) => {
  const { query, queryArray } = queryHandler(command);
  switch (queryArray[0]) {
    //////////////////////////////////////HI BOT//////////////////////////////////////
    case "hi":
      await sock.sendMessage(
        chatId,
        { text: "All hail the bot!" },
        { quoted: message }
      );
      break;
    ///////////////////////////////////TAG EVERYONE///////////////////////////////////////
    case "yall":
    case "y'all":
    case "all":
    case "everyone":
      sendTagAll(sock, message, chatId);
      break;
    //////////////////////////////////////ROAST///////////////////////////////////////
    case "roast":
      sendRoast(sock, message, query, chatId);
      break;
  }
};
