import React, { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';

const EditorContainer = styled.div`
  .ProseMirror {
    min-height: 300px;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.creamyBeige};
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid ${({ theme }) => theme.colors.neonOrange};
    border-radius: 4px;
    padding: 1rem;
    outline: none;
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.neonOrange};
    }
    
    p {
      margin-bottom: 1rem;
    }
    
    h1, h2, h3, h4, h5, h6 {
      color: ${({ theme }) => theme.colors.neonOrange};
      font-family: ${({ theme }) => theme.fonts.heading};
      margin-bottom: 1rem;
    }
    
    a {
      color: ${({ theme }) => theme.colors.neonOrange};
    }
    
    blockquote {
      border-left: 4px solid ${({ theme }) => theme.colors.neonOrange};
      padding-left: 1rem;
      margin: 1rem 0;
      font-style: italic;
    }
    
    code {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    
    pre {
      background: rgba(255, 255, 255, 0.05);
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }
    
    ul, ol {
      margin-bottom: 1rem;
      padding-left: 2rem;
    }
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.rustedSteel};
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  border-bottom: none;
  border-radius: 4px 4px 0 0;
`;

const ToolbarButton = styled.button<{ active?: boolean }>`
  background: ${({ theme, active }) => 
    active ? theme.colors.neonOrange : 'transparent'};
  color: ${({ theme, active }) => 
    active ? theme.colors.asphaltBlack : theme.colors.creamyBeige};
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.asphaltBlack};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ToolbarSelect = styled.select`
  background: transparent;
  color: ${({ theme }) => theme.colors.creamyBeige};
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  cursor: pointer;
  
  option {
    background: ${({ theme }) => theme.colors.asphaltBlack};
    color: ${({ theme }) => theme.colors.creamyBeige};
  }
`;

const LinkInputContainer = styled.div<{ position: { top: number; left: number } | null; visible: boolean }>`
  position: absolute;
  z-index: 1000;
  display: ${({ position, visible }) => (position && visible) ? 'flex' : 'none'};
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  border-radius: 6px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 280px;
  top: ${({ position }) => position ? `${position.top}px` : '0px'};
  left: ${({ position }) => position ? `${position.left}px` : '0px'};
`;

const LinkInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel};
  }
`;

const ReturnButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.neonOrange};
  border-radius: 4px;
  padding: 0.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.asphaltBlack};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

