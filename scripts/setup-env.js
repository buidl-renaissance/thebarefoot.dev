#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🚀 Setting up environment for The Barefoot Developer');
console.log('');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local already exists');
  console.log('📝 If you need to update your credentials, edit the file manually');
  process.exit(0);
}

// Create .env.local template
const envTemplate = `# Database Configuration
# Replace these with your actual Turso database credentials
TURSO_DATABASE_URL=your_turso_database_url_here
TURSO_DATABASE_AUTH_TOKEN=your_turso_auth_token_here

# OpenAI Configuration (for blog generation)
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Example format:
# TURSO_DATABASE_URL=libsql://your-database-name.turso.io
# TURSO_DATABASE_AUTH_TOKEN=your_auth_token_from_turso_dashboard
# OPENAI_API_KEY=sk-your_openai_api_key_here
`;

try {
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env.local file');
  console.log('');
  console.log('📝 Next steps:');
  console.log('   1. Edit .env.local with your credentials:');
  console.log('      - Turso database credentials');
  console.log('      - OpenAI API key (for blog generation)');
  console.log('   2. Run "yarn db:push" to apply database schema');
  console.log('   3. Run "yarn db:seed" to add sample blog posts');
  console.log('   4. Run "yarn dev" to start the development server');
  console.log('');
  console.log('🔗 Get your credentials at:');
  console.log('   - Turso: https://dashboard.turso.tech/');
  console.log('   - OpenAI: https://platform.openai.com/api-keys');
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
  process.exit(1);
} 