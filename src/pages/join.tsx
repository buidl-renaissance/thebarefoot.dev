import Head from "next/head";
import styled from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ThemeType } from "@/styles/theme";

const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  min-height: 100vh;
  padding: 0;
`;

const HeroSection = styled.section<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  position: relative;
  padding: 4rem 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,79,0,0.15)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
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

const Headline = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
  line-height: 1.3;
  position: relative;
  z-index: 1;
  
  span {
    color: ${({ theme }) => theme.colors.neonOrange};
  }
  small {
    font-size: 0.45em;
  }
`;

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: ${({ theme }) => theme.colors.neonOrange};
  margin-bottom: 2rem;
  letter-spacing: 2px;
  position: relative;
`;

const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const List = styled.ul`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 1.5rem 0;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 1rem;
`;

const Emphasis = styled.em`
  color: ${({ theme }) => theme.colors.neonYellow};
  font-style: normal;
  font-weight: 400;
`;

export default function JoinPage() {
  return (
    <PageWrapper>
      <Head>
        <title>Build Public AI - The Barefoot Dev</title>
        <meta name="description" content="Join us in building public AI for the people, by the people – starting right here in Detroit." />
      </Head>

      <Header />

      <HeroSection>
        <Headline>
        <small>For the People, By the People</small><br />Build <span>Public AI</span>
        <br />in Detroit
        </Headline>
        {/* <Subheadline>
          Starting Right Here in <span>Detroit</span>
        </Subheadline> */}
      </HeroSection>

      <Main>
        <Section>
          <Paragraph>
            What if artificial intelligence didn&apos;t just belong to Big Tech?
          </Paragraph>
          <Paragraph>
            What if AI was designed by communities—for communities—so it could <Emphasis>actually serve us</Emphasis>? That&apos;s the future we&apos;re working toward.
          </Paragraph>
          <Paragraph>
            And we want you to be part of it.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>🧠 The Vision: Community-Based Public AI</SectionTitle>
          <Paragraph>
            We&apos;re launching a collaborative project to build a <Emphasis>public, community-driven AI system</Emphasis>—starting with local events, organizers, artists, and initiatives here in Detroit.
          </Paragraph>
          <Paragraph>
            This AI won&apos;t sell your data.<br />
            It won&apos;t optimize for clicks.<br />
            It&apos;ll help us <Emphasis>organize, document, and grow</Emphasis> our communities.
          </Paragraph>
          <Paragraph>
            We&apos;ll start by collecting and structuring public information—who&apos;s speaking, what&apos;s happening, and why it matters—so people can:
          </Paragraph>
          <List>
            <ListItem>Discover events and gatherings that align with their values</ListItem>
            <ListItem>Learn from local voices and creators</ListItem>
            <ListItem>Connect with others working toward shared goals</ListItem>
            <ListItem>Onboard more easily into local ecosystems</ListItem>
          </List>
          <Paragraph>
            This is about building an <Emphasis>AI assistant for civic and creative life</Emphasis>, grounded in our own values—not Silicon Valley&apos;s.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>💸 Fellowship Details</SectionTitle>
          <Paragraph>
            This project is part of the <Emphasis>Public AI Creative Fellowship</Emphasis>, a national program hosted by Metagov and supported by the Center for Cultural Innovation.
          </Paragraph>
          <Paragraph>
            Each selected fellow receives a <Emphasis>$5,000 stipend</Emphasis> and works over a six-month period to shape a public vision of AI that is inclusive, accountable, and community-rooted.
          </Paragraph>
          <List>
            <ListItem>🗓 Application Deadline: August 15, 2025</ListItem>
            <ListItem>📅 Fellowship begins: September 29, 2025</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>👥 Join the Team</SectionTitle>
          <Paragraph>
            I&apos;m applying as the <Emphasis>Creative Technologist</Emphasis>—building interactive tools to help communities better organize and engage with public life.
          </Paragraph>
          <Paragraph>
            Now I&apos;m looking for <Emphasis>two collaborators</Emphasis> to complete the team:
          </Paragraph>
          <List>
            <ListItem>
              <Emphasis>🎥 A Video Creator</Emphasis><br />
              Someone who can tell this story visually—through a short documentary, video series, or multimedia piece that brings the stakes of public AI to life.
            </ListItem>
            <ListItem>
              <Emphasis>✍️ A Writer</Emphasis><br />
              Someone who can craft a compelling narrative—speculative, persuasive, or poetic—that reshapes how we imagine AI, infrastructure, and collective power.
            </ListItem>
          </List>
          <Paragraph>
            These roles can be filled by one person or two. You&apos;ll join as a full fellow with a $5,000 stipend and creative freedom to help shape this project from the ground up.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>🚀 How to Get Involved</SectionTitle>
          <List>
            <ListItem><Emphasis>Want to apply together?</Emphasis> Email me: john@dpop.tech</ListItem>
            <ListItem><Emphasis>Know someone perfect for this?</Emphasis> Please share this with them.</ListItem>
            <ListItem><Emphasis>Curious but not sure where you fit?</Emphasis> Let&apos;s talk. There may be more ways to collaborate beyond the fellowship.</ListItem>
          </List>
          <Paragraph>
            This is a call to reimagine what AI could be—not just a product, but <Emphasis>public infrastructure</Emphasis>.
            Let&apos;s make sure it&apos;s rooted in us.
          </Paragraph>
          <Paragraph>
            Let&apos;s build it <Emphasis>here</Emphasis>.<br />
            Let&apos;s build it <Emphasis>together</Emphasis>.
          </Paragraph>
          
          {/* <CTAButton href="/blog/help-build-public-ai-for-the-people-by-the-people-starting-right-here-in-detroit" primary>
            Read Full Blog Post
          </CTAButton> */}
        </Section>
      </Main>

      <Footer />
    </PageWrapper>
  );
} 