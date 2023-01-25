import { proto, WASocket } from "@adiwajshing/baileys";

import { findReply } from "../../data/personalData";

export const personalHandler = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  chatId: string
) => {
  const reply: string | null = findReply(chatId);

  if (reply && !message.key.fromMe && !message.key.participant) {
    try {
      await sock.sendMessage(chatId, { text: reply }, { quoted: message });
    } catch (replyErr) {
      console.log({ replyErr });
    }
  }
};
