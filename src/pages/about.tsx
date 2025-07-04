import Head from "next/head";
import styled from "styled-components";

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
`;

const List = styled.ul`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  margin-left: 1.2rem;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.7rem;
`;

export default function About() {
  return (
    <PageWrapper>
      <Head>
        <title>About | Barefoot Developer Group</title>
        <meta name="description" content="Learn about the Barefoot Developer Group – Tech as Community Care." />
      </Head>
      <Main>
        <Heading>🌱 Barefoot Developer Group – Tech as Community Care</Heading>
        <Section>
          <BodyText>
            The Barefoot Developer Group draws inspiration from the barefoot doctors of rural China—community-based medical practitioners trained to provide essential healthcare in underserved areas during the 20th century. They were not elite specialists but locals equipped with practical knowledge, tools, and deep community trust. They walked among the people—solving urgent problems, sharing knowledge, and building resilience from the ground up.
          </BodyText>
          <BodyText>
            In the same spirit, Barefoot Developers are technologists committed to building essential digital tools with and for their communities. They aren't just coding from afar—they are embedded in the places they serve, listening to needs, and designing software that empowers neighbors, organizations, and movements.
          </BodyText>
        </Section>
        <Section>
          <SubHeading>🛠️ Core Beliefs</SubHeading>
          <List>
            <ListItem><strong>Technology is care</strong> — When built with compassion and understanding, software becomes infrastructure for social well-being.</ListItem>
            <ListItem><strong>Local is powerful</strong> — Developers rooted in community can solve hyper-specific problems others overlook.</ListItem>
            <ListItem><strong>Open source is medicine</strong> — Like public health knowledge, open tools should be shared, remixable, and collectively maintained.</ListItem>
            <ListItem><strong>Education is empowerment</strong> — Barefoot Developers mentor others, grow local talent, and reduce reliance on extractive tech models.</ListItem>
          </List>
        </Section>
        <Section>
          <SubHeading>🌍 Our Mission</SubHeading>
          <BodyText>
            To build and maintain open, community-driven software that addresses real needs—whether it’s documenting cultural stories, organizing neighborhood projects, streamlining local governance, or improving access to resources. We organize around service, not profit. Around proximity, not prestige.
          </BodyText>
        </Section>
        <Section>
          <SubHeading>✨ First Steps</SubHeading>
          <List>
            <ListItem><strong>Storytelling:</strong> Document the mission, values, and impact of barefoot tech work—starting with Detroit and expanding globally.</ListItem>
            <ListItem><strong>Workshops & Study Groups:</strong> Host sessions to teach community members and aspiring barefoot developers how to build tools that matter.</ListItem>
            <ListItem><strong>Tool Library:</strong> Create and maintain a GitHub ecosystem of community-useful software (like event calendars, archival platforms, mutual aid trackers).</ListItem>
            <ListItem><strong>Partnerships:</strong> Collaborate with nonprofits, artists, educators, and organizers to solve local challenges.</ListItem>
          </List>
        </Section>
      </Main>
    </PageWrapper>
  );
} 