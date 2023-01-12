import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
} from "@adiwajshing/baileys";
import { Boom } from "@hapi/boom";

import MAIN_LOGGER from "@adiwajshing/baileys/lib/Utils/logger";
import { readCommand } from "./handlers";

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
  sock.ev.on("connection.update", (update) => {
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
    }
  });

  sock.ev.on("messages.upsert", async (m) => {
    const convo = m.messages[0].message?.conversation;
    if (convo && convo[0] === ".") {
      console.log({ m: m.messages[0].message?.conversation });

      readCommand(sock, m.messages[0], convo.substring(1));
    }
  });
}
// run in main file
connectToWhatsApp();
