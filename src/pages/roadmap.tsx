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
  max-width: 800px;
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

const FeatureCard = styled.div`
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.neonOrange};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FeatureTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin-bottom: 0.8rem;
`;

const StatusBadge = styled.span<{ status: 'planned' | 'in-progress' | 'completed' }>`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-left: 0.8rem;
  background: ${({ status }) => 
    status === 'completed' ? '#4CAF50' :
    status === 'in-progress' ? '#FF9800' : '#9E9E9E'
  };
  color: white;
`;

const PriorityBadge = styled.span<{ priority: 'high' | 'medium' | 'low' }>`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  margin-left: 0.5rem;
  background: ${({ priority }) => 
    priority === 'high' ? '#f44336' :
    priority === 'medium' ? '#FF9800' : '#4CAF50'
  };
  color: white;
`;

const TechStack = styled.div`
  margin-top: 0.8rem;
  font-size: 0.9rem;
  color: #666;
`;

const TechTag = styled.span`
  display: inline-block;
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  margin-right: 0.5rem;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
`;

export default function Roadmap() {
  return (
    <>
      <Header />
      <PageWrapper>
        <Head>
          <title>Roadmap | thebarefoot.dev</title>
          <meta name="description" content="Development roadmap for thebarefoot.dev community content system." />
        </Head>
        <Main>
          <Heading>🗺️ Development Roadmap</Heading>
          <BodyText>
            Building a living network of community builders, their insights, and projects. This roadmap outlines the features we&apos;re developing to create a comprehensive content system for the Barefoot Technologists community.
          </BodyText>

          <Section>
            <SubHeading>🧩 Part 1: Micro Bio Profiles</SubHeading>
            <BodyText>
              Dynamic, growing micro-bios for community members, auto-generated and enriched over time from event participation and content.
            </BodyText>

            <FeatureCard>
              <FeatureTitle>
                Profile Data Model
                <StatusBadge status="planned">Planned</StatusBadge>
                <PriorityBadge priority="high">High</PriorityBadge>
              </FeatureTitle>
              <BodyText>
                Database schema for storing community member profiles including bios, contributions, tags, links, quotes, and projects.
              </BodyText>
              <List>
                             <ListItem>Name + Role (e.g. &ldquo;Colin Harman – AI-native tooling expert&rdquo;)</ListItem>
                <ListItem>Recent contributions and event participation</ListItem>
                <ListItem>Tags and areas of focus (#AI, #Tooling, #HeavyIndustry)</ListItem>
                <ListItem>Social links (Substack, GitHub, Twitter, LinkedIn)</ListItem>
                <ListItem>Quote snippets from transcripts</ListItem>
                <ListItem>Projects to watch and current work</ListItem>
              </List>
              <TechStack>
                <TechTag>Drizzle ORM</TechTag>
                <TechTag>PostgreSQL</TechTag>
                <TechTag>TypeScript</TechTag>
              </TechStack>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>
                Profile Extraction Scripts
                <StatusBadge status="planned">Planned</StatusBadge>
                <PriorityBadge priority="high">High</PriorityBadge>
              </FeatureTitle>
              <BodyText>
                Automated scripts to extract profile data from event transcripts and metadata.
              </BodyText>
              <List>
                <ListItem>Parse event transcripts for speaker names, roles, and quotes</ListItem>
                <ListItem>Extract tags and links from context</ListItem>
                <ListItem>Auto-generate initial profiles from event participation</ListItem>
                <ListItem>Update existing profiles with new contributions</ListItem>
              </List>
              <TechStack>
                <TechTag>Node.js</TechTag>
                <TechTag>OpenAI API</TechTag>
                <TechTag>Natural Language Processing</TechTag>
              </TechStack>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>
                Community Directory UI
                <StatusBadge status="planned">Planned</StatusBadge>
                <PriorityBadge priority="medium">Medium</PriorityBadge>
              </FeatureTitle>
              <BodyText>
                Searchable, filterable directory of community members (e.g. &ldquo;Detroit Builders Index&rdquo; or &ldquo;Barefoot Dev Roster&rdquo;).
              </BodyText>
              <List>
                <ListItem>Search and filter by tags, roles, or contributions</ListItem>
                <ListItem>Profile cards with key information</ListItem>
                <ListItem>Cross-linking between profiles and events</ListItem>
                <ListItem>Responsive design for mobile and desktop</ListItem>
              </List>
              <TechStack>
                <TechTag>Next.js</TechTag>
                <TechTag>Styled Components</TechTag>
                <TechTag>React Query</TechTag>
              </TechStack>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>
                Profile Editor Interface
                <StatusBadge status="planned">Planned</StatusBadge>
                <PriorityBadge priority="medium">Medium</PriorityBadge>
              </FeatureTitle>
              <BodyText>
                Admin interface for manual corrections, expansions, and curation of community profiles.
              </BodyText>
              <List>
                <ListItem>Edit profile information and links</ListItem>
                <ListItem>Add/remove tags and contributions</ListItem>
                <ListItem>Approve or reject auto-generated content</ListItem>
                <ListItem>Bulk operations for multiple profiles</ListItem>
              </List>
              <TechStack>
                <TechTag>Next.js Admin</TechTag>
                <TechTag>Form Validation</TechTag>
                <TechTag>Role-based Access</TechTag>
              </TechStack>
            </FeatureCard>
          </Section>

          <Section>
            <SubHeading>📚 Part 2: Multi-Speaker Content Workflow</SubHeading>
            <BodyText>
              Structured workflow for logging, segmenting, and publishing multi-speaker event content with automated transcription and content assembly.
            </BodyText>

            <FeatureCard>
              <FeatureTitle>
                Event Ingestion UI
                <StatusBadge status="planned">Planned</StatusBadge>
                <PriorityBadge priority="high">High</PriorityBadge>
              </FeatureTitle>
              <BodyText>
                Interface for uploading event content and entering metadata.
              </BodyText>
              <List>
                <ListItem>Audio/video file upload with progress tracking</ListItem>
                <ListItem>Event metadata form (title, date, location, host org)</ListItem>
                <ListItem>Speaker list management</ListItem>
                <ListItem>Bulk upload for multiple events</ListItem>
              </List>
              <TechStack>
                <TechTag>Next.js</TechTag>
                <TechTag>File Upload</TechTag>
                <TechTag>Form Handling</TechTag>
              </TechStack>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>
                Transcription Pipeline
                <StatusBadge status="planned">Planned</StatusBadge>
                <PriorityBadge priority="high">High</PriorityBadge>
              </FeatureTitle>
              <BodyText>
                Automated transcription and speaker segmentation system.
              </BodyText>
              <List>
                <ListItem>Integration with transcription APIs (Whisper, AssemblyAI)</ListItem>
                <ListItem>Speaker diarization and identification</ListItem>
                <ListItem>Automatic section tagging (insight, quote, project, philosophy, tool)</ListItem>
                <ListItem>Quality control and manual correction interface</ListItem>
              </List>
              <TechStack>
                <TechTag>OpenAI Whisper</TechTag>
                <TechTag>AssemblyAI</TechTag>
                <TechTag>WebSocket</TechTag>
              </TechStack>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>
                Content Assembly System
                <StatusBadge status="planned">Planned</StatusBadge>
                <PriorityBadge priority="medium">Medium</PriorityBadge>
              </FeatureTitle>
              <BodyText>
                Automated generation of event posts and speaker spotlights from transcribed content.
              </BodyText>
              <List>
                <ListItem>Event overview post generation (headline, themes, speaker lineup)</ListItem>
                <ListItem>Individual speaker blog post creation</ListItem>
                <ListItem>Micro bio extraction from speaker content</ListItem>
                <ListItem>Cross-linking between events, speakers, and projects</ListItem>
              </List>
              <TechStack>
                <TechTag>OpenAI GPT</TechTag>
                <TechTag>Content Templates</TechTag>
                <TechTag>Markdown Generation</TechTag>
              </TechStack>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>
                Publishing Workflow
                <StatusBadge status="planned">Planned</StatusBadge>
                <PriorityBadge priority="medium">Medium</PriorityBadge>
              </FeatureTitle>
              <BodyText>
                Draft, review, and publish system for event content and speaker spotlights.
              </BodyText>
              <List>
                <ListItem>Draft preview and editing interface</ListItem>
                <ListItem>Review and approval workflow</ListItem>
                <ListItem>Scheduled publishing</ListItem>
                <ListItem>SEO optimization and social sharing</ListItem>
              </List>
              <TechStack>
                <TechTag>Next.js</TechTag>
                <TechTag>Draft.js</TechTag>
                <TechTag>SEO Tools</TechTag>
              </TechStack>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>
                Follow-up Management
                <StatusBadge status="planned">Planned</StatusBadge>
                <PriorityBadge priority="low">Low</PriorityBadge>
              </FeatureTitle>
              <BodyText>
                System for tracking and managing follow-up outreach to speakers and community members.
              </BodyText>
              <List>
                <ListItem>Interview scheduling and reminders</ListItem>
                <ListItem>Project update tracking</ListItem>
                <ListItem>Collaboration opportunity management</ListItem>
                <ListItem>Outreach template library</ListItem>
              </List>
              <TechStack>
                <TechTag>Calendar Integration</TechTag>
                <TechTag>Email Templates</TechTag>
                <TechTag>CRM Features</TechTag>
              </TechStack>
            </FeatureCard>
          </Section>

          <Section>
            <SubHeading>🌐 Vision: Living Network</SubHeading>
            <BodyText>
              Over time, this becomes a searchable, evolving network of people and projects in your community. Event logs evolve into full profiles. Micro bios turn into collaborative archives.
            </BodyText>
            <List>
              <ListItem><strong>Searchable ecosystem</strong> — Find people, projects, and insights across events</ListItem>
              <ListItem><strong>Evolving profiles</strong> — Community members can contribute to their own bios</ListItem>
              <ListItem><strong>Cross-linking</strong> — Connect events, people, projects, and content</ListItem>
              <ListItem><strong>Collaborative archives</strong> — Community-curated knowledge base</ListItem>
            </List>
          </Section>

          <Section>
            <SubHeading>🚀 Next Steps</SubHeading>
            <BodyText>
              <strong>Immediate priorities:</strong>
            </BodyText>
            <List>
              <ListItem>Design and implement the profile data model</ListItem>
              <ListItem>Build the event ingestion UI</ListItem>
              <ListItem>Integrate transcription API and speaker segmentation</ListItem>
              <ListItem>Develop extraction scripts for bios and content</ListItem>
              <ListItem>Create the community directory UI</ListItem>
            </List>
            
            <BodyText>
              <strong>Success metrics:</strong>
            </BodyText>
            <List>
              <ListItem>Number of active community profiles</ListItem>
              <ListItem>Events processed and published</ListItem>
              <ListItem>Cross-links between content</ListItem>
              <ListItem>Community engagement with profiles</ListItem>
            </List>
          </Section>
        </Main>
      </PageWrapper>
      <Footer />
    </>
  );
} 