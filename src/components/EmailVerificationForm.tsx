import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;
const Button = styled.button`
  padding: 0.75rem;
  background: #ff4f00;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover { background: #ff6b35; }
`;
const Error = styled.div`
  color: #d32f2f;
  font-size: 0.95rem;
`;
const Success = styled.div`
  color: #388e3c;
  font-size: 0.95rem;
`;

export default function EmailVerificationForm() {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Verification failed');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      console.error('Error verifying email:', err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Button type="submit" disabled={loading || !token}>{loading ? 'Verifying...' : 'Verify Email'}</Button>
      {error && <Error>{error}</Error>}
      {success && <Success>Email verified! You can now log in.</Success>}
    </Form>
  );
} 