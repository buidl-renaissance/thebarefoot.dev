import Head from "next/head";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { ThemeType } from "@/styles/theme";
import EmailSubscription from "@/components/EmailSubscription";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostItem from "@/components/BlogPostItem";

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
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,79,0,0.15)" stroke-width="0.8"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.neonOrange},
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem 1rem;
  }
`;

const BlogTitle = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.6rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
  letter-spacing: 2px;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    font-size: clamp(1.4rem, 5vw, 2.5rem);
    margin-bottom: 0.75rem;
  }
`;

const BlockSpan = styled.span`
  display: inline-block;
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.colors.neonOrange};
    border-radius: 2px;
  }
`;

const BlogSubtitle = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.2rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    max-width: 100%;
  }
`;

const BlogList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
  }
`;

const EmptyState = styled.div<{ theme: ThemeType }>`
  text-align: center;
  padding: 4rem 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  opacity: 0.7;

  @media (max-width: 480px) {
    padding: 3rem 1rem;
    font-size: 1rem;
  }
`;

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  author: string;
  publishedAt: Date;
  tags: string | null;
}

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
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
      <Header />
      <BlogContainer>
        <Head>
          <title>Blog - The Barefoot Developer</title>
          <meta name="description" content="Thoughts on technology, community, and building in Detroit" />
        </Head>
        <BlogHeader>
          <BlogTitle>Sharing community tools,</BlogTitle>
          <BlogTitle>one <BlockSpan>blog</BlockSpan> at a time.</BlogTitle>
          <BlogSubtitle>
            Thoughts on technology, community, and building in Detroit
          </BlogSubtitle>
        </BlogHeader>

        {posts.length > 0 ? (
          <BlogList>
            {posts.map((post) => (
              <BlogPostItem
                key={post.id}
                id={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                featuredImage={post.featuredImage}
                author={post.author}
                publishedAt={post.publishedAt}
                tags={parseTags(post.tags)}
              />
            ))}
          </BlogList>
        ) : (
          <EmptyState>
            <p>No blog posts published yet. Check back soon!</p>
          </EmptyState>
        )}

        <EmailSubscription 
          title="Stay in the loop"
          description="Get notified when new posts are published. I share insights about building community tools, lessons learned from Detroit projects, and thoughts on technology that serves people first."
          compact
        />
      </BlogContainer>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const posts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        featuredImage: blogPosts.featuredImage,
        author: blogPosts.author,
        publishedAt: blogPosts.publishedAt,
        tags: blogPosts.tags,
      })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt));

    return {
      props: {
        posts: posts.map(post => ({
          ...post,
          publishedAt: post.publishedAt?.toISOString(),
        })),
      },
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}; 