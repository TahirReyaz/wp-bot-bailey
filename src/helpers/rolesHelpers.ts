import axios, { AxiosResponse } from "axios";
import { proto, WASocket } from "@adiwajshing/baileys";

import { getMemberData } from "./baileyHelpers";
import { grpArrayItem } from "./fetchData";

export const groupPerms = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  chatId: string,
  tagAllGrps: grpArrayItem[],
  tagAllAdminOnlyGrps: grpArrayItem[],
  roastGrps: grpArrayItem[]
) => {
  const tagAll: boolean = tagAllGrps.some(({ grpId }) => grpId === chatId),
    tagAllAdminOnly: boolean = tagAllAdminOnlyGrps.some(
      ({ grpId }) => grpId === chatId
    ),
    roast: boolean = roastGrps.some(({ grpId }) => grpId === chatId);

  const { isAdmin } = await getMemberData(sock, message, chatId);
  if (isAdmin || message.key.fromMe) {
    const grpPermissions = [
      {
        title: `${tagAll ? ".rgp" : ".agp"} tagAll`,
        description: `To ${
          tagAll ? "disable" : "enable"
        } this group for letting all members mention everyone like discord`,
      },
      {
        title: `${tagAllAdminOnly ? ".rgp" : ".agp"} tagAllAdminOnly`,
        description: `To ${
          tagAllAdminOnly ? "disable" : "enable"
        } this group for letting only admins mention everyone`,
      },
      {
        title: `${roast ? ".rgp" : ".agp"} roast`,
        description: `To ${
          roast ? "disable" : "enable"
        } this group for letting all members use roast command which may be nsfw`,
      },
    ];

    const sections = [
      {
        title: "Group Roles",
        rows: grpPermissions,
      },
    ];

    const listMessage = {
      text: "Welcome to THE BOT\n\nGive or remove permissions from this group",
      footer: "This command is only for admins",
      title: "Click on the button below to view the list",
      buttonText: "Group Permissions",
      sections,
      viewOnce: true,
    };

    await sock.sendMessage(chatId, listMessage);
  } else {
    try {
      await sock.sendMessage(
        chatId,
        {
          text: "This command is used for giving or removing group permissions.\n\nIts available only for admins",
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
  chatId: string,
  tagAllGrps: grpArrayItem[],
  tagAllAdminOnlyGrps: grpArrayItem[],
  roastGrps: grpArrayItem[]
) => {
  const { isAdmin } = await getMemberData(sock, message, chatId);
  let grpArray: grpArrayItem[] = [],
    grpPresentAlready: boolean = false;

  if (isAdmin || message.key.fromMe) {
    switch (query) {
      case "tagAll":
        grpArray = tagAllGrps;
        break;
      case "tagAllAdminOnly":
        grpArray = tagAllAdminOnlyGrps;
        break;
      case "roast":
        grpArray = roastGrps;
        break;
    }
    grpArray.forEach(({ grpId }) => {
      if (grpId === chatId) {
        grpPresentAlready = true;
      }
    });
    if (!grpPresentAlready) {
      try {
        const { data }: AxiosResponse = await axios.post(
          `${process.env.FIREBASE_DOMAIN}/grpData/grpPermissions/${query}.json`,
          {
            grpId: chatId,
          }
        );
        grpArray.push({ grpId: chatId, firebaseId: data.name });
        switch (query) {
          case "tagAll":
            tagAllGrps = grpArray;
            break;
          case "tagAllAdminOnly":
            tagAllAdminOnlyGrps = grpArray;
            break;
          case "roast":
            roastGrps = grpArray;
            break;
        }
        try {
          await sock.sendMessage(
            chatId,
            {
              text: `Added ${query} permission to this group`,
            },
            { quoted: message }
          );
        } catch (warningErr) {
          console.error("Error when sending warning: ", warningErr);
        }
      } catch (addGrpErr) {
        console.log({ addGrpErr });
      }
    } else {
      try {
        await sock.sendMessage(
          chatId,
          {
            text: `This group is already has ${query} permission`,
          },
          { quoted: message }
        );
      } catch (warningErr) {
        console.error("Error when sending warning: ", warningErr);
      }
    }
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

export const removeGroupPermission = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  query: string,
  chatId: string,
  tagAllGrps: grpArrayItem[],
  tagAllAdminOnlyGrps: grpArrayItem[],
  roastGrps: grpArrayItem[]
) => {
  const { isAdmin } = await getMemberData(sock, message, chatId);
  let grpArray: grpArrayItem[] = [],
    grpAbsent: boolean = true,
    selectedGrp: grpArrayItem = { grpId: "", firebaseId: "" };

  if (isAdmin || message.key.fromMe) {
    switch (query) {
      case "tagAll":
        grpArray = tagAllGrps;
        break;
      case "tagAllAdminOnly":
        grpArray = tagAllAdminOnlyGrps;
        break;
      case "roast":
        grpArray = roastGrps;
        break;
    }
    grpArray.forEach((grp) => {
      if (grp.grpId === chatId) {
        grpAbsent = false;
        selectedGrp = grp;
      }
    });
    // If group doesnt have the selected role
    if (!grpAbsent) {
      try {
        await axios.delete(
          `${process.env.FIREBASE_DOMAIN}/grpData/grpPermissions/${query}/${selectedGrp.firebaseId}.json`
        );
        let updatedGrpArr = grpArray.filter((grp) => chatId !== grp.grpId);
        switch (query) {
          case "tagAll":
            tagAllGrps = updatedGrpArr;
            break;
          case "tagAllAdminOnly":
            tagAllAdminOnlyGrps = updatedGrpArr;
            break;
          case "roast":
            roastGrps = updatedGrpArr;
            break;
        }
        try {
          await sock.sendMessage(
            chatId,
            {
              text: `Removed ${query} permission from this group`,
            },
            { quoted: message }
          );
        } catch (warningErr) {
          console.error("Error when sending warning: ", warningErr);
        }
      } catch (delGrpErr) {
        try {
          await sock.sendMessage(
            chatId,
            {
              text: "An error occurred\nCheck spellings and syntax",
            },
            { quoted: message }
          );
        } catch (warningErr) {
          console.error("Error when sending warning: ", warningErr);
        }

        console.log({ delGrpErr });
      }
    } else {
      try {
        await sock.sendMessage(
          chatId,
          {
            text: `This group doesn't have ${query} permission`,
          },
          { quoted: message }
        );
      } catch (warningErr) {
        console.error("Error when sending warning: ", warningErr);
      }
    }
  } else {
    try {
      await sock.sendMessage(
        chatId,
        {
          text: "This command is used for deleting a group roles.\n\nIts available only for admins",
        },
        { quoted: message }
      );
    } catch (warningErr) {
      console.error("Error when sending warning: ", warningErr);
    }
  }
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
