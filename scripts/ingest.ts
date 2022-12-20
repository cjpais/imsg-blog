import { supabase } from "../features/supabase";

const sdk = require("matrix-bot-sdk");
const MatrixClient = sdk.MatrixClient;
const SimpleFsStorageProvider = sdk.SimpleFsStorageProvider;
const AutojoinRoomsMixin = sdk.AutojoinRoomsMixin;

const homeserverUrl = "http://matrix.notes.site";
const accessToken = "syt_aW1lc3NhZ2U_GMaKOmImYyBBzPttmYga_2vPBqE";

const storage = new SimpleFsStorageProvider("bot.json");
const client = new MatrixClient(homeserverUrl, accessToken, storage);

// AutojoinRoomsMixin.setupOnClient(client);

client.start().then(() => console.log("Client started!"));

client.on("room.message", async (roomId: any, event: any) => {
  console.log({ event });

  // if (! event["content"]) return;
  const sender = event["sender"];
  const body = event["content"]["body"];
  console.log(`${roomId}: ${sender} says '${body}'`);

  const { data: authorData, error: authorError } = await supabase
    .from("authors")
    .upsert(
      {
        matrix: sender,
      },
      { onConflict: "matrix" }
    )
    .select("*");

  console.log({ authorData });

  if (authorError) {
    console.log(authorError);
    return;
  }

  const { data, error } = await supabase.from("posts").insert({
    data: body,
    author: authorData[0].id,
    metadata: {
      source: "matrix",
    },
  });
});

export {};
