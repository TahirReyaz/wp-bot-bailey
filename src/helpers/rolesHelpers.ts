import { proto, WASocket } from "@adiwajshing/baileys";

import { getMemberData } from "./baileyHelpers";

const grpPermissions = [
  {
    title: ".agp mention-all",
    description:
      "To enable this group for letting all members mention everyone like discord",
  },
  {
    title: ".agp mention-all-admin-only",
    description:
      "To enable this group for letting only admins mention everyone",
  },
  {
    title: ".agp nsfw-roast",
    description:
      "To enable this group for letting all members use roast command which may be nsfw",
  },
];

export const groupPerms = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  chatId: string
) => {
  const { isAdmin } = await getMemberData(sock, message, chatId);
  if (isAdmin || message.key.fromMe) {
    const sections = [
      {
        title: "Group Roles",
        rows: grpPermissions,
      },
    ];

    const listMessage = {
      text: "Welcome to THE BOT\n\nSelect the Group Role for this group",
      footer: "This command is only for admins",
      title: "Click on the button below to view the list",
      buttonText: "Group Roles",
      sections,
      viewOnce: true,
    };

    await sock.sendMessage(chatId, listMessage);
  } else {
    try {
      await sock.sendMessage(
        chatId,
        {
          text: "This command is used for choosing a group roles.\n\nIts available only for admins",
        },
        { quoted: message }
      );
    } catch (warningErr) {
      console.error("Error when sending warning: ", warningErr);
    }
  }
};

export const addGroupPermission = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  query: string,
  chatId: string
) => {
  const { isAdmin } = await getMemberData(sock, message, chatId);
  let grpArray: any[] = [];

  if (isAdmin || message.key.fromMe) {
    // switch (query) {
    //   case "mention-all":
    //     grpArray = mentionAllGrps;
    //     break;
    //   case "mention-all-admin-only":
    //     grpArray = mentionAllAdminOnlyGrps;
    //     break;
    //   case "nsfw-roast":
    //     grpArray = nsfwRoastGrps;
    //     break;
    // }
    // let grpPresentAlready = false;
    // grpArray.forEach((grp) => {
    //   if (grp.grpId === message.chatId) {
    //     grpPresentAlready = true;
    //   }
    // });
    // // If group already has the selected role
    // if (grpPresentAlready) {
    //   sendReply(
    //     message.chatId,
    //     `This group is already a ${query} group`,
    //     message.id.toString(),
    //     "Error when sending warning: "
    //   );
    // } else {
    //   axios
    //     .post(`${process.env.FIREBASE_DOMAIN}/grpFlags/${query}.json`, {
    //       grpId: message.chatId,
    //     })
    //     .then((res) => {
    //       console.log("in then");
    //       grpArray.push({
    //         id: res.data.name,
    //         grpId: message.chatId,
    //       });
    //       switch (query) {
    //         case "mention-all":
    //           mentionAllGrps = grpArray;
    //           console.log(mentionAllGrps);
    //           break;
    //         case "mention-all-admin-only":
    //           mentionAllAdminOnlyGrps = grpArray;
    //           console.log(mentionAllGrps);
    //           break;
    //         case "nsfw-roast":
    //           nsfwRoastGrps = grpArray;
    //           console.log(mentionAllGrps);
    //           break;
    //       }
    //       sendReply(
    //         message.chatId,
    //         `Added ${query} permission to this group`,
    //         message.id.toString(),
    //         "Error when sending warning: "
    //       );
    //       console.log(res.data);
    //     })
    //     .catch((err) => console.log(err));
    // }
  } else {
    try {
      await sock.sendMessage(
        chatId,
        {
          text: "This command is used for choosing a group roles.\n\nIts available only for admins",
        },
        { quoted: message }
      );
    } catch (warningErr) {
      console.error("Error when sending warning: ", warningErr);
    }
  }
};

export const showGroupPermissions = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  chatId: string
) => {};

