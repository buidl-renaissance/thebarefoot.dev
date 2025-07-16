export * from './welcome';
export * from './blog-digest';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `https://thebarefoot.dev/reset-password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: 'thebarefoot.dev <john@thebarefoot.dev>',
    to: [email],
    subject: 'Reset your password — thebarefoot.dev',
    html: `
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%); padding: 32px 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 24px;">Reset your password</h1>
        </div>
        <div style="padding: 32px 24px;">
          <p style="font-size: 16px; color: #2d3748;">We received a request to reset your password for <strong>thebarefoot.dev</strong>.</p>
          <p style="font-size: 16px; color: #2d3748;">Click the button below to set a new password. If you didn't request this, you can safely ignore this email.</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%); color: #fff; padding: 16px 32px; border-radius: 6px; font-weight: 600; font-size: 16px; text-decoration: none;">Reset Password</a>
          </div>
          <p style="font-size: 14px; color: #718096;">This link will expire in 30 minutes.</p>
        </div>
        <div style="background: #f7fafc; color: #718096; padding: 16px 24px; border-radius: 0 0 8px 8px; font-size: 13px; text-align: center;">If you have any questions, just reply to this email.</div>
      </div>
    `,
  });
  if (error) {
    console.error('Resend error:', error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `https://thebarefoot.dev/verify-email?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: 'thebarefoot.dev <john@thebarefoot.dev>',
    to: [email],
    subject: 'Verify your email — thebarefoot.dev',
    html: `
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%); padding: 32px 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 24px;">Verify your email</h1>
        </div>
        <div style="padding: 32px 24px;">
          <p style="font-size: 16px; color: #2d3748;">Thanks for signing up for <strong>thebarefoot.dev</strong>!</p>
          <p style="font-size: 16px; color: #2d3748;">Click the button below to verify your email address and activate your account.</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${verifyUrl}" style="display: inline-block; background: linear-gradient(135deg, #ff4f00 0%, #ff6b35 100%); color: #fff; padding: 16px 32px; border-radius: 6px; font-weight: 600; font-size: 16px; text-decoration: none;">Verify Email</a>
          </div>
          <p style="font-size: 14px; color: #718096;">This link will expire in 24 hours.</p>
        </div>
        <div style="background: #f7fafc; color: #718096; padding: 16px 24px; border-radius: 0 0 8px 8px; font-size: 13px; text-align: center;">If you have any questions, just reply to this email.</div>
      </div>
    `,
  });
  if (error) {
    console.error('Resend error:', error);
    return { success: false, error };
  }
  return { success: true, data };
}