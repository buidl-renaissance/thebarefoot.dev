-- Create Open October registrations table
CREATE TABLE IF NOT EXISTS open_october_registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_open_october_registrations_email ON open_october_registrations(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_open_october_registrations_created_at ON open_october_registrations(created_at);
