import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../db';
import { profiles } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const profileId = parseInt(id as string, 10);

  if (isNaN(profileId)) {
    return res.status(400).json({ error: 'Invalid profile ID' });
  }

  if (req.method === 'GET') {
    try {
      const profile = await db.select().from(profiles).where(eq(profiles.id, profileId));
      
      if (profile.length === 0) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.status(200).json(profile[0]);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, email, linkedin, bio, experience } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const updatedProfile = await db.update(profiles)
        .set({
          name,
          email: email || null,
          linkedin: linkedin || null,
          bio: bio || null,
          experience: experience ? JSON.stringify(experience) : null,
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, profileId))
        .returning();

      if (updatedProfile.length === 0) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.status(200).json(updatedProfile[0]);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedProfile = await db.delete(profiles)
        .where(eq(profiles.id, profileId))
        .returning();

      if (deletedProfile.length === 0) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting profile:', error);
      res.status(500).json({ error: 'Failed to delete profile' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 