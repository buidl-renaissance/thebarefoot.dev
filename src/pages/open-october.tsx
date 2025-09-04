import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import React, { useState } from "react";
import Link from "next/link";
import type { ThemeType } from "@/styles/theme";
import HeaderComponent from "@/components/Header";
import FooterComponent from "@/components/Footer";

// October-themed color extensions with civic colors
const openOctoberColors = {
  // Warm October tones
  burnOrange: "#CC5500",
  goldenrod: "#DAA520",
  crimsonRed: "#DC143C",
  rustBrown: "#8B4513",
  // GitHub-inspired greens
  githubGreen: "#28a745",
  githubDark: "#165928",
  // Civic colors for open data
  civicBlue: "#2E5BBA",
  civicTeal: "#1B998B",
  dataGreen: "#2D7D32",
  // Sponsor tier colors
  bronze: "#6b5126",
  silver: "#4f4f4f",
  gold: "#a3711f",
  platinum: "#464441",
};

const HeroSection = styled.section<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.asphaltBlack} 0%,
    #2D1810 50%,
    ${({ theme }) => theme.colors.asphaltBlack} 100%);
  color: ${({ theme }) => theme.colors.creamyBeige};
  text-align: center;
  position: relative;
  padding: 4rem 1rem;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="autumnGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(218,165,32,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23autumnGrid)"/></svg>');
    z-index: 0;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
    min-height: 80vh;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
`;


const HeroTreeContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const HeroTreeImage = styled(Image)`
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const HeroDatesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0 3rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    margin: 1rem 0 1rem 0;
  }
`;

const HeroDateItem = styled.div<{ theme: ThemeType }>`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 0.9rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const HeroDateNumber = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${openOctoberColors.goldenrod};
  margin-bottom: 0.2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroDateLabel = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const MainHeadline = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(3rem, 6vw, 4rem);
  font-weight: bold;
  margin-bottom: 1rem;
  letter-spacing: 3px;
  line-height: 1.1;
  background: linear-gradient(135deg, ${openOctoberColors.burnOrange}, ${openOctoberColors.goldenrod});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;

  @media (max-width: 480px) {
    font-size: 2.5rem;
    letter-spacing: 1px;
  }
`;

const SubHeadline = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  margin-bottom: 1rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const CTAButton = styled.button<{ primary?: boolean; theme: ThemeType }>`
  background: ${({ primary }) =>
    primary ? openOctoberColors.githubGreen : openOctoberColors.burnOrange};
  color: white;
  border: 2px solid ${({ primary }) =>
    primary ? openOctoberColors.githubGreen : openOctoberColors.burnOrange};
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 220px;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    background: ${({ primary }) =>
      primary ? openOctoberColors.githubDark : openOctoberColors.crimsonRed};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
    min-width: 200px;
  }
`;

const Section = styled.section<{ theme: ThemeType; autumn?: boolean }>`
  background: ${({ theme, autumn }) => 
    autumn ? `linear-gradient(135deg, #2D1810 0%, ${theme.colors.asphaltBlack} 100%)` : theme.colors.creamyBeige};
  color: ${({ theme, autumn }) => 
    autumn ? theme.colors.creamyBeige : theme.colors.asphaltBlack};
  padding: 5rem 1rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${openOctoberColors.burnOrange},
      ${openOctoberColors.goldenrod},
      ${openOctoberColors.burnOrange},
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
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${openOctoberColors.burnOrange}, ${openOctoberColors.goldenrod});
    border-radius: 2px;
  }
`;

const SectionDescription = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.2rem;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  text-align: center;
`;

const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${({ columns }) => columns === 2 ? '400px' : '250px'}, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SponsorshipCard = styled.div<{ theme: ThemeType; tier?: string }>`
  background: transparent;
  border-radius: 12px;
  padding: 2rem;
  border: none;
  transition: all 0.3s ease;
  position: relative;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SponsorshipBadgeContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SponsorshipBadgeImage = styled(Image)`
  margin-bottom: 1rem;
`;

const SponsorshipTierTitle = styled.h3<{ theme: ThemeType; tierColor: string }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  margin: 0;
  color: ${({ tierColor }) => tierColor};
  text-align: center;
`;

const SponsorshipPrice = styled.div<{ tierColor: string }>`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ tierColor }) => tierColor};
  margin-top: 0.5rem;
`;

const SponsorshipBenefits = styled.p<{ theme: ThemeType; tierColor: string }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ tierColor }) => tierColor};
  text-align: center;
