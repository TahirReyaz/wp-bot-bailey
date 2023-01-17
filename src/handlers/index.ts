import { proto, WASocket } from "@adiwajshing/baileys";
import { grpArrayItem } from "../helpers/fetchData";
import { animeHanlder } from "./animeHandler";
import { entHandler } from "./entHandler";
import { gamesHandler } from "./gamesHandler";
import { infoHandler } from "./infoHandler";
import { menuHandler } from "./menuHandler";
import { miscHandler } from "./miscHandler";
import { rolesHandler } from "./rolesHandler";

export const readCommand = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  tagAllGrps: grpArrayItem[],
  tagAllAdminOnlyGrps: grpArrayItem[],
  roastGrps: grpArrayItem[]
) => {
  const chatId: string = message?.key?.remoteJid || "meh";
  infoHandler(sock, message, command, chatId);
  animeHanlder(sock, message, command, chatId);
  gamesHandler(sock, command, chatId);
  menuHandler(sock, command, chatId);
  entHandler(sock, command, chatId);
  miscHandler(sock, message, command, chatId);
  rolesHandler(
    sock,
    message,
    command,
    chatId,
    tagAllGrps,
    tagAllAdminOnlyGrps,
    roastGrps
  );
};
