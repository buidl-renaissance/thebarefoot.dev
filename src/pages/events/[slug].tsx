import React, { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { format } from 'date-fns';
import { db } from '@/db';
import { events } from '@/db/schema';
import { eq, isNull, and } from 'drizzle-orm';
import { GridInteraction } from '@/components/GridInteraction';

const EventContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
`;

const EventContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const EventHeader = styled.div`
  position: relative;
  text-align: center;
  padding: 2rem;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const HeaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  z-index: -2;
  &::before {
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
    &::after {
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

const GridWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  color: ${({ theme }) => theme.colors.neonOrange};
  margin: 1rem 0;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin: 0.75rem 0;
  }
`;

const EventMeta = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 1.1rem;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const EventType = styled.span`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: inline-block;
  font-weight: 600;
`;

const EventImageWrapper = styled.div`
  margin: 0 auto 2rem;
  margin-top: 1rem;
  max-width: 800px;
  border-radius: 12px;
  overflow: hidden;
`;

const EventImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const EventContentText = styled.div`
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  line-height: 1.8;
  font-size: 1.1rem;
  white-space: pre-wrap;
  padding-bottom: 2rem;
`;

const RsvpButton = styled.button`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 2rem 0;
  margin-top: 0;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.brickRed};
    color: ${({ theme }) => theme.colors.creamyBeige};
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0;
    align-items: flex-end;
  }
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;

  @media (max-width: 480px) {
    border-radius: 12px 12px 0 0;
    padding: 1.5rem;
  }
`;

const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.neonOrange};
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.875rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

const Button = styled.button<{ variant?: 'secondary' }>`
  background: ${({ theme, variant }) => 
    variant === 'secondary' ? 'transparent' : theme.colors.neonOrange};
  color: ${({ theme, variant }) => 
    variant === 'secondary' ? theme.colors.neonOrange : theme.colors.asphaltBlack};
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  padding: 0.875rem;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme, variant }) => 
      variant === 'secondary' ? theme.colors.neonOrange : theme.colors.brickRed};
    color: ${({ theme, variant }) => 
      variant === 'secondary' ? theme.colors.asphaltBlack : theme.colors.creamyBeige};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.brickRed};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #4CAF50;
  font-size: 0.9rem;
  margin-top: 0.5rem;
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
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Props {
  event: Event;
}

function EventDetails({ event }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModalClose = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setError('');
      setSuccess('');
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    // Close only if clicking the backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/events/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to RSVP');
      }

      setSuccess('Thanks for your RSVP! We\'ll see you there.');
      setFormData({ name: '', email: '' });
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess('');
      }, 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to RSVP');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <>
      <Head>
        <title>{event.title} | The Barefoot Developer</title>
        <meta name="description" content={event.description} />
      </Head>

      <EventContainer>
        <EventHeader>
          <HeaderBackground />
          <GridWrapper>
            <GridInteraction />
          </GridWrapper>
          <EventType>{event.type}</EventType>
          <Title>{event.title}</Title>
          <EventMeta>
            {format(new Date(event.startDatetime), 'EEEE, MMMM d, yyyy')}
            <br />
            {format(new Date(event.startDatetime), 'h:mm a')} - {format(new Date(event.endDatetime), 'h:mm a')}
            <br />
            📍 {event.location}
          </EventMeta>
        </EventHeader>

        <EventContent>
          {event.imageUrl && (
            <EventImageWrapper>
              <EventImage src={event.imageUrl} alt={event.title} />
            </EventImageWrapper>
          )}

          <RsvpButton onClick={() => setIsModalOpen(true)}>
            RSVP for this event
          </RsvpButton>

          <EventContentText>
            {event.description}
          </EventContentText>
        </EventContent>
      </EventContainer>

      <Modal isOpen={isModalOpen} onClick={handleModalClick}>
        <ModalContent>
          <ModalTitle>RSVP for {event.title}</ModalTitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            <ButtonGroup>
              <Button type="button" variant="secondary" onClick={handleModalClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Confirm RSVP'}
              </Button>
            </ButtonGroup>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const eventResults = await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.slug, slug),
          isNull(events.deletedAt)
        )
      );

    const event = eventResults[0];

    if (!event) {
      return {
        notFound: true,
      };
    }

    // Convert all Date objects to ISO strings
    const serializedEvent = {
      ...event,
      startDatetime: event.startDatetime.toISOString(),
      endDatetime: event.endDatetime.toISOString(),
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
      deletedAt: event.deletedAt ? event.deletedAt.toISOString() : null,
    };

    return {
      props: {
        event: serializedEvent,
      },
    };
  } catch (error) {
    console.error('Error fetching event:', error);
    return {
      notFound: true,
    };
  }
};

export default EventDetails; 