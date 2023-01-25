import { proto, WASocket } from "@adiwajshing/baileys";
import axios, { AxiosResponse } from "axios";
import { addReply, personalData, removeReply } from "../../data/personalData";

export const addDefaultReply = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  chatId: string,
  id: string,
  reply: string
) => {
  if (!message.key.fromMe) {
    return;
  }
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

export const removeDefaultReply = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  chatId: string,
  id: string
) => {
  if (!message.key.fromMe) {
    return;
  }

  const reply = personalData.replies.find(({ id: replyId }) => {
    let found: boolean = false;
    if (id.length >= 5) {
      found = replyId.includes(id);
    } else {
      found = replyId === id;
    }
    return found;
  });

  //   If there is no reply registered for this number, then return
  if (!reply) {
    await sock.sendMessage(
      chatId,
      { text: "There is not default reply for this number" },
      { quoted: message }
    );
    return;
  }

  try {
    await axios.delete(
      `${process.env.FIREBASE_DOMAIN}/personal/replies/${reply.firebaseId}.json`
    );
    removeReply(reply.firebaseId);
    await sock.sendMessage(
      chatId,
      { text: "Deleted default reply for this number" },
      { quoted: message }
    );
  } catch (firebaseErr) {
    console.error({ firebaseErr });
  }
};
