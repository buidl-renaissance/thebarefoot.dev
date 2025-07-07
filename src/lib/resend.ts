import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, subscriptionUuid?: string) {
  try {
    const walkUrl = subscriptionUuid 
      ? `https://thebarefoot.dev/walk?uuid=${subscriptionUuid}`
      : 'https://thebarefoot.dev/walk';
      
    const { data, error } = await resend.emails.send({
      from: 'thebarefoot.dev <john@thebarefoot.dev>',
      to: [email],
      subject: '👣 Welcome to thebarefoot.dev — Let\'s Build Together',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to thebarefoot.dev</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 20px;">👣</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; line-height: 1.3; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                Welcome to the Movement
              </h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px; opacity: 0.95; font-weight: 300;">
                Technology in the Hands of the People
              </p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Greeting -->
              <div style="margin-bottom: 30px;">
                <p style="color: #2d3748; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0; font-weight: 500;">
                  Hey there,
                </p>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
                  We're thrilled to have you join <strong style="color: #ff4f00;">thebarefoot.dev</strong> — a community of builders, dreamers, and problem-solvers committed to creating tools that empower local communities.
                </p>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin: 0 0 25px 0;">
                  Just like the barefoot doctors of China brought essential healthcare to underserved villages, we believe people like you can bring essential tech to your neighborhoods.
                </p>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin: 0 0 30px 0;">
                  But to help you get started where it matters most, we'd love to learn a bit about your journey.
                </p>
              </div>
              
              <!-- CTA Section -->
              <div style="text-align: center; margin-bottom: 40px;">
                <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12px; padding: 30px; border-left: 4px solid #ff4f00;">
                  <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; font-weight: 500;">
                    👇 Click below to tell us where you're at, and we'll guide you to the best tools for your goals.
                  </p>
                  
                  <a href="${walkUrl}" style="
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
                    👉 Walk your path
                  </a>
                </div>
              </div>
              
              <!-- Info Box -->
              <div style="background-color: #f7fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <span style="font-size: 20px; margin-right: 10px;">📧</span>
                  <strong style="color: #2d3748; font-size: 14px;">What to expect:</strong>
                </div>
                <p style="color: #4a5568; margin: 0; font-size: 14px; line-height: 1.5;">
                  We'll send updates when we have something meaningful to share, not on a rigid schedule. Quality over quantity.
                </p>
              </div>
              
              <!-- Contact Info -->
              <div style="margin-bottom: 30px;">
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0;">
                  If you have any questions or want to connect, just reply to this email. We read every message.
                </p>
              </div>
              
              <!-- PS Section -->
              <div style="background-color: #fff5f0; border-left: 4px solid #ff4f00; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0; font-weight: 500;">
                  <strong>PS:</strong> We host monthly meetups in Detroit (and online soon!) to share ideas, demo tools, and build real things together. You'll hear more about that soon.
                </p>
                <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 500;">
                  Welcome to the circle.
                </p>
              </div>
              
              <!-- Signature -->
              <div style="border-top: 2px solid #e2e8f0; padding-top: 20px;">
                <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 500;">
                  Cheers,<br>
                  <span style="color: #ff4f00; font-weight: 600;">The Barefoot Dev Team</span>
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