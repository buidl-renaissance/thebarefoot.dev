import React, { useState } from 'react';
import styled from 'styled-components';

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

export default function PasswordResetRequestForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/auth/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Request failed');
      } else {
        setSuccess(true);
        setEmail('');
      }
    } catch (err) {
      console.error('Error requesting password reset:', err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</Button>
      {error && <Error>{error}</Error>}
      {success && <Success>Check your email for a password reset link.</Success>}
    </Form>
  );
} 