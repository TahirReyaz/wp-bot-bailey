import { proto, WASocket } from "@adiwajshing/baileys";

import { truthOrDare, wouldYouRather } from "../helpers/gamesHelper";
import { queryHandler } from "./queryHandler";

export const gamesHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string
) => {
  const { queryArray } = queryHandler(command);
  switch (queryArray[0]) {
    ///////////////////////////////TRUTH OR DARE: TRUTH///////////////////////////////
    case "truth":
    case "bottruth":
      truthOrDare(sock, message, "Truth");
      break;
    ////////////////////////////////TRUTH OR DARE: DARE///////////////////////////////
    case "dare":
    case "botdare":
      truthOrDare(sock, message, "Dare");
      break;
    /////////////////////////////////WOULD YOU RATHER/////////////////////////////////
    case "wyr":
    case "botwyr":
      wouldYouRather(sock, message);
      break;
  }
};
