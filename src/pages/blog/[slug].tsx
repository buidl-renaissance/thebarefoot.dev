import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { ThemeType } from "@/styles/theme";
import EmailSubscription from "@/components/EmailSubscription";
import BlogContent from "@/components/BlogContent";
import HeaderComponent from "@/components/Header";
import FooterComponent from "@/components/Footer";
import BlogPostItem from "@/components/BlogPostItem";

const PostContainer = styled.div<{ theme: ThemeType }>`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
`;

const PostHeader = styled.header<{ theme: ThemeType }>`
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,79,0,0.2)" stroke-width="0.8"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
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
    padding: 3rem 1rem 2rem;
  }
`;

const PostTitle = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 4vw, 3rem);
  margin-bottom: 1rem;
  line-height: 1.2;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
`;

const PostMeta = styled.div<{ theme: ThemeType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const PostTags = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  position: relative;
  z-index: 1;
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



const NotFoundContainer = styled.div<{ theme: ThemeType }>`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const NotFoundTitle = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
`;

const NotFoundText = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const HomeLink = styled(Link)<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 1rem 2rem;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 79, 0, 0.3);
  }
`;

const OtherPostsSection = styled.section<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 4rem 2rem;
  position: relative;
  margin-bottom: 0rem;

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
    padding: 3rem 1rem;
  }
`;

const OtherPostsTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.4rem, 3vw, 1.4rem);
  text-align: center;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const OtherPostsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

// const FeaturedImageContainer = styled.div<{ theme: ThemeType }>`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 0 2rem;
//   margin-bottom: 2rem;

//   @media (max-width: 768px) {
//     padding: 0 1rem;
//     margin-bottom: 1.5rem;
//   }
// `;

// const FeaturedImage = styled.img<{ theme: ThemeType }>`
//   width: 100%;
//   height: auto;
//   border-radius: 8px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: scale(1.02);
//   }
// `;

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  author: string;
  publishedAt: Date;
  tags: string | null;
}

interface BlogPostPageProps {
  post: BlogPost | null;
  otherPosts: BlogPost[];
}

export default function BlogPostPage({ post, otherPosts }: BlogPostPageProps) {
  if (!post) {
    return (
      <>
        <Head>
          <title>Post Not Found - The Barefoot Developer</title>
        </Head>
        <HeaderComponent />
        <NotFoundContainer>
          <NotFoundTitle>Post Not Found</NotFoundTitle>
          <NotFoundText>
            The blog post you&apos;re looking for doesn&apos;t exist.
          </NotFoundText>
          <HomeLink href="/blog">Back to Blog</HomeLink>
        </NotFoundContainer>
        <FooterComponent />
      </>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
        <title>{post.title} - thebarefoot.dev</title>
        <meta name="og:title" content={`${post.title}`} />
        <meta name="description" content={post.excerpt || post.title} />
        {post.featuredImage && (
          <>
            <meta property="og:image" content={post.featuredImage} />
            <meta name="twitter:image" content={post.featuredImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        )}
      </Head>

      <HeaderComponent />
      <PostContainer>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostMeta>
            <span>By {post.author}</span>
            <span>{formatDate(post.publishedAt)}</span>
          </PostMeta>

          {post.tags && parseTags(post.tags).length > 0 && (
            <PostTags>
              {parseTags(post.tags).map((tag: string, index: number) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </PostTags>
          )}
        </PostHeader>
{/* 
        {post.featuredImage && (
          <FeaturedImageContainer>
            <FeaturedImage src={post.featuredImage} alt={post.title} />
          </FeaturedImageContainer>
        )} */}

        <BlogContent content={post.content} />

        <EmailSubscription
          title="Stay in the loop"
          description="Get notified when I publish new posts about building meaningful tech for real communities."
          compact
        />

        {otherPosts.length > 0 && (
          <OtherPostsSection>
            <OtherPostsTitle>More from the Barefoot Dev</OtherPostsTitle>
            <OtherPostsGrid>
              {otherPosts.map((otherPost) => (
                <BlogPostItem
                  key={otherPost.id}
                  id={otherPost.id}
                  title={otherPost.title}
                  slug={otherPost.slug}
                  excerpt={otherPost.excerpt}
                  featuredImage={otherPost.featuredImage}
                  author={otherPost.author}
                  publishedAt={otherPost.publishedAt}
                  tags={parseTags(otherPost.tags)}
                />
              ))}
            </OtherPostsGrid>
          </OtherPostsSection>
        )}
      </PostContainer>
      <FooterComponent />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;

    const post = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        content: blogPosts.content,
        excerpt: blogPosts.excerpt,
        featuredImage: blogPosts.featuredImage,
        author: blogPosts.author,
        publishedAt: blogPosts.publishedAt,
        tags: blogPosts.tags,
      })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (!post || post.length === 0) {
      return {
        props: {
          post: null,
          otherPosts: [],
        },
      };
    }

    // Fetch other published posts, excluding the current one
    const otherPosts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        content: blogPosts.content,
        excerpt: blogPosts.excerpt,
        featuredImage: blogPosts.featuredImage,
        author: blogPosts.author,
        publishedAt: blogPosts.publishedAt,
        tags: blogPosts.tags,
      })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(4);

    // Filter out the current post
    const filteredOtherPosts = otherPosts.filter((p) => p.slug !== slug);

    // Limit to 3 other posts
    const limitedOtherPosts = filteredOtherPosts.slice(0, 3);

    return {
      props: {
        post: {
          ...post[0],
          publishedAt: post[0].publishedAt?.toISOString(),
        },
        otherPosts: limitedOtherPosts.map((post) => ({
          ...post,
          publishedAt: post.publishedAt?.toISOString(),
        })),
      },
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return {
      props: {
        post: null,
        otherPosts: [],
      },
    };
  }
};
