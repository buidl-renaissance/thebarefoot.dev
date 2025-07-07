import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import { GetStaticProps } from "next";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { ThemeType } from "@/styles/theme";

const BlogContainer = styled.div<{ theme: ThemeType }>`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
`;

const BlogHeader = styled.header<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 4rem 2rem 2rem;
  text-align: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.neonOrange},
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem 2rem;
  }
`;

const BlogTitle = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const BlogSubtitle = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.2rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const BlogGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.article<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.neonOrange}20;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(255, 79, 0, 0.2);
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const BlogCardContent = styled.div`
  padding: 1.5rem;
`;

const BlogCardTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.creamyBeige};

  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.neonOrange};
    }
  }
`;

const BlogCardExcerpt = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  opacity: 0.9;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogCardMeta = styled.div<{ theme: ThemeType }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  opacity: 0.7;
  margin-bottom: 1rem;
`;

const BlogCardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.body};
`;

const EmptyState = styled.div<{ theme: ThemeType }>`
  text-align: center;
  padding: 4rem 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  opacity: 0.7;
`;

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  author: string;
  publishedAt: Date;
  tags: string | null;
}

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const parseTags = (tags: string | null) => {
    if (!tags) return [];
    try {
      return JSON.parse(tags);
    } catch {
      return [];
    }
  };

  return (
    <>
      <Head>
        <title>Blog - The Barefoot Developer</title>
        <meta name="description" content="Thoughts on technology, community, and building in Detroit" />
      </Head>
      
      <BlogContainer>
        <BlogHeader>
          <BlogTitle>Blog</BlogTitle>
          <BlogSubtitle>
            Thoughts on technology, community, and building in Detroit
          </BlogSubtitle>
        </BlogHeader>

        {posts.length > 0 ? (
          <BlogGrid>
            {posts.map((post) => (
              <BlogCard key={post.id}>
                <BlogCardContent>
                  <BlogCardTitle>
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </BlogCardTitle>
                  
                  {post.excerpt && (
                    <BlogCardExcerpt>{post.excerpt}</BlogCardExcerpt>
                  )}
                  
                  <BlogCardMeta>
                    <span>By {post.author}</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </BlogCardMeta>
                  
                  {post.tags && parseTags(post.tags).length > 0 && (
                    <BlogCardTags>
                      {parseTags(post.tags).slice(0, 3).map((tag: string, index: number) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </BlogCardTags>
                  )}
                </BlogCardContent>
              </BlogCard>
            ))}
          </BlogGrid>
        ) : (
          <EmptyState>
            <p>No blog posts published yet. Check back soon!</p>
          </EmptyState>
        )}
      </BlogContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        author: blogPosts.author,
        publishedAt: blogPosts.publishedAt,
        tags: blogPosts.tags,
      })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(blogPosts.publishedAt);

    return {
      props: {
        posts: posts.map(post => ({
          ...post,
          publishedAt: post.publishedAt?.toISOString(),
        })),
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      props: {
        posts: [],
      },
      revalidate: 60,
    };
  }
}; 