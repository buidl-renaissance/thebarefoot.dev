import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import type { ThemeType } from "@/styles/theme";

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

export interface BlogPostItemProps {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  author: string;
  publishedAt: string | Date;
  tags?: string[];
}

export default function BlogPostItem({
  id,
  title,
  slug,
  excerpt,
  featuredImage,
  author,
  publishedAt,
  tags = [],
}: BlogPostItemProps) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <BlogPostItemRow key={id}>
      <BlogPostImage>
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            width={96}
            height={96}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            sizes="(max-width: 480px) 64px, 96px"
          />
        ) : (
          <BlogPostImagePlaceholder>
            {title.charAt(0)}
          </BlogPostImagePlaceholder>
        )}
      </BlogPostImage>
      <div style={{ flex: 1 }}>
        <BlogPostTitle>
          <Link href={`/blog/${slug}`}>{title}</Link>
        </BlogPostTitle>
        {excerpt && <BlogPostExcerpt>{excerpt}</BlogPostExcerpt>}
        <BlogPostMeta>
          <span>By {author}</span>
          <span>{formatDate(publishedAt)}</span>
        </BlogPostMeta>
        {tags.length > 0 && (
          <BlogPostTags>
            {tags.slice(0, 3).map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </BlogPostTags>
        )}
      </div>
    </BlogPostItemRow>
  );
} 