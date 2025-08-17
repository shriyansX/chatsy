"use client";
import { useEffect, useState, useCallback, useRef } from 'react';
import { useUser, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { useCreateChatClient, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Users as UsersIcon, Sparkles } from 'lucide-react';
import 'stream-chat-react/dist/css/v2/index.css';
import './chat-theme.css';

// (Distinct channels) We no longer build a custom channel id to avoid 64+ char errors.
// Keeping a tiny helper in case we later need a short deterministic reference.
function shortKey(a,b){
  const base=[a,b].sort().join(':');
  if(base.length<=40) return base;
  let h=5381; for(let i=0;i<base.length;i++){ h=((h<<5)+h) ^ base.charCodeAt(i); }
  return 'dm_'+(h>>>0).toString(36);
}

function ChatRuntime({ user, token }) {
  const apiKey = 'pq7a699xvrx2';
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: {
      id: user.id,
      name: user.fullName || user.username || 'User',
      image: user.imageUrl,
    },
  });

  // State
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]); // includes 1:1 + groups
  const [activeChannel, setActiveChannel] = useState(null);
  const [filter, setFilter] = useState('');
  const [loadingChannel, setLoadingChannel] = useState(false);
  const [unread, setUnread] = useState({});
  const [tab, setTab] = useState('chats'); // chats | people
  const [online, setOnline] = useState({});
  const mountedRef = useRef(false);

  // Fetch users
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) { console.warn('Users fetch failed status', res.status); return; }
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) return;
        const data = await res.json();
        if (!cancelled) {
          setUsers(data.users.filter(u => u.id !== user.id));
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { cancelled = true; };
  }, [user.id]);

  // Fallback / augmentation: query Stream for other chat users (excludes self)
  useEffect(() => {
    if (!client) return;
    let cancelled = false;
    (async () => {
      try {
        const result = await client.queryUsers({ id: { $ne: user.id } }, { last_active: -1 }, { presence: true });
        if (cancelled) return;
        // Map to similar shape used before, but prefer existing Clerk users list if already populated
        const streamUsers = result.users.map(u => ({
          id: u.id,
          username: u.name || u.id,
          firstName: u.name,
          lastName: '',
          imageUrl: u.image,
          token: null,
        }));
        setUsers(prev => {
          if (prev.length === 0) return streamUsers; // only if Clerk list empty
          const existingIds = new Set(prev.map(p => p.id));
            return [...prev, ...streamUsers.filter(su => !existingIds.has(su.id))];
        });
      } catch (e) {
        console.error('Stream queryUsers failed', e);
      }
    })();
    return () => { cancelled = true; };
  }, [client, user.id]);

  // Initial channel query
  useEffect(() => {
    if (!client) return;
    let cancelled = false;
    (async () => {
      try {
        const list = await client.queryChannels(
          { type: 'messaging', members: { $in: [user.id] } },
          { last_message_at: -1 },
          { watch: true, state: true, presence: true }
        );
        if (cancelled) return;
        setChannels(list);
        const unreadInit = {};
        list.forEach(ch => { unreadInit[ch.id] = 0; });
        setUnread(unreadInit);
      } catch (e) {
        console.error('Channel query failed', e);
      }
    })();
    return () => { cancelled = true; };
  }, [client, user.id]);

  // Event listeners for new messages, read receipts & presence
  useEffect(() => {
    if (!client) return;
    if (mountedRef.current) return; // register once
    mountedRef.current = true;
    const onEvent = (event) => {
      if (event.type === 'message.new') {
        const ch = event.channel;
        if (!ch) return;
        setChannels(prev => {
          const existing = prev.filter(c => c.id !== ch.id);
          return [ch, ...existing];
        });
        setUnread(prev => {
          if (activeChannel && activeChannel.id === ch.id) return { ...prev, [ch.id]: 0 };
          return { ...prev, [ch.id]: (prev[ch.id] || 0) + 1 };
        });
      }
      if (event.type === 'message.read' && event.user?.id === user.id && event.channel) {
        setUnread(prev => ({ ...prev, [event.channel.id]: 0 }));
      }
      if (event.type === 'user.presence.changed' || event.type === 'health.check') {
        if (event.user?.id) {
          setOnline(o => ({ ...o, [event.user.id]: event.user.online }));
        }
      }
    };
    client.on(onEvent);
    return () => { client.off(onEvent); };
  }, [client, activeChannel, user.id]);

  const openChannel = useCallback(async (channel) => {
    setActiveChannel(channel);
    setUnread(prev => ({ ...prev, [channel.id]: 0 }));
    try { await channel.markRead?.(); } catch {}
  }, []);

  const startDM = useCallback(async (other) => {
    if (!client) return;
    setLoadingChannel(true);
    try {
      // Reuse existing 1:1 if already present locally
      const existing = channels.find(c => {
        const memberIds = Object.keys(c.state?.members || {});
        return memberIds.length === 2 && memberIds.includes(user.id) && memberIds.includes(other.id);
      });
      if (existing) { openChannel(existing); return; }

      // Create a distinct channel (no custom ID -> Stream guarantees uniqueness for same member set)
      const ch = client.channel('messaging', {
        members: [user.id, other.id],
        isDirect: true,
        name: `Chat: ${(other.username || other.firstName || 'User')}`,
        shortKey: shortKey(user.id, other.id)
      });
      await ch.create();
      openChannel(ch);
      setChannels(prev => [ch, ...prev]);
    } catch (e) {
      console.error('Failed to open DM', e);
    } finally {
      setLoadingChannel(false);
    }
  }, [client, user.id, openChannel, channels]);

  const relativeTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const diff = (Date.now() - date.getTime())/1000; // seconds
    if (diff < 60) return 'now';
    if (diff < 3600) return Math.floor(diff/60)+'m';
    if (diff < 86400) return Math.floor(diff/3600)+'h';
    return date.toLocaleDateString(undefined,{ month:'short', day:'numeric' });
  };

  if (!client) return <div className="p-6">Connecting chat client...</div>;

  const filteredChannels = channels.filter(ch => {
    if (!filter) return true;
    return (ch.data?.name || '').toLowerCase().includes(filter.toLowerCase());
  });

  const filteredPeople = users.filter(u => (u.username||u.firstName||'').toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-7xl gap-4 px-4 py-6 lg:px-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Left pane */}
      <div className="flex w-full flex-col rounded-xl border bg-gradient-to-br from-card/90 to-card/60 backdrop-blur md:w-80 overflow-hidden shadow-sm">
        <div className="relative flex items-center justify-between border-b px-4 py-3 bg-background/60">
          <h2 className="text-base font-semibold tracking-tight flex items-center gap-1"><Sparkles className="size-4 text-primary"/> Chatsy</h2>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary hidden sm:inline-flex">DM</span>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
        <div className="flex gap-2 px-4 pt-3">
          <button onClick={()=>setTab('chats')} className={`flex-1 rounded-md px-3 py-2 text-[11px] font-medium transition ${tab==='chats' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/70 hover:bg-muted'}`}>Chats</button>
          <button onClick={()=>setTab('people')} className={`flex-1 rounded-md px-3 py-2 text-[11px] font-medium transition ${tab==='people' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/70 hover:bg-muted'}`}>People</button>
        </div>
        <div className="mx-4 mt-2 flex items-center gap-2 rounded-md border bg-background px-2">
          <Search className="size-4 text-muted-foreground" />
          <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder={tab==='chats' ? 'Search chats':'Search people'} className="h-8 w-full bg-transparent text-sm outline-none" />
        </div>
        <div className="mt-3 flex-1 overflow-y-auto pb-4">
          {tab==='chats' && (
            <ul className="px-2 space-y-1">
              {filteredChannels.length === 0 && <li className="px-2 py-6 text-center text-xs text-muted-foreground">No conversations yet.</li>}
              {filteredChannels.map(ch => {
                const lastMsg = ch.state?.messages?.slice(-1)[0];
                const preview = lastMsg?.text || (lastMsg?.attachments?.length ? 'Attachment' : '');
                const isActive = activeChannel && ch.id === activeChannel.id;
                const count = unread[ch.id] || 0;
                const memberIds = Object.keys(ch.state?.members || {});
                const otherId = memberIds.find(m => m !== user.id);
                const other = users.find(u => u.id === otherId) || {};
                return (
                  <li key={ch.id}>
                    <button onClick={()=>openChannel(ch)} className={`group w-full rounded-lg px-2 py-2 text-left text-sm hover:bg-accent/60 relative ${isActive ? 'bg-accent shadow-inner ring-1 ring-primary/30' : 'bg-transparent'}`}>
                      <div className="flex items-center gap-3">
                        <span className="relative inline-flex size-9 items-center justify-center rounded-full bg-primary/10 ring-1 ring-border/50 text-[11px] font-medium overflow-hidden">
                          {other.imageUrl ? <img src={other.imageUrl} alt="" className="size-full object-cover" /> : (other.username||other.firstName||'?').slice(0,2).toUpperCase()}
                          {online[otherId] && <span className="absolute bottom-0.5 right-0.5 inline-block size-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate font-medium">{other.username || other.firstName || ch.data?.name || 'Conversation'}</span>
                            <span className="shrink-0 text-[10px] text-muted-foreground">{relativeTime(lastMsg?.created_at)}</span>
                          </div>
                          <div className="mt-0.5 flex items-center gap-2">
                            <span className="flex-1 truncate text-[11px] text-muted-foreground">{preview || 'No messages yet'}</span>
                            {count > 0 && <span className="inline-flex min-w-[1.1rem] justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-primary-foreground shadow-sm">{count}</span>}
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {tab==='people' && (
            <ul className="px-2 space-y-1">
              {filteredPeople.length === 0 && (
                <li className="px-2 py-6 text-center text-xs text-muted-foreground">
                  {users.length === 0 ? 'No other users yet. Open another account to start chatting.' : 'No match'}
                </li>
              )}
              {filteredPeople.map(u => (
                <li key={u.id}>
                  <button onClick={()=>startDM(u)} className="group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-accent/60">
                    <span className="relative inline-flex size-9 items-center justify-center rounded-full bg-primary/10 ring-1 ring-border/50 text-[11px] font-medium overflow-hidden">
                      {u.imageUrl ? <img src={u.imageUrl} alt="" className="size-full object-cover" /> : (u.username||u.firstName||'?').slice(0,2).toUpperCase()}
                      {online[u.id] && <span className="absolute bottom-0.5 right-0.5 inline-block size-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />}
                    </span>
                    <span className="flex min-w-0 flex-col pr-2">
                      <span className="truncate font-medium leading-tight group-hover:text-foreground">{u.username || u.firstName || 'User'}</span>
                      <span className="truncate text-[10px] text-muted-foreground leading-tight">{online[u.id] ? 'Online now' : 'Tap to chat'}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Active chat */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border bg-card/70 backdrop-blur relative shadow-sm">
        <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_80%_10%,theme(colors.primary/20),transparent_60%)]" />
        {!activeChannel && (
          <div className="relative m-auto max-w-sm p-10 text-center">
            <UsersIcon className="mx-auto mb-5 size-12 text-primary drop-shadow" />
            <p className="text-balance text-xl font-semibold tracking-tight">Start a conversation</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Pick someone from the sidebar to open a private, real‑time chat.</p>
            <div className="mt-6 text-[11px] font-medium text-muted-foreground/70">Your messages are instant & secure</div>
          </div>
        )}
        {loadingChannel && <div className="flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Opening chat...</div>}
        {activeChannel && (
          <Chat client={client}>
            <Channel channel={activeChannel}>
              <Window>
                <ChannelHeader title={activeChannel.data?.name} className="!border-b !bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50" />
                <MessageList />
                <MessageInput focus />
              </Window>
              <Thread />
            </Channel>
          </Chat>
        )}
      </div>
    </div>
  );
}

export default function DirectChat() {
  const { user, isLoaded } = useUser();
  const token = user?.publicMetadata?.token;

  if (!isLoaded) return <div className="p-6">Loading user...</div>;

  return (
    <>
      <SignedOut>
        <div className="p-10 text-center">
          <p className="mb-4 text-lg font-medium">You must sign in to use chat.</p>
          <SignInButton mode="modal">
            <button className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">Sign In</button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        {!token && <div className="p-6 text-sm text-muted-foreground">Preparing your chat access… (token missing)</div>}
        {token && user && <ChatRuntime user={user} token={token} />}
      </SignedIn>
    </>
  );
}
