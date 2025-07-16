import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { AdminLayout } from '@/components/AdminLayout';

const ProfilesContainer = styled.div``;

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

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.rustedSteel};
`;

const Td = styled.td`
  padding: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Tr = styled.tr`
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
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
  margin-left: 0.5rem;
  
  &:hover {
    background: ${({ theme, variant }) => 
      variant === 'delete' ? theme.colors.brickRed : theme.colors.neonOrange};
    color: ${({ theme, variant }) => 
      variant === 'delete' ? theme.colors.creamyBeige : theme.colors.asphaltBlack};
  }
`;

interface Profile {
  id: number;
  name: string;
  email: string;
  linkedin: string | null;
  bio: string | null;
  experience: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default function AdminProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async () => {
    try {
      const response = await fetch('/api/admin/profiles');
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (profileId: number) => {
    if (!confirm('Are you sure you want to delete this profile?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/profiles/${profileId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProfiles(profiles.filter(profile => profile.id !== profileId));
      } else {
        alert('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Error deleting profile');
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div>Loading profiles...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Admin - Profiles | The Barefoot Developer</title>
      </Head>
      <ProfilesContainer>
        <Header>
          <Title>Profiles</Title>
        </Header>

        <ActionBar>
          <CreateButton href="/admin/profiles/create">
            Create New Profile
          </CreateButton>
        </ActionBar>

        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>LinkedIn</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <Tr key={profile.id}>
                <Td>{profile.name}</Td>
                <Td>{profile.email}</Td>
                <Td>
                  {profile.linkedin ? (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                      View Profile
                    </a>
                  ) : '-'}
                </Td>
                <Td>{formatDate(profile.createdAt)}</Td>
                <Td>
                  <ActionButton onClick={() => window.location.href = `/admin/profiles/${profile.id}/edit`}>
                    Edit
                  </ActionButton>
                  <ActionButton 
                    variant="delete" 
                    onClick={() => handleDeleteProfile(profile.id)}
                  >
                    Delete
                  </ActionButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </ProfilesContainer>
    </AdminLayout>
  );
} 