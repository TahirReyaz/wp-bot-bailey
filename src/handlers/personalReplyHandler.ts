import { proto, WASocket } from "@adiwajshing/baileys";
import { addDefaultReply } from "../helpers/personalReplyHelpers";
import { queryHandler } from "./queryHandler";

export const personalReplyHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  chatId: string
) => {
  const { queryArray, queryPart } = queryHandler(command);
  switch (queryArray[0]) {
    case "adr":
      addDefaultReply(sock, message, chatId, queryPart[0], queryPart[1]);
      break;
  }
};
