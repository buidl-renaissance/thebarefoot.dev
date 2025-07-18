const fs = require('fs').promises;
const path = require('path');

async function main() {
  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');

  // Create .env.example if it doesn't exist
  try {
    await fs.access(envExamplePath);
  } catch {
    const exampleContent = `# Environment variables
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Database
DATABASE_URL=file:./dev.db

# Email (Resend)
RESEND_API_KEY=your-resend-api-key

# OpenAI (for blog generation)
OPENAI_API_KEY=your-openai-api-key
`;

    await fs.writeFile(envExamplePath, exampleContent);
    console.log('Created .env.example file');
  }

  // Create .env if it doesn't exist
  try {
    await fs.access(envPath);
  } catch {
    await fs.copyFile(envExamplePath, envPath);
    console.log('Created .env file from .env.example');
  }

  console.log('Please update your .env file with your actual API keys and settings.');
  console.log('You can get a Resend API key from https://resend.com');
}

main().catch(console.error); 