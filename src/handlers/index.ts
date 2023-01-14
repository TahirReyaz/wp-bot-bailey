import { proto, WASocket } from "@adiwajshing/baileys";
import { sendList } from "../helpers/baileyHelpers";
import { animeHanlder } from "./animeHandler";
import { entHandler } from "./entHandler";
import { gamesHandler } from "./gamesHandler";
import { infoHandler } from "./infoHandler";
import { menuHandler } from "./menuHandler";
import { queryHandler } from "./queryHandler";

export const readCommand = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string
) => {
  const { queryArray } = queryHandler(command);
  infoHandler(sock, message, command);
  animeHanlder(sock, message, command);
  gamesHandler(sock, message, command);
  menuHandler(sock, message, command);
  entHandler(sock, message, command);
  switch (queryArray[0]) {
    //////////////////////////////////////HI BOT//////////////////////////////////////
    case "hi":
      await sock.sendMessage(
        message.key && message.key.remoteJid ? message.key.remoteJid : "meh",
        { text: "All hail the bot!" },
        { quoted: message }
      );
      break;
    case "btn":
      // send a buttons message!
      const buttons = [
        { buttonId: "id1", buttonText: { displayText: "Button 1" }, type: 1 },
        { buttonId: "id2", buttonText: { displayText: "Button 2" }, type: 1 },
        { buttonId: "id3", buttonText: { displayText: "Button 3" }, type: 1 },
      ];

      const buttonMessage = {
        text: "Hi it's button message",
        footer: "Hello World",
        buttons: buttons,
        headerType: 1,
        viewOnce: true,
      };

      await sock.sendMessage(
        message.key && message.key.remoteJid ? message.key.remoteJid : "meh",
        buttonMessage
      );

      //send a template message!
      // const templateButtons = [
      //   {
      //     index: 1,
      //     urlButton: {
      //       displayText: "⭐ Star Baileys on GitHub!",
      //       url: "https://github.com/adiwajshing/Baileys",
      //     },
      //   },
      //   {
      //     index: 2,
      //     callButton: {
      //       displayText: "Call me!",
      //       phoneNumber: "+1 (234) 5678-901",
      //     },
      //   },
      //   {
      //     index: 3,
      //     quickReplyButton: {
      //       displayText: "This is a reply, just like normal buttons!",
      //       id: "id-like-buttons-message",
      //     },
      //   },
      // ];

      // const templateMessage = {
      //   text: "Hi it's a template message",
      //   footer: "Hello World",
      //   templateButtons: templateButtons,
      // };

      // await sock.sendMessage(
      //   message.key && message.key.remoteJid ? message.key.remoteJid : "meh",
      //   templateMessage
      // );
      break;
    case "list":
      const sections = [
        {
          title: "Section 1",
          rows: [
            { title: "Option 1", rowId: "option1" },
            {
              title: "Option 2",
              rowId: "option2",
              description: "This is a description",
            },
          ],
        },
        {
          title: "Section 2",
          rows: [
            { title: "Option 3", rowId: "option3" },
            {
              title: "Option 4",
              rowId: "option4",
              description: "This is a description V2",
            },
          ],
        },
      ];

      const listMessage = {
        text: "This is a list",
        footer: "nice footer, link: https://google.com",
        title: "Amazing boldfaced list title",
        buttonText: "Required, text on the button to view the list",
        sections,
        viewOnce: true,
      };
      await sock.sendMessage(
        message && message.key && message.key.remoteJid
          ? message.key.remoteJid
          : "meh",
        listMessage
      );
      break;
    case "img":
      await sock.sendMessage(
        message && message.key && message.key.remoteJid
          ? message.key.remoteJid
          : "meh",
        {
          image: {
            url: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-YJvLbgJQPCoI.jpg",
          },
          caption: "meh",
        }
      );
      break;
  }
};