interface WYSIWYGEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ThemedEditor: React.FC<WYSIWYGEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Write your blog post content..." 
}) => {
  const [linkInputVisible, setLinkInputVisible] = useState(false);
  const [linkInputPosition, setLinkInputPosition] = useState<{ top: number; left: number } | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const linkInputRef = useRef<HTMLInputElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  console.log('WYSIWYG Editor - Value prop:', value);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color,
      TextStyle,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        placeholder,
      },
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor) {
      const currentContent = editor.getHTML();
      console.log('WYSIWYG Editor - Value prop:', value);
      console.log('WYSIWYG Editor - Current content:', currentContent);
      if (value !== currentContent) {
        console.log('WYSIWYG Editor - Setting new content');
        editor.commands.setContent(value || '', false);
      }
    }
  }, [editor, value]);

  // Function to hide link input
  const hideLinkInput = useCallback(() => {
    setLinkInputVisible(false);
    setLinkInputPosition(null);
    setLinkUrl('');
    editor?.chain().focus().run();
  }, [editor]);

  // Click outside to close link input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (linkInputVisible) {
        const target = event.target as Element;
        const linkContainer = document.querySelector('[data-link-input-container]');
        
        // Close if clicking outside the link input container
        if (linkContainer && !linkContainer.contains(target)) {
          hideLinkInput();
        }
      }
    };

    if (linkInputVisible) {
      // Add a small delay to prevent immediate closing when opening
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [linkInputVisible, hideLinkInput]);

  // Function to show link input positioned relative to selection
  const showLinkInput = useCallback(() => {
    if (!editor || !editorContainerRef.current) return;

    const { from, to } = editor.state.selection;
    if (from === to) return; // No text selected

    // Get the selection coordinates
    const coords = editor.view.coordsAtPos(from);
    const containerRect = editorContainerRef.current.getBoundingClientRect();
    
    // Calculate position relative to the editor container with better positioning
    let top = coords.top - containerRect.top - 50; // 50px above the selection
    let left = coords.left - containerRect.left;
    
    // Ensure the input doesn't go outside the container bounds
    const inputWidth = 280; // min-width from styled component
    if (left + inputWidth > containerRect.width) {
      left = containerRect.width - inputWidth - 10; // 10px margin from right edge
    }
    if (left < 10) {
      left = 10; // 10px margin from left edge
    }
    if (top < 10) {
      top = coords.bottom - containerRect.top + 10; // Position below selection if no space above
    }

    const position = { top, left };

    // Get existing link URL if text is already linked
    const existingLink = editor.getAttributes('link');
    setLinkUrl(existingLink.href || '');
    
    setLinkInputPosition(position);
    setLinkInputVisible(true);
    
    // Focus the input after a brief delay to ensure it's rendered
    setTimeout(() => {
      linkInputRef.current?.focus();
    }, 10);
  }, [editor]);

  // Keyboard shortcut for link input (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        event.stopPropagation();
        
        // Only trigger if editor is focused and has text selection
        if (editor && editor.isFocused) {
          const { from, to } = editor.state.selection;
          if (from !== to) { // Has text selected
            showLinkInput();
          }
        }
      }
    };

    // Add event listener to the document
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor, showLinkInput]);

  // Function to apply the link
  const applyLink = () => {
    if (!editor || !linkUrl.trim()) return;

    editor.chain().focus().setLink({ href: linkUrl.trim() }).run();
    hideLinkInput();
  };

  // Handle keyboard events for link input
  const handleLinkInputKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation(); // Prevent event from bubbling to parent form
    
    if (e.key === 'Enter') {
      e.preventDefault();
      applyLink();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      hideLinkInput();
    }
  };

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div>
      <Toolbar>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          Bold
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          Italic
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
        >
          Strike
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive('code')}
        >
          Code
        </ToolbarButton>
        
        <ToolbarSelect
          value={editor.isActive('heading', { level: 1 }) ? 'h1' :
                 editor.isActive('heading', { level: 2 }) ? 'h2' :
                 editor.isActive('heading', { level: 3 }) ? 'h3' : 'p'}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'p') {
              editor.chain().focus().setParagraph().run();
                         } else {
               const level = parseInt(value.slice(1)) as 1 | 2 | 3;
               editor.chain().focus().toggleHeading({ level }).run();
             }
          }}
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </ToolbarSelect>
        
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          Bullet List
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          Ordered List
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        >
          Quote
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
        >
          Left
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
        >
          Center
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
        >
          Right
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={showLinkInput}
          active={editor.isActive('link')}
        >
          Link
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
        >
          Unlink
        </ToolbarButton>
      </Toolbar>
      
      <EditorContainer ref={editorContainerRef} style={{ position: 'relative' }}>
        <EditorContent editor={editor} />
        
        <LinkInputContainer 
          position={linkInputPosition} 
          visible={linkInputVisible}
          data-link-input-container
        >
          <LinkInput
            ref={linkInputRef}
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={handleLinkInputKeyDown}
            placeholder="Enter URL (https://...)"
          />
          <ReturnButton
            type="button"
            onClick={applyLink}
            title="Apply link (Enter)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5m7 7l-7-7 7-7"/>
            </svg>
          </ReturnButton>
        </LinkInputContainer>
      </EditorContainer>
    </div>
  );
};

export const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Write your blog post content..." 
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemedEditor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Suspense>
  );
}; 