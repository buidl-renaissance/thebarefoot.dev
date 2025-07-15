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

const ProfilesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProfileName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin: 0;
`;

const ProfileActions = styled.div`
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

const ProfileDetails = styled.div`
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

const ProfileBio = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  line-height: 1.6;
  margin: 0;
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
      <AdminContainer>
        <div>Loading profiles...</div>
      </AdminContainer>
    );
  }

  return (
    <>
      <Head>
        <title>Admin - Profiles | The Barefoot Developer</title>
      </Head>
      <AdminContainer>
        <Header>
          <Title>Profiles</Title>
          <BackLink href="/admin">
            ← Back to Admin
          </BackLink>
        </Header>

        <ActionBar>
          <CreateButton href="/admin/profiles/create">
            Create New Profile
          </CreateButton>
        </ActionBar>

        <ProfilesGrid>
          {profiles.map((profile) => (
            <ProfileCard key={profile.id}>
              <ProfileHeader>
                <ProfileName>{profile.name}</ProfileName>
                <ProfileActions>
                  <ActionButton onClick={() => window.location.href = `/admin/profiles/${profile.id}/edit`}>
                    Edit
                  </ActionButton>
                  <ActionButton 
                    variant="delete" 
                    onClick={() => handleDeleteProfile(profile.id)}
                  >
                    Delete
                  </ActionButton>
                </ProfileActions>
              </ProfileHeader>

              <ProfileDetails>
                <DetailItem>
                  <DetailLabel>Email</DetailLabel>
                  <DetailValue>{profile.email}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>LinkedIn</DetailLabel>
                  <DetailValue>
                    {profile.linkedin ? (
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5' }}>
                        View Profile
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Created</DetailLabel>
                  <DetailValue>{formatDate(profile.createdAt)}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Updated</DetailLabel>
                  <DetailValue>{formatDate(profile.updatedAt)}</DetailValue>
                </DetailItem>
              </ProfileDetails>

              {profile.bio && (
                <ProfileBio>
                  {profile.bio.length > 150 
                    ? `${profile.bio.substring(0, 150)}...` 
                    : profile.bio
                  }
                </ProfileBio>
              )}
            </ProfileCard>
          ))}
        </ProfilesGrid>

        {profiles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>No profiles found. Create your first profile!</p>
          </div>
        )}
      </AdminContainer>
    </>
  );
} 