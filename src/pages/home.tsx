import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import type { ThemeType } from "@/styles/theme";

const HeroSection = styled.section<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  text-align: center;
  position: relative;
  padding: 2rem 1rem;

  @media (max-width: 480px) {
    padding: 1rem;
  }

  &::before {
    content: "";
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
      content: "";
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
  border: 2px solid
    ${({ theme, primary }) =>
        primary ? theme.colors.neonOrange : theme.colors.rustedSteel};
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const Section = styled.section<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 4rem 1rem;
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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
`;

const SectionDescription = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled.div<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(255, 79, 0, 0.2);
  }
`;

const CardTitle = styled.h3<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.neonOrange};
`;

const CardDescription = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const CardLink = styled.a<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.neonOrange};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
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
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  width: 300px;

  @media (max-width: 480px) {
    width: 100%;
    border-radius: 8px;
    border-right: 2px solid ${({ theme }) => theme.colors.neonOrange};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const EmailSubmit = styled(CTAButton)`
  border-radius: 0 8px 8px 0;
  border-left: none;

  @media (max-width: 480px) {
    border-radius: 8px;
    border-left: 2px solid ${({ theme }) => theme.colors.neonOrange};
  }
`;

const SuccessMsg = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  text-align: center;
  width: 100%;
`;

const Footer = styled.footer<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 3rem 1rem;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.neonOrange};
`;

const FooterRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;

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

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Column = styled.div``;

const ColumnTitle = styled.h3<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.neonOrange};
`;

