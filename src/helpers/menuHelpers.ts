import { proto, WASocket } from "@adiwajshing/baileys";

const botMenuList = [
  {
    title: "General Commands",
    rows: [
      {
        title: ".hi",
        description: "For just getting a reply",
      },
      // {
      //   title: ".talk Who are you",
      //   description: "To talk with an AI",
      // },
      // {
      //   title: ".remind 13:01",
      //   description:
      //     "For setting a reminder (In 24 hour format). Bot remind you at the specified time. Write the additional message in the next line",
      // },
      {
        title: "@everyone",
        description: "For tagging everyone like discord",
      },
      // {
      //   title: ".sticker",
      //   description:
      //     "To generate stickers, reply to the image or gif with .sticker",
      // },
      // {
      //   title: ".feel",
      //   description:
      //     "To extract the feelings from a text using machine learning. Reply to a text message with *.feel*",
      // },
      {
        title: "horoscopeMenu",
        description: "For checking out today's Horoscope\nShort command: .hsm",
      },
      // {
      //   title: "GroupRoles",
      //   description: "For activating certain commands in a group (Admin only)",
      // },
      {
        title: ".ihelp ",
        description:
          "To get Information related commands like wiki, dictionary, maths etc.",
      },
      {
        title: ".ghelp ",
        description:
          "To get help and commands related to Games like truth or dare, Would you rather etc.",
      },
      {
        title: ".ehelp ",
        description:
          "To get Entertainment related commands like movie, song, anime detail and lyrics",
      },
      {
        title: ".ahelp ",
        description: "To get help and commands related to Anime",
      },
      {
        title: ".rhelp ",
        description:
          "To get help and commands related to Roles and Permissions",
      },
    ],
  },
];
const botMenuMsg = ["Check out the bottom menu for commands👇"];

const entMenuList = [
  {
    title: "Entertainment and Media Related Commands",
    rows: [
      {
        title: ".md Inception",
        description:
          "To get the details of a Movie/ Series | Short Command: .md <title>",
      },
      {
        title: ".sd Faded-Alan Walker",
        description:
          "To get the details of a song | Short Command: .sd <Song name>",
      },
      {
        title: ".lyrics Faded-Alan Walker",
        description: "To get the lyrics of a song",
      },
      {
        title: ".ahelp ",
        description: "To get help and list of Anime related commands",
      },
      {
        title: ".help ",
        description: "To get help and list of all commands.",
      },
    ],
  },
];
const entMenuMsg = [
  "If you didn't get the desired result then put the name of the artist too with a hyphen ( - )",
  "For example:\n*SongDetail Faded-Alan Walker*",
  "--------------------------------------------------",
  "```There is no case sensitivity or need to type . in front of the full commands```",
];

const infoMenuList = [
  {
    title: "Info Related Commands",
    rows: [
      {
        title: ".ed Table",
        description: "To get the definition of an English word",
      },
      // {
      //   title: ".wiki Indian Population",
      //   description: "For searching a term on Wikipedia",
      // },
      // {
      //   title: "wikiPage 14598",
      //   description: "To get the details of wiki page.",
      // },
      {
        title: ".calc 5*34",
        description: "For calculating",
      },
      {
        title: ".calc [5+2, 4*6, a= 24, a+3,5.08 cm in inch,sin(45 deg) ^ 2]",
        description: "For using multiple expressions:",
      },
      {
        title: ".kd 空",
        description: "For readings and meaning of a Kanji.",
      },
      {
        title: ".help ",
        description: "To get help and list of all commands.",
      },
    ],
  },
];
const infoMenuMsg = [
  "Like dictionary, wikipedia, kanji detials, calculator, etc.",
];

const gameMenuList = [
  {
    title: "Game Commands",
    rows: [
      {
        title: ".dare ",
        description: "To get a dare",
      },
      {
        title: ".truth ",
        description: "To get a truth question",
      },
      {
        title: ".wyr ",
        description: "To get a 'Would You Rather' question",
      },
      {
        title: ".help ",
        description: "To get help and list of all commands.",
      },
    ],
  },
];
const gameMenuMsg = ["```Text based Games related commands```"];

const animeMenuList = [
  {
    title: "Anime Commands",
    rows: [
      {
        title: ".ad Naruto",
        description: "To get the details of an Anime",
      },
      {
        title: ".cd Kakashi",
        description: "To get the details of an Anime Charater by Search",
      },
      {
        title: ".ms Naruto",
        description: "To search for the details of a manga",
      },
      {
        title: ".asid 96879",
        description: "To get the details of a manga or anime staff by ID",
      },
      {
        title: ".help ",
        description: "To get help about all commands.",
      },
    ],
  },
];
const animeMenuMsg = [
  "Checkout the bottom menu for commands",
  "",
  "To get help about all commands",
  "Send _.help_",
];

const roleMenuList = [
  {
    title: "Role Commands",
    rows: [
      {
        title: ".gperms ",
        description: "To check the permissions in the group",
      },
      {
        title: ".agp <permission>",
        description: "To add a permission in the group | For ex- .agp tagAll",
      },
      {
        title: ".rgp <permission>",
        description:
          "To remove a permission from the group | For ex- .rgp tagAll",
      },
    ],
  },
];
const roleMenuMsg = ["Checkout the menu for roles related commands"];

export const sendMenu = async (
  sock: WASocket,
  title: string,
  type: string,
  chatId: string
) => {
  let sections, msg;

  switch (type) {
    case "Help":
      sections = botMenuList;
      msg = botMenuMsg;
      break;
    case "Ent":
      sections = entMenuList;
      msg = entMenuMsg;
      break;
    case "Info":
      sections = infoMenuList;
      msg = infoMenuMsg;
      break;
    case "Game":
      sections = gameMenuList;
      msg = gameMenuMsg;
      break;
    case "Anime":
      sections = animeMenuList;
      msg = animeMenuMsg;
      break;
    case "Role":
      sections = roleMenuList;
      msg = roleMenuMsg;
      break;
    default:
      sections = botMenuList;
      msg = botMenuMsg;
      break;
  }

  const listMessage = {
    text: title,
    footer: msg.join("\n"),
    title: "Welcome to THE BOT",
    buttonText: "Commands",
    sections,
    viewOnce: true,
  };

  await sock.sendMessage(chatId, listMessage);
};
