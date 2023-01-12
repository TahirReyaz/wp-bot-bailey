import { proto, WASocket } from "@adiwajshing/baileys";
import anilist from "anilist-node";
import _ from "lodash";

const Anilist = new anilist();

export const animeSearch = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  query: string
) => {
  Anilist.searchEntry.anime(query).then((res) => {
    const list = [
      {
        title: "Search Results",
        rows: [],
      },
    ];
    console.log(res.media[0]);
    // res.media.forEach((anime) => {
    //   list[0].rows.push({
    //     title: ".aid " + anime.id,
    //     description: anime.title.english + "\n" + anime.title.romaji,
    //   });
    // });
    // sendListMenu(
    //   sock,
    //   sendIn,
    //   "Searched: " + query,
    //   "Hi",
    //   "Checkout the bottom menu for results",
    //   "Search results",
    //   list
    // );
  });
};

export const animeDetail = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  id: string
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
    // Send the result
    await sock.sendMessage(
      message && message.key && message.key.remoteJid
        ? message.key.remoteJid
        : "meh",
      {
        image: {
          url: data.coverImage.large,
        },
        caption: msg.join("\n"),
      }
    );
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
  id: string
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
      message && message.key && message.key.remoteJid
        ? message.key.remoteJid
        : "meh",
      {
        image: {
          url: data.image.large,
        },
        caption: msg.join("\n"),
      }
    );
  });
};

export const animeStaffDetails = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  id: string
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
      message && message.key && message.key.remoteJid
        ? message.key.remoteJid
        : "meh",
      {
        image: {
          url: data.image.large,
        },
        caption: msg.join("\n"),
      }
    );
  });
};

export const searchCharacterDetail = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  query: string
) => {
  //   Anilist.searchEntry.character(query, 1, 30).then((data) => {
  //     const list = [
  //       {
  //         title: "Search Results",
  //         rows: [],
  //       },
  //     ];
  //     data.characters.forEach((character) => {
  //       list[0].rows.push({
  //         title: ".cid " + character.id,
  //         description: character.name.english,
  //       });
  //     });
  //     sendListMenu(
  //       sock,
  //       sendIn,
  //       "Searched: " + query,
  //       "Hi",
  //       "Checkout the bottom menu for results",
  //       "Search results",
  //       list
  //     );
  //   });
};

export const mangaSearch = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  query: string
) => {
  //   Anilist.searchEntry.manga(query, null, 1, 50).then((data) => {
  //     const list = [
  //       {
  //         title: "Search Results",
  //         rows: [],
  //       },
  //     ];
  //     data.media.forEach((manga) => {
  //       list[0].rows.push({
  //         title: "mangaDetail " + manga.id,
  //         description: manga.title.romaji + "\n" + manga.title.userPreferred,
  //       });
  //     });
  //     sendListMenu(
  //       sock,
  //       sendIn,
  //       "Searched: " + query,
  //       "Hi",
  //       "Checkout the bottom menu for results",
  //       "Search results",
  //       list
  //     );
  //   });
};

export const mangaDetailsById = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  id: string
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
        message && message.key && message.key.remoteJid
          ? message.key.remoteJid
          : "meh",
        {
          image: {
            url: data.coverImage.large,
          },
          caption: msg.join("\n"),
        }
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
      await sock.sendMessage(
        message && message.key && message.key.remoteJid
          ? message.key.remoteJid
          : "meh",
        {
          text: `*Error* : ${data[0].status} ${data[0].message}`,
        }
      );
    }
  });
};
