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
const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
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

export default function PasswordResetForm() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Reset failed');
      } else {
        setSuccess(true);
        setPassword('');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="password" type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <Button type="submit" disabled={loading || !token}>{loading ? 'Resetting...' : 'Reset Password'}</Button>
      {error && <Error>{error}</Error>}
      {success && <Success>Password reset! You can now log in.</Success>}
    </Form>
  );
} 