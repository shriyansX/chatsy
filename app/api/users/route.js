import { clerkClient, auth } from '@clerk/nextjs/server';
import { StreamChat } from 'stream-chat';

const STREAM_KEY = 'pq7a699xvrx2';
const STREAM_SECRET = '6z8wkzexdsxf7yw588d4dyznnj88q6yw4ybcagq8h5cq97e8hwj5p9jh7exdv3nv'; // consider moving to env

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  try {
    // Fetch Clerk users first
    const clerkUsers = await clerkClient.users.getUserList({ limit: 50 });
    let sanitized = clerkUsers.data.map(u => ({
      id: u.id,
      username: u.username,
      firstName: u.firstName,
      lastName: u.lastName,
      imageUrl: u.imageUrl,
      token: u.publicMetadata?.token || null,
    }));

    // If only current user present, try Stream for any previously created users (e.g., test accounts) to augment
    if (sanitized.filter(u => u.id !== userId).length === 0) {
      try {
        const serverClient = StreamChat.getInstance(STREAM_KEY, STREAM_SECRET);
        const res = await serverClient.queryUsers({ id: { $ne: userId } }, { last_active: -1 });
        if (res.users?.length) {
          const extra = res.users.map(u => ({
            id: u.id,
            username: u.name || u.id,
            firstName: u.name,
            lastName: '',
            imageUrl: u.image,
            token: null,
          }));
          // Avoid duplicates
          const existing = new Set(sanitized.map(s => s.id));
          sanitized = [...sanitized, ...extra.filter(e => !existing.has(e.id))];
        }
      } catch (e) {
        console.warn('Stream augmentation failed', e);
      }
    }
    return Response.json({ users: sanitized });
  } catch (e) {
    console.error('Failed to list users', e);
    return new Response('Error fetching users', { status: 500 });
  }
}
