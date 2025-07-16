import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { withAdminAuth } from './withAdminAuth';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
`;

const Sidebar = styled.aside`
  width: 250px;
  background: rgba(255, 255, 255, 0.03);
  border-right: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  min-height: 100vh;
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin-bottom: 2rem;
  text-align: center;
`;

const NavSection = styled.div`
  margin-bottom: 2rem;
`;

const NavTitle = styled.h3`
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  display: block;
  padding: 0.75rem 1rem;
  color: ${({ theme, active }) => active ? theme.colors.neonOrange : theme.colors.creamyBeige};
  text-decoration: none;
  border-radius: 4px;
  background: ${({ active }) => active ? 'rgba(255, 79, 0, 0.1)' : 'transparent'};
  border: 1px solid ${({ theme, active }) => active ? theme.colors.neonOrange : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 79, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

function AdminLayoutBase({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(path + '/');
  };

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>The Barefoot Dev</Logo>
        
        <NavSection>
          <NavTitle>Main</NavTitle>
          <NavLink href="/admin" active={isActive('/admin')}>
            Dashboard
          </NavLink>
        </NavSection>

        <NavSection>
          <NavTitle>Content</NavTitle>
          <NavLink href="/admin/blog" active={isActive('/admin/blog')}>
            Blog Posts
          </NavLink>
          <NavLink href="/admin/blog-digest" active={isActive('/admin/blog-digest')}>
            Blog Digest
          </NavLink>
        </NavSection>

        <NavSection>
          <NavTitle>Community</NavTitle>
          <NavLink href="/admin/events" active={isActive('/admin/events')}>
            Events
          </NavLink>
          <NavLink href="/admin/profiles" active={isActive('/admin/profiles')}>
            Profiles
          </NavLink>
        </NavSection>
      </Sidebar>
      
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
}

export const AdminLayout = withAdminAuth(AdminLayoutBase); 