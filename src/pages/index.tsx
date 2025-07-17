import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import React, { useState } from "react";
import Link from "next/link";

import type { ThemeType } from "@/styles/theme";
import FooterComponent from "@/components/Footer";
import { GridInteraction } from "@/components/GridInteraction";

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

  /* &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,79,0,0.15)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    z-index: 0;
  } */
`;

const Headline = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.35rem, 5vw, 3.5rem);
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
`;

const BlockSpan = styled.span`
  display: inline-block;
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.colors.neonOrange};
    border-radius: 2px;
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

const EmailSubmit = styled(CTAButton).attrs({ as: "button" })`
  border-radius: 0 8px 8px 0;
  border: 3px solid ${({ theme }) => theme.colors.neonOrange};
  border-left: none;

  &:hover {
    transform: none;
    color: white;
  }

  @media (max-width: 480px) {
    border-radius: 8px;
    border-left: 2px solid ${({ theme }) => theme.colors.neonOrange};
    width: 100%;
    max-width: 280px;
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

const WhyJoinSection = styled.section<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.creamyBeige};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 5rem 1rem;
  text-align: center;
  position: relative;
`;

const SectionTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 4vw, 3rem);
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;

  &::after {
    content: "";
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
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const ColumnIcon = styled.div<{ theme: ThemeType }>`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
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

// const ProjectsSection = styled.section<{ theme: ThemeType }>`
//   background: ${({ theme }) => theme.colors.asphaltBlack};
//   color: ${({ theme }) => theme.colors.creamyBeige};
//   padding: 4rem 1rem;
//   text-align: center;
//   position: relative;
// `;

// const ProjectsTitle = styled.h2<{ theme: ThemeType }>`
//   font-family: ${({ theme }) => theme.fonts.heading};
//   font-size: clamp(1.8rem, 3vw, 2.5rem);
//   margin-bottom: 1.5rem;
//   text-transform: uppercase;
//   letter-spacing: 2px;
// `;

// const ProjectsDescription = styled.p<{ theme: ThemeType }>`
//   font-family: ${({ theme }) => theme.fonts.body};
//   font-size: 1.1rem;
//   margin-bottom: 2.5rem;
//   max-width: 700px;
//   margin-left: auto;
//   margin-right: auto;
//   line-height: 1.6;
//   opacity: 0.9;
// `;



const Logo = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
`;

const EventsSection = styled.section<{ theme: ThemeType }>`
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

const EventsTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const EventsDescription = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 3rem;
  justify-items: center;
`;

const EventCard = styled.div<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 2rem;
  text-align: left;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 460px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.neonOrange};
    transform: translateY(-2px);
  }
`;

const EventTitle = styled.h3<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin-bottom: 1rem;
`;

const EventDetails = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const EventDetail = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
`;

const EventImage = styled.div`
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
`;

const EventDescription = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  line-height: 1.6;
  margin: 0;
`;

const NoEventsMessage = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-style: italic;
  margin: 2rem 0;
`;

interface Event {
  id: number;
  title: string;
  description: string;
  startDatetime: string | Date;
  endDatetime: string | Date;
  location: string;
  type: string;
  imageUrl?: string;
}

interface HomeProps {
  events: Event[];
}

