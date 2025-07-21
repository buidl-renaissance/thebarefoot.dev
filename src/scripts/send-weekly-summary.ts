import { sendWeeklySummaryEmail } from '@/resend/weekly-summary';
import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
  try {
    // Get all active subscribers
    const activeSubscribers = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.status, 'active'));

    // Extract all email addresses
    const emailAddresses = activeSubscribers.map(subscriber => subscriber.email);

    if (emailAddresses.length === 0) {
      console.log('No active subscribers found.');
      return;
    }

    const toAddress = 'john@thebarefoot.dev'; // main recipient (yourself)
    const bccAddresses = emailAddresses;

    console.log(`Sending weekly summary to ${bccAddresses.length} subscribers (bcc)...`);
    const result = await sendWeeklySummaryEmail(toAddress, bccAddresses);
      
    if (!result.success) {
      console.error('Failed to send weekly summary:', result.error);
      process.exit(1);
    }

    console.log('Weekly summary emails sent successfully!');
  } catch (error) {
    console.error('Error sending weekly summary emails:', error);
    process.exit(1);
  }
}

main(); 