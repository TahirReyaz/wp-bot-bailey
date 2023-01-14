import { proto, WASocket } from "@adiwajshing/baileys";
import wyr from "wyr";

import truthOrDareFile from "../../data/truth-or-dare";

export const truthOrDare = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  type: string
) => {
  let resId,
    res,
    resLevel,
    msgString = "";
  do {
    resId = Math.floor(Math.random() * 425); // 424 is the number of entries in the truth-or-dare.json file
    res = truthOrDareFile[resId].summary;
    resLevel = truthOrDareFile[resId].level;
  } while (truthOrDareFile[resId].type != type);
  const composeMsg = [type, ": ", res, "\n", "Level: ", resLevel];
  composeMsg.forEach((txt) => {
    msgString += txt;
  });
  const buttons = [
    { buttonId: "truth", buttonText: { displayText: ".truth" }, type: 1 },
    { buttonId: "dare", buttonText: { displayText: ".dare" }, type: 1 },
    { buttonId: "ghelp", buttonText: { displayText: ".ghelp" }, type: 1 },
  ];
  // Send the response to the sender
  const buttonMessage = {
    text: msgString,
    footer: "Click on the buttons for help and other games",
    buttons,
    headerType: 1,
    viewOnce: true,
  };
  await sock.sendMessage(
    message?.key?.remoteJid ? message.key.remoteJid : "meh",
    buttonMessage
  );
};

export const wouldYouRather = (
  sock: WASocket,
  message: proto.IWebMessageInfo
) => {
  let msgString = "";
  wyr()
    .then(async (response: any) => {
      const buttons = [
        {
          buttonId: "wyr1",
          buttonText: { displayText: response.blue.question },
          type: 1,
        },
        {
          buttonId: "wyr2",
          buttonText: { displayText: response.red.question },
          type: 1,
        },
        {
          buttonId: "ghelp",
          buttonText: { displayText: ".ghelp" },
          type: 1,
        },
      ];
      const composeMsg = [
        "Click on an option to choose it",
        "\nA: ",
        response.blue.question,
        "\nB: ",
        response.red.question,
      ];
      composeMsg.forEach((txt) => {
        msgString += txt;
      });
      // Send the response to the sender
      const buttonMessage = {
        text: "Would you rather:",
        footer: msgString,
        buttons,
        headerType: 1,
        viewOnce: true,
      };

      await sock.sendMessage(
        message?.key?.remoteJid ? message.key.remoteJid : "meh",
        buttonMessage
      );
    })
    .catch(async (err) => {
      // Send not found to sender
      const buttons = [
        {
          buttonId: "wyr",
          buttonText: { displayText: ".wyr" },
          type: 1,
        },
        {
          buttonId: "ghelp",
          buttonText: { displayText: "GameHelp" },
          type: 1,
        },
        {
          buttonId: "help",
          buttonText: { displayText: ".help" },
          type: 1,
        },
      ];
      const buttonMessage = {
        text: "Question not found.. Sorry\nTry again",
        footer: "Chose the buttons for examples and menu",
        buttons,
        headerType: 1,
        viewOnce: true,
      };

      await sock.sendMessage(
        message?.key?.remoteJid ? message.key.remoteJid : "meh",
        buttonMessage
      );

      console.error(err);
    });
};
