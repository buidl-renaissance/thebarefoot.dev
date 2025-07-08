#!/usr/bin/env node
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log('process.env.RESEND_API_KEY: ', process.env.RESEND_API_KEY);

import { sendWelcomeEmail } from '../src/resend/welcome';

// Parse command line arguments
const args = process.argv.slice(2);
const email = args[0];
const uuid = args[1];

// Check required environment variables
if (!process.env.RESEND_API_KEY) {
  console.error('❌ Error: RESEND_API_KEY environment variable is required');
  console.log('\nMake sure your .env.local file contains:');
  console.log('RESEND_API_KEY=your_resend_api_key_here');
  process.exit(1);
}

if (!process.env.TURSO_DATABASE_URL) {
  console.error('❌ Error: TURSO_DATABASE_URL environment variable is required');
  console.log('\nMake sure your .env.local file contains:');
  console.log('TURSO_DATABASE_URL=your_turso_database_url_here');
  process.exit(1);
}

if (!email) {
  console.error('❌ Error: Email address is required');
  console.log('\nUsage: yarn test:email <email> [uuid]');
  console.log('\nExamples:');
  console.log('  yarn test:email test@example.com');
  console.log('  yarn test:email test@example.com 123e4567-e89b-12d3-a456-426614174000');
  process.exit(1);
}

async function sendTestEmail() {
  try {
    console.log('📧 Sending test welcome email...');
    console.log(`   To: ${email}`);
    if (uuid) {
      console.log(`   UUID: ${uuid}`);
    }
    
    const result = await sendWelcomeEmail(email, uuid);
    
    if (result.success) {
      console.log('✅ Test email sent successfully!');
      console.log(`   Email ID: ${result.data?.id || 'N/A'}`);
    } else {
      console.error('❌ Failed to send test email:');
      console.error(result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error sending test email:', error);
    process.exit(1);
  }
}

sendTestEmail(); 