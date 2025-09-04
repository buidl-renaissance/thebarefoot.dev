import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Email subscriptions table
export const subscriptions = sqliteTable("subscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid").notNull().unique().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  source: text("source").notNull().default("website"), // website, workshop, event, etc.
  status: text("status").notNull().default("active"), // active, unsubscribed, bounced
});

// Community members table
export const members = sqliteTable("members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name"),
  role: text("role"), // developer, organizer, artist, designer, etc.
  location: text("location"), // Detroit, etc.
  bio: text("bio"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

// Projects table
export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("active"), // active, completed, archived
  data: text("data"), // JSON object of data
  tags: text("tags"), // JSON array of tags
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

// Events/workshops table
export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  startDatetime: integer("start_datetime", { mode: "timestamp" }).notNull(),
  endDatetime: integer("end_datetime", { mode: "timestamp" }).notNull(),
  location: text("location"),
  imageUrl: text("image_url"),
  type: text("type").notNull(), // workshop, hacknight, meetup, etc.
  data: text("data"), // JSON object of additional data
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

// Blog posts table
export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: text("featured_image"),
  author: text("author").notNull(),
  publishedAt: integer("published_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  status: text("status").notNull().default("draft"), // draft, published, archived
  tags: text("tags"), // JSON array of tags
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

// Walk form submissions table
export const walkSubmissions = sqliteTable("walk_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  subscriptionUuid: text("subscription_uuid").references(() => subscriptions.uuid),
  experience: text("experience").notNull(), // none, beginner, intermediate, advanced
  interests: text("interests").notNull(), // JSON array of selected interests
  city: text("city").notNull(), // city selection
  accountability: integer("accountability", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Profiles table
export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").unique(),
  linkedin: text("linkedin"),
  bio: text("bio"),
  experience: text("experience"), // JSON object of experience data
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

// Users table for authentication (NextAuth compatible)
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "timestamp" }),
  password: text("password"), // hashed password for credentials provider
  role: text("role").notNull().default("user"), // 'admin' or 'user'
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Verification tokens table for email verification and password reset
export const verificationTokens = sqliteTable("verification_tokens", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  token: text("token").notNull().unique(),
  type: text("type").notNull(), // 'email' or 'password_reset'
  expires: integer("expires", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// RSVPs table
export const rsvps = sqliteTable("rsvps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventId: integer("event_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

// Blog post update history table
export const blogPostHistory = sqliteTable("blog_post_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  blogPostId: integer("blog_post_id").notNull(), // references blogPosts.id
  field: text("field").notNull(), // name of the field that changed
  oldValue: text("old_value"), // previous value (as string/JSON)
  newValue: text("new_value"), // new value (as string/JSON)
  changedAt: integer("changed_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Open October event registrations table
export const openOctoberRegistrations = sqliteTable("open_october_registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}); 