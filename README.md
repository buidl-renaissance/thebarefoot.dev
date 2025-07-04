# 🌱 Barefoot Developer Group

**Build for your people. Code with purpose.**

A grassroots developer collective building tools for collective ownership, empowerment, and change. Made in Detroit. Shared with the world.

## 🚀 About

The Barefoot Developer Group draws inspiration from the barefoot doctors of rural China—community-based medical practitioners trained to provide essential healthcare in underserved areas. In the same spirit, Barefoot Developers are technologists committed to building essential digital tools with and for their communities.

### Core Beliefs
- **Technology is care** — When built with compassion and understanding, software becomes infrastructure for social well-being
- **Local is powerful** — Developers rooted in community can solve hyper-specific problems others overlook
- **Open source is medicine** — Like public health knowledge, open tools should be shared, remixable, and collectively maintained
- **Education is empowerment** — Barefoot Developers mentor others, grow local talent, and reduce reliance on extractive tech models

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) with TypeScript
- **Styling**: [Styled Components](https://styled-components.com/) with custom Detroit theme
- **Package Manager**: [Yarn](https://yarnpkg.com/)
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 🎨 Design System

### Detroit Local, Global Impact Theme
- **Colors**: Asphalt Black, Rusted Steel, Neon Orange, Brick Red, Creamy Beige
- **Typography**: Industrial headings with humanist body text
- **Aesthetic**: Blue-collar-meets-hacker energy with gritty textures

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/thebarefoot.dev.git
cd thebarefoot.dev
```

2. Install dependencies:
```bash
yarn install
```

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the site

## 📁 Project Structure

```
src/
├── pages/           # Next.js pages and API routes
│   ├── index.tsx    # Homepage
│   ├── about.tsx    # About page
│   └── api/         # API endpoints
│       └── subscribe.ts  # Email subscription API
├── styles/          # Styled components and theme
│   └── theme.ts     # Detroit theme configuration
└── public/          # Static assets
    └── images/      # Images and logos
```

## 🔧 Development

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

### Adding New Pages

1. Create a new file in `src/pages/`
2. Use styled-components with the theme
3. Follow the existing component patterns

### Styling Guidelines

- Use the theme colors and fonts from `src/styles/theme.ts`
- Follow the Detroit aesthetic with industrial, gritty elements
- Ensure mobile-first responsive design
- Use styled-components for all styling

## 📧 Email Integration

The site includes an email capture system with API endpoint at `/api/subscribe`. Currently logs emails to console - ready for integration with:

- Mailchimp
- ConvertKit
- Supabase
- Custom email service

## 🌍 Mission

To build and maintain open, community-driven software that addresses real needs—whether it's documenting cultural stories, organizing neighborhood projects, streamlining local governance, or improving access to resources.

## 🤝 Contributing

We organize around service, not profit. Around proximity, not prestige.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Website**: [thebarefoot.dev](https://thebarefoot.dev)
- **GitHub**: [buidl-renaissance](https://github.com/buidl-renaissance)
- **Instagram**: [@thebarefoot.dev](https://www.instagram.com/thebarefoot.dev)

---

*Made in Detroit. Shared with the world.*
