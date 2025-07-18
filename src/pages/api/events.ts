import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { events } from '@/db/schema';
import { isNull, and, gte } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Only fetch upcoming events (end date >= current time)
    const now = new Date();
    const allEvents = await db
      .select()
      .from(events)
      .where(
        and(
          isNull(events.deletedAt),
          gte(events.endDatetime, now)
        )
      )
      .orderBy(events.startDatetime);

    res.status(200).json(allEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
} 