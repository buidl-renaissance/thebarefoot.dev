import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { blogPosts, blogPostHistory } from '@/db/schema';
import { eq, isNull } from 'drizzle-orm';

// Type for blog post row
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  author: string;
  publishedAt: Date;
  status: string;
  tags: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      
      if (id) {
        // Fetch single post by ID
        const post = await db.select().from(blogPosts).where(eq(blogPosts.id, parseInt(id as string))).limit(1);
        
        if (!post || post.length === 0) {
          return res.status(404).json({ error: 'Blog post not found' });
        }
        
        res.status(200).json(post[0]);
      } else {
        // Fetch all posts
        const allPosts = await db.select().from(blogPosts).where(isNull(blogPosts.deletedAt));
        res.status(200).json(allPosts);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, slug, content, excerpt, featuredImage, author, status, tags } = req.body;
      
      // Generate slug from title if not provided
      const generateSlug = (title: string) => {
        return title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      };
      
      const finalSlug = slug || generateSlug(title);
      
      const newPost = await db.insert(blogPosts).values({
        title,
        slug: finalSlug,
        content,
        excerpt,
        featuredImage,
        author,
        status,
        tags: tags ? JSON.stringify(tags) : null,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();
      
      res.status(201).json(newPost[0]);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, title, slug, content, excerpt, featuredImage, author, status, tags } = req.body;
      
      // Get the existing post to preserve its slug if no new slug is provided
      const existingPost = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
      
      if (!existingPost || existingPost.length === 0) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      
      // Generate slug from title if not provided
      const generateSlug = (title: string) => {
        return title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      };
      
      // Preserve existing slug if no new slug is provided, otherwise use the new slug
      const finalSlug = slug || existingPost[0].slug || generateSlug(title);

      // Track changes for history
      const fieldsToTrack = [
        "title", "slug", "content", "excerpt", "featuredImage", "author", "status", "tags"
      ] as const;
      const oldPost = existingPost[0] as BlogPost;
      const newValues: Partial<BlogPost> = {
        title,
        slug: finalSlug,
        content,
        excerpt,
        featuredImage,
        author,
        status,
        tags: tags ? JSON.stringify(tags) : null,
      };
      const changes = [];
      for (const field of fieldsToTrack) {
        let oldValue = oldPost[field];
        let newValue = newValues[field];
        // Normalize undefined/null/empty
        if (oldValue === undefined) oldValue = null;
        if (newValue === undefined) newValue = null;
        if (String(oldValue) !== String(newValue)) {
          changes.push({
            blogPostId: id,
            field,
            oldValue: oldValue === null ? null : String(oldValue),
            newValue: newValue === null ? null : String(newValue),
            changedAt: new Date(),
          });
        }
      }

      const updatedPost = await db.update(blogPosts)
        .set({
          title,
          slug: finalSlug,
          content,
          excerpt,
          featuredImage,
          author,
          status,
          tags: tags ? JSON.stringify(tags) : null,
          updatedAt: new Date(),
        })
        .where(eq(blogPosts.id, id))
        .returning();

      // Insert history records if there are changes
      if (changes.length > 0) {
        for (const change of changes) {
          await db.insert(blogPostHistory).values(change);
        }
      }
      
      res.status(200).json(updatedPost[0]);
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(500).json({ error: 'Failed to update blog post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      await db.update(blogPosts)
        .set({ deletedAt: new Date() })
        .where(eq(blogPosts.id, parseInt(id as string)));
      
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ error: 'Failed to delete blog post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
} 