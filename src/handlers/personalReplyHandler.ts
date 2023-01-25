import { proto, WASocket } from "@adiwajshing/baileys";
import { queryHandler } from "./queryHandler";

export const personalReplyHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  chatId: string
) => {
  const { query, queryArray, queryPart } = queryHandler(command);
  switch (queryArray[0]) {
    case "dr":
      break;
  }
};
