import { proto, WASocket } from "@adiwajshing/baileys";
import axios, { AxiosResponse } from "axios";
import { getMemberData } from "./baileyHelpers";

import { grpArrayItem } from "./fetchData";

export const sendTagAll = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  chatId: string,
  tagAllGrps: grpArrayItem[],
  tagAllAdminOnlyGrps: grpArrayItem[]
) => {
  if (!message.key.participant) {
    try {
      await sock.sendMessage(
        chatId,
        {
          text: "This command is not supported in dms😁",
        },
        { quoted: message }
      );
    } catch (sendWarningErr) {
      console.error({ sendWarningErr });
    }
    return;
  }

  let annoyPerm: boolean = false;
  const { members, isAdmin } = await getMemberData(sock, message, chatId);

  // Check if the group allows annoying mentions or not
  const tagAll: boolean = tagAllGrps.some(({ grpId }) => grpId === chatId),
    tagAllAdminOnly: boolean = tagAllAdminOnlyGrps.some(
      ({ grpId }) => grpId === chatId
    );

  if (tagAll || (tagAllAdminOnly && isAdmin)) {
    annoyPerm = true;
  }

  if (annoyPerm) {
    const composeMsg = [
      "```Tagging all ",
      members.length,
      " members on request of``` *",
      message.pushName,
      "*\n",
      "\n\n@Everyone",
    ];

    try {
      if (isAdmin || message.key.fromMe) {
        await sock.sendMessage(
          chatId,
          {
            text: composeMsg.join(""),
            mentions: members,
          },
          { quoted: message }
        );
      }
    } catch (sendMentionedErr) {
      console.error({ sendMentionedErr });
    }
  } else {
    // Send the response to the sender
    try {
      await sock.sendMessage(
        chatId,
        {
          text: "People get annoyed by useless mentioning😔\n\nAsk admins for activating this command in this group\n\nIf you are an admin yourself, then use .gperms command for activating this command in this group.\n\nFor example:\n.gperms",
        },
        { quoted: message }
      );
    } catch (sendWarningErr) {
      console.error({ sendWarningErr });
    }
  }
};

export const sendRoast = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  query: string,
  chatId: string,
  roastGrps: grpArrayItem[]
) => {
  let composeMsg: string[];
  // Check if the group allows nsfw roats or not
  const roastPerm: boolean = roastGrps.some(({ grpId }) => grpId === chatId);

  if (roastPerm) {
    try {
      const res: AxiosResponse = await axios.get(
        "https://evilinsult.com/generate_insult.php?lang=en&type=json"
      );
      // Abusive roasts
      if (
        res.data.number == "111" ||
        res.data.number === "119" ||
        res.data.number === "121" ||
        res.data.number === "10" ||
        res.data.number === "11"
      ) {
        composeMsg = ["Ooops.. Please try again\nThe roast was too severe"];
        console.log({ deadlyRoast: res.data.insult });
      } else {
        composeMsg = [
          "Roast from Bot\n-------------------------\n",
          "Dear ",
          query,
          ", ",
          res.data.insult,
        ];
      }
      // Send the response to the sender
      try {
        await sock.sendMessage(
          chatId,
          {
            text: composeMsg.join(""),
          },
          { quoted: message }
        );
      } catch (sendWarningErr) {
        console.error({ sendWarningErr });
      }
    } catch (roastErr) {
      console.error({ roastErr });
    }
  } else {
    try {
      await sock.sendMessage(
        chatId,
        {
          text: "This command is not supported here. There are people here who don't like it.\n```THEY AREN'T COOL ENOUGH.```\n\nAsk admins for activating this command in this group\n\nIf you are an admin yourself, then use .gperms command for activating this command in this group.",
        },
        { quoted: message }
      );
    } catch (sendWarningErr) {
      console.error({ sendWarningErr });
    }
  }
};
