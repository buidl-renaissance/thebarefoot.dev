import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

interface TranscriptRequest {
  transcript: string;
  blogType?: string;
  addCallToAction?: boolean;
  tone?: string;
  length?: string;
}

interface GeneratedBlogResponse {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { transcript, blogType, addCallToAction, tone, length }: TranscriptRequest = req.body;

    if (!transcript || !transcript.trim()) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Build the system prompt based on the options
    const systemPrompt = buildSystemPrompt(blogType, addCallToAction, tone, length);
    
    // Generate blog post using OpenAI
    const generatedBlog = await generateBlogFromTranscript(transcript, systemPrompt);

    res.status(200).json(generatedBlog);
  } catch (error) {
    console.error('Error generating blog post:', error);
    res.status(500).json({ error: 'Failed to generate blog post' });
  }
}

function buildSystemPrompt(blogType?: string, addCallToAction?: boolean, tone?: string, length?: string): string {
  const defaultPrompt = `You're a blog editor for thebarefoot.dev, a platform focused on grassroots technology and community-first development. The site's mission is to share tools, frameworks, and stories from local developers who build meaningful technology for their communities.

CONTEXT ABOUT THEBAREFOOT.DEV:
- Inspired by barefoot doctors who brought healthcare to underserved communities
- Focuses on "small, meaningful tools" that neighbors can use to support each other
- Emphasizes local-first development, community impact, and digital fluency
- Celebrates barefoot technologists: everyday people empowered to build, teach, and maintain digital tools for their communities
- Values include: peer mentorship, hands-on learning, mutual aid, offline-first tools, and community trust

When writing blog posts, emphasize:
- How the project serves the local community
- The human impact and relationships built through technology
- The tools and frameworks used (especially if they're accessible to non-technical people)
- How others can learn from or replicate this work
- The community-first approach to technology development

Generate a blog post with the following structure:
1. A catchy headline that captures the community impact
2. An intro paragraph (who they are, what they're building for their community)
3. Body sections covering:
   - Project description and community need it addresses
   - Community impact and relationships built
   - Tools/tech used (emphasize accessibility and local relevance)
   - Personal story or anecdote that shows the human side
4. Conclusion with what's next and how others can support/get involved
5. Relevant tags (comma-separated)

Format the content in HTML with appropriate tags (<h2>, <p>, <strong>, etc.).

Tone: ${tone || 'casual'} (but always warm and community-focused)
Length: ${length || 'medium'}
${addCallToAction ? 'Include a call to action encouraging readers to join their next meetup, support their work, or learn from their approach.' : ''}

Remember: This isn't about scaling startups or building for profit. It's about how technology can help communities take better care of each other.

Return the response as a JSON object with the following structure:
{
  "title": "The generated title",
  "content": "The full HTML content",
  "excerpt": "A brief excerpt/summary",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  return defaultPrompt;
}

async function generateBlogFromTranscript(transcript: string, systemPrompt: string): Promise<GeneratedBlogResponse> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Here's the transcript to convert into a blog post:\n\n${transcript}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Try to parse as JSON first
    try {
      const parsedResponse = JSON.parse(response);
             return {
         title: parsedResponse.title || 'Generated Blog Post',
         content: parsedResponse.content || response,
         excerpt: parsedResponse.excerpt || 'A local developer shares their journey building community-focused technology.',
         tags: parsedResponse.tags || ['barefoot-dev', 'community-tech', 'local-developer', 'grassroots-tech', 'mutual-aid'],
       };
     } catch {
       // If JSON parsing fails, treat the entire response as content
       return {
         title: 'Generated Blog Post',
         content: response,
         excerpt: 'A local developer shares their journey building community-focused technology.',
         tags: ['barefoot-dev', 'community-tech', 'local-developer', 'grassroots-tech', 'mutual-aid'],
       };
     }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate blog post with AI');
  }
} 