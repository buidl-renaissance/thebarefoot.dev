import { sendWeeklySummaryEmail } from '@/resend/weekly-summary';

async function main() {
  try {
    const toAddress = 'john@dpop.tech';
    const bccAddresses = ['test@example.com']; // Add test BCC addresses as needed

    console.log('Sending test weekly summary email...');
    const result = await sendWeeklySummaryEmail(toAddress, bccAddresses);
    
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