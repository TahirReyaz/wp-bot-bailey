export interface Reply {
  id: string;
  reply: string;
  firebaseId: string;
}

interface PersonalData {
  defaultReply: string;
  replies: Reply[];
}

export const personalData: PersonalData = {
  defaultReply: "",
  replies: [],
};

export const updateReplies = (newReplies: Reply[]) => {
  personalData.replies = newReplies;
};

export const addReply = (id: string, reply: string, firebaseId: string) => {
  personalData.replies.push({ id, reply, firebaseId });
};

export const removeReply = (firebaseId: string) => {
  personalData.replies = personalData.replies.filter(
    (reply) => reply.firebaseId !== firebaseId
  );
};

export const updateDefaultReply = (reply: string) => {
  personalData.defaultReply = reply;
};

export const findReply = (id: string) => {
  const reply = personalData.replies.find((reply) => id.includes(reply.id));
  return reply ? reply.reply : null;
};
