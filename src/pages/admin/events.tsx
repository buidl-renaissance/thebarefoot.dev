import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin: 0;
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.rustedSteel};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CreateButton = styled.button`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.brickRed};
    transform: translateY(-1px);
  }
`;

const EventsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const EventTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  margin: 0;
`;

const EventActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  background: ${({ theme, variant }) => 
    variant === 'delete' ? theme.colors.brickRed : 'transparent'};
  color: ${({ theme, variant }) => 
    variant === 'delete' ? theme.colors.creamyBeige : theme.colors.neonOrange};
  border: 1px solid ${({ theme, variant }) => 
    variant === 'delete' ? theme.colors.brickRed : theme.colors.neonOrange};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme, variant }) => 
      variant === 'delete' ? theme.colors.brickRed : theme.colors.neonOrange};
    color: ${({ theme, variant }) => 
      variant === 'delete' ? theme.colors.creamyBeige : theme.colors.asphaltBlack};
  }
`;

const EventDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.div`
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-weight: 500;
`;

const EventDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  line-height: 1.6;
  margin: 0;
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
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.neonOrange};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1.5rem;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-weight: 500;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled.button<{ variant?: 'secondary' }>`
  background: ${({ theme, variant }) => 
    variant === 'secondary' ? 'transparent' : theme.colors.neonOrange};
  color: ${({ theme, variant }) => 
    variant === 'secondary' ? theme.colors.neonOrange : theme.colors.asphaltBlack};
  border: 1px solid ${({ theme }) => theme.colors.neonOrange};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme, variant }) => 
      variant === 'secondary' ? theme.colors.neonOrange : theme.colors.brickRed};
    color: ${({ theme, variant }) => 
      variant === 'secondary' ? theme.colors.asphaltBlack : theme.colors.creamyBeige};
  }
`;

// Add styled FileInput and ImagePreview (copied from blog/create.tsx)
const FileInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
  &::file-selector-button {
    background: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.asphaltBlack};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 600;
    margin-right: 1rem;
    &:hover {
      background: ${({ theme }) => theme.colors.brickRed};
    }
  }
`;
const ImagePreview = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  border-radius: 4px;
  padding: 0.75rem;
  margin-top: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 0.9rem;
`;

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  startDatetime: string | Date;
  endDatetime: string | Date;
  location: string;
  type: string;
  imageUrl?: string;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    startDatetime: '',
    endDatetime: '',
    location: '',
    type: 'workshop',
    imageUrl: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/admin/events');
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

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      startDatetime: '',
      endDatetime: '',
      location: '',
      type: 'workshop',
      imageUrl: ''
    });
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      slug: event.slug,
      description: event.description,
      startDatetime: formatDateForInput(event.startDatetime),
      endDatetime: formatDateForInput(event.endDatetime),
      location: event.location,
      type: event.type,
      imageUrl: event.imageUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/admin/events?id=${eventId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setEvents(events.filter(event => event.id !== eventId));
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        // Update existing event
        const response = await fetch('/api/admin/events', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: editingEvent.id,
            ...formData
          }),
        });
        
        if (response.ok) {
          const updatedEvent = await response.json();
          setEvents(events.map(event => 
            event.id === editingEvent.id ? updatedEvent : event
          ));
        }
      } else {
        // Create new event
        const response = await fetch('/api/admin/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          const newEvent = await response.json();
          setEvents([...events, newEvent]);
        }
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  // Add file upload handler
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: base64Data,
            fileName: file.name,
            fileType: file.type,
            folder: 'event-images',
          }),
        });
        if (response.ok) {
          const result = await response.json();
          setFormData((prev) => ({ ...prev, imageUrl: result.url }));
        } else {
          alert('Failed to upload image. Please try again.');
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      alert('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
  };

  // Helper function to convert date to datetime-local input format (EST timezone)
  const formatDateForInput = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Convert to EST timezone
    const estDate = new Date(dateObj.toLocaleString("en-US", {timeZone: "America/New_York"}));
    
    // Format as YYYY-MM-DDTHH:MM for datetime-local input
    const year = estDate.getFullYear();
    const month = String(estDate.getMonth() + 1).padStart(2, '0');
    const day = String(estDate.getDate()).padStart(2, '0');
    const hours = String(estDate.getHours()).padStart(2, '0');
    const minutes = String(estDate.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Helper function to format date for display (EST timezone)
  const formatDateTime = (dateTime: string | Date) => {
    const dateObj = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
    return dateObj.toLocaleString("en-US", {
      timeZone: "America/New_York",
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      <Head>
        <title>Events Management - Admin Dashboard</title>
        <meta name="description" content="Manage events for The Barefoot Dev" />
      </Head>
      
      <AdminContainer>
        <Header>
          <Title>Events Management</Title>
          <BackLink href="/admin">
            ← Back to Dashboard
          </BackLink>
        </Header>

        <ActionBar>
          <h2>All Events ({events.length})</h2>
          <CreateButton onClick={handleCreateEvent}>
            + Create New Event
          </CreateButton>
        </ActionBar>

        <EventsGrid>
          {events.map(event => (
            <EventCard key={event.id}>
              <EventHeader>
                <EventTitle>{event.title}</EventTitle>
                <EventActions>
                  <ActionButton onClick={() => handleEditEvent(event)}>
                    Edit
                  </ActionButton>
                  <ActionButton 
                    variant="delete" 
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Delete
                  </ActionButton>
                </EventActions>
              </EventHeader>
              
              <EventDetails>
                <DetailItem>
                  <DetailLabel>Type</DetailLabel>
                  <DetailValue>{event.type}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Location</DetailLabel>
                  <DetailValue>{event.location}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Start</DetailLabel>
                  <DetailValue>{formatDateTime(event.startDatetime)}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>End</DetailLabel>
                  <DetailValue>{formatDateTime(event.endDatetime)}</DetailValue>
                </DetailItem>
              </EventDetails>
              
              <EventDescription>{event.description}</EventDescription>
            </EventCard>
          ))}
        </EventsGrid>

        <Modal isOpen={isModalOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </ModalTitle>
              <CloseButton onClick={() => setIsModalOpen(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Slug</Label>
                <Input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Event Type</Label>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="workshop">Workshop</option>
                  <option value="meetup">Meetup</option>
                  <option value="hacknight">Hacknight</option>
                  <option value="conference">Conference</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Location</Label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Start Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={formData.startDatetime}
                  onChange={(e) => setFormData({...formData, startDatetime: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>End Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={formData.endDatetime}
                  onChange={(e) => setFormData({...formData, endDatetime: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Event Image (Optional)</Label>
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
                {isUploading && (
                  <ImagePreview>
                    <span>Uploading image...</span>
                  </ImagePreview>
                )}
                {formData.imageUrl && !isUploading && (
                  <ImagePreview>
                    <span>Uploaded: {formData.imageUrl}</span>
                    <br />
                    <img src={formData.imageUrl} alt="Event" style={{ maxWidth: '100%', marginTop: '0.5rem', borderRadius: '4px' }} />
                  </ImagePreview>
                )}
              </FormGroup>
              
              <ButtonGroup>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      </AdminContainer>
    </>
  );
} 