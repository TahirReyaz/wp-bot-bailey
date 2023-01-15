import { proto, WASocket } from "@adiwajshing/baileys";
import axios from "axios";
import musicInfo from "music-info";
import _ from "lodash";
import { config } from "dotenv";
config();

const omdbEndPoint =
  "https://www.omdbapi.com/?apikey=" + process.env.OMDB_API_KEY + "&t=";

export const movieDetail = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  query: string
) => {
  axios
    .get(omdbEndPoint + query)
    .then(async (response) => {
      // Set the fields of the message
      const composeMsg = [
        "*Title* : ",
        response.data.Title,
        "\n*Type* : ",
        response.data.Type,
        "\n*Year* : ",
        response.data.Year,
        "\n*Rated* : ",
        response.data.Rated,
        "\n*Released* : ",
        response.data.Released,
        "\n*Run-time* : ",
        response.data.Runtime,
        "\n*Genre* : ",
        response.data.Genre,
        "\n*Director* : ",
        response.data.Director,
        "\n*Writer* : ",
        response.data.Writer,
        "\n*Actors* : ",
        response.data.Actors,
        "\n*Language* : ",
        response.data.Language,
        "\n*Country* : ",
        response.data.Country,
        "\n*Awards* : ",
        response.data.Awards,
        "\n*IMDB rating* : ",
        response.data.imdbRating,
        "\n*Plot* : ",
        response.data.Plot,
      ];
      // Send the response to the sender
      if (response.data.Response === "True") {
        // If the movie was found then send the details and poster
        if (response.data.Poster === "N/A") {
          // If there is no poster then send only the details
          await sock.sendMessage(
            message?.key?.remoteJid ? message.key.remoteJid : "meh",
            {
              text: composeMsg.join(""),
            }
          );
        } else {
          // If there is a poster then send the details with the poster
          await sock.sendMessage(
            message?.key?.remoteJid ? message.key.remoteJid : "meh",
            {
              image: {
                url: response.data.Poster,
              },
              caption: composeMsg.join(""),
            }
          );
        }
      } else {
        // If movie/ series is not found
        await sock.sendMessage(
          message?.key?.remoteJid ? message.key.remoteJid : "meh",
          {
            text: "Movie/ Series not found.. Sorry. Check the spelling",
          }
        );
      }
    })
    .catch((err) => {
      console.error("Error while fetching movie: ", err);
    });
};

export const songDetail = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  songParams: {
    title: string;
    artist: string;
  }
) => {
  musicInfo
    .searchSong(songParams, 600)
    .then(async (song: any) => {
      const songLength = song.lengthMilliSec / 1000;
      const lengthString =
        Math.floor(songLength / 60) + ":" + Math.floor(songLength % 60);
      const composeMsg = [
        "*Title* : ",
        song.title,
        "\n*Artist* : ",
        song.artist,
        "\n*Album* : ",
        song.album,
        "\n*Released* : ",
        song.releaseDate.substring(0, 10),
        "\n*Length* : ",
        lengthString,
        "\n*Genre* : ",
        song.genre,
        "\n--------------------------------------------------",
        "For lyrics of the song:\n Send '.lyrics' <Song name>'",
        "For example:\n*.lyrics Faded*",
      ];
      // Send the response to the sender
      await sock.sendMessage(
        message?.key?.remoteJid ? message.key.remoteJid : "meh",
        {
          image: {
            url: song.artwork,
          },
          caption: composeMsg.join(""),
        }
      );
    })
    .catch(async () => {
      await sock.sendMessage(
        message?.key?.remoteJid ? message.key.remoteJid : "meh",
        {
          text: "Song not found\n-Add Artist too\n-Check the syntax and spelling",
        }
      );
    });
};

