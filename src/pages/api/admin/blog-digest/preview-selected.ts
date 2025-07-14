import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { isNull, desc, eq, and, inArray } from 'drizzle-orm';

// Helper function to format blog post date
function formatBlogDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/New_York'
  });
}

// Helper function to truncate text
function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Helper function to strip HTML tags for excerpt
function stripHtmlTags(html: string) {
  return html.replace(/<[^>]*>/g, '');
}

// Generate email HTML for selected posts
function generateEmailHtml(posts: Array<{
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: string;
  publishedAt: Date;
  featuredImage: string | null;
}>, subject?: string, introduction?: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Blog Digest</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%); padding: 40px 30px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 20px;">📚</div>
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; line-height: 1.3; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            ${subject || '📚 Blog Digest'}
          </h1>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Intro -->
          <div style="margin-bottom: 30px;">
            <p style="color: #2d3748; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0; font-weight: 500;">
              Hey there,
            </p>
            
            ${introduction ? `
              <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin: 0;">
                ${introduction}
              </p>
            ` : `
              <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin: 0 0 25px 0;">
                Here are the latest blog posts from <strong style="color: #ff4f00;">thebarefoot.dev</strong> that we think you'll find interesting.
              </p>
            `}
          </div>
          
          <!-- Blog Posts -->
          <div style="margin-bottom: 40px;">
            ${posts.map(post => `
              <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f7fafc;">
                <div style="margin-bottom: 15px;">
                  <h2 style="color: #2d3748; font-size: 20px; line-height: 1.4; margin: 0 0 10px 0; font-weight: 600;">
                    <a href="https://thebarefoot.dev/blog/${post.slug}" style="color: #ff4f00; text-decoration: none;">
                      ${post.title}
                    </a>
                  </h2>
                  <p style="color: #718096; font-size: 14px; margin: 0; font-weight: 500;">
                    📅 ${formatBlogDate(new Date(post.publishedAt))} • By ${post.author}
                  </p>
                </div>
                
                ${post.excerpt ? `
                  <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                    ${post.excerpt}
                  </p>
                ` : `
                  <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                    ${truncateText(stripHtmlTags(post.content), 200)}
                  </p>
                `}
                
                <a href="https://thebarefoot.dev/blog/${post.slug}" style="
                  display: inline-block;
                  background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%);
                  color: white;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: 600;
                  font-size: 14px;
                  margin-top: 10px;
                  box-shadow: 0 2px 8px rgba(255, 79, 0, 0.3);
                  transition: all 0.3s ease;
                ">
                  Read More →
                </a>
              </div>
            `).join('')}
          </div>
          
          <!-- CTA Section -->
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12px; padding: 30px; border-left: 4px solid #ff4f00;">
              <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; font-weight: 500;">
                Want to see all our posts?
              </p>
              
              <a href="https://thebarefoot.dev/blog" style="
                display: inline-block;
                background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%);
                color: white;
                padding: 16px 32px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                margin: 10px 0;
                box-shadow: 0 4px 12px rgba(255, 79, 0, 0.3);
                transition: all 0.3s ease;
              ">
                📖 View All Posts
              </a>
            </div>
          </div>
          
          <!-- Info Box -->
          <div style="background-color: #f7fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <span style="font-size: 20px; margin-right: 10px;">💡</span>
              <strong style="color: #2d3748; font-size: 14px;">Did you know?</strong>
            </div>
            <p style="color: #4a5568; margin: 0; font-size: 14px; line-height: 1.5;">
              You can always visit our blog directly at <a href="https://thebarefoot.dev/blog" style="color: #ff4f00; text-decoration: none;">thebarefoot.dev/blog</a> to see all our latest posts.
            </p>
          </div>
          
          <!-- Signature -->
          <div style="border-top: 2px solid #e2e8f0; padding-top: 20px;">
            <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 500;">
              Happy reading,<br>
              <span style="color: #ff4f00; font-weight: 600;">The Barefoot Dev</span>
            </p>
          </div>
          
        </div>
        
        <!-- Footer -->
        <div style="background-color: #2d3748; color: #a0aec0; padding: 20px 30px; text-align: center; font-size: 12px;">
          <p style="margin: 0; line-height: 1.5;">
            You're receiving this because you subscribed to updates from 
            <a href="https://thebarefoot.dev" style="color: #ff4f00; text-decoration: none; font-weight: 500;">thebarefoot.dev</a>
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { postIds, subject, introduction } = req.body;

    // Validate required fields
    if (!postIds || !Array.isArray(postIds) || postIds.length === 0) {
      return res.status(400).json({ 
        error: 'Missing required fields: postIds (array of post IDs)' 
      });
    }

    // Get blog posts by IDs
    const posts = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          isNull(blogPosts.deletedAt),
          eq(blogPosts.status, 'published'),
          inArray(blogPosts.id, postIds)
        )
      )
      .orderBy(desc(blogPosts.publishedAt));

    console.log('Found selected posts:', posts.length);

    return res.status(200).json({ 
      success: true, 
      posts: posts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        publishedAt: post.publishedAt,
        featuredImage: post.featuredImage,
      })),
      emailHtml: generateEmailHtml(posts, subject, introduction)
    });

  } catch (error) {
    console.error('Blog digest preview-selected API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
} 