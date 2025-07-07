import { useState } from "react";
import styled from "styled-components";
import type { ThemeType } from "@/styles/theme";

const EmailSection = styled.section<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 4rem 1rem;
  text-align: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.neonOrange},
      transparent
    );
  }
`;

const EmailTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const EmailDescription = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
`;

const EmailForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const EmailInput = styled.input<{ theme: ThemeType }>`
  padding: 1rem 1.5rem;
  border-radius: 8px 0 0 8px;
  border: 2px solid ${({ theme }) => theme.colors.neonOrange};
  border-right: none;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  width: 300px;
  max-width: 90vw;
  background: rgba(255, 255, 255, 0.15);
  color: ${({ theme }) => theme.colors.creamyBeige};
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
    border-radius: 8px;
    border-right: 2px solid ${({ theme }) => theme.colors.neonOrange};
  }

  &::placeholder {
    color: rgba(245, 233, 218, 0.6);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 0 0 3px rgba(255, 79, 0, 0.2);
  }
`;

const EmailSubmit = styled.button<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  border: 3px solid ${({ theme }) => theme.colors.neonOrange};
  border-left: none;
  border-radius: 0 8px 8px 0;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 200px;

  @media (max-width: 480px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
    min-width: 180px;
    border-radius: 8px;
    border-left: 2px solid ${({ theme }) => theme.colors.neonOrange};
    width: 100%;
    max-width: 280px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SuccessMsg = styled.p<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.neonOrange};
  font-weight: 600;
  margin-top: 0.5rem;
  font-size: 1rem;
  text-align: center;
  width: 100%;
`;

interface EmailSubscriptionProps {
  title?: string;
  description?: string;
  id?: string;
}

export default function EmailSubscription({ 
  title = "Subscribe for updates", 
  description = "I'm documenting the process of building small, meaningful tech for real communities — starting with Detroit. This is a space for lessons learned, open-source blueprints, and ideas rooted in care, not scale.",
  id = "email-capture"
}: EmailSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setError("");
        setEmail("");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
        setSuccess(false);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setError("Something went wrong. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <EmailSection id={id}>
      <EmailTitle>{title}</EmailTitle>
      <EmailDescription>{description}</EmailDescription>
      <EmailForm onSubmit={handleEmailSubmit}>
        <EmailInput
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={handleEmailChange}
          required
          aria-label="Email address"
        />
        <EmailSubmit type="submit">
          Sign Up
        </EmailSubmit>
      </EmailForm>
      {error && (
        <SuccessMsg style={{ color: "#B33A3A" }}>{error}</SuccessMsg>
      )}
      {success && (
        <SuccessMsg>
          You&apos;re in. We&apos;ll be in touch soon.
        </SuccessMsg>
      )}
    </EmailSection>
  );
} 