import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { WYSIWYGEditor } from '../../components/WYSIWYGEditor';

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

const CreateButton = styled.button`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.brickRed};
    transform: translateY(-1px);
  }
`;

const CreateFromTranscriptButton = styled.button`
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

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 2rem;
  max-width: 1000px;
  width: 95%;
  max-height: 95vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.neonOrange};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1.5rem;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-weight: 600;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const Textarea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.brickRed};
  }
`;

const CancelButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-family: ${({ theme }) => theme.fonts.body};
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  min-height: 2.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.brickRed};
  }
`;

const TagsInput = styled.input`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  flex: 1;
  min-width: 120px;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel};
  }
`;

const FileInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
  
  &::file-selector-button {
    background: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.asphaltBlack};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 600;
    margin-right: 1rem;
    
    &:hover {
      background: ${({ theme }) => theme.colors.brickRed};
    }
  }
`;

const ImagePreview = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  margin-top: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 0.9rem;
`;

// New styled components for transcript workflow
const WorkflowTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.rustedSteel};
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${({ theme, active }) => 
    active ? theme.colors.neonOrange : 'transparent'};
  color: ${({ theme, active }) => 
    active ? theme.colors.asphaltBlack : theme.colors.rustedSteel};
  border: none;
  padding: 0.75rem 1.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px 4px 0 0;
  
  &:hover {
    color: ${({ theme, active }) => 
      active ? theme.colors.asphaltBlack : theme.colors.neonOrange};
  }
`;

const TabContent = styled.div<{ active: boolean }>`
  display: ${({ active }) => active ? 'block' : 'none'};
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  cursor: pointer;
`;

const GenerateButton = styled.button`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.brickRed};
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.rustedSteel};
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.neonOrange};
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const GeneratedContent = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const GeneratedTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.neonOrange};
  margin: 0 0 1rem 0;
`;

const GeneratedText = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  line-height: 1.6;
  white-space: pre-wrap;
