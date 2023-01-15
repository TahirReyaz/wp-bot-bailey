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
      movieDetail(sock, query, chatId);
      break;
    /////////////////////////////////////SONG DETAIL//////////////////////////////////
    case "sd":
    case "songdetail":
      songDetail(sock, songParams, chatId);
      break;
    /////////////////////////////////////SONG LYRICS//////////////////////////////////
    case "lyrics":
      searchLyrics(sock, songParams, query, chatId);
      break;
    /////////////////////////////////////HOROSCOPE MENU/////////////////////////////////////
    case "hsmenu":
    case "hsm":
    case "horoscopemenu":
      sendHoroscopeMenu(sock, chatId);
      break;
    ///////////////////////////////////HOROSCOPE ////////////////////////////////////
    case "hs":
      sendHoroscope(sock, queryPart, queryArray, chatId);
      break;
  }
};
