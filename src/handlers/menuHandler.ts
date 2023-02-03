import { proto, WASocket } from "@adiwajshing/baileys";

import { sendMenu } from "../helpers/menuHelpers";
import { queryHandler } from "./queryHandler";

export const menuHandler = async (
  sock: WASocket,
  command: string,
  chatId: string
) => {
  const { queryArray } = queryHandler(command);
  switch (queryArray[0]) {
    /////////////////////////////////////BOT MENU/////////////////////////////////////
    case "help":
      sendMenu(sock, "Help and all commands", "Help", chatId);
      break;
    ////////////////////////////////ENTERTAINMENT MENU////////////////////////////////
    case "ehelp":
      sendMenu(sock, "Entertainment and Media related commands", "Ent", chatId);
      break;
    /////////////////////////////////INFORMATION MENU/////////////////////////////////
    case "ihelp":
      sendMenu(sock, "Info related commands", "Info", chatId);
      break;
    ////////////////////////////////////GAMES MENU///////////////////////////////////
    case "ghelp":
      sendMenu(sock, "Commands for Games", "Game", chatId);
      break;
    ///////////////////////////////////ANIME MENU////////////////////////////////////
    case "ahelp":
      sendMenu(sock, "Anime related commands", "Anime", chatId);
      break;
    ///////////////////////////////////ROLES MENU////////////////////////////////////
    case "rhelp":
      sendMenu(sock, "Roles related commands", "Role", chatId);
      break;
    case "phelp":
      sendMenu(sock, "Commands related to Personal use", "Personal", chatId);
      break;
  }
};
