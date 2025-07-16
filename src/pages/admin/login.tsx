import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import LoginForm from '@/components/LoginForm';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 2rem;
`;

const AuthFormsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 4rem);
`;

export default function AdminLogin() {
  return (
    <AdminContainer>
      <Head>
        <title>Admin Login - The Barefoot Dev</title>
      </Head>
      <AuthFormsWrapper>
        <LoginForm />
      </AuthFormsWrapper>
    </AdminContainer>
  );
} 