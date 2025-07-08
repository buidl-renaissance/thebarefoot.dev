import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, isNull } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allPosts = await db.select().from(blogPosts).where(isNull(blogPosts.deletedAt));
      res.status(200).json(allPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, slug, content, excerpt, author, status, tags } = req.body;
      
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
      const { id, title, slug, content, excerpt, author, status, tags } = req.body;
      
      // Generate slug from title if not provided
      const generateSlug = (title: string) => {
        return title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      };
      
      const finalSlug = slug || generateSlug(title);
      
      const updatedPost = await db.update(blogPosts)
        .set({
          title,
          slug: finalSlug,
          content,
          excerpt,
          author,
          status,
          tags: tags ? JSON.stringify(tags) : null,
          updatedAt: new Date(),
        })
        .where(eq(blogPosts.id, id))
        .returning();
      
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