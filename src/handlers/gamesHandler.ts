import { proto, WASocket } from "@adiwajshing/baileys";

import { truthOrDare, wouldYouRather } from "../helpers/gameHelpers";
import { queryHandler } from "./queryHandler";

export const gamesHandler = async (
  sock: WASocket,
  command: string,
  chatId: string
) => {
  const { queryArray } = queryHandler(command);
  switch (queryArray[0]) {
    ///////////////////////////////TRUTH OR DARE: TRUTH///////////////////////////////
    case "truth":
    case "bottruth":
      truthOrDare(sock, "Truth", chatId);
      break;
    ////////////////////////////////TRUTH OR DARE: DARE///////////////////////////////
    case "dare":
    case "botdare":
      truthOrDare(sock, "Dare", chatId);
      break;
    /////////////////////////////////WOULD YOU RATHER/////////////////////////////////
    case "wyr":
    case "botwyr":
      wouldYouRather(sock, chatId);
      break;
  }
};
