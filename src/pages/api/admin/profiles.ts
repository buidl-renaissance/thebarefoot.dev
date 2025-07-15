import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db';
import { profiles } from '../../../db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allProfiles = await db.select().from(profiles).orderBy(profiles.createdAt);
      res.status(200).json(allProfiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      res.status(500).json({ error: 'Failed to fetch profiles' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, linkedin, bio, experience } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const newProfile = await db.insert(profiles).values({
        name,
        email: email || null,
        linkedin: linkedin || null,
        bio: bio || null,
        experience: experience ? JSON.stringify(experience) : null,
        updatedAt: new Date(),
      }).returning();

      res.status(201).json(newProfile[0]);
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).json({ error: 'Failed to create profile' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 