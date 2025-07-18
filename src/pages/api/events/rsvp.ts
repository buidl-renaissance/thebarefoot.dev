import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { rsvps, events } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { sendEventRsvpEmail } from '@/resend/event-rsvp';

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

    // Get event details
    const eventResults = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId));

    const event = eventResults[0];
    if (!event || !event.title || !event.slug || !event.location) {
      return res.status(404).json({ error: 'Event not found or missing required fields' });
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

    // Send confirmation email
    try {
      await sendEventRsvpEmail(
        email,
        name,
        event.title,
        event.slug,
        event.startDatetime,
        event.endDatetime,
        event.location
      );
    } catch (emailError) {
      console.error('Failed to send RSVP confirmation email:', emailError);
      // Don't fail the RSVP if email fails
    }

    res.status(201).json(newRsvp[0]);
  } catch (error) {
    console.error('Error creating RSVP:', error);
    res.status(500).json({ error: 'Failed to create RSVP' });
  }
} 