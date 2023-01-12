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
  command: string
) => {
  const { queryArray, query } = queryHandler(command);
  switch (queryArray[0]) {
    ///////////////////////////////////ANIME DETAIL///////////////////////////////////
    case "ad":
      animeSearch(sock, message, query);
      break;
    ///////////////////////////////////MANGA DETAIL///////////////////////////////////
    case "ms":
      mangaSearch(sock, message, query);
      break;
    ////////////////////////////////////ANIME DETAIL BY ID/////////////////////////////////////
    case "aid":
      animeDetail(sock, message, query);
      break;
    ////////////////////////////////////MANGA DETAIL BY ID/////////////////////////////////////
    case "mgd":
      mangaDetailsById(sock, message, query);
      break;
    /////////////////////////ANIME CHARACTER DETAIL- BY SEARCH////////////////////////
    case "cd":
      searchCharacterDetail(sock, message, query);
      break;
    ///////////////////////////ANIME CHARACTER DETAIL- BY ID//////////////////////////
    case "cid":
      charDetailById(sock, message, query);
      break;
    ///////////////////////////ANIME STAFF DETAIL- BY ID//////////////////////////
    case "asid":
    case "staffdetails":
      animeStaffDetails(sock, message, query);
      break;
  }
};
