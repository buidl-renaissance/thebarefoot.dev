import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { rsvps } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { eventId, name, email } = req.body;

    // Validate required fields
    if (!eventId || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user has already RSVP'd
    const existingRsvp = await db
      .select()
      .from(rsvps)
      .where(
        and(
          eq(rsvps.eventId, eventId),
          eq(rsvps.email, email)
        )
      );

    if (existingRsvp.length > 0) {
      return res.status(400).json({ error: 'You have already RSVP\'d for this event' });
    }

    // Create new RSVP
    const newRsvp = await db.insert(rsvps).values({
      eventId,
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    res.status(201).json(newRsvp[0]);
  } catch (error) {
    console.error('Error creating RSVP:', error);
    res.status(500).json({ error: 'Failed to create RSVP' });
  }
} 