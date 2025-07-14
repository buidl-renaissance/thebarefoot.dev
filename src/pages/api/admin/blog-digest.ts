import { NextApiRequest, NextApiResponse } from 'next';
import { sendBlogDigestEmail } from '@/resend/blog-digest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, postIds, subject, introduction } = req.body;

    // Validate required fields
    if (!email || !postIds || !Array.isArray(postIds) || postIds.length === 0) {
      return res.status(400).json({ 
        error: 'Missing required fields: email and postIds (array of post IDs)' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Send the blog digest email with specific post IDs
    const result = await sendBlogDigestEmail(email, postIds, subject, introduction);

    if (!result.success) {
      return res.status(500).json({ 
        error: 'Failed to send email', 
        details: result.error 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Blog digest email sent successfully' 
    });

  } catch (error) {
    console.error('Blog digest API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
} 