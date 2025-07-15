import Head from "next/head";
import styled from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.creamyBeige};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  min-height: 100vh;
  padding: 0;
`;

const Main = styled.main`
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem 1.5rem;
`;

const Heading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SubHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin-bottom: 1rem;
`;

const BodyText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.15rem;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const List = styled.ul`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  margin-left: 1.2rem;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ListItem = styled.li`
  margin-bottom: 0.7rem;
`;

const Quote = styled.blockquote`
  font-family: ${({ theme }) => theme.fonts.body};
  font-style: italic;
  font-size: 1.1rem;
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-left: 4px solid ${({ theme }) => theme.colors.neonOrange};
  background: rgba(255, 79, 0, 0.05);
  border-radius: 0 8px 8px 0;
`;

export default function About() {
  return (
    <>
      <Header />
      <PageWrapper>
        <Head>
          <title>About | thebarefoot.dev</title>
          <meta name="description" content="Learn about Barefoot Technologists – A Modern Framework for Community-Led Tech Empowerment." />
        </Head>
        <Main>
          <Heading>🦶 Barefoot Technologists</Heading>
          <BodyText>
            &ldquo;Technology, like medicine, should be in the hands of the people who need it most.&rdquo;
          </BodyText>
          <BodyText>
            Inspired by the Barefoot Doctor legacy, we&apos;re building a modern framework for community-led tech empowerment. thebarefoot.dev draws inspiration from the barefoot doctors of rural China—community-based medical practitioners trained to provide essential healthcare in underserved areas during the 20th century. They were not elite specialists but locals equipped with practical knowledge, tools, and deep community trust.
          </BodyText>
          
          <Section>
            <SubHeading>💡 Core Problems We Address</SubHeading>
            <List>
              <ListItem><strong>Tech deserts</strong> — Lack of infrastructure, internet access, or relevant tools in marginalized areas</ListItem>
              <ListItem><strong>Skill barriers</strong> — Many are digital consumers, not digital creators</ListItem>
              <ListItem><strong>Cultural misfit</strong> — Imported tech often lacks local relevance or accessibility</ListItem>
              <ListItem><strong>Centralized ownership</strong> — Platforms extract value but don&apos;t reinvest locally</ListItem>
            </List>
          </Section>

          <Section>
            <SubHeading>🧭 Principle-Based Response</SubHeading>
            <List>
              <ListItem>Community-first development</ListItem>
              <ListItem>Tech as preventative care (education, empowerment, early access)</ListItem>
              <ListItem>Hybrid fluency (local customs × digital tools)</ListItem>
              <ListItem>Peer-to-peer knowledge exchange</ListItem>
            </List>
          </Section>

          <Section>
            <SubHeading>🎓 Training the Barefoot Technologist</SubHeading>
            <BodyText>
              <strong>Basic Training Modules:</strong>
            </BodyText>
            <List>
              <ListItem>Internet fundamentals (privacy, safety, literacy)</ListItem>
              <ListItem>Device repair, open hardware, or recycled infrastructure</ListItem>
              <ListItem>App building with low-code / no-code tools</ListItem>
              <ListItem>Community data collection & visualization (e.g. mapping assets, needs)</ListItem>
              <ListItem>Intro to AI tools for storytelling, automation, and local problem-solving</ListItem>
            </List>
            
            <BodyText>
              <strong>Who Becomes a Barefoot Technologist?</strong>
            </BodyText>
            <BodyText>
              Local youth, artists, gig workers, faith-based organizers, librarians, elders. People trusted by the community—peers, not outsiders. Often selected by the community themselves, with social incentives.
            </BodyText>
          </Section>

          <Section>
            <SubHeading>💼 Scope of Work: Tech as Public Service</SubHeading>
            <BodyText>
              <strong>What They Do:</strong> Build, repair, or deploy tools for:
            </BodyText>
            <List>
              <ListItem><strong>Civic engagement</strong> — RSVP tools, voting resources, policy feedback</ListItem>
              <ListItem><strong>Economic empowerment</strong> — Local marketplaces, resume/portfolio sites, gig coordination</ListItem>
              <ListItem><strong>Cultural preservation</strong> — Archiving oral history, community art NFTs</ListItem>
              <ListItem><strong>Health and safety</strong> — Crisis response maps, mutual aid dashboards</ListItem>
              <ListItem><strong>Education</strong> — Community Wi-Fi, open learning hubs, tech help desks</ListItem>
            </List>
            
            <BodyText>
              <strong>Hybrid Tools:</strong> Blend modern & local systems:
            </BodyText>
            <List>
              <ListItem>Offline-first apps in low-connectivity areas</ListItem>
              <ListItem>Local-first databases (e.g. Turso, SQLite)</ListItem>
              <ListItem>AI + oral storytelling traditions</ListItem>
              <ListItem>Blockchain for transparency in public goods or community-owned assets</ListItem>
            </List>
          </Section>

          <Section>
            <SubHeading>🫂 Community Integration & Trust</SubHeading>
            <BodyText>
              <strong>Cultural Fit:</strong> Barefoot technologists remain community members first. They continue their daily lives (e.g. artists, farmers, barbers, activists) and build trust through co-creation, not consulting.
            </BodyText>
            
            <BodyText>
              <strong>Accountability:</strong> Peer-reviewed projects, local governance models (DAO-lite structures or co-ops). Community decides what&apos;s built, when, and how.
            </BodyText>
          </Section>

          <Section>
            <SubHeading>💸 Sustainable Models & Support</SubHeading>
            <BodyText>
              <strong>How They&apos;re Paid:</strong>
            </BodyText>
            <List>
              <ListItem>Local microgrants (e.g. Art Night, city funds)</ListItem>
              <ListItem>Cooperatively managed revenue splits (digital marketplaces, app sales)</ListItem>
              <ListItem>Tokenized incentive systems (community badges, upvotes, proof of contribution)</ListItem>
            </List>
            
            <BodyText>
              <strong>Infrastructure:</strong> Shared cloud and code resources, open-source templates for common needs, access to community servers, creative commons tools, and AI infrastructure.
            </BodyText>
          </Section>

          <Section>
            <SubHeading>🌍 Legacy and Scaling</SubHeading>
            <BodyText>
              Like the barefoot doctors inspired Alma Ata, barefoot technologists can inspire:
            </BodyText>
            <List>
              <ListItem>UN Local2030 initiatives</ListItem>
              <ListItem>Digital Public Infrastructure (DPI) movements</ListItem>
              <ListItem>Regenerative finance (ReFi), crypto-local currencies, digital commons</ListItem>
            </List>
            
            <BodyText>
              <strong>Tools to Build & Share:</strong> Documentation of practices (GitHub repos, local zines), cross-city knowledge exchange (e.g. Detroit ↔ Nairobi ↔ Bogotá), toolkits and playbooks for replicability.
            </BodyText>
          </Section>

          <Section>
            <Quote>
              &ldquo;Start from the people. Serve the people. Stay with the people.&rdquo;
            </Quote>
            
            <BodyText>
              Barefoot technologists are not just developers—they&apos;re cultural translators, peer educators, digital healers, and architects of new public infrastructure. Their work doesn&apos;t scale through code alone, but through relationships, trust, and context.
            </BodyText>
          </Section>
        </Main>
      </PageWrapper>
      <Footer />
    </>
  );
} 