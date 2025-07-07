import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { events } from '@/db/schema';
import { eq, isNull } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allEvents = await db.select().from(events).where(isNull(events.deletedAt));
      res.status(200).json(allEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, slug, description, startDatetime, endDatetime, location, type, imageUrl } = req.body;
      
      // Convert EST datetime strings to UTC for storage
      const convertToUTC = (estDateTime: string) => {
        // Create a date object from the EST datetime string
        const [datePart, timePart] = estDateTime.split('T');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);
        
        // Create date in EST timezone
        const estDate = new Date(year, month - 1, day, hours, minutes);
        
        // Convert to UTC for storage
        const utcDate = new Date(estDate.toLocaleString("en-US", {timeZone: "America/New_York"}));
        return utcDate;
      };
      
      const newEvent = await db.insert(events).values({
        title,
        slug,
        description,
        startDatetime: convertToUTC(startDatetime),
        endDatetime: convertToUTC(endDatetime),
        location,
        type,
        imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();
      
      res.status(201).json(newEvent[0]);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, title, slug, description, startDatetime, endDatetime, location, type, imageUrl } = req.body;
      
      // Convert EST datetime strings to UTC for storage
      const convertToUTC = (estDateTime: string) => {
        // Create a date object from the EST datetime string
        const [datePart, timePart] = estDateTime.split('T');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);
        
        // Create date in EST timezone
        const estDate = new Date(year, month - 1, day, hours, minutes);
        
        // Convert to UTC for storage
        const utcDate = new Date(estDate.toLocaleString("en-US", {timeZone: "America/New_York"}));
        return utcDate;
      };
      
      const updatedEvent = await db.update(events)
        .set({
          title,
          slug,
          description,
          startDatetime: convertToUTC(startDatetime),
          endDatetime: convertToUTC(endDatetime),
          location,
          type,
          imageUrl,
          updatedAt: new Date(),
        })
        .where(eq(events.id, id))
        .returning();
      
      res.status(200).json(updatedEvent[0]);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: 'Failed to update event' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      await db.update(events)
        .set({ deletedAt: new Date() })
        .where(eq(events.id, parseInt(id as string)));
      
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: 'Failed to delete event' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
} 