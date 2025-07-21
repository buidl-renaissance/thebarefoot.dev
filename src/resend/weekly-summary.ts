import { Resend } from 'resend';
import { env } from '@/config/env';

const resend = new Resend(env.RESEND_API_KEY);

// interface WeeklySummaryContent {
//   weeklyRecap: string[];
//   upcomingEvents: string[];
//   featuredEvent?: {
//     title: string;
//     date: string;
//     time: string;
//     description: string;
//   };
// }

export async function sendWeeklySummaryEmail(
  email: string,
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'thebarefoot.dev <john@thebarefoot.dev>',
      to: [email],
      subject: "The First Week of the Barefoot Blog ✍️🌱",
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
                The Barefoot Dev | Week One Recap
              </h1>
              <p style="color: #ffffff !important; margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">
                Building in public. Connecting through code. Rooted in Detroit.
              </p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px; background-color: #ffffff !important;">
              
              <!-- Greeting -->
              <div style="margin-bottom: 30px;">
                <p style="color: #2d3748 !important; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                  Hey friends,
                </p>
                
                <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.7; margin: 0 0 30px 0;">
                  Last week marked something special—it was the first week we started publishing the story as it unfolds. No big launches, just a commitment to documenting what's happening in real time, from the people building it.
                </p>
              </div>

              <!-- What Happened Section -->
              <div style="margin-bottom: 40px;">
                <h2 style="color: #2d3748 !important; font-size: 20px; margin: 0 0 20px 0;">
                  📓 What Happened
                </h2>
                <div style="background: #f7fafc !important; border-radius: 12px; padding: 25px; border-left: 4px solid #ff4f00;">
                  <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                    We kicked off with the VibeCoding Meetup, where speakers shared everything from internal AI tooling to startup journeys and technical experiments. The talks weren't just informative—they were deeply aligned with what this space is about: real people building real things. <a href="https://www.thebarefoot.dev/blog/vibecoding-royal-oak-recap-ai-tools-real-projects-and-what-we-re-building-next" style="color: #ff4f00 !important; text-decoration: none;">Read the full recap →</a>
                  </p>
                  <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                    On Wednesday, we attended a packed Dev meetup focused on APIs, gateways, and Chainlink Functions. More than just code talk, it was a bridge between ecosystems—connecting builders across disciplines. <a href="https://www.thebarefoot.dev/blog/building-bridges-apis-ai-and-chainlink-at-the-july-detroit-software-developers-meetup" style="color: #ff4f00 !important; text-decoration: none;">Read the full recap →</a>
                  </p>
                  <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                    And then there was Rochelle—an unexpected but powerful side quest. She's creating SOLAS COPIA Temple of LIGHT, a nonprofit rooted in sound healing, storytelling, and spiritual care. Her journey using technology as a vehicle for healing and sovereignty embodies everything we mean when we talk about building for people, not platforms. <a href="https://www.thebarefoot.dev/blog/from-spirit-to-stack-how-rochelle-is-building-a-healing-platform-with-ai-and-web3" style="color: #ff4f00 !important; text-decoration: none;">Read her story →</a>
                  </p>
                </div>
              </div>

              <!-- This Week Section -->
              <div style="margin-bottom: 40px;">
                <h2 style="color: #2d3748 !important; font-size: 20px; margin: 0 0 20px 0;">
                  🌱 This Week
                </h2>
                <div style="background: #f7fafc !important; border-radius: 12px; padding: 25px; border-left: 4px solid #ff4f00;">
                  <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                    There aren't many big events on the calendar—just an intimate gathering tonight. It might be small, but that's the point. We're nurturing something here. These little pockets of people, sharing and learning together, are the foundation.
                  </p>
                  <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                    Click RSVP below to join the new weekly series where we can gather, co-work, and share ideas. First one's tonight. Bring your curiosity.
                  </p>
                </div>
              </div>

              <!-- Featured Event -->
              <div style="margin-bottom: 40px;">
                <div style="background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%) !important; border-radius: 12px; padding: 30px; color: #ffffff !important; text-align: center;">
                  <h3 style="color: #ffffff !important; font-size: 24px; margin: 0 0 10px 0;">
                    🛠️ Walking the Path of TheBarefoot.Dev
                  </h3>
                  <p style="color: #ffffff !important; font-size: 18px; margin: 0 0 5px 0;">
                    Mondays @ 5:30–6:30 PM
                  </p>
                  <p style="color: #ffffff !important; font-size: 16px; margin: 15px 0; line-height: 1.6;">
                    A space to build, share, and grow—together.<br>
                    → Just show up. We'll figure it out together.
                  </p>
                  <div style="margin-top: 20px;">
                    <a href="https://thebarefoot.dev/events" 
                       style="display: inline-block; background: #ffffff !important; color: #ff4f00 !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      RSVP Now
                    </a>
                  </div>
                </div>
              </div>

              <!-- Signature -->
              <div style="border-top: 2px solid #e2e8f0; margin-top: 40px; padding-top: 30px;">
                <p style="color: #2d3748 !important; font-size: 16px; line-height: 1.6; margin: 0;">
                  Thanks for reading. If you're building something, learning something, or just curious—come through. That's how this whole thing grows.<br><br>
                  In motion,<br>
                  <span style="color: #ff4f00 !important; font-weight: 600;">The Barefoot Dev</span><br>
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