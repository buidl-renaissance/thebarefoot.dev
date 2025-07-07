import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import type { ThemeType } from '@/styles/theme';

const Container = styled.div<{ theme: ThemeType }>`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const Header = styled.header<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 2rem 1rem;
  text-align: center;
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neonOrange};

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
`;

const Logo = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const HeaderTitle = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  z-index: 1;
`;

const HeaderSubtitle = styled.p<{ theme: ThemeType }>`
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  line-height: 1.6;
`;

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const Form = styled.form`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  border: 2px solid ${({ theme }) => theme.colors.neonOrange};
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  position: relative;
  max-width: 550px;
  margin: 0 auto;

  @media (max-width: 768px) {
    border: none;
    padding: 1.5rem;
    box-shadow: none;
  }
`;

const FormSection = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.colors.neonOrange};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const QuestionText = styled.p<{ theme: ThemeType }>`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin: 0 0 1.5rem 0;
  font-weight: 500;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RadioOption = styled.label<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.neonOrange};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.creamyBeige};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 79, 0, 0.3);
  }

  input[type="radio"] {
    margin-right: 1rem;
    transform: scale(1.2);
    accent-color: ${({ theme }) => theme.colors.neonOrange};
  }

  input[type="radio"]:checked + span {
    color: ${({ theme }) => theme.colors.neonOrange};
    font-weight: 600;
  }

  &:has(input[type="radio"]:checked) {
    color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 4px 12px rgba(255, 79, 0, 0.3);
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxOption = styled.label<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.neonOrange};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.creamyBeige};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 79, 0, 0.3);
  }

  input[type="checkbox"] {
    margin-right: 1rem;
    transform: scale(1.2);
    accent-color: ${({ theme }) => theme.colors.neonOrange};
  }

  input[type="checkbox"]:checked + span {
    color: ${({ theme }) => theme.colors.neonOrange};
    font-weight: 600;
  }

  &:has(input[type="checkbox"]:checked) {
    color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 4px 12px rgba(255, 79, 0, 0.3);
  }
`;



const SubmitButton = styled.button<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  border: 2px solid ${({ theme }) => theme.colors.neonOrange};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%;
  margin-top: 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 79, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
  border: 2px solid ${({ theme }) => theme.colors.neonOrange};
`;

const ErrorMessage = styled.div<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.brickRed};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
  border: 2px solid ${({ theme }) => theme.colors.brickRed};
`;

const OtherCityInput = styled.input<{ theme: ThemeType }>`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.neonOrange};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 79, 0, 0.3);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.creamyBeige};
    opacity: 0.6;
  }
