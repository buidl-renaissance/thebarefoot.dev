import React, { Suspense, useEffect } from 'react';
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

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div>
      <Toolbar>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          Bold
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          Italic
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
        >
          Strike
        </ToolbarButton>
        <ToolbarButton
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
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          Bullet List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          Ordered List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        >
          Quote
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
        >
          Left
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
        >
          Center
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
        >
          Right
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const url = window.prompt('Enter URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          active={editor.isActive('link')}
        >
          Link
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
        >
          Unlink
        </ToolbarButton>
      </Toolbar>
      
      <EditorContainer>
        <EditorContent editor={editor} />
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