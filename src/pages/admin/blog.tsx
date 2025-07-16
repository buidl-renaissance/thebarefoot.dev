import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faSortUp, faSortDown, faSort, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { withAdminAuth } from '@/components/withAdminAuth';

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

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  transition: border 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.neonOrange};
    outline: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.03);
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem 0.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.neonOrange};
  border-bottom: 2px solid ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1rem;
`;

const Td = styled.td`
  padding: 0.75rem 0.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  border-bottom: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  vertical-align: middle;
`;

const ImageThumb = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.rustedSteel};
  display: block;
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

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.neonOrange};
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.brickRed};
  }
`;

const SortIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 0.3em;
  vertical-align: middle;
`;

const TitleLink = styled.a`
  color: ${({ theme }) => theme.colors.neonOrange};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.brickRed};
    text-decoration: underline;
  }
`;
const ExternalIcon = styled.a`
  margin-left: 0.5em;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 0.95em;
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
  &:hover {
    color: ${({ theme }) => theme.colors.neonOrange};
  }
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





function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'publishedAt'>('publishedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

  const filteredPosts = posts.filter(post => {
    const q = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.author.toLowerCase().includes(q) ||
      post.slug.toLowerCase().includes(q)
    );
  });

  const sortedPosts = React.useMemo(() => {
    if (!sortBy) return filteredPosts;
    const sorted = [...filteredPosts].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      if (sortBy === 'publishedAt') {
        const aDate = typeof aValue === 'string' || aValue instanceof Date ? new Date(aValue).getTime() : 0;
        const bDate = typeof bValue === 'string' || bValue instanceof Date ? new Date(bValue).getTime() : 0;
        if (aDate < bDate) return sortOrder === 'asc' ? -1 : 1;
        if (aDate > bDate) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      }
    });
    return sorted;
  }, [filteredPosts, sortBy, sortOrder]);

  const handleSort = (column: 'title' | 'publishedAt') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (column: 'title' | 'publishedAt') => {
    if (sortBy !== column) return (
      <SortIconWrapper><FontAwesomeIcon icon={faSort} style={{ fontSize: '0.9em' }} /></SortIconWrapper>
    );
    return sortOrder === 'asc' ? (
      <SortIconWrapper><FontAwesomeIcon icon={faSortUp} style={{ fontSize: '0.9em' }} /></SortIconWrapper>
    ) : (
      <SortIconWrapper><FontAwesomeIcon icon={faSortDown} style={{ fontSize: '0.9em' }} /></SortIconWrapper>
    );
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
          <SearchInput
            type="text"
            placeholder="Search by title, author, or slug..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search blog posts"
          />
        </ActionBar>
        <Table>
          <thead>
            <tr>
              <Th>Image</Th>
              <Th style={{ cursor: 'pointer' }} onClick={() => handleSort('title')}>
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  Title{renderSortIcon('title')}
                </span>
              </Th>
              <Th>Status</Th>
              <Th>Author</Th>
              <Th style={{ cursor: 'pointer' }} onClick={() => handleSort('publishedAt')}>
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  Published{renderSortIcon('publishedAt')}
                </span>
              </Th>
              <Th>Slug</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts.map(post => (
              <tr key={post.id}>
                <Td>
                  {post.featuredImage ? (
                    <ImageThumb src={post.featuredImage} alt={post.title} />
                  ) : (
                    <ImageThumb src="/images/thebarefoot.dev-logo.png" alt="No image" />
                  )}
                </Td>
                <Td>
                  <Link href={`/admin/blog/create?id=${post.id}`} passHref legacyBehavior>
                    <TitleLink>{post.title}</TitleLink>
                  </Link>
                  {post.status === 'published' && (
                    <ExternalIcon
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open published post"
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </ExternalIcon>
                  )}
                </Td>
                <Td><StatusBadge status={post.status}>{post.status}</StatusBadge></Td>
                <Td>{post.author}</Td>
                <Td>{formatDate(post.publishedAt)}</Td>
                <Td>{post.slug}</Td>
                <Td style={{ whiteSpace: 'nowrap' }}>
                  <IconButton as={Link} href={`/admin/blog/create?id=${post.id}`} title="Edit">
                    <FontAwesomeIcon icon={faPen} />
                  </IconButton>
                  <IconButton onClick={() => handleDeletePost(post.id)} title="Delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </AdminContainer>
    </>
  );
}

export default withAdminAuth(AdminBlog); 