`;

const RegenerateButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.neonOrange};
  font-family: ${({ theme }) => theme.fonts.body};
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.asphaltBlack};
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



interface TranscriptFormData {
  transcript: string;
  blogType: string;
  addCallToAction: boolean;
  tone: string;
  length: string;
}

interface GeneratedBlogData {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<'manual' | 'transcript'>('manual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState<GeneratedBlogData | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: null as string | null,
    author: 'The Barefoot Dev',
    status: 'draft',
    tags: '',
  });
  
  const [transcriptData, setTranscriptData] = useState<TranscriptFormData>({
    transcript: '',
    blogType: 'Create an engaging blog post based on a presentation transcript by a local community-focused developer. Highlight their project, tools used, community impact, and any upcoming goals.',
    addCallToAction: true,
    tone: 'casual',
    length: 'medium',
  });
  
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

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

  const handleCreatePost = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      featuredImage: null,
      author: 'The Barefoot Dev',
      status: 'draft',
      tags: '',
    });
    setTags([]);
    setTagInput('');
    setActiveTab('manual');
    setGeneratedBlog(null);
    setIsModalOpen(true);
  };

  const handleCreateFromTranscript = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      featuredImage: null,
      author: 'The Barefoot Dev',
      status: 'draft',
      tags: '',
    });
    setTags([]);
    setTagInput('');
    setActiveTab('transcript');
    setGeneratedBlog(null);
    setTranscriptData({
      transcript: '',
      blogType: 'Create an engaging blog post based on a presentation transcript by a local community-focused developer. Highlight their project, tools used, community impact, and any upcoming goals.',
      addCallToAction: true,
      tone: 'casual',
      length: 'medium',
    });
    setIsModalOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      featuredImage: post.featuredImage,
      author: post.author,
      status: post.status,
      tags: '', // We handle tags separately as an array
    });
    // Parse tags from JSON string to array
    try {
      const parsedTags = post.tags ? JSON.parse(post.tags) : [];
      setTags(Array.isArray(parsedTags) ? parsedTags : []);
    } catch (error) {
      console.error('Error parsing tags:', error);
      setTags([]);
    }
    setTagInput('');
    setActiveTab('manual');
    setGeneratedBlog(null);
    setIsModalOpen(true);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        author: formData.author,
        status: formData.status,
        tags: tags,
        featuredImage: formData.featuredImage,
        ...(editingPost && { id: editingPost.id })
      };

      const url = '/api/admin/blog';
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchPosts();
      } else {
        console.error('Error saving post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleGenerateBlog = async () => {
    if (!transcriptData.transcript.trim()) {
      alert('Please enter a transcript first.');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/admin/blog/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: transcriptData.transcript,
          blogType: transcriptData.blogType,
          addCallToAction: transcriptData.addCallToAction,
          tone: transcriptData.tone,
          length: transcriptData.length,
        }),
      });

      if (response.ok) {
        const generatedData = await response.json();
        setGeneratedBlog(generatedData);
        
        // Auto-fill the form with generated content
        setFormData(prev => ({
          ...prev,
          title: generatedData.title,
          content: generatedData.content,
          excerpt: generatedData.excerpt,
        }));
        setTags(generatedData.tags || []);
      } else {
        console.error('Error generating blog post');
      }
    } catch (error) {
      console.error('Error generating blog post:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateBlog = () => {
    setGeneratedBlog(null);
    handleGenerateBlog();
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: base64Data,
            fileName: file.name,
            fileType: file.type,
            folder: 'blog-images'
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setFormData(prev => ({ 
            ...prev, 
            featuredImage: result.url 
          }));
        } else {
          console.error('Error uploading file');
          alert('Failed to upload image. Please try again.');
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
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
            <CreateButton onClick={handleCreatePost}>
              Create New Post
            </CreateButton>
            <CreateFromTranscriptButton onClick={handleCreateFromTranscript}>
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
                  <ActionButton onClick={() => handleEditPost(post)}>
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

        <Modal isOpen={isModalOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </ModalTitle>
              <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            </ModalHeader>

            {!editingPost && (
              <WorkflowTabs>
                <Tab 
                  active={activeTab === 'manual'} 
                  onClick={() => setActiveTab('manual')}
                >
                  Manual Entry
                </Tab>
                <Tab 
                  active={activeTab === 'transcript'} 
                  onClick={() => setActiveTab('transcript')}
                >
                  From Transcript
                </Tab>
              </WorkflowTabs>
            )}

            <TabContent active={activeTab === 'manual'}>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the post..."
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="featuredImage">Featured Image</Label>
                  <FileInput
                    id="featuredImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(file);
                      }
                    }}
                  />
                  {isUploading && (
                    <ImagePreview>
                      <span>Uploading image...</span>
                    </ImagePreview>
                  )}
                  {formData.featuredImage && !isUploading && (
                    <ImagePreview>
                      <span>Uploaded: {formData.featuredImage}</span>
                    </ImagePreview>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="content">Content</Label>
                  <WYSIWYGEditor
                    value={formData.content}
                    onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                    placeholder="Write your blog post content..."
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="tags">Tags</Label>
                  <TagsContainer>
                    {tags.map((tag, index) => (
                      <TagChip key={index}>
                        {tag}
                        <RemoveTagButton onClick={() => handleRemoveTag(tag)}>
                          ×
                        </RemoveTagButton>
                      </TagChip>
                    ))}
                    <TagsInput
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Type a tag and press Enter..."
                    />
                  </TagsContainer>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </Select>
                </FormGroup>

                <ButtonGroup>
                  <CancelButton type="button" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </CancelButton>
                  <SubmitButton type="submit">
                    {editingPost ? 'Update Post' : 'Create Post'}
                  </SubmitButton>
                </ButtonGroup>
              </Form>
            </TabContent>

            <TabContent active={activeTab === 'transcript'}>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="transcript">Transcript/Notes</Label>
                  <WYSIWYGEditor
                    value={transcriptData.transcript}
                    onChange={(value) => setTranscriptData(prev => ({ ...prev, transcript: value }))}
                    placeholder="Paste the presentation transcript, notes, or summary here..."
                  />
                </FormGroup>

                <OptionsGrid>
                  <OptionGroup>
                    <Label>Tone</Label>
                    <Select
                      value={transcriptData.tone}
                      onChange={(e) => setTranscriptData(prev => ({ ...prev, tone: e.target.value }))}
                    >
                      <option value="casual">Casual</option>
                      <option value="professional">Professional</option>
                      <option value="inspirational">Inspirational</option>
                    </Select>
                  </OptionGroup>

                  <OptionGroup>
                    <Label>Length</Label>
                    <Select
                      value={transcriptData.length}
                      onChange={(e) => setTranscriptData(prev => ({ ...prev, length: e.target.value }))}
                    >
                      <option value="short">Short Highlight</option>
                      <option value="medium">Medium Summary</option>
                      <option value="full">Full Feature</option>
                    </Select>
                  </OptionGroup>
                </OptionsGrid>

                <OptionGroup>
                  <CheckboxLabel>
                    <Checkbox
                      type="checkbox"
                      checked={transcriptData.addCallToAction}
                      onChange={(e) => setTranscriptData(prev => ({ ...prev, addCallToAction: e.target.checked }))}
                    />
                    Add call to action (e.g., &quot;Join their next meetup&quot;)
                  </CheckboxLabel>
                </OptionGroup>

                <GenerateButton 
                  type="button" 
                  onClick={handleGenerateBlog}
                  disabled={isGenerating || !transcriptData.transcript.trim()}
                >
                  {isGenerating && <LoadingSpinner />}
                  {isGenerating ? 'Generating...' : 'Generate Blog Post'}
                </GenerateButton>

                {generatedBlog && (
                  <GeneratedContent>
                    <GeneratedTitle>Generated Blog Post</GeneratedTitle>
                    <GeneratedText>{generatedBlog.content}</GeneratedText>
                    <RegenerateButton type="button" onClick={handleRegenerateBlog}>
                      Regenerate with Different Style
                    </RegenerateButton>
                  </GeneratedContent>
                )}

                {generatedBlog && (
                  <>
                    <FormGroup>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Brief description of the post..."
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="featuredImage">Featured Image</Label>
                      <FileInput
                        id="featuredImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file);
                          }
                        }}
                      />
                      {isUploading && (
                        <ImagePreview>
                          <span>Uploading image...</span>
                        </ImagePreview>
                      )}
                      {formData.featuredImage && !isUploading && (
                        <ImagePreview>
                          <span>Uploaded: {formData.featuredImage}</span>
                        </ImagePreview>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="content">Content (HTML)</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your blog post content in HTML..."
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="tags">Tags</Label>
                      <TagsContainer>
                        {tags.map((tag, index) => (
                          <TagChip key={index}>
                            {tag}
                            <RemoveTagButton onClick={() => handleRemoveTag(tag)}>
                              ×
                            </RemoveTagButton>
                          </TagChip>
                        ))}
                        <TagsInput
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleAddTag}
                          placeholder="Type a tag and press Enter..."
                        />
                      </TagsContainer>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </Select>
                    </FormGroup>

                    <ButtonGroup>
                      <CancelButton type="button" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </CancelButton>
                      <SubmitButton type="submit">
                        Create Post
                      </SubmitButton>
                    </ButtonGroup>
                  </>
                )}
              </Form>
            </TabContent>
          </ModalContent>
        </Modal>
      </AdminContainer>
    </>
  );
} 