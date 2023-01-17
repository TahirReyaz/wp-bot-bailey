import { proto, WASocket } from "@adiwajshing/baileys";
import { getMemberData } from "../helpers/baileyHelpers";
import { grpArrayItem } from "../helpers/fetchData";
import { sendRoast, sendTagAll } from "../helpers/miscHelpers";

import { queryHandler } from "./queryHandler";

export const miscHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  chatId: string,
  tagAllGrps: grpArrayItem[],
  tagAllAdminOnlyGrps: grpArrayItem[],
  roastGrps: grpArrayItem[]
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
      sendTagAll(sock, message, chatId, tagAllGrps, tagAllAdminOnlyGrps);
      break;
    //////////////////////////////////////ROAST///////////////////////////////////////
    case "roast":
      sendRoast(sock, message, query, chatId, roastGrps);
      break;
  }
};
