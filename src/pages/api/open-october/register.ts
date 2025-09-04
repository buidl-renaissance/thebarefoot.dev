import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { openOctoberRegistrations, subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface RegistrationRequest {
  email: string;
  name?: string;
  subscribeToNewsletter?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, name, subscribeToNewsletter }: RegistrationRequest = req.body;

    // Validate required fields
    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid email address is required' 
      });
    }

    // Check if user is already registered for Open October
    const existingRegistration = await db
      .select()
      .from(openOctoberRegistrations)
      .where(eq(openOctoberRegistrations.email, email));

    if (existingRegistration.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered for Open October'
      });
    }

    // Insert registration
    await db.insert(openOctoberRegistrations).values({
      email,
      name: name || null,
    });

    // If user wants to subscribe to newsletter, add to subscriptions table
    if (subscribeToNewsletter) {
      // Check if already subscribed to newsletter
      const existingSubscriber = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.email, email));

      if (existingSubscriber.length === 0) {
        await db.insert(subscriptions).values({
          email,
          source: 'open-october',
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully registered for Open October!'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  }
}
