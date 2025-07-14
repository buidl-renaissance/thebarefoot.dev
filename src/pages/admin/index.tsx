import React from 'react';
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

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.neonOrange};
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const CardLink = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.brickRed};
    transform: translateY(-1px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: rgba(255, 79, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
`;

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export default function AdminDashboard() {
  return (
    <>
      <Head>
        <title>Admin Dashboard - The Barefoot Dev</title>
        <meta name="description" content="Admin dashboard for The Barefoot Dev" />
      </Head>
      
      <AdminContainer>
        <Header>
          <Title>Admin Dashboard</Title>
          <Subtitle>Manage your community and content</Subtitle>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatNumber>12</StatNumber>
            <StatLabel>Events</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>156</StatNumber>
            <StatLabel>Subscribers</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>8</StatNumber>
            <StatLabel>Blog Posts</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>23</StatNumber>
            <StatLabel>Members</StatLabel>
          </StatCard>
        </StatsGrid>

        <DashboardGrid>
          <Card>
            <CardTitle>Events Management</CardTitle>
            <CardDescription>
              Create, edit, and manage community events, workshops, and meetups. 
              Schedule new events and update existing ones.
            </CardDescription>
            <CardLink href="/admin/events">
              Manage Events →
            </CardLink>
          </Card>

          <Card>
            <CardTitle>Blog Management</CardTitle>
            <CardDescription>
              Write and edit blog posts, manage content, and publish articles 
              for the community.
            </CardDescription>
            <CardLink href="/admin/blog">
              Manage Blog →
            </CardLink>
          </Card>

          <Card>
            <CardTitle>Community Members</CardTitle>
            <CardDescription>
              View and manage community members, their roles, and engagement 
              with the platform.
            </CardDescription>
            <CardLink href="/admin/members">
              Manage Members →
            </CardLink>
          </Card>

          <Card>
            <CardTitle>Email Subscriptions</CardTitle>
            <CardDescription>
              Monitor email subscriptions, manage subscriber lists, and track 
              newsletter performance.
            </CardDescription>
            <CardLink href="/admin/subscriptions">
              Manage Subscriptions →
            </CardLink>
          </Card>

          <Card>
            <CardTitle>Blog Digest</CardTitle>
            <CardDescription>
              Send recent blog posts to subscribers with a specified date range. 
              Perfect for weekly or monthly newsletters.
            </CardDescription>
            <CardLink href="/admin/blog-digest">
              Send Blog Digest →
            </CardLink>
          </Card>
        </DashboardGrid>
      </AdminContainer>
    </>
  );
} 