import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { users, verificationTokens } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  // Find token in DB
  const tokenArr = await db.select().from(verificationTokens).where(and(eq(verificationTokens.token, token), eq(verificationTokens.type, 'password_reset'))).limit(1);
  const tokenData = tokenArr[0];
  if (!tokenData || tokenData.expires < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user password
  await db.update(users)
    .set({ password: hashedPassword, updatedAt: new Date() })
    .where(eq(users.id, tokenData.userId));

  // Delete token
  await db.delete(verificationTokens).where(eq(verificationTokens.id, tokenData.id));

  return res.status(200).json({ success: true });
} 