export const removeGroupPermission = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  query: string,
  chatId: string
) => {
  // console.log("in del groles");
  // // Check whether the sender is an admin
  // perm = false;
  // message.chat.groupMetadata.participants.forEach((participant) => {
  //   if (participant.isAdmin && participant.id === message.sender.id) {
  //     perm = true;
  //   }
  // });
  // // If sender is not an admin then send warning
  // if (!perm && !message.fromMe) {
  //   sendReply(
  //     message.chatId,
  //     "This command is used for deleting a group role.\n\nThis commands is only for admins",
  //     message.id.toString(),
  //     "Error when sending warning: "
  //   );
  //   break;
  // }
  // // Select the group to work on
  // console.log(query);
  // switch (query) {
  //   case "mention-all":
  //     grpArray = mentionAllGrps;
  //     break;
  //   case "mention-all-admin-only":
  //     grpArray = mentionAllAdminOnlyGrps;
  //     break;
  //   case "nsfw-roast":
  //     grpArray = nsfwRoastGrps;
  //     break;
  // }
  // let grpAbsent = true;
  // grpArray.forEach((grp) => {
  //   if (grp.grpId === message.chatId) {
  //     grpAbsent = false;
  //   }
  // });
  // // If group doesnt have the selected role
  // if (grpAbsent) {
  //   sendReply(
  //     message.chatId,
  //     `This group is not a ${query} group`,
  //     message.id.toString(),
  //     "Error when sending warning: "
  //   );
  //   break;
  // } else {
  //   selectedGrp = grpArray.find((grp) => grp.grpId === message.chatId);
  //   console.log(grpArray);
  //   console.log("selectedgrp:", selectedGrp.id);
  //   axios
  //     .delete(
  //       `${process.env.FIREBASE_DOMAIN}/grpFlags/${query}/${selectedGrp.id}.json`
  //     )
  //     .then((res) => {
  //       let updatedGrpArr = grpArray.filter((grp) => {
  //         console.log(
  //           message.chatId !== grp.grpId,
  //           message.chatId != grp.grpId
  //         );
  //         return message.chatId !== grp.grpId;
  //       });
  //       console.log("grp array", updatedGrpArr);
  //       switch (query) {
  //         case "mention-all":
  //           mentionAllGrps = updatedGrpArr;
  //           console.log("all grps", mentionAllGrps);
  //           break;
  //         case "mention-all-admin-only":
  //           mentionAllAdminOnlyGrps = updatedGrpArr;
  //           break;
  //         case "nsfw-roast":
  //           nsfwRoastGrps = updatedGrpArr;
  //           break;
  //       }
  //       sendReply(
  //         message.chatId,
  //         `Removed ${query} permission from this group`,
  //         message.id.toString(),
  //         "Error when sending warning: "
  //       );
  //     })
  //     .catch((err) => {
  //       sendReply(
  //         message.chatId,
  //         "An error occurred\nCheck spellings and syntax",
  //         message.id.toString(),
  //         "Error when sending error: "
  //       );
  //       console.log(err.data);
  //     });
  // }
};

export const showAllRoles = () => {
  //   const selectedGrp = grpData.find(
  //     (grp) =>
  //       grp.grpId === message.chatId.substring(0, message.chatId.length - 3)
  //   );
  //   if (!selectedGrp) {
  //     sendReply(
  //       client,
  //       sendIn,
  //       "This group has no roles\n\nAsk admin to add some\n\nIf You are an admin yourself, add member roles to this group by using the addRole command\n\nFor example\n```.ar admin```\n```.ar active```",
  //       replyTo,
  //       "Error when sending warning: "
  //     );
  //     return;
  //   }
  //   let memberRoles = [];
  //   selectedGrp.roles.forEach((role) => {
  //     memberRoles.push({
  //       title: `.amr ${role.roleName}`,
  //       description: "Send to take this role",
  //     });
  //   });
  //   list = [
  //     {
  //       title: "Member Roles",
  //       rows: memberRoles,
  //     },
  //   ];
  //   sendListMenu(
  //     client,
  //     sendIn,
  //     "Welcome to THE BOT",
  //     "Select the type of role",
  //     "Chose appropriate role",
  //     "Member Roles",
  //     list
  //   );
};
