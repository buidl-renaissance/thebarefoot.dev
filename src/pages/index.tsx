import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import type { ThemeType } from "@/styles/theme";

const HeroSection = styled.section<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  text-align: center;
  position: relative;
  padding: 2rem 1rem;
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,79,0,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.8;
  }
`;

const Headline = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.6rem, 5vw, 3.5rem);
  font-weight: bold;
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
  line-height: 1.1;
  position: relative;
  z-index: 1;
  padding: 0 1rem;
  
  &:last-of-type {
    margin-bottom: 1.5rem;
  }
  
  &:nth-of-type(2) {
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(20%);
      width: 100px;
      height: 4px;
      background: ${({ theme }) => theme.colors.neonOrange};
      border-radius: 2px;
    }
  }
`;

const Subheadline = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  margin-bottom: 3rem;
  max-width: 700px;
  line-height: 1.6;
  opacity: 0.9;
  position: relative;
  z-index: 1;
  padding: 0 1rem;
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  padding: 0 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const CTAButton = styled.button<{ primary?: boolean; theme: ThemeType }>`
  background: ${({ theme, primary }) =>
    primary ? theme.colors.neonOrange : theme.colors.rustedSteel};
  color: ${({ theme }) => theme.colors.creamyBeige};
  border: 2px solid ${({ theme, primary }) => primary ? theme.colors.neonOrange : theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  min-width: 200px;
  
  @media (max-width: 480px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
    min-width: 180px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const EmailSection = styled.section<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 4rem 1rem;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.neonOrange}, transparent);
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
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const EmailInput = styled.input<{ theme: ThemeType }>`
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.neonOrange};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  width: 300px;
  max-width: 90vw;
  background: rgba(255,255,255,0.15);
  color: ${({ theme }) => theme.colors.creamyBeige};
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    width: 280px;
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }
  
  &::placeholder {
    color: rgba(245,233,218,0.6);
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 0 0 3px rgba(255,79,0,0.2);
  }
`;

const EmailSubmit = styled(CTAButton).attrs({ as: "button" })``;

const SuccessMsg = styled.p<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.neonOrange};
  font-weight: 600;
  margin-top: 0.5rem;
  font-size: 1rem;
`;

const WhyJoinSection = styled.section<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.creamyBeige};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 5rem 1rem;
  text-align: center;
  position: relative;
`;

const SectionTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.colors.neonOrange};
    border-radius: 2px;
  }
`;

const ThreeColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto 3rem auto;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
    padding: 0 0.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

const Column = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255,255,255,0.7);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const ColumnIcon = styled.div<{ theme: ThemeType }>`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
`;

const ColumnTitle = styled.h3<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ColumnText = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.asphaltBlack};
`;

const ProjectsSection = styled.section<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 4rem 1rem;
  text-align: center;
  position: relative;
`;

const ProjectsTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ProjectsDescription = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
`;

const AboutPreview = styled.section<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.creamyBeige};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 4rem 1rem;
  text-align: center;
  position: relative;
`;

const AboutText = styled.p<{ theme: ThemeType }>`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  opacity: 0.9;
`;

const Footer = styled.footer<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 3rem 1rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.neonOrange}, transparent);
  }
`;

const FooterRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 480px) {
    gap: 1rem;
    flex-direction: column;
  }
`;

const FooterLink = styled.a<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.neonOrange};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.creamyBeige};
  }
`;

const Logo = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export default function Home() {
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
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      console.error('Subscription error:', error);
      setError("Something went wrong. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <>
      <Head>
        <title>Barefoot Developer Group | Detroit</title>
        <meta name="description" content="Build for your people. Code with purpose. Join a network of Detroit technologists and creators building tools for collective ownership, empowerment, and change." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
              <HeroSection>
          <Logo>
            <Image src="/images/thebarefoot.dev.png" alt="Barefoot Dev Logo" width={150} height={150} />
          </Logo>
          <Headline>Build for your people.</Headline>
          <Headline>Code with purpose.</Headline>
          <Subheadline>
            Join a network of Detroit technologists and creators building tools for collective ownership, empowerment, and change.
          </Subheadline>
        <CTAGroup>
          <CTAButton primary onClick={() => document.getElementById("email-capture")?.scrollIntoView({ behavior: "smooth" })}>
            Join the Movement
          </CTAButton>
          <Link href="/about" passHref legacyBehavior>
            <CTAButton as="a">What We&apos;re About</CTAButton>
          </Link>
        </CTAGroup>
      </HeroSection>
      <EmailSection id="email-capture">
        <EmailTitle>Join the Collective</EmailTitle>
        <EmailDescription>
          Get updates on community hack nights, open-source projects, and how you can get involved. Be the first to shape the future of civic tech in Detroit.
        </EmailDescription>
        <EmailForm onSubmit={handleEmailSubmit}>
          <EmailInput
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={handleEmailChange}
            required
            aria-label="Email address"
          />
          <EmailSubmit primary type="submit">Sign Up</EmailSubmit>
          {error && <SuccessMsg style={{ color: '#B33A3A' }}>{error}</SuccessMsg>}
          {success && <SuccessMsg>You&apos;re in. We&apos;ll be in touch soon.</SuccessMsg>}
        </EmailForm>
      </EmailSection>
      <WhyJoinSection>
        <SectionTitle>Why Barefoot Devs?</SectionTitle>
        <ThreeColumnGrid>
          <Column>
            <ColumnIcon>🛠️</ColumnIcon>
            <ColumnTitle>Build with Purpose</ColumnTitle>
            <ColumnText>
              Open-source tools built for real-world use — from affordable housing to artist empowerment.
            </ColumnText>
          </Column>
          <Column>
            <ColumnIcon>🤝</ColumnIcon>
            <ColumnTitle>Community-Centered Collaboration</ColumnTitle>
            <ColumnText>
              Join others like you who care about Detroit and want to use tech to uplift their people.
            </ColumnText>
          </Column>
          <Column>
            <ColumnIcon>🔓</ColumnIcon>
            <ColumnTitle>Own What You Create</ColumnTitle>
            <ColumnText>
              Every line of code, every idea — credited, open-source, and community-owned.
            </ColumnText>
          </Column>
        </ThreeColumnGrid>
      </WhyJoinSection>
      <ProjectsSection>
        <ProjectsTitle>Live Projects</ProjectsTitle>
        <ProjectsDescription>
          Now Collaborating On: Collector Quest, Art Night Detroit, Neighborhood Housing Tools.
        </ProjectsDescription>
        <CTAButton primary>Join a Project</CTAButton>
      </ProjectsSection>
      <AboutPreview>
        <AboutText>
          We&apos;re inspired by the barefoot doctors of China — community-trained, resourceful, and people-first. We build tech the same way: with care, craft, and collective wisdom.
        </AboutText>
        <Link href="/about" passHref legacyBehavior>
          <CTAButton as="a">👉 Learn More</CTAButton>
        </Link>
      </AboutPreview>
      <Footer>
        <FooterRow>
          <FooterLink href="https://github.com/buidl-renaissance">GitHub</FooterLink>
          <FooterLink href="https://www.instagram.com/thebarefoot.dev">Instagram</FooterLink>
        </FooterRow>
      </Footer>
    </>
  );
}
