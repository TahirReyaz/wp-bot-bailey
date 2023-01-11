import { proto, WASocket } from "@adiwajshing/baileys";

export const readCommand = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string
) => {
  switch (command) {
    //////////////////////////////////////HI BOT//////////////////////////////////////
    case "hi":
      console.log("in hi");
      await sock.sendMessage(
        message.key && message.key.remoteJid ? message.key.remoteJid : "meh",
        { text: "All hail the bot!" },
        { quoted: message }
      );
      break;
  }
};
