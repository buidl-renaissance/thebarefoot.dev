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

    const content = {
      weeklyRecap: [
        "We wrapped up another inspiring VibeCoding night—huge thanks to Colin, Ramon, and Mike for sharing their tools, journeys, and AI experiments. Blog recaps are live now.",
        "We kicked off conversations around Public AI in Detroit and what it means to build civic tech rooted in community.",
        "We began onboarding more artists into the Collector Quest ecosystem, prepping new relics and artifacts for next month's reveal."
      ],
      upcomingEvents: [
        "Monday Maker Hours (New Series!) → Starting this week, we're opening up the lab every Monday from 5:30–6:30 PM for co-working, tutorials, and show-and-tells. Whether you're building with AI, designing with Web3, or just want feedback on your project—this time is for you.",
        "We're documenting and releasing our full open-source Media Manager this week. Stay tuned.",
        "We'll be reaching out to potential collaborators for our Public AI Fellowship project—if you're a storyteller, filmmaker, or writer, we want to hear from you."
      ],
      featuredEvent: {
        title: "Monday Maker Hours",
        date: "Monday",
        time: "Every Monday @ 5:30–6:30 PM",
        description: "Detroit minds. Open laptops. Ideas in motion. → Show up. Build with us. Stay barefoot."
      }
    };

    // Send email to each subscriber
    for (const subscriber of activeSubscribers) {
      console.log(`Sending weekly summary to ${subscriber.email}...`);
      const result = await sendWeeklySummaryEmail(subscriber.email, content);
      
      if (!result.success) {
        console.error(`Failed to send to ${subscriber.email}:`, result.error);
      }
    }

    console.log('Weekly summary emails sent successfully!');
  } catch (error) {
    console.error('Error sending weekly summary emails:', error);
    process.exit(1);
  }
}

main(); 