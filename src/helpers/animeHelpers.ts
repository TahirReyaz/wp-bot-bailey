import { proto, WASocket } from "@adiwajshing/baileys";
import anilist from "anilist-node";
import _ from "lodash";

const Anilist = new anilist();
// remove message argument wherever not needed
export const animeSearch = (sock: WASocket, query: string, chatId: string) => {
  Anilist.searchEntry.anime(query).then(async (res) => {
    const sections: any = [
      {
        title: "Search Results",
        rows: [],
      },
    ];

    res.media.forEach((anime: any) => {
      sections[0].rows.push({
        title: ".aid " + anime.id,
        description: anime.title.english + "\n" + anime.title.romaji,
        rowId: anime.id,
      });
    });

    const listMessage = {
      text: `You searched: ${query}`,
      footer: "Select an option to get details",
      title: "Click on the button below to view the list",
      buttonText: "Search Results",
      sections,
      viewOnce: true,
    };

    await sock.sendMessage(chatId, listMessage);
  });
};

export const animeDetail = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  id: string,
  chatId: string
) => {
  let msg: any = [];
  Anilist.media.anime(Number(id)).then(async (data: any) => {
    // Compose the caption
    msg.push(...[`*Id* : ${data.id}`, `*MAL id* : ${data.idMal}`]);
    for (const title in data.title) {
      msg.push(`*${_.capitalize(title)}* : ${data.title[title]}`);
    }
    msg.push(
      ...[
        `*Format* : ${data.format}`,
        `*Status* : ${data.status}`,
        `*Total episodes* : ${data.episodes}`,
        `*Started on* : ${data.startDate}`,
        `*Ended on* : ${data.endDate}`,
        `*Duration* : ${data.duration} minutes`,
        `*Genres* : ${data.genres.join(", ")}`,
        "",
        `*Description* : ${data.description}`,
      ]
    );
    // Send the warning
    await sock.sendMessage(
      chatId,
      {
        text: "As the current service's image processing is slow, the result might take some time or may not be sent at all",
      },
      { quoted: message }
    );

    // send the result
    await sock.sendMessage(chatId, {
      image: {
        url: data.coverImage.large,
      },
      caption: msg.join("\n"),
    });
    // Related Media
    // const relatedAnimeList = [
    //   {
    //     title: "Related to your search",
    //     rows: [],
    //   },
    // ];
    // data.relations.forEach((relation: any) => {
    //   relation.type === "ANIME" &&
    //     relatedAnimeList[0].rows.push({
    //       title: ".aid " + relation.id,
    //       description: relation.title.english + "\n" + relation.title.romaji,
    //     });
    // });
    // sendListMenu(
    //   sock,
    //   sendIn,
    //   "Related animes",
    //   "Hi",
    //   "Checkout the bottom menu for related animes",
    //   "Related animes",
    //   relatedAnimeList
    // );
    // Tags
    // console.table(data.tags);
    // // Characters
    // const charactersList = [
    //   {
    //     title: "Featured Characters",
    //     rows: [],
    //   },
    // ];
    // data.characters.forEach((character) => {
    //   charactersList[0].rows.push({
    //     title: ".cid " + character.id,
    //     description: character.name,
    //   });
    // });
    // sendListMenu(
    //   sock,
    //   sendIn,
    //   "Featured Characters",
    //   "Hi",
    //   "Checkout the bottom menu for characters appearing in this anime",
    //   "Featured Characters",
    //   charactersList
    // );
    // // Staff
    // const staffList = [
    //   {
    //     title: "Staff",
    //     rows: [],
    //   },
    // ];
    // data.staff.forEach((staff) => {
    //   staffList[0].rows.push({
    //     title: ".asid " + staff.id,
    //     description: staff.name,
    //   });
    // });
    // sendListMenu(
    //   sock,
    //   sendIn,
    //   "Staff",
    //   "Hi",
    //   "Checkout the bottom menu for the people who worked on this anime",
    //   "Staff",
    //   staffList
    // );
  });
};

export const charDetailById = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  id: string,
  chatId: string
) => {
  Anilist.people.character(Number(id)).then(async (data: any) => {
    const msg = [];
    msg.push(
      ...[
        `*Id* : ${data.id}`,
        `*Name (English)* : ${data.name.english}`,
        `*Name (Native)* : ${data.name.native}`,
        data.name.alternative &&
          `*Alt Names* : ${data.name.alternative.join(", ")}`,
        "",
        `*Description* : ${data.description}`,
      ]
    );
    await sock.sendMessage(
      chatId,
      {
        image: {
          url: data.image.large,
        },
        caption: msg.join("\n"),
      },
      { quoted: message }
    );
  });
};

