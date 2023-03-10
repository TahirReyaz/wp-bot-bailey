import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
} from "@adiwajshing/baileys";
import { Boom } from "@hapi/boom";
import MAIN_LOGGER from "@adiwajshing/baileys/lib/Utils/logger";

import { readCommand } from "./handlers";
import { fetchData } from "./helpers/fetchData";
import { personalHandler } from "./handlers/personalHandler";

const logger = MAIN_LOGGER.child({});
logger.level = "trace";

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("baileys_auth_info");
  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: {
      creds: state.creds,
      /** caching makes the store faster to send/recv messages */
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
  });

  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut;
      console.log(
        "connection closed due to ",
        lastDisconnect?.error,
        ", reconnecting ",
        shouldReconnect
      );
      // reconnect if not logged out
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === "open") {
      console.log("opened connection");
      fetchData();
    }
  });

  sock.ev.on("messages.upsert", async (m) => {
    const currentMessage = m.messages[0];
    const convo =
      currentMessage.message?.extendedTextMessage?.text ||
      currentMessage.message?.conversation ||
      currentMessage.message?.listResponseMessage?.title;

    const chatId: string = currentMessage?.key?.remoteJid || "meh";

    personalHandler(sock, currentMessage, chatId);

    if (convo && (convo[0] === "." || convo[0] === "@")) {
      console.log({ m: currentMessage.message });
      readCommand(sock, currentMessage, convo.substring(1), chatId);
    }
  });
}
// run in main file
connectToWhatsApp();
