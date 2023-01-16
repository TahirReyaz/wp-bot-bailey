import { proto, WASocket } from "@adiwajshing/baileys";
import { getMemberData } from "../helpers/baileyHelpers";

import { queryHandler } from "./queryHandler";

export const miscHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  chatId: string
) => {
  const { queryArray } = queryHandler(command);
  switch (queryArray[0]) {
    //////////////////////////////////////HI BOT//////////////////////////////////////
    case "hi":
      await sock.sendMessage(
        chatId,
        { text: "All hail the bot!" },
        { quoted: message }
      );
      break;
    ///////////////////////////////////TAG EVERYONE///////////////////////////////////////
    case "yall":
    case "y'all":
    case "all":
    case "every":
    case "everyone":
      let annoyPerm = false;
      const { members, isAdmin } = await getMemberData(sock, message, chatId);

      // Check if the group allows annoying mentions or not
      //   message.chat.groupMetadata.participants.forEach((participant) => {
      //     if (participant.isAdmin && participant.id === message.sender.id) {
      //       isAdmin = true;
      //     }
      //   });

      //   mentionAllAdminOnlyGrps.forEach((grp) => {
      //     if (message.isGroupMsg && message.chatId === grp.grpId && isAdmin) {
      //       annoyPerm = true;
      //     }
      //   });
      //   mentionAllGrps.forEach((grp) => {
      //     if (message.isGroupMsg && message.chatId === grp.grpId) {
      //       annoyPerm = true;
      //     }
      //   });
      annoyPerm = true;
      if (!annoyPerm) {
        // message.isGroupMsg
        //   ? (msgString =
        //       "People get annoyed by useless mentioning😔\n\nAsk admins for activating this command in this group\n\nIf you are an admin yourself, then use GroupPerms command for activating this command in this group.\n\nFor example:\nGroupPerms")
        //   : (msgString = "This command is not supported in dms😁");
        // // Send the response to the sender
        // client
        //   .reply(message.chatId, msgString, message.id.toString())
        //   .then(() => {
        //     console.log("Sent message: " + msgString + "\n-------------------");
        //   })
        //   .catch((erro) => {
        //     console.error("Error when sending kanji definition: ", erro);
        //   });
      } else {
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
      }
      break;
  }
};