const ColumnText = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const ProjectCard = styled(Card) <{ theme: ThemeType }>`
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const ProjectStatus = styled.span<{ theme: ThemeType }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.body};
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
        <>
            <Head>
                <title>thebarefoot.dev | Building community tools, one block at a time</title>
                <meta
                    name="description"
                    content="I'm documenting the process of building small, meaningful tech for real communities — starting with Detroit. This is a space for lessons learned, open-source blueprints, and ideas rooted in care, not scale."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HeroSection>
                <Logo>
                    <Image
                        src="/images/thebarefoot.dev.png"
                        alt="thebarefoot.dev Logo"
                        width={120}
                        height={120}
                    />
                </Logo>
                <Headline>thebarefoot.dev</Headline>
                <Headline>Building community tools, one block at a time.</Headline>
                <Subheadline>
                    I&apos;m documenting the process of building small, meaningful tech for real communities — starting with Detroit. This is a space for lessons learned, open-source blueprints, and ideas rooted in care, not scale.
                </Subheadline>
                <CTAGroup>
                    <CTAButton
                        primary
                        onClick={() =>
                            document
                                .getElementById("newsletter")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        📩 Subscribe for updates
                    </CTAButton>
                    <Link href="/blog" passHref legacyBehavior>
                        <CTAButton as="a">📚 Start reading posts</CTAButton>
                    </Link>
                </CTAGroup>
            </HeroSection>

            <Section>
                <Container>
                    <SectionTitle>About the Project</SectionTitle>
                    <SectionDescription>
                        What is thebarefoot.dev?
                    </SectionDescription>
                    <TwoColumnGrid>
                        <Column>
                            <ColumnTitle>Inspired by Barefoot Doctors</ColumnTitle>
                            <ColumnText>
                                Inspired by the philosophy of barefoot doctors — community members trained to serve their neighbors — this project is about bringing that same spirit to technology.
                            </ColumnText>
                        </Column>
                        <Column>
                            <ColumnTitle>Care Over Scale</ColumnTitle>
                            <ColumnText>
                                It&apos;s not about scaling startups. It&apos;s about building tools that serve real people, in real places, with limited resources and a lot of heart.
                            </ColumnText>
                        </Column>
                    </TwoColumnGrid>
                    <SectionDescription style={{ marginTop: "2rem", fontStyle: "italic" }}>
                        Whether it&apos;s supporting local artists with better event tools or creating lightweight identity systems for neighbors to access services, every project shared here starts with a simple question:
                    </SectionDescription>
                    <SectionTitle style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
                        &quot;How can tech help us take better care of each other?&quot;
                    </SectionTitle>
                </Container>
            </Section>

            <Section>
                <Container>
                    <SectionTitle>Recent Posts</SectionTitle>
                    <Grid>
                        <Card>
                            <CardTitle>🛠️ Dev Journal: Setting up per-user SQLite with Turso</CardTitle>
                            <CardDescription>
                                A breakdown of why I chose Turso for local-first databases, and how I&apos;m using it in a multi-tenant app.
                            </CardDescription>
                            <CardLink href="/blog/turso-sqlite-setup">→ Read more</CardLink>
                        </Card>
                        <Card>
                            <CardTitle>🎨 Detroit Creators & Community Tokens</CardTitle>
                            <CardDescription>
                                Exploring how smart contracts can support reinvestment in local artists — and how we&apos;re testing that at Art Night.
                            </CardDescription>
                            <CardLink href="/blog/detroit-creators-tokens">→ Read more</CardLink>
                        </Card>
                        <Card>
                            <CardTitle>🏙️ Collector Quest: A Game About Neighborhood Relics</CardTitle>
                            <CardDescription>
                                An overview of our alternate reality scavenger hunt — and the tech stack behind it.
                            </CardDescription>
                            <CardLink href="/blog/collector-quest">→ Read more</CardLink>
                        </Card>
                    </Grid>
                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                        <Link href="/blog" passHref legacyBehavior>
                            <CTAButton as="a">→ View all posts</CTAButton>
                        </Link>
                    </div>
                </Container>
            </Section>

            <Section>
                <Container>
                    <SectionTitle>Tools & Tutorials</SectionTitle>
                    <SectionDescription>
                        Start Here → Browse tutorials
                    </SectionDescription>
                    <Grid>
                        <Card>
                            <CardTitle>How to deploy a Turso-powered app on Vercel</CardTitle>
                            <CardLink href="/tutorials/turso-vercel-deploy">→ Read tutorial</CardLink>
                        </Card>
                        <Card>
                            <CardTitle>Using n8n to automate community workflows</CardTitle>
                            <CardLink href="/tutorials/n8n-community-automation">→ Read tutorial</CardLink>
                        </Card>
                        <Card>
                            <CardTitle>Onboarding creators with invite-only token access</CardTitle>
                            <CardLink href="/tutorials/invite-only-tokens">→ Read tutorial</CardLink>
                        </Card>
                        <Card>
                            <CardTitle>Building POAP-style check-ins for local events</CardTitle>
                            <CardLink href="/tutorials/poap-local-events">→ Read tutorial</CardLink>
                        </Card>
                        <Card>
                            <CardTitle>Intro to DID (Decentralized Identity) for communities</CardTitle>
                            <CardLink href="/tutorials/did-communities">→ Read tutorial</CardLink>
                        </Card>
                    </Grid>
                </Container>
            </Section>

            <Section>
                <Container>
                    <SectionTitle>Projects in the Works</SectionTitle>
                    <SectionDescription>
                        Open-Source Experiments from Detroit
                    </SectionDescription>
                    <Grid>
                        <ProjectCard>
                            <ProjectStatus>Active</ProjectStatus>
                            <CardTitle>🧱 Collector Quest</CardTitle>
                            <CardDescription>
                                A story-driven scavenger hunt powered by smart contracts and real-world art.
                            </CardDescription>
                            <CardLink href="/projects/collector-quest">→ View project</CardLink>
                        </ProjectCard>
                        <ProjectCard>
                            <ProjectStatus>Active</ProjectStatus>
                            <CardTitle>🎨 Art Night Tools</CardTitle>
                            <CardDescription>
                                Event automation, check-ins, and artifact minting — all built for a creative nonprofit.
                            </CardDescription>
                            <CardLink href="/projects/art-night-tools">→ View project</CardLink>
                        </ProjectCard>
                        <ProjectCard>
                            <ProjectStatus>In Progress</ProjectStatus>
                            <CardTitle>🧰 Barefoot Starter Kit</CardTitle>
                            <CardDescription>
                                A template repo for starting your own community tools using SQLite, Vercel, and Next.js.
                            </CardDescription>
                            <CardLink href="/projects/barefoot-starter-kit">→ View project</CardLink>
                        </ProjectCard>
                        <ProjectCard>
                            <ProjectStatus>Prototype</ProjectStatus>
                            <CardTitle>🏗️ Local ID System</CardTitle>
                            <CardDescription>
                                A lightweight decentralized identity layer for neighbors, orgs, and services to connect.
                            </CardDescription>
                            <CardLink href="/projects/local-id-system">→ View project</CardLink>
                        </ProjectCard>
                    </Grid>
                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                        <Link href="/projects" passHref legacyBehavior>
                            <CTAButton as="a">→ View Projects</CTAButton>
                        </Link>
                        <span style={{ margin: "0 1rem" }}>|</span>
                        <Link href="https://github.com/thebarefoot-dev" passHref legacyBehavior>
                            <CTAButton as="a">Contribute on GitHub</CTAButton>
                        </Link>
                    </div>
                </Container>
            </Section>

            <Section id="newsletter">
                <Container>
                    <SectionTitle>Stay in the Loop</SectionTitle>
                    <SectionDescription>
                        Get the latest blog posts, tools, and Detroit dev events in your inbox.
                    </SectionDescription>
                    <EmailForm onSubmit={handleEmailSubmit}>
                        <EmailInput
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            aria-label="Email address"
                        />
                        <EmailSubmit primary type="submit">
                            📩 Subscribe to the newsletter
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
                </Container>
            </Section>

            <Footer>
                <div style={{ marginBottom: "2rem" }}>
                    <FooterLink href="/about">🧭 About</FooterLink>
                    <span style={{ margin: "0 1rem", opacity: 0.5 }}>|</span>
                    <FooterLink href="/projects">🛠️ Projects</FooterLink>
                    <span style={{ margin: "0 1rem", opacity: 0.5 }}>|</span>
                    <FooterLink href="/blog">📚 Blog</FooterLink>
                    <span style={{ margin: "0 1rem", opacity: 0.5 }}>|</span>
                    <FooterLink href="mailto:hello@thebarefoot.dev">✉️ Contact</FooterLink>
                </div>
                <FooterRow>
                    <FooterLink href="https://github.com/thebarefoot-dev">
                        <FontAwesomeIcon
                            icon={faGithub}
                            style={{ marginRight: "0.5rem" }}
                        />
                        GitHub
                    </FooterLink>
                    <FooterLink href="https://www.instagram.com/thebarefoot.dev">
                        <FontAwesomeIcon
                            icon={faInstagram}
                            style={{ marginRight: "0.5rem" }}
                        />
                        Instagram
                    </FooterLink>
                    <FooterLink href="mailto:john@dpop.tech">
                        Email
                    </FooterLink>
                </FooterRow>
                <div style={{ marginTop: "2rem", opacity: 0.7, fontSize: "0.9rem" }}>
                    Built in Detroit with purpose.
                </div>
            </Footer>
        </>
    );
}