`;

interface FormData {
  experience: string;
  interests: string[];
  city: string;
  otherCity: string;
  accountability: boolean;
}

export default function JourneyPage() {
  const [formData, setFormData] = useState<FormData>({
    experience: '',
    interests: [],
    city: '',
    otherCity: '',
    accountability: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleExperienceChange = (value: string) => {
    setFormData(prev => ({ ...prev, experience: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/walk-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({
          experience: '',
          interests: [],
          city: '',
          otherCity: '',
          accountability: false
        });
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Walk your path | thebarefoot.dev</title>
        <meta name="description" content="Tell us about your development journey and interests to help us guide you to the best tools and resources." />
      </Head>

      <Container>
        <Header>
          <Logo>
            <Image
              src="/images/thebarefoot.dev.png"
              alt="thebarefoot.dev Logo"
              width={80}
              height={80}
            />
          </Logo>
          <HeaderTitle>Walk your path</HeaderTitle>
          <HeaderSubtitle>
            Help us understand where you&apos;re at so we can guide you to the best tools and resources for your goals.
          </HeaderSubtitle>
        </Header>

        <Main>
          {success && (
            <SuccessMessage>
              <h3>Thanks for sharing your journey!</h3>
              <p>We&apos;ll use this information to send you relevant resources and opportunities. You&apos;ll hear from us soon!</p>
            </SuccessMessage>
          )}

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          <Form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>Your Experience</SectionTitle>
              <QuestionText>What best describes you right now?</QuestionText>
              <RadioGroup>
                <RadioOption>
                  <input
                    type="radio"
                    name="experience"
                    value="none"
                    checked={formData.experience === 'none'}
                    onChange={() => handleExperienceChange('none')}
                  />
                  <span>I&apos;m not a developer</span>
                </RadioOption>
                <RadioOption>
                  <input
                    type="radio"
                    name="experience"
                    value="beginner"
                    checked={formData.experience === 'beginner'}
                    onChange={() => handleExperienceChange('beginner')}
                  />
                  <span>Just getting started with coding</span>
                </RadioOption>
                <RadioOption>
                  <input
                    type="radio"
                    name="experience"
                    value="intermediate"
                    checked={formData.experience === 'intermediate'}
                    onChange={() => handleExperienceChange('intermediate')}
                  />
                  <span>I&apos;ve built projects before</span>
                </RadioOption>
                <RadioOption>
                  <input
                    type="radio"
                    name="experience"
                    value="advanced"
                    checked={formData.experience === 'advanced'}
                    onChange={() => handleExperienceChange('advanced')}
                  />
                  <span>I&apos;m a seasoned developer</span>
                </RadioOption>
              </RadioGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>Your Interests</SectionTitle>
              <QuestionText>Which of these are you interested in?</QuestionText>
              <CheckboxGroup>
                <CheckboxOption>
                  <input
                    type="checkbox"
                    value="neighborhood-apps"
                    checked={formData.interests.includes('neighborhood-apps')}
                    onChange={() => handleInterestChange('neighborhood-apps')}
                  />
                  <span>Building apps for my neighborhood</span>
                </CheckboxOption>
                <CheckboxOption>
                  <input
                    type="checkbox"
                    value="business-automation"
                    checked={formData.interests.includes('business-automation')}
                    onChange={() => handleInterestChange('business-automation')}
                  />
                  <span>Automating local business workflows</span>
                </CheckboxOption>
                <CheckboxOption>
                  <input
                    type="checkbox"
                    value="community-tools"
                    checked={formData.interests.includes('community-tools')}
                    onChange={() => handleInterestChange('community-tools')}
                  />
                  <span>Launching digital tools for community orgs</span>
                </CheckboxOption>
                <CheckboxOption>
                  <input
                    type="checkbox"
                    value="ai-tools"
                    checked={formData.interests.includes('ai-tools')}
                    onChange={() => handleInterestChange('ai-tools')}
                  />
                  <span>Learning about AI-powered tools</span>
                </CheckboxOption>
                <CheckboxOption>
                  <input
                    type="checkbox"
                    value="local-meetups"
                    checked={formData.interests.includes('local-meetups')}
                    onChange={() => handleInterestChange('local-meetups')}
                  />
                  <span>Joining local meetups and dev groups</span>
                </CheckboxOption>
              </CheckboxGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>Connect Locally</SectionTitle>
              <QuestionText>Where do you prefer to connect?</QuestionText>
              <RadioGroup>
                <RadioOption>
                  <input
                    type="radio"
                    name="city"
                    value="ann-arbor"
                    checked={formData.city === 'ann-arbor'}
                    onChange={() => handleInputChange('city', 'ann-arbor')}
                  />
                  <span>Ann Arbor</span>
                </RadioOption>
                <RadioOption>
                  <input
                    type="radio"
                    name="city"
                    value="detroit"
                    checked={formData.city === 'detroit'}
                    onChange={() => handleInputChange('city', 'detroit')}
                  />
                  <span>Detroit</span>
                </RadioOption>
                <RadioOption>
                  <input
                    type="radio"
                    name="city"
                    value="royal-oak"
                    checked={formData.city === 'royal-oak'}
                    onChange={() => handleInputChange('city', 'royal-oak')}
                  />
                  <span>Royal Oak</span>
                </RadioOption>
                <RadioOption>
                  <input
                    type="radio"
                    name="city"
                    value="other"
                    checked={formData.city === 'other'}
                    onChange={() => handleInputChange('city', 'other')}
                  />
                  <span>Other</span>
                </RadioOption>
              </RadioGroup>
              {formData.city === 'other' && (
                <OtherCityInput
                  type="text"
                  placeholder="Enter your city"
                  value={formData.otherCity}
                  onChange={(e) => handleInputChange('otherCity', e.target.value)}
                />
              )}
            </FormSection>

            <FormSection>
              <SectionTitle>Stay Accountable</SectionTitle>
              <CheckboxOption>
                <input
                  type="checkbox"
                  checked={formData.accountability}
                  onChange={(e) => handleInputChange('accountability', e.target.checked)}
                />
                <span>Want to be part of a monthly accountability crew?</span>
              </CheckboxOption>
            </FormSection>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Take Your Next Step'}
            </SubmitButton>
          </Form>
        </Main>
      </Container>
    </>
  );
} 