import { StreamChat } from "stream-chat";
const api_key = "pq7a699xvrx2";
const api_secret = "6z8wkzexdsxf7yw588d4dyznnj88q6yw4ybcagq8h5cq97e8hwj5p9jh7exdv3nv";
// const user_id = "user_31NTHQjLKDbLmOI5k9KKDVrLcQy";

export async function POST(request) {
    const serverClient = StreamChat.getInstance(api_key,api_secret);
    const user = await request.json();
    const token = serverClient.createToken(user.data.id);
    console.log("A NEW USER HAS BEEN CREATED");
  return Response.json({ message: 'Hello World' })
} 