export const animeStaffDetails = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  id: string,
  chatId: string
) => {
  Anilist.people.staff(Number(id)).then(async (data: any) => {
    const msg = [];
    msg.push(
      ...[
        `*Id* : ${data.id}`,
        `*Name (English)* : ${data.name.english}`,
        `*Name (Native)* : ${data.name.native}`,
        data.name.alternative &&
          `*Alt Names* : ${data.name.alternative.join(", ")}`,
        `*Language* : ${data.language}`,
        "",
        `*Description* : ${data.description}`,
      ]
    );
    await sock.sendMessage(
      chatId,
      {
        image: {
          url: data.image.large,
        },
        caption: msg.join("\n"),
      },
      { quoted: message }
    );
  });
};

export const searchCharacterDetail = (
  sock: WASocket,
  query: string,
  chatId: string
) => {
  Anilist.searchEntry.character(query, 1, 30).then(async (data) => {
    const sections: any = [
      {
        title: "Search Results",
        rows: [],
      },
    ];
    data.characters.forEach((character: any) => {
      sections[0].rows.push({
        title: ".cid " + character.id,
        description: character.name.english,
      });
    });
    const listMessage = {
      text: `You searched: ${query}`,
      footer: "Select an option to get details",
      title: "Click on the button below to view the list",
      buttonText: "Search Results",
      sections,
      viewOnce: true,
    };
    await sock.sendMessage(chatId, listMessage);
  });
};

export const mangaSearch = (sock: WASocket, query: string, chatId: string) => {
  Anilist.searchEntry.manga(query, undefined, 1, 50).then(async (data) => {
    const sections: any = [
      {
        title: "Search Results",
        rows: [],
      },
    ];
    data.media.forEach((manga: any) => {
      sections[0].rows.push({
        title: ".mgd " + manga.id,
        description: manga.title.romaji + "\n" + manga.title.userPreferred,
      });
    });
    const listMessage = {
      text: `You searched: ${query}`,
      footer: "Select an option to get details",
      title: "Click on the button below to view the list",
      buttonText: "Search Results",
      sections,
      viewOnce: true,
    };

    await sock.sendMessage(chatId, listMessage);
  });
};

export const mangaDetailsById = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  id: string,
  chatId: string
) => {
  let msg: any = [];
  Anilist.media.manga(Number(id)).then(async (data: any) => {
    // Compose the caption
    if (data.id) {
      msg.push(...[`*Id* : ${data.id}`, `*MAL id* : ${data.idMal}`]);
      for (const title in data.title) {
        msg.push(`*${_.capitalize(title)}* : ${data.title[title]}`);
      }
      msg.push(
        ...[
          `*Format* : ${data.format}`,
          `*Status* : ${data.status}`,
          `*Total Chapters* : ${data.chapters}`,
          `*Total Volumes* : ${data.volumes}`,
          `*Started on* : ${data.startDate}`,
          `*Ended on* : ${data.endDate}`,
          `*Genres* : ${data.genres.join(", ")}`,
          "",
          `*Description* : ${data.description}`,
        ]
      );
      // Send the result
      await sock.sendMessage(
        chatId,
        {
          image: {
            url: data.coverImage.large,
          },
          caption: msg.join("\n"),
        },
        { quoted: message }
      );
      //     // Related Media
      //     const relatedAnimeList = [
      //       {
      //         title: "Related to your search",
      //         rows: [],
      //       },
      //     ];
      //     data.relations.forEach((relation) => {
      //       relatedAnimeList[0].rows.push({
      //         title: relation.type === "ANIME" ? ".aid " : ".mid " + relation.id,
      //         description: relation.title.english + "\n" + relation.title.romaji,
      //       });
      //     });
      //     sendListMenu(
      //       sock,
      //       sendIn,
      //       "Related animes",
      //       "Hi",
      //       "Checkout the bottom menu for related animes",
      //       "Related animes",
      //       relatedAnimeList
      //     );
      //     // Tags
      //     console.table(data.tags);
      //     // Characters
      //     const charactersList = [
      //       {
      //         title: "Featured Characters",
      //         rows: [],
      //       },
      //     ];
      //     data.characters.forEach((character) => {
      //       charactersList[0].rows.push({
      //         title: ".cid " + character.id,
      //         description: character.name,
      //       });
      //     });
      //     sendListMenu(
      //       sock,
      //       sendIn,
      //       "Featured Characters",
      //       "Hi",
      //       "Checkout the bottom menu for characters appearing in this anime",
      //       "Featured Characters",
      //       charactersList
      //     );
      //     // Staff
      //     const staffList = [
      //       {
      //         title: "Staff",
      //         rows: [],
      //       },
      //     ];
      //     data.staff.forEach((staff) => {
      //       staffList[0].rows.push({
      //         title: ".asid " + staff.id,
      //         description: staff.name,
      //       });
      //     });
      //     sendListMenu(
      //       sock,
      //       sendIn,
      //       "Staff",
      //       "Hi",
      //       "Checkout the bottom menu for the people who worked on this anime",
      //       "Staff",
      //       staffList
      //     );
    } else {
      await sock.sendMessage(chatId, {
        text: `*Error* : ${data[0].status} ${data[0].message}`,
      });
    }
  });
};
