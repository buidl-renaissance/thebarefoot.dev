import { Resend } from 'resend';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { isNull, desc, eq, and } from 'drizzle-orm';
import { format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to format event date
function formatEventDate(date: Date) {
  return format(new Date(date), 'EEEE, MMMM d, yyyy');
}

// Helper function to format event time
function formatEventTime(date: Date) {
  return format(new Date(date), 'h:mm a');
}

// Helper function to format blog post date
function formatBlogDate(date: Date) {
  return format(new Date(date), 'MMMM d, yyyy');
}

// Helper function to get recent blog posts
async function getRecentBlogPosts(limit = 3) {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          isNull(blogPosts.deletedAt),
          eq(blogPosts.status, 'published')
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);

    return posts;
  } catch (error) {
    console.error('Error fetching recent blog posts:', error);
    return [];
  }
}

export async function sendEventRsvpEmail(
  email: string,
  name: string,
  eventTitle: string,
  eventSlug: string,
  eventStartDatetime: Date,
  eventEndDatetime: Date,
  eventLocation: string
) {
  try {
    const recentPosts = await getRecentBlogPosts();

    const { data, error } = await resend.emails.send({
      from: 'thebarefoot.dev <john@thebarefoot.dev>',
      to: [email],
      subject: `🎉 RSVP Confirmed: ${eventTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="light dark">
          <title>RSVP Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa !important; color: #2d3748 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff !important; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%) !important; padding: 40px 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
              <h1 style="color: #ffffff !important; margin: 0; font-size: 28px; font-weight: 700; line-height: 1.3; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                You're Going!
              </h1>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px; background-color: #ffffff !important;">
              
              <!-- Greeting -->
              <div style="margin-bottom: 30px;">
                <p style="color: #2d3748 !important; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0; font-weight: 500;">
                  Hey ${name},
                </p>
                
                <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
                  Thanks for RSVPing to <strong style="color: #ff4f00 !important;">${eventTitle}</strong>! We're excited to have you join us.
                </p>
              </div>
              
              <!-- Event Details -->
              <div style="background: #f7fafc !important; border-radius: 12px; padding: 30px; margin-bottom: 40px; border-left: 4px solid #ff4f00;">
                <h2 style="color: #2d3748 !important; margin: 0 0 20px 0; font-size: 20px;">Event Details</h2>
                
                <div style="margin-bottom: 15px;">
                  <p style="color: #2d3748 !important; margin: 0 0 5px 0; font-size: 16px;">
                    <strong>📅 Date:</strong> ${formatEventDate(eventStartDatetime)}
                  </p>
                  <p style="color: #2d3748 !important; margin: 0 0 5px 0; font-size: 16px;">
                    <strong>⏰ Time:</strong> ${formatEventTime(eventStartDatetime)} - ${formatEventTime(eventEndDatetime)}
                  </p>
                  <p style="color: #2d3748 !important; margin: 0; font-size: 16px;">
                    <strong>📍 Location:</strong> ${eventLocation}
                  </p>
                </div>
                
                <a href="https://thebarefoot.dev/events/${eventSlug}" 
                   style="display: inline-block; background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%) !important; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 15px; box-shadow: 0 2px 8px rgba(255, 79, 0, 0.3);">
                  View Event Details
                </a>
              </div>

              <!-- Community & Tools Section -->
              <div style="margin-bottom: 40px;">
                <div style="background: #f7fafc !important; border-radius: 12px; padding: 30px; margin-bottom: 20px; border-left: 4px solid #ff4f00;">
                  <h2 style="color: #2d3748 !important; margin: 0 0 15px 0; font-size: 20px;">🛠️ Get Started Building</h2>
                  <p style="color: #2d3748 !important; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">
                    Whether you're a seasoned developer or just starting out, we've curated a list of modern tools to help you build your next project. From no-code solutions to AI-assisted development, find the right tool for your journey in our
                    <a href="https://www.thebarefoot.dev/blog/barefoot-dev-toolkit-find-the-right-tool-for-your-next-build" 
                       style="color: #ff4f00 !important; text-decoration: none; font-weight: 500;">
                      Barefoot Dev Toolkit guide
                    </a>.
                  </p>
                </div>

                <div style="background: #f7fafc !important; border-radius: 12px; padding: 30px; border-left: 4px solid #ff4f00;">
                  <h2 style="color: #2d3748 !important; margin: 0 0 15px 0; font-size: 20px;">🤝 Building Community Through Code</h2>
                  <p style="color: #2d3748 !important; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">
                    Detroit's tech renaissance is about more than just writing code—it's about building real connections and solving problems that matter to our neighbors. Learn how we're creating authentic connections and driving real-world impact in our
                    <a href="https://www.thebarefoot.dev/blog/building-community-through-code-detroits-tech-renaissance" 
                       style="color: #ff4f00 !important; text-decoration: none; font-weight: 500;">
                      community building guide
                    </a>.
                  </p>
                </div>
              </div>

              ${recentPosts.length > 0 ? `
                <!-- Recent Blog Posts -->
                <div style="margin-bottom: 40px;">
                  <h2 style="color: #2d3748 !important; margin: 0 0 20px 0; font-size: 20px;">Recent Blog Posts</h2>
                  
                  ${recentPosts.map(post => `
                    <div style="margin-bottom: 20px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f7fafc !important;">
                      <h3 style="color: #2d3748 !important; font-size: 18px; margin: 0 0 10px 0;">
                        <a href="https://thebarefoot.dev/blog/${post.slug}" 
                           style="color: #ff4f00 !important; text-decoration: none;">
                          ${post.title}
                        </a>
                      </h3>
                      <p style="color: #718096 !important; font-size: 14px; margin: 0 0 10px 0;">
                        📅 ${formatBlogDate(new Date(post.publishedAt))}
                      </p>
                      ${post.excerpt ? `
                        <p style="color: #2d3748 !important; font-size: 14px; margin: 0;">
                          ${post.excerpt}
                        </p>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              
              <!-- Info Box -->
              <div style="background: #f7fafc !important; border-radius: 8px; padding: 20px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <span style="font-size: 20px; margin-right: 10px;">💡</span>
                  <strong style="color: #2d3748 !important; font-size: 14px;">Quick Note</strong>
                </div>
                <p style="color: #2d3748 !important; margin: 0; font-size: 14px; line-height: 1.5;">
                  Add this event to your calendar and feel free to invite friends who might be interested!
                </p>
              </div>
              
              <!-- Signature -->
              <div style="border-top: 2px solid #e2e8f0; padding-top: 20px;">
                <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 500;">
                  See you soon!<br>
                  <span style="color: #ff4f00 !important; font-weight: 600;">The Barefoot Dev</span>
                </p>
              </div>
              
            </div>
            
            <!-- Footer -->
            <div style="background-color: #2d3748 !important; color: #a0aec0 !important; padding: 20px 30px; text-align: center; font-size: 12px;">
              <p style="margin: 0; line-height: 1.5;">
                You're receiving this because you RSVP'd to an event on
                <a href="https://thebarefoot.dev" 
                   style="color: #ff4f00 !important; text-decoration: none; font-weight: 500;">
                  thebarefoot.dev
                </a>
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
} 