import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin: 0;
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.rustedSteel};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CreateButton = styled(Link)`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background: ${({ theme }) => theme.colors.brickRed};
    transform: translateY(-1px);
  }
`;

const CreateFromTranscriptButton = styled(Link)`
  background: transparent;
  color: ${({ theme }) => theme.colors.neonOrange};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 1rem;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.asphaltBlack};
  }
`;

const PostsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const PostCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const PostTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin: 0;
`;

const PostActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  background: ${({ theme, variant }) => 
    variant === 'delete' ? theme.colors.brickRed : 'transparent'};
  color: ${({ theme, variant }) => 
    variant === 'delete' ? theme.colors.creamyBeige : theme.colors.neonOrange};
  border: 1px solid ${({ theme, variant }) => 
    variant === 'delete' ? theme.colors.brickRed : theme.colors.neonOrange};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme, variant }) => 
      variant === 'delete' ? theme.colors.brickRed : theme.colors.neonOrange};
    color: ${({ theme, variant }) => 
      variant === 'delete' ? theme.colors.creamyBeige : theme.colors.asphaltBlack};
  }
`;

const PostDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.div`
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-weight: 500;
`;

const PostExcerpt = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  line-height: 1.6;
  margin: 0;
`;

const StatusBadge = styled.span<{ status: string }>`
  background: ${({ theme, status }) => 
    status === 'published' ? theme.colors.neonOrange : 
    status === 'draft' ? theme.colors.rustedSteel : 
    theme.colors.brickRed};
  color: ${({ theme, status }) => 
    status === 'published' ? theme.colors.asphaltBlack : 
    theme.colors.creamyBeige};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;



interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string | null;
  author: string;
  status: string;
  tags: string;
  publishedAt: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}





export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };



  const handleDeletePost = async (postId: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await fetch(`/api/admin/blog?id=${postId}`, {
          method: 'DELETE',
        });
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head>
        <title>Blog Management - Admin Dashboard</title>
        <meta name="description" content="Manage blog posts" />
      </Head>
      
      <AdminContainer>
        <Header>
          <Title>Blog Management</Title>
          <BackLink href="/admin">
            ← Back to Dashboard
          </BackLink>
        </Header>

        <ActionBar>
          <div>
            <CreateButton href="/admin/blog/create">
              Create New Post
            </CreateButton>
            <CreateFromTranscriptButton href="/admin/blog/create?tab=transcript">
              Create from Transcript
            </CreateFromTranscriptButton>
          </div>
        </ActionBar>

        <PostsGrid>
          {posts.map((post) => (
            <PostCard key={post.id}>
              <PostHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostActions>
                  <ActionButton as={Link} href={`/admin/blog/create?id=${post.id}`}>
                    Edit
                  </ActionButton>
                  <ActionButton variant="delete" onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </ActionButton>
                </PostActions>
              </PostHeader>

              <PostDetails>
                <DetailItem>
                  <DetailLabel>Status</DetailLabel>
                  <StatusBadge status={post.status}>{post.status}</StatusBadge>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Author</DetailLabel>
                  <DetailValue>{post.author}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Published</DetailLabel>
                  <DetailValue>{formatDate(post.publishedAt)}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Slug</DetailLabel>
                  <DetailValue>{post.slug}</DetailValue>
                </DetailItem>
              </PostDetails>

              {post.excerpt && (
                <PostExcerpt>{post.excerpt}</PostExcerpt>
              )}
            </PostCard>
          ))}
        </PostsGrid>
      </AdminContainer>
    </>
  );
} 