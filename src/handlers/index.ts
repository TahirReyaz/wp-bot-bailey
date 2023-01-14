import { proto, WASocket } from "@adiwajshing/baileys";
import { sendList } from "../helpers/baileyHelpers";
import { animeHanlder } from "./animeHandler";
import { entHandler } from "./entHandler";
import { gamesHandler } from "./gamesHandler";
import { infoHandler } from "./infoHandler";
import { menuHandler } from "./menuHandler";
import { queryHandler } from "./queryHandler";

export const readCommand = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string
) => {
  const { queryArray } = queryHandler(command);
  infoHandler(sock, message, command);
  animeHanlder(sock, message, command);
  gamesHandler(sock, message, command);
  menuHandler(sock, message, command);
  entHandler(sock, message, command);
  switch (queryArray[0]) {
    //////////////////////////////////////HI BOT//////////////////////////////////////
    case "hi":
      await sock.sendMessage(
        message.key && message.key.remoteJid ? message.key.remoteJid : "meh",
        { text: "All hail the bot!" },
        { quoted: message }
      );
      break;
  }
};
