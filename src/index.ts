import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
} from "@adiwajshing/baileys";
import { Boom } from "@hapi/boom";
import MAIN_LOGGER from "@adiwajshing/baileys/lib/Utils/logger";

import { readCommand } from "./handlers";
import { fetchData, grpArrayItem } from "./helpers/fetchData";

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

  let tagAllGrps: grpArrayItem[] = [],
    tagAllAdminOnlyGrps: grpArrayItem[] = [],
    roastGrps: grpArrayItem[] = [];

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
      const {
        tagAllGrps: tagrps,
        tagAllAdminOnlyGrps: taaogps,
        roastGrps: rgrps,
      } = await fetchData();
      tagAllGrps = tagrps;
      tagAllAdminOnlyGrps = taaogps;
      roastGrps = rgrps;
    }
  });

  sock.ev.on("messages.upsert", async (m) => {
    const currentMessage = m.messages[0];
    const convo = currentMessage.message?.conversation
      ? currentMessage.message?.conversation
      : currentMessage.message?.listResponseMessage?.title;
    if (convo && (convo[0] === "." || convo[0] === "@")) {
      console.log({ m: currentMessage.message });
      readCommand(
        sock,
        currentMessage,
        convo.substring(1),
        tagAllGrps,
        tagAllAdminOnlyGrps,
        roastGrps
      );
    }
  });
}
// run in main file
connectToWhatsApp();
