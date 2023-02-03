import { proto, WASocket } from "@adiwajshing/baileys";
import {
  addDefaultReply,
  removeDefaultReply,
  toggleReplyPermission,
} from "../helpers/personalReplyHelpers";
import { queryHandler } from "./queryHandler";

export const personalReplyHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  chatId: string
) => {
  const { query, queryArray, queryPart } = queryHandler(command);
  switch (queryArray[0]) {
    case "adr":
      addDefaultReply(sock, message, chatId, queryPart[0], queryPart[1]);
      break;
    case "rdr":
      removeDefaultReply(sock, message, chatId, query);
      break;
    case "edr":
      toggleReplyPermission(sock, message, chatId, true);
      break;
    case "ddr":
      toggleReplyPermission(sock, message, chatId, false);
      break;
  }
};