export default function Home({ events }: HomeProps) {
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



  // Helper function to format date for display (EST timezone)


  const formatEventDateRange = (startDateTime: string | Date, endDateTime: string | Date) => {
    const startDate = typeof startDateTime === 'string' ? new Date(startDateTime) : startDateTime;
    const endDate = typeof endDateTime === 'string' ? new Date(endDateTime) : endDateTime;
    
    // Check if both events are on the same day
    const isSameDay = startDate.toDateString() === endDate.toDateString();
    
    if (isSameDay) {
      // Same day: show date once, then time range
      const dateStr = startDate.toLocaleDateString("en-US", {
        timeZone: "America/New_York",
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      const startTime = startDate.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      const endTime = endDate.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      return `${dateStr}, ${startTime} - ${endTime}`;
    } else {
      // Different days: show full date range
      const startStr = startDate.toLocaleString("en-US", {
        timeZone: "America/New_York",
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      const endStr = endDate.toLocaleString("en-US", {
        timeZone: "America/New_York",
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      return `${startStr} - ${endStr}`;
    }
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
        <title>Building community tools, one block at a time | thebarefoot.dev</title>
        <meta
          name="description"
          content="Inspired by the philosophy of barefoot doctors — community members trained to serve their neighbors — this project is about bringing that same spirit to technology."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection>
        <GridInteraction />
        <Logo>
          <Image
            src="/images/thebarefoot.dev.png"
            alt="Barefoot Dev Logo"
            width={144}
            height={144}
          />
        </Logo>
        <Headline>Building community tools,</Headline>
        <Headline>one <BlockSpan>block</BlockSpan> at a time.</Headline>
        <Subheadline>
          Inspired by the philosophy of barefoot doctors — community members trained to serve their neighbors — this project is about bringing that same spirit to technology.
        </Subheadline>
        <CTAGroup>
          <CTAButton
            primary
            onClick={() =>
              document
                .getElementById("email-capture")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Join the Movement
          </CTAButton>
          <Link href="/about" passHref legacyBehavior>
            <CTAButton as="a">What We&apos;re About</CTAButton>
          </Link>
        </CTAGroup>
      </HeroSection>
      <EmailSection id="email-capture">
        <EmailTitle>Subscribe for updates</EmailTitle>
        <EmailDescription>
          I&apos;m documenting the process of building small, meaningful tech for real communities — starting with Detroit. This is a space for lessons learned, open-source blueprints, and ideas rooted in care, not scale.
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
          <EmailSubmit primary type="submit">
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
      <WhyJoinSection>
        <SectionTitle>Why Barefoot Dev?</SectionTitle>
        <ThreeColumnGrid>
          <Column>
            <ColumnIcon>🛠️</ColumnIcon>
            <ColumnTitle>Build with Purpose</ColumnTitle>
            <ColumnText>
              Open-source tools built for real-world use — from affordable
              housing to artist empowerment.
            </ColumnText>
          </Column>
          <Column>
            <ColumnIcon>🤝</ColumnIcon>
            <ColumnTitle>Community-Centered Collaboration</ColumnTitle>
            <ColumnText>
              Join others like you who care about Detroit and want to use tech
              to uplift their people.
            </ColumnText>
          </Column>
          <Column>
            <ColumnIcon>🔓</ColumnIcon>
            <ColumnTitle>Own What You Create</ColumnTitle>
            <ColumnText>
              Every line of code, every idea — credited, open-source, and
              community supported.
            </ColumnText>
          </Column>
        </ThreeColumnGrid>
      </WhyJoinSection>
      {/* <ProjectsSection>
        <ProjectsTitle>Live Projects</ProjectsTitle>
        <ProjectsDescription>
          Art Night Detroit
        </ProjectsDescription>
        <CTAButton primary>Join a Project</CTAButton>
      </ProjectsSection> */}
      <EventsSection>
        <EventsTitle>Upcoming Events</EventsTitle>
        <EventsDescription>
          Join us for workshops, meetups, and community gatherings in Detroit.
        </EventsDescription>
        {events.length > 0 ? (
          <EventsGrid>
            {events.map((event) => (
              <EventCard key={event.id}>
                {event.imageUrl && (
                  <EventImage>
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      width={400}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                  </EventImage>
                )}
                <EventTitle>{event.title}</EventTitle>
                <EventDetails>
                  <EventDetail>
                    📅 {formatEventDateRange(event.startDatetime, event.endDatetime)}
                  </EventDetail>
                  <EventDetail>
                    📍 {event.location}
                  </EventDetail>
                  <EventDetail>
                    🎯 {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </EventDetail>
                </EventDetails>
                <EventDescription>{event.description}</EventDescription>
              </EventCard>
            ))}
          </EventsGrid>
        ) : (
          <NoEventsMessage>
            No upcoming events at the moment. Check back soon!
          </NoEventsMessage>
        )}
      </EventsSection>
      <FooterComponent />
    </>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch events from the API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/events`);
    
    if (response.ok) {
      const allEvents = await response.json();
      
      // Filter for upcoming events (events that haven't ended yet)
      const now = new Date();
      const upcomingEvents = allEvents.filter((event: Event) => {
        const endDate = typeof event.endDatetime === 'string' 
          ? new Date(event.endDatetime) 
          : event.endDatetime;
        return endDate > now;
      });
      
      // Sort by start date (earliest first)
      upcomingEvents.sort((a: Event, b: Event) => {
        const dateA = typeof a.startDatetime === 'string' 
          ? new Date(a.startDatetime) 
          : a.startDatetime;
        const dateB = typeof b.startDatetime === 'string' 
          ? new Date(b.startDatetime) 
          : b.startDatetime;
        return dateA.getTime() - dateB.getTime();
      });
      
      // Limit to 3 upcoming events
      const events = upcomingEvents.slice(0, 3);
      
      return {
        props: {
          events,
        },
      };
    }
  } catch (error) {
    console.error('Error fetching events in getServerSideProps:', error);
  }
  
  return {
    props: {
      events: [],
    },
  };
}
