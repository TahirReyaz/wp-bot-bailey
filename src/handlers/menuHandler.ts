import { proto, WASocket } from "@adiwajshing/baileys";

import { sendMenu } from "../helpers/menuHelpers";
import { queryHandler } from "./queryHandler";

export const menuHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  chatId: string
) => {
  const { queryArray } = queryHandler(command);
  switch (queryArray[0]) {
    /////////////////////////////////////BOT MENU/////////////////////////////////////
    case "help":
      sendMenu(sock, message, "Help and all commands", "Help");
      break;
    ////////////////////////////////ENTERTAINMENT MENU////////////////////////////////
    case "ehelp":
      sendMenu(
        sock,
        message,
        "Entertainment and Media related commands",
        "Ent"
      );
      break;
    /////////////////////////////////INFORMATION MENU/////////////////////////////////
    case "ihelp":
      sendMenu(sock, message, "Info related commands", "Info");
      break;
    ////////////////////////////////////GAMES MENU///////////////////////////////////
    case "ghelp":
      sendMenu(sock, message, "Commands for Games", "Game");
      break;
    ///////////////////////////////////ANIME MENU////////////////////////////////////
    case "ahelp":
      sendMenu(sock, message, "Anime related commands", "Anime");
      break;
    ///////////////////////////////////ROLES MENU////////////////////////////////////
    case "rhelp":
      sendMenu(sock, message, "Roles related commands", "Role");
      break;
  }
};
