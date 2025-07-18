import { Resend } from 'resend';
import { env } from '@/config/env';

const resend = new Resend(env.RESEND_API_KEY);

interface WeeklySummaryContent {
  weeklyRecap: string[];
  upcomingEvents: string[];
  featuredEvent?: {
    title: string;
    date: string;
    time: string;
    description: string;
  };
}

export async function sendWeeklySummaryEmail(
  email: string,
  content: WeeklySummaryContent
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'thebarefoot.dev <john@thebarefoot.dev>',
      to: [email],
      subject: "What We Built This Week (and What's Coming Next 🚀)",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="light dark">
          <title>Weekly Update</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa !important; color: #2d3748 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff !important; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%) !important; padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff !important; margin: 0; font-size: 28px; font-weight: 700; line-height: 1.3; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                The Barefoot Dev | Weekly Update
              </h1>
              <p style="color: #ffffff !important; margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">
                For the people. By the people. Built in Detroit.
              </p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px; background-color: #ffffff !important;">
              
              <!-- Greeting -->
              <div style="margin-bottom: 30px;">
                <p style="color: #2d3748 !important; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                  Hey there,
                </p>
                
                <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.7; margin: 0 0 30px 0;">
                  Here's a quick look at what we built together this week and where we're headed:
                </p>
              </div>

              <!-- This Week Section -->
              <div style="margin-bottom: 40px;">
                <h2 style="color: #2d3748 !important; font-size: 20px; margin: 0 0 20px 0;">
                  🔧 This Week in the Lab
                </h2>
                <div style="background: #f7fafc !important; border-radius: 12px; padding: 25px; border-left: 4px solid #ff4f00;">
                  ${content.weeklyRecap.map(item => `
                    <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                      ${item}
                    </p>
                  `).join('')}
                </div>
              </div>

              <!-- Coming Up Section -->
              <div style="margin-bottom: 40px;">
                <h2 style="color: #2d3748 !important; font-size: 20px; margin: 0 0 20px 0;">
                  🗓 What's Coming Up
                </h2>
                <div style="background: #f7fafc !important; border-radius: 12px; padding: 25px; border-left: 4px solid #ff4f00;">
                  ${content.upcomingEvents.map(item => `
                    <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                      ${item}
                    </p>
                  `).join('')}
                </div>
              </div>

              ${content.featuredEvent ? `
                <!-- Featured Event -->
                <div style="margin-bottom: 40px;">
                  <h2 style="color: #2d3748 !important; font-size: 20px; margin: 0 0 20px 0;">
                    📣 Join Us ${content.featuredEvent.date}:
                  </h2>
                  <div style="background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%) !important; border-radius: 12px; padding: 30px; color: #ffffff !important; text-align: center;">
                    <h3 style="color: #ffffff !important; font-size: 24px; margin: 0 0 10px 0;">
                      ${content.featuredEvent.title}
                    </h3>
                    <p style="color: #ffffff !important; font-size: 18px; margin: 0 0 5px 0;">
                      ${content.featuredEvent.time}
                    </p>
                    <p style="color: #ffffff !important; font-size: 16px; margin: 15px 0; line-height: 1.6;">
                      ${content.featuredEvent.description}
                    </p>
                    <div style="margin-top: 20px;">
                      <a href="https://thebarefoot.dev/events" 
                         style="display: inline-block; background: #ffffff !important; color: #ff4f00 !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                        RSVP Now
                      </a>
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- Signature -->
              <div style="border-top: 2px solid #e2e8f0; margin-top: 40px; padding-top: 30px;">
                <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.6; margin: 0;">
                  Talk soon,<br>
                  <span style="color: #ff4f00 !important; font-weight: 600;">John & the Barefoot Dev Team</span><br>
                  <a href="https://thebarefoot.dev" 
                     style="color: #ff4f00 !important; text-decoration: none;">
                    thebarefoot.dev
                  </a>
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #2d3748 !important; color: #a0aec0 !important; padding: 20px 30px; text-align: center; font-size: 12px;">
              <p style="margin: 0; line-height: 1.5;">
                You're receiving this because you're part of the Barefoot Dev community.<br>
                Building meaningful tech for real communities.
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