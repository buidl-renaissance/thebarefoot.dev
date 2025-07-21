-- Migration to add blog_post_history table for tracking blog post update history
CREATE TABLE blog_post_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  blog_post_id INTEGER NOT NULL,
  field TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  changed_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
  FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id)
); 