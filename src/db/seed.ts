import dotenv from "dotenv";
import { blogPosts } from "./schema";

// Load environment variables
dotenv.config();

// Check for required environment variables
if (!process.env.TURSO_DATABASE_URL) {
  console.error("❌ Error: TURSO_DATABASE_URL environment variable is not set");
  console.log("💡 Please create a .env.local file with your database configuration");
  console.log("📝 Example .env.local file:");
  console.log("   TURSO_DATABASE_URL=your_database_url_here");
  console.log("   TURSO_DATABASE_AUTH_TOKEN=your_auth_token_here");
  process.exit(1);
}

const mockBlogPosts = [
  {
    title: "Building Community Through Code: Detroit's Tech Renaissance",
    slug: "building-community-through-code-detroits-tech-renaissance",
    content: `
      <h2>The Detroit Tech Scene: A Story of Resilience</h2>
      
      <p>Detroit has always been a city of builders. From the automotive industry that defined the 20th century to the tech renaissance taking shape today, the spirit of innovation runs deep in our city's DNA. As developers, designers, and creators, we're part of something bigger than just writing code—we're building the future of Detroit.</p>
      
      <h3>Why Detroit?</h3>
      
      <p>When I first moved to Detroit in 2018, I was struck by the raw potential I saw everywhere. Abandoned buildings that could become co-working spaces. Empty lots that could become community gardens. And most importantly, people with incredible talent and drive who just needed the right opportunities.</p>
      
      <blockquote>
        "Detroit isn't just a place to build software—it's a place to build community. Every line of code we write has the potential to create real change in people's lives."
      </blockquote>
      
      <h3>The Power of Local Networks</h3>
      
      <p>One of the most exciting developments in Detroit's tech scene has been the emergence of strong local networks. From meetups at local coffee shops to hackathons in repurposed warehouses, developers are coming together to share knowledge and build amazing things.</p>
      
      <p>Here's what makes Detroit's developer community special:</p>
      
      <ul>
        <li><strong>Authentic connections:</strong> People here genuinely want to help each other succeed</li>
        <li><strong>Diverse perspectives:</strong> Our community reflects Detroit's rich cultural heritage</li>
        <li><strong>Real-world impact:</strong> We're solving problems that matter to our neighbors</li>
        <li><strong>Affordable innovation:</strong> Lower costs mean more room to experiment</li>
      </ul>
      
      <h3>Building the Future</h3>
      
      <p>As we continue to grow Detroit's tech ecosystem, it's important to remember that we're not just building companies—we're building a city. Every startup that succeeds, every developer who finds their dream job, every student who learns to code contributes to Detroit's renaissance.</p>
      
      <p>The challenges we face are real, but so is our determination. We're not trying to be Silicon Valley—we're building something uniquely Detroit. Something that honors our city's industrial heritage while embracing the digital future.</p>
      
      <h3>Join the Movement</h3>
      
      <p>If you're a developer, designer, or anyone interested in tech, Detroit needs you. Whether you're a seasoned professional or just starting your journey, there's a place for you in our community.</p>
      
      <p>Come to our meetups. Contribute to open source projects. Mentor someone who's just learning to code. Build something that makes Detroit better.</p>
      
      <p>Together, we're not just writing code—we're writing the future of our city.</p>
    `,
    excerpt: "How Detroit's developer community is building more than just software—we're building a city's future through technology, community, and authentic connections.",
    author: "The Barefoot Developer",
    status: "published",
    tags: JSON.stringify(["community", "detroit", "tech", "development", "innovation"]),
  },
  {
    title: "From Assembly Lines to Code: Detroit's Digital Transformation",
    slug: "from-assembly-lines-to-code-detroits-digital-transformation",
    content: `
      <h2>The Evolution of Detroit's Workforce</h2>
      
      <p>Detroit's transformation from the Motor City to a hub of digital innovation represents one of the most fascinating economic transitions in American history. The skills that once built cars are now building software, and the same principles of precision, efficiency, and quality that defined our automotive heritage are being applied to code.</p>
      
      <h3>The Assembly Line Mentality</h3>
      
      <p>Henry Ford's assembly line revolutionized manufacturing by breaking complex processes into simple, repeatable steps. Today, we apply the same thinking to software development:</p>
      
      <ul>
        <li><strong>Modular design:</strong> Just as cars are built from interchangeable parts, modern software is built from reusable components</li>
        <li><strong>Quality control:</strong> Testing and debugging mirror the quality assurance processes of automotive manufacturing</li>
        <li><strong>Continuous improvement:</strong> The kaizen philosophy of constant improvement applies perfectly to agile development</li>
      </ul>
      
      <h3>Bridging the Skills Gap</h3>
      
      <p>One of the most exciting developments in Detroit has been the emergence of coding bootcamps and training programs that specifically target workers transitioning from manufacturing to tech. These programs don't just teach coding—they teach the mindset of a digital worker.</p>
      
      <blockquote>
        "The same attention to detail that made Detroit the automotive capital of the world is now making it a center of software excellence."
      </blockquote>
      
      <h3>Local Success Stories</h3>
      
      <p>Meet Sarah, a former automotive engineer who now leads a team of developers at a Detroit-based startup. "The problem-solving skills I learned in automotive engineering translate perfectly to software development," she says. "Both fields require systematic thinking and attention to detail."</p>
      
      <p>Or consider Marcus, who went from working on the assembly line to building mobile apps. "The discipline and work ethic I developed in manufacturing have been invaluable in my new career," he explains.</p>
      
      <h3>The Future of Work in Detroit</h3>
      
      <p>As automation continues to transform manufacturing, Detroit is uniquely positioned to lead the way in the future of work. Our city understands both the challenges of technological disruption and the opportunities it creates.</p>
      
      <p>We're not just adapting to the digital economy—we're helping to shape it. Detroit's experience with industrial transformation gives us insights that other cities lack.</p>
      
      <h3>Building on Our Heritage</h3>
      
      <p>The key to Detroit's digital transformation isn't forgetting our industrial past—it's building on it. The same qualities that made Detroit the Motor City—innovation, hard work, and community—are now driving our tech renaissance.</p>
      
      <p>As we continue to evolve, let's remember that we're not just building software. We're building on a foundation of industrial excellence that's uniquely Detroit.</p>
    `,
    excerpt: "How Detroit's manufacturing heritage is shaping its digital future, and why the skills that built cars are perfect for building software.",
    author: "The Barefoot Developer",
    status: "published",
    tags: JSON.stringify(["workforce", "transformation", "manufacturing", "skills", "detroit"]),
  },
  {
    title: "The Art of Code: Detroit's Creative Coding Movement",
    slug: "the-art-of-code-detroits-creative-coding-movement",
    content: `
      <h2>Where Technology Meets Creativity</h2>
      
      <p>Detroit has always been a city of artists and innovators. From the Motown sound that defined an era to the street art that adorns our buildings, creativity is woven into the fabric of our city. Now, that same creative spirit is finding expression in code.</p>
      
      <h3>Creative Coding in Detroit</h3>
      
      <p>Creative coding—the practice of using programming as a medium for artistic expression—has found a natural home in Detroit. Our city's rich artistic heritage provides the perfect backdrop for exploring the intersection of technology and creativity.</p>
      
      <p>Local developers are creating everything from interactive art installations to generative music systems, proving that code can be as expressive as any traditional art form.</p>
      
      <h3>Projects That Inspire</h3>
      
      <p>One of my favorite local projects is an interactive installation at the Detroit Institute of Arts that uses computer vision to create music based on visitors' movements. The code reads body positions and translates them into melodies, creating a unique experience for each person.</p>
      
      <blockquote>
        "Code is our paintbrush, and Detroit is our canvas. Every project we create tells a story about our city and its people."
      </blockquote>
      
      <h3>The Community Aspect</h3>
      
      <p>What makes Detroit's creative coding scene special is its emphasis on community. Artists and developers regularly collaborate on projects, sharing skills and perspectives. These collaborations often result in work that neither group could create alone.</p>
      
      <h3>Educational Opportunities</h3>
      
      <p>Local organizations are working to make creative coding accessible to everyone. Workshops and classes teach people of all ages how to use code as a creative tool, from elementary school students learning to program robots to seniors creating digital art.</p>
      
      <h3>The Future of Creative Tech</h3>
      
      <p>As Detroit continues to grow as a tech hub, I believe creative coding will play an increasingly important role. Our city's artistic heritage combined with its growing tech community creates unique opportunities for innovation.</p>
      
      <p>Whether you're a traditional artist looking to explore digital mediums or a developer interested in creative expression, Detroit offers a supportive environment for experimentation and growth.</p>
      
      <h3>Getting Involved</h3>
      
      <p>If you're interested in creative coding, Detroit has plenty of opportunities to get involved:</p>
      
      <ul>
        <li>Attend workshops at local makerspaces</li>
        <li>Join creative coding meetups</li>
        <li>Collaborate on community art projects</li>
        <li>Learn from local artists and developers</li>
      </ul>
      
      <p>Remember, you don't need to be an expert programmer to start creating with code. The most important thing is having a creative vision and the willingness to learn.</p>
    `,
    excerpt: "How Detroit's artistic heritage is inspiring a new generation of creative coders, blending technology with the city's rich cultural traditions.",
    author: "The Barefoot Developer",
    status: "published",
    tags: JSON.stringify(["creative-coding", "art", "community", "detroit", "innovation"]),
  }
];

async function seedBlogPosts() {
  try {
    // Import database connection inside the function to avoid module-level issues
    const { db } = await import("./index");
    
    console.log("🌱 Seeding blog posts...");
    
    for (const post of mockBlogPosts) {
      await db.insert(blogPosts).values({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        author: post.author,
        status: post.status,
        tags: post.tags,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✅ Added blog post: ${post.title}`);
    }
    
    console.log("🎉 Blog posts seeded successfully!");
    console.log("📝 You can now visit /blog to see the blog listing");
    console.log("🔗 Individual posts will be available at /blog/[slug]");
  } catch (error) {
    console.error("❌ Error seeding blog posts:", error);
    console.log("💡 Make sure your database is properly configured and accessible");
  }
}

// Run the seed function
seedBlogPosts(); 