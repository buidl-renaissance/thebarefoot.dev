import { sendWeeklySummaryEmail } from '@/resend/weekly-summary';

async function main() {
  try {
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

    console.log('Sending test weekly summary email...');
    const result = await sendWeeklySummaryEmail('john@dpop.tech', content);
    
    if (result.success) {
      console.log('Test email sent successfully!');
    } else {
      console.error('Failed to send test email:', result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error sending test email:', error);
    process.exit(1);
  }
}

main(); 