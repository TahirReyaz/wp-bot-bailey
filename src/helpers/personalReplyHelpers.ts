import { proto, WASocket } from "@adiwajshing/baileys";
import axios, { AxiosResponse } from "axios";
import { addReply, personalData } from "../../data/personalData";

export const addDefaultReply = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  chatId: string,
  id: string,
  reply: string
) => {
  try {
    const { data }: AxiosResponse = await axios.post(
      `${process.env.FIREBASE_DOMAIN}/personal/replies.json`,
      {
        id,
        reply,
      }
    );
    addReply(id, reply, data.name);
    await sock.sendMessage(
      chatId,
      { text: `Added ${id} with default reply of\n"${reply}"` },
      { quoted: message }
    );
  } catch (firebaseErr) {
    console.error({ firebaseErr });
  }
};