`;

// Generic Card components for other sections
const Card = styled.div<{ theme: ThemeType; tier?: string }>`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 2rem;
  border: 2px solid ${openOctoberColors.burnOrange};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardDescription = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
`;

const ScheduleItem = styled.div<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.1);
  border-left: 4px solid ${openOctoberColors.burnOrange};
  border-radius: 0 8px 8px 0;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(10px);
  }
`;

const ScheduleDate = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  color: ${openOctoberColors.goldenrod};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ScheduleTitle = styled.h4<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin-bottom: 0.5rem;
`;

const ScheduleDescription = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  line-height: 1.5;
  opacity: 0.9;
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ResourceItem = styled.a<{ theme: ThemeType }>`
  display: block;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${openOctoberColors.githubGreen};
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    background: ${openOctoberColors.githubGreen};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);
  }
`;

const TreasuryWidget = styled.div<{ theme: ThemeType }>`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.asphaltBlack}, #1a1a1a);
  border: 2px solid ${openOctoberColors.githubGreen};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      ${openOctoberColors.githubGreen}, 
      ${openOctoberColors.goldenrod}, 
      ${openOctoberColors.githubGreen}
    );
  }
`;

const TreasuryAmount = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 2rem;
  color: ${openOctoberColors.githubGreen};
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TreasuryLabel = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.8;
`;

const PizzaIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

const GitIcon = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  background: ${openOctoberColors.githubGreen};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

