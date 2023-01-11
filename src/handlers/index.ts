import { proto, WASocket } from "@adiwajshing/baileys";
import { infoHandler } from "./infoHandler";
import { queryHandler } from "./queryHandler";

export const readCommand = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string
) => {
  const { queryArray, queryWithDesc, query, queryPart } = await queryHandler(
    command
  );
  infoHandler(sock, message, command);
  switch (queryArray[0]) {
    //////////////////////////////////////HI BOT//////////////////////////////////////
    case "hi":
      console.log("in hi");
      await sock.sendMessage(
        message.key && message.key.remoteJid ? message.key.remoteJid : "meh",
        { text: "All hail the bot!" },
        { quoted: message }
      );
      break;
  }
};
