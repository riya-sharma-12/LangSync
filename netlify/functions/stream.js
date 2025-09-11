import { StreamChat } from "stream-chat";

export async function handler(event) {
  const client = StreamChat.getInstance(
    process.env.STEAM_API_KEY,
    process.env.STEAM_API_SECRET
  );

  // Example: create a token
  const token = client.createToken("user-id");
  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };
}
