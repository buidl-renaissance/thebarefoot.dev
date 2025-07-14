import { sendBlogDigestEmail } from '../src/resend/blog-digest';

async function testBlogDigest() {
  try {
    // Set up date range for the last 7 days
    
    console.log('Sending blog digest email...');
    
    const result = await sendBlogDigestEmail(
      'test@example.com', // Replace with actual email
      [1, 2, 3],
      '📚 Your Weekly Blog Digest'
    );
    
    if (result.success) {
      console.log('✅ Blog digest email sent successfully!');
      console.log('Result:', result.data);
    } else {
      console.error('❌ Failed to send blog digest email');
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('❌ Error in test script:', error);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testBlogDigest();
}

export { testBlogDigest }; 