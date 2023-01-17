import { proto, WASocket } from "@adiwajshing/baileys";
import { grpArrayItem } from "../helpers/fetchData";

import {
  addGroupPermission,
  groupPerms,
  removeGroupPermission,
  showGroupPermissions,
} from "../helpers/rolesHelpers";
import { queryHandler } from "./queryHandler";

export const rolesHandler = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  command: string,
  chatId: string,
  tagAllGrps: grpArrayItem[],
  tagAllAdminOnlyGrps: grpArrayItem[],
  roastGrps: grpArrayItem[]
) => {
  const { queryArray, query } = queryHandler(command);

  switch (queryArray[0]) {
    ////////////////////////////////////GRP ROLES/////////////////////////////////
    case "gperms":
      groupPerms(sock, message, chatId);
      break;
    ////////////////////////////////ADD GRP PERMISSION/////////////////////////////////
    case "agp":
      addGroupPermission(
        sock,
        message,
        query,
        chatId,
        tagAllGrps,
        tagAllAdminOnlyGrps,
        roastGrps
      );
      break;
    ///////////////////////////////REMOVE GRP PERMISSION/////////////////////////////////
    case "rgr":
      removeGroupPermission(
        sock,
        message,
        query,
        chatId,
        tagAllGrps,
        tagAllAdminOnlyGrps,
        roastGrps
      );
      break;
    ///////////////////////////////SHOW GRP PERMISSIONS/////////////////////////////////
    case "sgr":
      showGroupPermissions(
        sock,
        message,
        chatId,
        tagAllGrps,
        tagAllAdminOnlyGrps,
        roastGrps
      );
      break;
    //////////////////////////////////ADD ROLE/////////////////////////////////
    case "ar":
    case "addrole":
      // console.log("in add role");

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

      // let memberRoleAbsent = false;
      // // roleArray.forEach((grp) => {
      // //   if (grp.grpId === message.chatId) {
      // //     grpAbsent = false;
      // //   }
      // // });

      // // If group doesnt have the selected role
      // if (memberRoleAbsent) {
      //   sendReply(
      //     message.chatId,
      //     `This group is not a ${query} group`,
      //     message.id.toString(),
      //     "Error when sending warning: "
      //   );
      //   break;
      // } else {
      //   axios
      //     .post(
      //       `${
      //         process.env.FIREBASE_DOMAIN
      //       }/grpData/${message.chatId.substring(
      //         0,
      //         message.chatId.length - 3
      //       )}.json`,
      //       { roleName: query }
      //     )
      //     .then((res) => {
      //       console.log("in then block");
      //       let selectedGrpIndex = grpData.findIndex(
      //         (grp) =>
      //           grp.grpId ===
      //           message.chatId.substring(0, message.chatId.length - 3)
      //       );
      //       let newRole = {
      //         roleId: res.data.name,
      //         roleName: query,
      //         members: [],
      //       };

      //       if (selectedGrpIndex !== -1) {
      //         console.log("in if", selectedGrpIndex);
      //         grpData[selectedGrpIndex].roles.push(newRole);
      //       } else {
      //         console.log("in else");
      //         grpData.push({
      //           grpId: message.chatId.substring(0, message.chatId.length - 3),
      //           roles: [{ ...newRole }],
      //         });
      //       }

      //       sendReply(
      //         message.chatId,
      //         `Added ${query} role to this group`,
      //         message.id.toString(),
      //         "Error when sending grp addition: "
      //       );
      //       console.log(res.data);
      //     })
      //     .catch((err) => {
      //       sendReply(
      //         message.chatId,
      //         "An error occurred\nCheck spellings and syntax",
      //         message.id.toString(),
      //         "Error when sending error: "
      //       );
      //       console.log(err);
      //       console.log(err.data);
      //     });
      // }

      break;
    //////////////////////////////////MEMBER ROLES/////////////////////////////////
    case "roles":
      // showAllRoles(client, message.chatId, grpData, message.id.toString());
      break;
    ///////////////////////////////ADD ROLE TO MEMBER/////////////////////////////////
    case "amr":
      // console.log("in add member role");

      // selectedGrpIndex = grpData.findIndex(
      //   (grp) =>
      //     grp.grpId === message.chatId.substring(0, message.chatId.length - 3)
      // );

      // roleAbsent = false;

      // // If group doesnt have the selected role
      // if (roleAbsent) {
      //   sendReply(
      //     message.chatId,
      //     `This group is not a ${query} group`,
      //     message.id.toString(),
      //     "Error when sending warning: "
      //   );
      //   break;
      // } else {
      //   selectedRoleIndex = grpData[selectedGrpIndex].roles.findIndex(
      //     (role) => role.roleName === query
      //   );
      //   selectedRole = grpData[selectedGrpIndex].roles[selectedRoleIndex];

      //   axios
      //     .post(
      //       `${
      //         process.env.FIREBASE_DOMAIN
      //       }/grpData/${message.chatId.substring(
      //         0,
      //         message.chatId.length - 3
      //       )}/${selectedRole.roleId}/members.json`,
      //       { memberId: message.sender.id }
      //     )
      //     .then((res) => {
      //       grpData[selectedGrpIndex].roles[selectedRoleIndex].members.push({
      //         id: res.data.name,
      //         memberId: message.sender.id,
      //       });

      //       sendReply(
      //         message.chatId,
      //         `Added you to ${query}`,
      //         message.id.toString(),
      //         "Error when sending grp addition: "
      //       );
      //       console.log(res.data);
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

      break;
    //////////////////////////////////SEE MY ROLES/////////////////////////////////
    case "smr":
      break;
    //////////////////////////////SEE OTHER'S ROLES/////////////////////////////////
    case "str":
      break;
    //////////////////////////////////SEND ROLE MENTIONS/////////////////////////////////
    case "mention":
    case "summon":
      // console.log("in mention");

      // selectedGrpIndex = grpData.findIndex(
      //   (grp) =>
      //     grp.grpId === message.chatId.substring(0, message.chatId.length - 3)
      // );

      // if (!selectedGrpIndex) {
      //   sendReply(
      //     message.chatId,
      //     `There are no member roles in this group\nAsk admins to add some using the .ar command\n\nFor example:\n.ar coders`,
      //     message.id.toString(),
      //     "Error when sending warning: "
      //   );
      //   break;
      // }

      // selectedRoleIndex = grpData[selectedGrpIndex].roles.findIndex(
      //   (role) => role.roleName === query
      // );

      // // If group doesnt have the selected role
      // if (!selectedRoleIndex) {
      //   sendReply(
      //     message.chatId,
      //     `${query} role not present in the group`,
      //     message.id.toString(),
      //     "Error when sending warning: "
      //   );
      //   break;
      // } else {
      //   selectedRole = grpData[selectedGrpIndex].roles[selectedRoleIndex];

      //   let mentionList = [];
      //   msgString = `Summoning ${query}
      //   ${
      //     queryWithDesc[1]
      //       ? "\n----------------------------------------------------\n"
      //       : ""
      //   }${
      //     queryWithDesc[1] ? queryWithDesc[1] : ""
      //   }----------------------------------------------------\n`;
      //   selectedRole.members.forEach((member) => {
      //     mentionList.push(
      //       member.memberId.substring(0, member.memberId.length - 5)
      //     );
      //     msgString += `@${member.memberId.substring(
      //       0,
      //       member.memberId.length - 5
      //     )} | `;
      //   });
      //   console.log("mention list", mentionList);

      //   client
      //     .sendMentioned(message.chatId, msgString, mentionList)
      //     .then(() => {
      //       console.log(
      //         "Sent message: " + msgString + "\n-------------------"
      //       );
      //     })
      //     .catch((erro) => {
      //       console.log("Error when tagging: ", erro);
      //     });

      //   // grpData[selectedGrpIndex].roles[selectedRoleIndex].members.push({
      //   //   id: res.data.name,
      //   //   memberId: message.sender.id,
      //   // });
      // }

      break;
  }
};
