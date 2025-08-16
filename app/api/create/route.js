import { StreamChat } from "stream-chat";
const api_key = "pq7a699xvrx2";
const api_secret = "6z8wkzexdsxf7yw588d4dyznnj88q6yw4ybcagq8h5cq97e8hwj5p9jh7exdv3nv";
const user_id = "user_31NTHQjLKDbLmOI5k9KKDVrLcQy";

export async function GET() {
    const serverClient = StreamChat.getInstance(api_key,api_secret);
    const token = serverClient.createToken(user_id);
    console.log(token);
  return Response.json({ message: 'Hello World' })
} 