export const searchLyrics = (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  songParams: {
    title: string;
    artist: string;
  },
  query: string
) => {
  let composeMsg: string[] = [];
  musicInfo
    .searchLyrics(songParams, 600)
    .then(async (song: any) => {
      composeMsg = [
        "*Searched* : ",
        query,
        "\n-------------------------------------",
        "\n*Lyrics* :\n",
        song.lyrics,
        "\n--------------------------------------------------",
        "\nTo get the details of a song:",
        "\nSend 'SongDetail <Song name> | Short Command: *.sd*",
        "\nFor example:\n*SongDetail Faded*",
        "\nIf you didn't get the desired result then put the name of the artist too",
        "\nFor example:\n*SongDetail Faded Alan Walker*",
      ];
      // Send the response to the sender
      await sock.sendMessage(
        message?.key?.remoteJid ? message.key.remoteJid : "meh",
        {
          text: composeMsg.join(""),
        }
      );
    })
    .catch(async () => {
      await sock.sendMessage(
        message?.key?.remoteJid ? message.key.remoteJid : "meh",
        {
          text: "Lyrics not found\n-Add Artist too\n-Check the syntax and spelling",
        }
      );
    });
};

export const sendHoroscopeMenu = async (
  sock: WASocket,
  message: proto.IWebMessageInfo
) => {
  // Configuring the list menu
  const sections: any[] = [
    {
      title: "General Commands",
      rows: [
        {
          title: ".hs aries",
          description: "March 21 - April 19\nSend to see the Horoscope",
        },
        {
          title: ".hs taurus",
          description: "April 20 - May 20\nSend to see the Horoscope",
        },
        {
          title: ".hs gemini",
          description: "May 21 - June 20\nSend to see the Horoscope",
        },
        {
          title: ".hs cancer",
          description: "June 21 - July 22\nSend to see the Horoscope",
        },
        {
          title: ".hs leo",
          description: "July 23 - August 22\nSend to see the Horoscope",
        },
        {
          title: ".hs virgo",
          description: "August 23 - September 22\nSend to see the Horoscope",
        },
        {
          title: ".hs libra",
          description: "September 23 - October 22\nSend to see the Horoscope",
        },
        {
          title: ".hs scorpio",
          description: "October 23 - November 21\nSend to see the Horoscope",
        },
        {
          title: ".hs sagittarius",
          description: "November 22 - December 21\nSend to see the Horoscope",
        },
        {
          title: ".hs capricorn",
          description: "December 22 - January 19\nSend to see the Horoscope",
        },
        {
          title: ".hs aquarius",
          description: "January 20 - February 18\nSend to see the Horoscope",
        },
        {
          title: ".hs pisces",
          description: "February 19 - March 20\nSend to see the Horoscope",
        },
      ],
    },
  ];

  const listMessage = {
    text: "Daily Horoscope",
    title: "Select your Zodiac sign👇",
    buttonText: "Choose Your Zodiac",
    sections,
    viewOnce: true,
  };

  await sock.sendMessage(
    message?.key?.remoteJid ? message.key.remoteJid : "meh",
    listMessage
  );
};

export const sendHoroscope = async (
  sock: WASocket,
  message: proto.IWebMessageInfo,
  queryPart: string[],
  botQuery: string[]
) => {
  if (botQuery.length > 0) {
    const zodiacSign = queryPart[0].toLowerCase();
    const zodiacDay = queryPart[1] ? queryPart[1] : "today";

    axios
      .post(
        `https://aztro.sameerkumar.website/?sign=${zodiacSign}&day=${zodiacDay}`
      )
      .then(async (response) => {
        const { data } = response;
        const composeMsg = [
          `*${_.upperFirst(queryPart[0])}'s* Horoscope for ${zodiacDay}\n`,
          "\n----------------------------------------------\n",
          data.description,
          "\n----------------------------------------------\n",
          `You are compatible with *${data.compatibility}*\n`,
          `Make your move on them at ${data.lucky_time} cause that's your lucky time.\n\n`,
          `*Mood*: ${data.mood}\n`,
          `*Color*: ${data.color}\n`,
          `*Lucky Number*: ${data.lucky_number}\n`,
          `\n\n_${_.upperFirst(queryPart[0])}: ${data.date_range}_`,
        ];

        await sock.sendMessage(
          message?.key?.remoteJid ? message.key.remoteJid : "meh",
          {
            text: composeMsg.join(""),
          }
        );
      })
      .catch(async (error) => {
        await sock.sendMessage(
          message?.key?.remoteJid ? message.key.remoteJid : "meh",
          {
            text: "An error occurred\nCheck spellings and syntax",
          }
        );

        console.error(error);
      });
  } else {
    await sock.sendMessage(
      message?.key?.remoteJid ? message.key.remoteJid : "meh",
      {
        text: "Please enter a valid sign",
      }
    );
  }
};
