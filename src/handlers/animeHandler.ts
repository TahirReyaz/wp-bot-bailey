import { proto, WASocket } from "@adiwajshing/baileys";
import {
  animeDetail,
  animeSearch,
  animeStaffDetails,
  charDetailById,
  mangaDetailsById,
  mangaSearch,
  searchCharacterDetail,
} from "../helpers/animeHelpers";
import { queryHandler } from "./queryHandler";

export const animeHanlder = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  chatId: string
) => {
  const { queryArray, query } = queryHandler(command);
  switch (queryArray[0]) {
    ///////////////////////////////////ANIME DETAIL///////////////////////////////////
    case "ad":
      animeSearch(sock, query, chatId);
      break;
    ///////////////////////////////////MANGA DETAIL///////////////////////////////////
    case "ms":
      mangaSearch(sock, query, chatId);
      break;
    ////////////////////////////////////ANIME DETAIL BY ID/////////////////////////////////////
    case "aid":
      animeDetail(sock, message, query, chatId);
      break;
    ////////////////////////////////////MANGA DETAIL BY ID/////////////////////////////////////
    case "mgd":
      mangaDetailsById(sock, message, query, chatId);
      break;
    /////////////////////////ANIME CHARACTER DETAIL- BY SEARCH////////////////////////
    case "cd":
      searchCharacterDetail(sock, query, chatId);
      break;
    ///////////////////////////ANIME CHARACTER DETAIL- BY ID//////////////////////////
    case "cid":
      charDetailById(sock, message, query, chatId);
      break;
    ///////////////////////////ANIME STAFF DETAIL- BY ID//////////////////////////
    case "asid":
      animeStaffDetails(sock, message, query, chatId);
      break;
  }
};
