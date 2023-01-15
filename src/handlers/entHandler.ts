import { proto, WASocket } from "@adiwajshing/baileys";
import {
  movieDetail,
  searchLyrics,
  sendHoroscope,
  sendHoroscopeMenu,
  songDetail,
} from "../helpers/entHelpers";

import { queryHandler } from "./queryHandler";

export const entHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  chatId: string
) => {
  const { queryArray, queryPart, query } = queryHandler(command);
  const songParams = {
    title: queryPart[0],
    artist: queryPart[1],
  };

  switch (queryArray[0]) {
    ////////////////////////////////////MOVIE DETAIL//////////////////////////////////
    case "md":
    case "moviedetail":
      movieDetail(sock, message, query);
      break;
    /////////////////////////////////////SONG DETAIL//////////////////////////////////
    case "sd":
    case "songdetail":
      songDetail(sock, message, songParams);
      break;
    /////////////////////////////////////SONG LYRICS//////////////////////////////////
    case "lyrics":
      searchLyrics(sock, message, songParams, query);
      break;
    /////////////////////////////////////HOROSCOPE MENU/////////////////////////////////////
    case "hsmenu":
    case "hsm":
    case "horoscopemenu":
      sendHoroscopeMenu(sock, message);
      break;
    ///////////////////////////////////HOROSCOPE ////////////////////////////////////
    case "hs":
      sendHoroscope(sock, message, queryPart, queryArray);
      break;
  }
};
