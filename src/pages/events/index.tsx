import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { format } from 'date-fns';

const EventsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin-bottom: 2rem;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const EventImage = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.imageUrl || '/images/blog-default.png'});
  background-size: cover;
  background-position: center;
`;

const EventContent = styled.div`
  padding: 1.5rem;
`;

const EventTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin: 0 0 1rem 0;
`;

const EventMeta = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const EventType = styled.span`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: inline-block;
`;

const EventDescription = styled.p`
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  startDatetime: string;
  endDatetime: string;
  location: string;
  type: string;
  imageUrl?: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <>
      <Head>
        <title>Events | The Barefoot Developer</title>
        <meta name="description" content="Join us for workshops, meetups, and other community events." />
      </Head>

      <EventsContainer>
        <Title>Upcoming Events</Title>
        
        <EventGrid>
          {events.map((event) => (
            <Link href={`/events/${event.slug}`} key={event.id} passHref>
              <EventCard>
                <EventImage imageUrl={event.imageUrl} />
                <EventContent>
                  <EventType>{event.type}</EventType>
                  <EventTitle>{event.title}</EventTitle>
                  <EventMeta>
                    {format(new Date(event.startDatetime), 'MMM d, yyyy h:mm a')}
                    <br />
                    {event.location}
                  </EventMeta>
                  <EventDescription>{event.description}</EventDescription>
                </EventContent>
              </EventCard>
            </Link>
          ))}
        </EventGrid>
      </EventsContainer>
    </>
  );
} 