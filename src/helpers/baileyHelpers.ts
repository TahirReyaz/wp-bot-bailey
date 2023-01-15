import {
  AnyMessageContent,
  GroupMetadata,
  proto,
  WASocket,
} from "@adiwajshing/baileys";

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

export const getMemberData = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  chatId: string
) => {
  let isAdmin: boolean = false,
    metadata: GroupMetadata | undefined,
    members: string[] = [];
  try {
    metadata = await sock.groupMetadata(chatId);

    metadata.participants.forEach((member) => {
      members.push(member.id);
      if (!isAdmin && member.id === message.key.participant && member.admin) {
        isAdmin = true;
      }
    });
  } catch (metaDataErr) {
    console.error({ metaDataErr });
  }
  return { members, isAdmin, metadata };
};
