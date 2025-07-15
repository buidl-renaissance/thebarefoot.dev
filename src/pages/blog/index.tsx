import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { ThemeType } from "@/styles/theme";
import EmailSubscription from "@/components/EmailSubscription";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

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

const BlogPostItemRow = styled.article<{ theme: ThemeType }>`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 3rem;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: -1.5rem;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.neonOrange}30,
      transparent
    );
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 0.5rem;
    &:not(:last-child)::after {
      bottom: -1rem;
    }
  }
`;

const BlogPostImage = styled.div<{ theme: ThemeType }>`
  flex: none;
  width: 96px;
  height: 96px;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.creamyBeige};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  @media (max-width: 480px) {
    width: 64px;
    height: 64px;
  }
`;

const BlogPostImagePlaceholder = styled.div<{ theme: ThemeType }>`
  width: 96px;
  height: 96px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.neonOrange}22;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.neonOrange};
  font-size: 2.2rem;
  font-weight: bold;
  @media (max-width: 480px) {
    width: 64px;
    height: 64px;
    font-size: 1.3rem;
  }
`;

const BlogPostTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.2rem, 3vw, 2em);
  margin-bottom: 0.75rem;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.creamyBeige};

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.neonOrange};
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
`;

const BlogPostExcerpt = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1rem;
  opacity: 0.9;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }
`;

// const BlogPostImage = styled.div<{ theme: ThemeType }>`
//   margin-bottom: 1rem;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//   }

//   img {
//     width: 100%;
//     height: auto;
//     display: block;
//   }

//   @media (max-width: 480px) {
//     margin-bottom: 0.75rem;
//   }
// `;

const BlogPostMeta = styled.div<{ theme: ThemeType }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }
`;

const BlogPostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    margin-top: 0.75rem;
    gap: 0.4rem;
  }
`;

const Tag = styled.span<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.body};

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
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
              <BlogPostItemRow key={post.id}>
                <BlogPostImage>
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={96}
                      height={96}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      sizes="(max-width: 480px) 64px, 96px"
                    />
                  ) : (
                    <BlogPostImagePlaceholder>
                      {post.title.charAt(0)}
                    </BlogPostImagePlaceholder>
                  )}
                </BlogPostImage>
                <div style={{ flex: 1 }}>
                  <BlogPostTitle>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </BlogPostTitle>
                  {post.excerpt && <BlogPostExcerpt>{post.excerpt}</BlogPostExcerpt>}
                  <BlogPostMeta>
                    <span>By {post.author}</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </BlogPostMeta>
                  {post.tags && parseTags(post.tags).length > 0 && (
                    <BlogPostTags>
                      {parseTags(post.tags).slice(0, 3).map((tag: string, index: number) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </BlogPostTags>
                  )}
                </div>
              </BlogPostItemRow>
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