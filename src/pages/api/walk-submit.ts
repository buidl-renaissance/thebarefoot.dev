import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { walkSubmissions } from '@/db/schema';

type ResponseData = {
  success: boolean;
  message: string;
  error?: string;
};

interface WalkFormData {
  experience: string;
  interests: string[];
  city: string;
  accountability: boolean;
  subscriptionUuid?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { experience, interests, city, accountability, subscriptionUuid }: WalkFormData = req.body;

    // Validate required fields
    if (!experience || typeof experience !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Experience level is required'
      });
    }

    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({
        success: false,
        message: 'Interests are required'
      });
    }

    if (!city || typeof city !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'City is required'
      });
    }

    // Validate experience values
    const validExperiences = ['none', 'beginner', 'intermediate', 'advanced'];
    if (!validExperiences.includes(experience)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid experience level'
      });
    }

    // Validate interests
    const validInterests = [
      'neighborhood-apps',
      'business-automation', 
      'community-tools',
      'ai-tools',
      'local-meetups'
    ];
    
    const invalidInterests = interests.filter(interest => !validInterests.includes(interest));
    if (invalidInterests.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid interests selected'
      });
    }

    // Insert submission into database
    await db.insert(walkSubmissions).values({
      experience,
      interests: JSON.stringify(interests),
      city,
      accountability: accountability || false,
      subscriptionUuid: subscriptionUuid || null
    });

    return res.status(200).json({
      success: true,
      message: 'Thanks for sharing your journey! We\'ll use this information to send you relevant resources and opportunities.'
    });

  } catch (error) {
    console.error('Walk submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  }
} 