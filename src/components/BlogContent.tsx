import React from 'react';
import styled from 'styled-components';
import type { ThemeType } from '@/styles/theme';

const ContentContainer = styled.div<{ theme: ThemeType }>`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  line-height: 1.8;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.creamyBeige};
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul,
  ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
    p {
      margin-bottom: 0.5rem;
    }
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.neonOrange};
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    opacity: 0.9;
  }

  code {
    background: ${({ theme }) => theme.colors.rustedSteel};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.9em;
  }

  pre {
    background: ${({ theme }) => theme.colors.rustedSteel};
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 2rem 0;
    border: 1px solid ${({ theme }) => theme.colors.neonOrange}20;

    code {
      background: none;
      padding: 0;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.neonOrange};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s ease;

    &:hover {
      border-bottom-color: ${({ theme }) => theme.colors.neonOrange};
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 0.9rem;
    min-width: 600px; /* Ensure minimum width for readability */
  }

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.rustedSteel};
    vertical-align: top;
  }

  th {
    background: ${({ theme }) => theme.colors.rustedSteel}40;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neonOrange};
    font-family: ${({ theme }) => theme.fonts.heading};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.8rem;
  }

  td {
    color: ${({ theme }) => theme.colors.creamyBeige};
  }

  tr:hover {
    background: ${({ theme }) => theme.colors.rustedSteel}20;
  }

  /* Table container with horizontal scroll */
  .table-container {
    width: 100%;
    overflow-x: auto;
    margin: 2rem 0;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.rustedSteel}40;
  }

  .table-container table {
    margin: 0;
    min-width: 600px;
  }
`;

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const processContent = (htmlContent: string): string => {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Find all table elements and wrap them in a scrollable container
    const tables = tempDiv.querySelectorAll('table');
    tables.forEach((table) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-container';
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
    
    return tempDiv.innerHTML;
  };

  // Use useEffect to process the content after the component mounts
  const [processedContent, setProcessedContent] = React.useState(content);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setProcessedContent(processContent(content));
    }
  }, [content]);

  return (
    <ContentContainer 
      dangerouslySetInnerHTML={{ __html: processedContent }} 
    />
  );
};

export default BlogContent; 