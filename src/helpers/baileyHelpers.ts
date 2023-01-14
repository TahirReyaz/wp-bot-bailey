import { AnyMessageContent, proto, WASocket } from "@adiwajshing/baileys";

export const sendList = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  list: AnyMessageContent
) => {
  let chatId = message?.key?.remoteJid ? message.key.remoteJid : "meh";
  if (message.key.participant) {
    // send message that in dm
    await sock.sendMessage(
      message?.key?.remoteJid ? message.key.remoteJid : "meh",
      {
        text: "As the current service doesn't support lists in groups, I have sent you the list in your DM",
      }
    );
    chatId = message.key.participant ? message.key.participant : "meh";
  }
  await sock.sendMessage(chatId, list);
};
