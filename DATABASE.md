# Database Setup & Documentation

## Overview

The Barefoot Developer Group uses **Turso** (LibSQL) as our database with **Drizzle ORM** for type-safe database operations. This setup provides a modern, serverless SQLite database that's perfect for our community-driven project.

## Technology Stack

- **Database**: Turso (LibSQL) - Serverless SQLite
- **ORM**: Drizzle ORM - Type-safe database operations
- **Migration Tool**: Drizzle Kit - Schema management and migrations

## Database Schema

### Tables

#### `subscriptions`
Stores email subscriptions from the website and events.

```sql
- id (INTEGER PRIMARY KEY AUTOINCREMENT)
- email (TEXT NOT NULL UNIQUE)
- created_at (TIMESTAMP NOT NULL)
- source (TEXT NOT NULL DEFAULT 'website')
- status (TEXT NOT NULL DEFAULT 'active')
```

#### `members`
Community member profiles and information.

```sql
- id (INTEGER PRIMARY KEY AUTOINCREMENT)
- email (TEXT NOT NULL UNIQUE)
- name (TEXT)
- role (TEXT) -- developer, organizer, artist, designer, etc.
- location (TEXT) -- Detroit, etc.
- bio (TEXT)
- created_at (TIMESTAMP NOT NULL)
- updated_at (TIMESTAMP NOT NULL)
```

#### `projects`
Community projects and initiatives.

```sql
- id (INTEGER PRIMARY KEY AUTOINCREMENT)
- name (TEXT NOT NULL)
- description (TEXT)
- status (TEXT NOT NULL DEFAULT 'active')
- github_url (TEXT)
- live_url (TEXT)
- tags (TEXT) -- JSON array of tags
- created_at (TIMESTAMP NOT NULL)
- updated_at (TIMESTAMP NOT NULL)
```

#### `events`
Workshops, hacknights, and community events.

```sql
- id (INTEGER PRIMARY KEY AUTOINCREMENT)
- title (TEXT NOT NULL)
- description (TEXT)
- date (TIMESTAMP NOT NULL)
- location (TEXT)
- type (TEXT NOT NULL) -- workshop, hacknight, meetup, etc.
- max_participants (INTEGER)
- created_at (TIMESTAMP NOT NULL)
- updated_at (TIMESTAMP NOT NULL)
```

## Environment Variables

Create a `.env.local` file with your Turso database credentials:

```env
DATABASE_URL=libsql://your-database-url.turso.io
DATABASE_AUTH_TOKEN=your-auth-token
```

## Database Commands

### Generate Migrations
```bash
yarn db:generate
```
Creates migration files based on schema changes.

### Push Schema Changes
```bash
yarn db:push
```
Pushes schema changes directly to the database (development).

### Run Migrations
```bash
yarn db:migrate
```
Runs pending migrations on the database.

### Open Database Studio
```bash
yarn db:studio
```
Opens Drizzle Studio for database inspection and management.

## Database Connection

The database connection is established in `src/db/index.ts`:

```typescript
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);
```

## API Integration

### Email Subscriptions
The `/api/subscribe` endpoint uses the database to:
- Validate email addresses
- Check for existing subscriptions
- Store new subscriptions with metadata
- Prevent duplicate entries

### Usage Example
```typescript
import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Insert new subscription
await db.insert(subscriptions).values({
  email: 'user@example.com',
  source: 'website',
  status: 'active'
});

// Query existing subscriptions
const existing = await db
  .select()
  .from(subscriptions)
  .where(eq(subscriptions.email, 'user@example.com'));
```

## Development Workflow

1. **Schema Changes**: Modify `src/db/schema.ts`
2. **Generate Migration**: `yarn db:generate`
3. **Review Migration**: Check generated files in `./drizzle`
4. **Apply Changes**: `yarn db:push` (dev) or `yarn db:migrate` (prod)
5. **Test**: Use `yarn db:studio` to inspect data

## Production Considerations

- **Backups**: Turso provides automatic backups
- **Scaling**: LibSQL scales automatically with usage
- **Security**: All connections use TLS encryption
- **Monitoring**: Use Turso dashboard for performance metrics

## Community Data Privacy

- Email addresses are stored securely with proper validation
- Subscription status can be managed (active/unsubscribed)
- Source tracking helps understand community growth
- No sensitive personal data beyond email addresses

## Troubleshooting

### Common Issues

1. **Connection Errors**: Verify `DATABASE_URL` and `DATABASE_AUTH_TOKEN`
2. **Migration Failures**: Check schema compatibility
3. **Type Errors**: Ensure Drizzle types match schema
4. **Performance**: Monitor query patterns in Turso dashboard

### Getting Help

- Check Turso documentation for database-specific issues
- Review Drizzle ORM docs for query patterns
- Use `yarn db:studio` for data inspection
- Check server logs for detailed error messages
