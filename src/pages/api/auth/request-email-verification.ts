import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { users, verificationTokens } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sendVerificationEmail } from '@/resend'; // Adjust import if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const userArr = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = userArr[0];
  if (!user) {
    // Don't reveal if user exists
    return res.status(200).json({ success: true });
  }

  // Generate token
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
  await db.insert(verificationTokens).values({
    userId: user.id,
    token,
    type: 'email',
    expires,
    createdAt: new Date(),
  });

  // TODO: Send email with verification link (placeholder)
  await sendVerificationEmail(email, token);

  return res.status(200).json({ success: true });
} 