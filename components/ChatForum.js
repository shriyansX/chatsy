"use client"
import { useState, useEffect } from 'react';
import { useCreateChatClient, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { useUser } from '@clerk/nextjs';

import 'stream-chat-react/dist/css/v2/index.css';

const apiKey = 'pq7a699xvrx2';
// const userId = 'user_31NTHQjLKDbLmOI5k9KKDVrLcQy';
// const userName = 'Shriyans';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8zMU5USFFqTEtEYkxtT0k1azlLS0RWckxjUXkifQ.VG2upuVTnV4o2tSHlmpd7tNXRp4MXny5PXDYnzeb86w';


export default function ChatForum({slug}) {
  const clerkUser = useUser();
  const user = {
    id: clerkUser.user.id,
    name: clerkUser.user.firstName,
    image: `https://getstream.io/random_png/?name=${clerkUser.user.name}`,
  };
  function toTitleCase(str) {
    return str.replace(
      /\b[a-z]/g,
      (char) => char.toUpperCase()
    );
  }
  const [channel, setChannel] = useState();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel('messaging', slug, {
      image: 'https://getstream.io/random_png/?name=react',
      name: toTitleCase(slug.replace(/-/g, " ")) + ' Discussion',
      members: [userId],
    });

    setChannel(channel);
  }, [client]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};