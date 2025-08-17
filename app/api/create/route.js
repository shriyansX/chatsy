import { StreamChat } from "stream-chat";
import { clerkClient } from "@clerk/nextjs/server";
const api_key = "pq7a699xvrx2";
const api_secret = "6z8wkzexdsxf7yw588d4dyznnj88q6yw4ybcagq8h5cq97e8hwj5p9jh7exdv3nv";
// const user_id = "user_31NTHQjLKDbLmOI5k9KKDVrLcQy";

export async function POST(request) {
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const user = await request.json();

  function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

  const token = serverClient.createToken(user.data.id);
  console.log("A NEW USER HAS BEEN CREATED", token)
  const client = await clerkClient()

  await serverClient.upsertUser({id: user.data.id})

  await client.users.updateUserMetadata(user.data.id, {
    publicMetadata: {
      token: token,
    },
  })

  // Give access to this user for all chats
  const slugs = ["Python", "Javascript", "Html", "Css", "React", "Nodejs"]
  slugs.forEach(async (item) => {
    const channel = serverClient.channel('messaging', item, {
      image: 'https://getstream.io/random_png/?name=react',
      name: capitalize(item) + " Discussion",
      created_by_id: user.data.id,
    });
    await channel.create();
    channel.addMembers([user.data.id]);
  });
  return Response.json({ message: 'Hello World' })
} 