export default function OpenOctober() {
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

    // For now, just show success - you can integrate with your actual subscription API
    setSuccess(true);
    setError("");
    setEmail("");
  };

  return (
    <>
      <Head>
        <title>Open October: Build • Learn • Merge | Detroit Open Source Event Series</title>
        <meta
          name="description"
          content="Join Detroit's month-long open source event series. Learn Git, build in community, and celebrate at the Merge Party. From pizza to pull requests, Detroit is building its open commons."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Open October: Build • Learn • Merge" />
        <meta property="og:description" content="A month-long open source event series in Detroit — learn Git, build in community, and celebrate at the Merge Party." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thebarefoot.dev/open-october" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Open October: Build • Learn • Merge" />
        <meta name="twitter:description" content="Detroit's month-long open source event series. Learn Git, build in community, celebrate open source." />
      </Head>

      <HeaderComponent />

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <MainHeadline>Open October</MainHeadline>
          <HeroTreeContainer>
            <HeroTreeImage
              src="/images/open-october-tree.png"
              alt="Open October Tree - Git branching graph merging into a data tree"
              width={300}
              height={300}
            />
          </HeroTreeContainer>

          <SubHeadline>
            Connect • Build • Merge
          </SubHeadline>

          <HeroDatesContainer>
            <HeroDateItem>
              <HeroDateNumber>Oct 7</HeroDateNumber>
              <HeroDateLabel>Kickoff</HeroDateLabel>
            </HeroDateItem>
            <HeroDateItem>
              <HeroDateNumber>Oct 14</HeroDateNumber>
              <HeroDateLabel>Build #1</HeroDateLabel>
            </HeroDateItem>
            <HeroDateItem>
              <HeroDateNumber>Oct 21</HeroDateNumber>
              <HeroDateLabel>Build #2</HeroDateLabel>
            </HeroDateItem>
            <HeroDateItem>
              <HeroDateNumber>Oct 28</HeroDateNumber>
              <HeroDateLabel>Merge Party</HeroDateLabel>
            </HeroDateItem>
          </HeroDatesContainer>

          <SubHeadline style={{ marginBottom: '2rem', fontWeight: '500', fontSize: '0.95rem' }}>
            A month-long event series in Detroit — learn Git, explore open data, build in community, and merge your work into the commons.
          </SubHeadline>
          <CTAGroup>
            <Link href="#register" passHref legacyBehavior>
              <CTAButton primary as="a">
                <GitIcon>git</GitIcon> Register for Kickoff
              </CTAButton>
            </Link>
            {/* <CTAButton 
              onClick={() => window.open('https://github.com/open-october-detroit', '_blank')}
            >
              Join the GitHub Repo
            </CTAButton> */}
          </CTAGroup>
        </HeroContent>
      </HeroSection>

      {/* About Open October */}
      <Section>
        <Container>
          <SectionTitle>About Open October</SectionTitle>
          <SectionDescription>
            Open October is a community experiment in open source and open data. For one month, we&apos;ll learn the tools (Git, Supabase, Turso, Next.js, Auth.js), explore how open data empowers communities, and build together — with every contribution documented in public.
          </SectionDescription>
          
          <Grid columns={2}>
            <Card>
              <CardTitle>
                🔓 Key Values
              </CardTitle>
              <CardDescription>
                <strong style={{ color: openOctoberColors.civicBlue }}>Transparency</strong> • <strong style={{ color: openOctoberColors.civicTeal }}>Collaboration</strong> • <strong style={{ color: openOctoberColors.dataGreen }}>Local Impact</strong>
                <br/><br/>
                Every project, every dollar, every decision is documented in the open for the community to see and learn from.
              </CardDescription>
            </Card>
            
            <Card>
              <CardTitle>
                <PizzaIcon>🍕</PizzaIcon> From Pizza to Pull Requests
              </CardTitle>
              <CardDescription>
                Detroit is building its open commons. Whether you&apos;re a seasoned developer, a civic-minded community member, or just curious about open data, join us for a month of learning, building, and celebrating the power of community-driven technology.
              </CardDescription>
            </Card>
          </Grid>
          
          <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.3rem', fontStyle: 'italic' }}>
            &quot;Open source. Open data. Open Detroit.&quot;
          </div>
        </Container>
      </Section>

      {/* Why Open Data */}
      <Section>
        <Container>
          <SectionTitle>Why Open Data?</SectionTitle>
          <SectionDescription>
            Open data makes government, businesses, and communities more transparent and accountable. Paired with open source, it lets us build tools that serve everyone.
          </SectionDescription>
          
          <Grid>
            <Card>
              <CardTitle>
                🏙️ City Datasets
              </CardTitle>
              <CardDescription>
                Housing data, transit routes, public art locations — city datasets help us understand and improve our communities through data-driven insights.
              </CardDescription>
            </Card>
            
            <Card>
              <CardTitle>
                🗺️ Community Projects
              </CardTitle>
              <CardDescription>
                Mapping neighborhood resources, storytelling through data visualization, community research — open data fuels grassroots innovation.
              </CardDescription>
            </Card>
            
            <Card>
              <CardTitle>
                💰 Transparency Demos
              </CardTitle>
              <CardDescription>
                Our Open October treasury in USDC is completely transparent — see exactly how community funds are used, in real-time.
              </CardDescription>
            </Card>
          </Grid>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <CTAButton 
              onClick={() => window.open('https://data.detroitmi.gov/', '_blank')}
              style={{ background: openOctoberColors.civicBlue, borderColor: openOctoberColors.civicBlue }}
            >
              📊 Explore Detroit Open Data Portal
            </CTAButton>
          </div>
        </Container>
      </Section>

      {/* Schedule */}
      <Section autumn>
        <Container>
          <SectionTitle>October Schedule</SectionTitle>
          <SectionDescription>
            Four weeks of hands-on learning with open source tools, open data exploration, and community building.
          </SectionDescription>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ScheduleItem>
              <ScheduleDate>Week 1 • October 7</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>init</GitIcon> Kickoff — Git, GitHub, Open Source + Open Data Tools
              </ScheduleTitle>
              <ScheduleDescription>
                • Git foundations and collaborative workflows<br/>
                • OSS tools: Supabase, Turso, Next.js, Auth.js<br/>
                • Intro to open data + community datasets<br/>
                • Meet your fellow builders and explore project ideas
              </ScheduleDescription>
            </ScheduleItem>

            <ScheduleItem>
              <ScheduleDate>Week 2 • October 14</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>add</GitIcon> Open Build Session #1
              </ScheduleTitle>
              <ScheduleDescription>
                <PizzaIcon>🍕</PizzaIcon> Optional consultations, peer mentoring, pizza.<br/>
                Projects can be code, data visualizations, or documentation.<br/>
                Work on apps, civic tools, or community storytelling projects.
              </ScheduleDescription>
            </ScheduleItem>

            <ScheduleItem>
              <ScheduleDate>Week 3 • October 21</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>commit</GitIcon> Open Build Session #2
              </ScheduleTitle>
              <ScheduleDescription>
                <PizzaIcon>🍕</PizzaIcon> Continue building, refining, and preparing your contributions.<br/>
                Focus on documentation, testing, and polishing your projects.<br/>
                Prepare demos for the showcase.
              </ScheduleDescription>
            </ScheduleItem>

            <ScheduleItem>
              <ScheduleDate>Week 4 • October 28</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>merge</GitIcon> Merge Party Showcase
              </ScheduleTitle>
              <ScheduleDescription>
                Demos of what was built (apps, visualizations, stories).<br/>
                Symbolic merge into shared repo.<br/>
                Community celebration with food, drinks, and networking.
              </ScheduleDescription>
            </ScheduleItem>
          </div>
        </Container>
      </Section>

      {/* Sponsorship */}
      <Section>
        <Container>
          <SectionTitle>Sponsorship Tiers</SectionTitle>
          <SectionDescription>
            Fuel Detroit&apos;s open data commons. Your sponsorship directly supports community learning, transparency, and local innovation.
          </SectionDescription>
          
          <Grid>
            <SponsorshipCard tier="branch">
              <SponsorshipBadgeContainer>
                <SponsorshipBadgeImage
                  src="/images/bronze-commit.png"
                  alt="Bronze Git Commit Badge"
                  width={120}
                  height={120}
                />
                <SponsorshipTierTitle tierColor={openOctoberColors.bronze}>
                  Bronze Git Commit
                </SponsorshipTierTitle>
                <SponsorshipPrice tierColor={openOctoberColors.bronze}>
                  $25
                </SponsorshipPrice>
              </SponsorshipBadgeContainer>
              <SponsorshipBenefits tierColor={openOctoberColors.bronze}>
                Covers pizza for one session<br/>
                Logo on website<br/>
                Social media recognition
              </SponsorshipBenefits>
            </SponsorshipCard>

            <SponsorshipCard tier="branch">
              <SponsorshipBadgeContainer>
                <SponsorshipBadgeImage
                  src="/images/silver-branch.png"
                  alt="Silver Branch Badge"
                  width={120}
                  height={120}
                />
                <SponsorshipTierTitle tierColor={openOctoberColors.silver}>
                  Silver Branch
                </SponsorshipTierTitle>
                <SponsorshipPrice tierColor={openOctoberColors.silver}>
                  $50
                </SponsorshipPrice>
              </SponsorshipBadgeContainer>
              <SponsorshipBenefits tierColor={openOctoberColors.silver}>
                All Commit benefits<br/>
                Newsletter mention<br/>
                Community thanks
              </SponsorshipBenefits>
            </SponsorshipCard>

            <SponsorshipCard tier="pr">
              <SponsorshipBadgeContainer>
                <SponsorshipBadgeImage
                  src="/images/golden-pr.png"
                  alt="Golden Pull Request Badge"
                  width={120}
                  height={120}
                />
                <SponsorshipTierTitle tierColor={openOctoberColors.gold}>
                  Golden Pull Request
                </SponsorshipTierTitle>
                <SponsorshipPrice tierColor={openOctoberColors.gold}>
                  $100
                </SponsorshipPrice>
              </SponsorshipBadgeContainer>
              <SponsorshipBenefits tierColor={openOctoberColors.gold}>
                All Branch benefits<br/>
                IRL mentions at events<br/>
                Priority project support
              </SponsorshipBenefits>
            </SponsorshipCard>

            <SponsorshipCard tier="merge">
              <SponsorshipBadgeContainer>
                <SponsorshipBadgeImage
                  src="/images/platinum-merge.png"
                  alt="Platinum Merge Badge"
                  width={120}
                  height={120}
                />
                <SponsorshipTierTitle tierColor={openOctoberColors.platinum}>
                  Platinum Merge
                </SponsorshipTierTitle>
                <SponsorshipPrice tierColor={openOctoberColors.platinum}>
                  $250+
                </SponsorshipPrice>
              </SponsorshipBadgeContainer>
              <SponsorshipBenefits tierColor={openOctoberColors.platinum}>
                Helps host multiple builds<br/>
                Seeds micro-grants for projects<br/>
                1 minute pitch opportunity
              </SponsorshipBenefits>
            </SponsorshipCard>

          </Grid>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <CTAButton 
              primary
              onClick={() => window.open('mailto:john@thebarefood.dev?subject=Open October Sponsorship', '_blank')}
            >
              Become a Sponsor
            </CTAButton>
          </div>

          {/* Treasury Transparency */}
          <TreasuryWidget>
            <TreasuryAmount>$0 USDC</TreasuryAmount>
            <TreasuryLabel>Transparent Treasury Balance</TreasuryLabel>
            <div style={{ marginTop: '1rem' }}>
              <Link href="https://etherscan.io/address/0x..." passHref legacyBehavior>
                <a style={{ color: openOctoberColors.githubGreen, textDecoration: 'none', fontSize: '0.9rem' }}>
                  View on Etherscan →
                </a>
              </Link>
            </div>
          </TreasuryWidget>
        </Container>
      </Section>

      {/* Open Source Resources */}
      <Section autumn>
        <Container>
          <SectionTitle>Open Source + Open Data Resources</SectionTitle>
          <SectionDescription>
            Curated tools, datasets, and guides to jumpstart your open source and open data journey.
          </SectionDescription>
          
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: openOctoberColors.goldenrod }}>
              🚀 Featured Projects to Explore
            </h3>
            <ResourceGrid>
              <ResourceItem href="https://nextjs.org" target="_blank">
                <strong>Next.js</strong><br />
                React framework for production
              </ResourceItem>
              <ResourceItem href="https://supabase.io" target="_blank">
                <strong>Supabase</strong><br />
                Open source Firebase alternative
              </ResourceItem>
              <ResourceItem href="https://turso.tech" target="_blank">
                <strong>Turso</strong><br />
                Edge SQLite platform
              </ResourceItem>
              <ResourceItem href="https://authjs.dev" target="_blank">
                <strong>Auth.js</strong><br />
                Authentication for the web
              </ResourceItem>
              <ResourceItem href="https://strapi.io" target="_blank">
                <strong>Strapi</strong><br />
                Headless CMS
              </ResourceItem>
              <ResourceItem href="https://tailwindcss.com" target="_blank">
                <strong>Tailwind CSS</strong><br />
                Utility-first CSS framework
              </ResourceItem>
            </ResourceGrid>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: openOctoberColors.civicBlue }}>
              📊 Open Data Resources
            </h3>
            <ResourceGrid>
              <ResourceItem href="https://data.detroitmi.gov/" target="_blank">
                <strong>Detroit Open Data Portal</strong><br />
                City datasets, demographics, services
              </ResourceItem>
              <ResourceItem href="https://www.data.gov/" target="_blank">
                <strong>Data.gov</strong><br />
                Federal government open data
              </ResourceItem>
              <ResourceItem href="https://github.com/awesomedata/awesome-public-datasets" target="_blank">
                <strong>Awesome Public Datasets</strong><br />
                Curated list of public datasets
              </ResourceItem>
              <ResourceItem href="https://datasetsearch.research.google.com/" target="_blank">
                <strong>Google Dataset Search</strong><br />
                Search engine for datasets
              </ResourceItem>
            </ResourceGrid>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: openOctoberColors.goldenrod }}>
              📚 Git & GitHub Guides
            </h3>
            <ResourceGrid>
              <ResourceItem href="https://git-scm.com/doc" target="_blank">
                <strong>Official Git Documentation</strong><br />
                Complete reference and tutorials
              </ResourceItem>
              <ResourceItem href="https://docs.github.com" target="_blank">
                <strong>GitHub Docs</strong><br />
                Everything about GitHub
              </ResourceItem>
              <ResourceItem href="https://learngitbranching.js.org" target="_blank">
                <strong>Learn Git Branching</strong><br />
                Interactive Git tutorial
              </ResourceItem>
              <ResourceItem href="https://github.com/firstcontributions/first-contributions" target="_blank">
                <strong>First Contributions</strong><br />
                Make your first open source contribution
              </ResourceItem>
            </ResourceGrid>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: openOctoberColors.dataGreen }}>
              📖 Educational Guides
            </h3>
            <ResourceGrid>
              <ResourceItem href="https://opendatahandbook.org/" target="_blank">
                <strong>Open Data Handbook</strong><br />
                Complete guide to open data
              </ResourceItem>
              <ResourceItem href="https://github.com/collections/government" target="_blank">
                <strong>Government on GitHub</strong><br />
                Open source government projects
              </ResourceItem>
              <ResourceItem href="https://www.codeforamerica.org/" target="_blank">
                <strong>Code for America</strong><br />
                Civic technology community
              </ResourceItem>
              <ResourceItem href="https://sunlightfoundation.com/open-data-policy-hub/" target="_blank">
                <strong>Open Data Policy Hub</strong><br />
                Policy resources and guides
              </ResourceItem>
            </ResourceGrid>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '1rem' }}>
              📹 Session recordings and slides will be added here after each week
            </p>
          </div>
        </Container>
      </Section>

      {/* Community & Transparency */}
      <Section>
        <Container>
          <SectionTitle>Community & Transparency</SectionTitle>
          <SectionDescription>
            Everything about Open October is open source — from our code to our finances.
          </SectionDescription>
          
          <Grid>
            <Card>
              <CardTitle>
                <GitIcon>org</GitIcon> GitHub Organization
              </CardTitle>
              <CardDescription>
                All event materials, projects, and resources are available on our GitHub organization. Fork, contribute, and build with us.
              </CardDescription>
              <Link href="https://github.com/open-october-detroit" passHref legacyBehavior>
                <a style={{ color: openOctoberColors.githubGreen, textDecoration: 'none', fontWeight: 'bold' }}>
                  Visit GitHub Org →
                </a>
              </Link>
            </Card>

            <Card>
              <CardTitle>
                💰 Financial Transparency
              </CardTitle>
              <CardDescription>
                Our USDC treasury is completely transparent. Every donation and expense is tracked on-chain for full community visibility.
              </CardDescription>
              <Link href="https://etherscan.io/address/0x..." passHref legacyBehavior>
                <a style={{ color: openOctoberColors.githubGreen, textDecoration: 'none', fontWeight: 'bold' }}>
                  View Treasury →
                </a>
              </Link>
            </Card>

            <Card>
              <CardTitle>
                <PizzaIcon>🍕</PizzaIcon> Local Partners
              </CardTitle>
              <CardDescription> 
                Proudly supported by Detroit&apos;s best pizza shops and local businesses who believe in building community through technology.
              </CardDescription>
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
                Buddy&apos;s Pizza • Cloverleaf • Green Lantern • Loui&apos;s Pizza
              </div>
            </Card>

            <Card>
              <CardTitle>
                🏗️ BuildDetroit Partnership
              </CardTitle>
              <CardDescription>
                Open October is proudly organized in partnership with BuildDetroit and thebarefoot.dev, bringing open source education to Detroit&apos;s tech community.
              </CardDescription>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Link href="https://builddetroit.org" passHref legacyBehavior>
                  <a style={{ color: openOctoberColors.githubGreen, textDecoration: 'none', fontSize: '0.9rem' }}>
                    BuildDetroit →
                  </a>
                </Link>
                <Link href="https://thebarefoot.dev" passHref legacyBehavior>
                  <a style={{ color: openOctoberColors.githubGreen, textDecoration: 'none', fontSize: '0.9rem' }}>
                    thebarefoot.dev →
                  </a>
                </Link>
              </div>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Registration/Contact */}
      <Section id="register" autumn>
        <Container>
          <SectionTitle>Join Open October</SectionTitle>
          <SectionDescription>
            Ready to build, learn, and merge with Detroit&apos;s open source community?
          </SectionDescription>
          
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
              <CTAButton 
                primary 
                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                onClick={() => window.open('https://eventbrite.com/e/open-october-kickoff', '_blank')}
              >
                Register for Kickoff
              </CTAButton>
              <CTAButton 
                style={{ marginBottom: '1rem' }}
                onClick={() => window.open('https://github.com/open-october-detroit', '_blank')}
              >
                <GitIcon>fork</GitIcon> Fork the Repo
              </CTAButton>
            </div>

            <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Stay Updated</h3>
              <p style={{ marginBottom: '2rem', opacity: '0.9' }}>
                Get event updates, resources, and Detroit open source news.
              </p>
              
              <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '0', justifyContent: 'center', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  style={{
                    padding: '1rem 1.5rem',
                    borderRadius: '8px 0 0 8px',
                    border: `2px solid ${openOctoberColors.githubGreen}`,
                    borderRight: 'none',
                    fontSize: '1rem',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    minWidth: '250px',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '1rem 2rem',
                    borderRadius: '0 8px 8px 0',
                    border: `2px solid ${openOctoberColors.githubGreen}`,
                    borderLeft: 'none',
                    background: openOctoberColors.githubGreen,
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Subscribe
                </button>
              </form>
              
              {error && (
                <div style={{ color: '#ff6b6b', marginTop: '1rem' }}>{error}</div>
              )}
              {success && (
                <div style={{ color: openOctoberColors.githubGreen, marginTop: '1rem' }}>
                  You&apos;re in! We&apos;ll send you event updates soon.
                </div>
              )}
            </div>

            <div style={{ marginTop: '3rem', fontSize: '1rem', opacity: '0.8' }}>
              <p>Questions? Contact us:</p>
              <p>
                <a href="mailto:hello@openoctober.dev" style={{ color: openOctoberColors.goldenrod, textDecoration: 'none' }}>
                  hello@openoctober.dev
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <FooterComponent />
    </>
  );
}
