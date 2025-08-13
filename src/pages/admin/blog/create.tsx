import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { WYSIWYGEditor } from '../../../components/WYSIWYGEditor';

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

const Form = styled.form`
  max-width: 1200px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
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
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.rustedSteel};
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

// Workflow tabs for transcript-based creation
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

export default function CreateEditBlog() {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = Boolean(id);
  
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
    if (isEditing && id) {
      fetchPost();
    }
    
    // Check for tab parameter in URL
    const { tab } = router.query;
    if (tab === 'transcript') {
      setActiveTab('transcript');
    }
  }, [id, isEditing, router.query]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/blog?id=${id}`);
      if (response.ok) {
        const post = await response.json();
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || '',
          featuredImage: post.featuredImage,
          author: post.author,
          status: post.status,
          tags: '',
        });
        // Parse tags from JSON string to array
        try {
          const parsedTags = post.tags ? JSON.parse(post.tags) : [];
          setTags(Array.isArray(parsedTags) ? parsedTags : []);
        } catch (error) {
          console.error('Error parsing tags:', error);
          setTags([]);
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        author: formData.author,
        status: formData.status,
        tags: tags,
        featuredImage: formData.featuredImage,
        ...(isEditing && { id: Number(id) })
      };

      const url = '/api/admin/blog';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        router.push('/admin/blog');
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
        <title>{isEditing ? 'Edit Post' : 'Create New Post'} - Admin Dashboard</title>
        <meta name="description" content="Create or edit blog posts" />
      </Head>
      
      <AdminContainer>
        <Header>
          <Title>{isEditing ? 'Edit Post' : 'Create New Post'}</Title>
          <BackLink href="/admin/blog">
            ← Back to Blog Management
          </BackLink>
        </Header>

        {!isEditing && (
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
          <Form>
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
              <CancelButton type="button" onClick={() => router.push('/admin/blog')}>
                Cancel
              </CancelButton>
              <SubmitButton type="button" onClick={handleSubmit}>
                {isEditing ? 'Update Post' : 'Create Post'}
              </SubmitButton>
            </ButtonGroup>
          </Form>
        </TabContent>

        <TabContent active={activeTab === 'transcript'}>
          <Form>
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
                  <CancelButton type="button" onClick={() => router.push('/admin/blog')}>
                    Cancel
                  </CancelButton>
                  <SubmitButton type="button" onClick={handleSubmit}>
                    Create Post
                  </SubmitButton>
                </ButtonGroup>
              </>
            )}
          </Form>
        </TabContent>
      </AdminContainer>
    </>
  );
} 