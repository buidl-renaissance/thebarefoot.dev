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
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
`;

const BackLink = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.neonOrange};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 2rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FormContainer = styled.div`
  max-width: 600px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 2rem;
`;

const PageLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    max-width: 1400px;
    margin: 0 auto;
  }
`;

const PreviewContainer = styled.div`
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 1.5rem;
  
  @media (min-width: 1200px) {
    margin-top: 0;
    position: sticky;
    top: 2rem;
    height: fit-content;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel};
  }
`;


const Button = styled.button<{ disabled?: boolean }>`
  background: ${({ theme, disabled }) => 
    disabled ? theme.colors.rustedSteel : theme.colors.neonOrange};
  color: ${({ theme, disabled }) => 
    disabled ? theme.colors.rustedSteel : theme.colors.asphaltBlack};
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 1rem;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brickRed};
    transform: translateY(-1px);
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  
  background: ${({ type }) => 
    type === 'success' 
      ? 'rgba(34, 197, 94, 0.1)' 
      : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${({ theme, type }) => 
    type === 'success' 
      ? theme.colors.neonOrange 
      : theme.colors.brickRed};
  color: ${({ theme, type }) => 
    type === 'success' 
      ? theme.colors.creamyBeige 
      : theme.colors.brickRed};
`;

const InfoBox = styled.div`
  background: rgba(255, 79, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
`;

const PreviewTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.neonOrange};
  margin-bottom: 1rem;
`;



const NoPostsMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-style: italic;
  padding: 2rem;
`;

export default function BlogDigestPage() {
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [subject, setSubject] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewPosts, setPreviewPosts] = useState<Array<{
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    author: string;
    publishedAt: string;
    featuredImage?: string;
  }>>([]);
  const [emailHtml, setEmailHtml] = useState<string>('');
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  // Helper function to format date for display
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/blog-digest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          postIds: selectedPostIds,
          subject: subject || undefined,
          introduction: introduction || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setEmail('');
        setStartDate('');
        setEndDate('');
        setSubject('');
        setIntroduction('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to send email' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = async () => {
    if (!startDate || !endDate) return;
    
    console.log('Sending preview request:', { startDate, endDate, introduction });
    
    setIsLoadingPreview(true);
    try {
      const response = await fetch('/api/admin/blog-digest/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
          introduction,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPreviewPosts(data.posts || []);
        // Don't set emailHtml here - we'll generate it based on selected posts
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to load preview' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setIsLoadingPreview(false);
    }
  };

  // Generate preview for selected posts
  const generateSelectedPostsPreview = async () => {
    if (selectedPostIds.length === 0) {
      setEmailHtml('');
      return;
    }

    try {
      const response = await fetch('/api/admin/blog-digest/preview-selected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postIds: selectedPostIds,
          subject,
          introduction,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailHtml(data.emailHtml || '');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to generate preview' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error occurred' });
    }
  };

  // Update preview when selected posts change
  useEffect(() => {
    generateSelectedPostsPreview();
  }, [selectedPostIds, subject, introduction]);

  useEffect(() => {
    if (startDate && endDate) {
      handlePreview();
    }
  }, [startDate, endDate, introduction]);

  // Set default date range to last 7 days
  React.useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7);
    
    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
  }, []);

  return (
    <>
      <Head>
        <title>Blog Digest - Admin Dashboard</title>
        <meta name="description" content="Send blog digest emails" />
      </Head>
      
      <AdminContainer>
        <BackLink href="/admin">← Back to Dashboard</BackLink>
        
        <Header>
          <Title>Blog Digest</Title>
          <Subtitle>Send recent blog posts to subscribers</Subtitle>
        </Header>

        <PageLayout>
          <FormContainer>
            <InfoBox>
              <strong>How it works:</strong> This will send an email with all published blog posts 
              from the specified date range. The email will include post titles, excerpts, and links 
              to read the full articles.
            </InfoBox>

            {message && (
              <Message type={message.type}>
                {message.text}
              </Message>
            )}

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">Recipient Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter recipient email address"
                  required
                />
              </FormGroup>

                          <FormGroup>
              <Label>Select Posts to Include</Label>
              <div style={{ 
                maxHeight: '300px', 
                overflowY: 'auto', 
                border: '1px solid #e2e8f0', 
                borderRadius: '4px', 
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)'
              }}>
                {previewPosts.map((post) => (
                  <div key={post.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <input
                      type="checkbox"
                      id={`post-${post.id}`}
                      checked={selectedPostIds.includes(post.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPostIds([...selectedPostIds, post.id]);
                        } else {
                          setSelectedPostIds(selectedPostIds.filter(id => id !== post.id));
                        }
                      }}
                      style={{ marginRight: '0.75rem' }}
                    />
                    <label htmlFor={`post-${post.id}`} style={{ 
                      flex: 1, 
                      cursor: 'pointer',
                      color: selectedPostIds.includes(post.id) ? '#ff4f00' : '#a0aec0'
                    }}>
                      <div style={{ fontWeight: '600' }}>{post.title}</div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                        {formatDateForDisplay(new Date(post.publishedAt).toISOString().split('T')[0])} • {post.author}
                      </div>
                    </label>
                  </div>
                ))}
                {previewPosts.length === 0 && (
                  <div style={{ textAlign: 'center', color: '#a0aec0', fontStyle: 'italic' }}>
                    No posts found for the selected date range
                  </div>
                )}
              </div>
            </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Email Subject (Optional)</Label>
                <Input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Leave empty for default subject"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="introduction">Introduction (Optional)</Label>
                <TextArea
                  id="introduction"
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                  placeholder="Add a personal introduction to the blog posts..."
                />
              </FormGroup>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Blog Digest'}
              </Button>
            </form>
          </FormContainer>

          {/* Preview Section */}
          {(startDate && endDate) && (
            <PreviewContainer>
              <PreviewTitle>
                Email Preview ({selectedPostIds.length} selected posts)
                {startDate && endDate && ` - ${formatDateForDisplay(startDate)} to ${formatDateForDisplay(endDate)}`}
                {isLoadingPreview && ' - Loading...'}
              </PreviewTitle>
              
              {emailHtml ? (
                <div 
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    maxHeight: '600px',
                    overflowY: 'auto'
                  }}
                  dangerouslySetInnerHTML={{ __html: emailHtml }}
                />
              ) : (
                <NoPostsMessage>
                  {isLoadingPreview ? 'Loading preview...' : 'No posts found for this date range'}
                </NoPostsMessage>
              )}
            </PreviewContainer>
          )}
        </PageLayout>
      </AdminContainer>
    </>
  );
} 