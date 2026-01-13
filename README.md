# Studio Thielman Website

Professional website for Studio Thielman web services company.

## Tech Stack

- **Frontend**: React 18+ with TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router
- **Backend**: Node.js with Express
- **Database**: JSON-based (can be migrated to SQLite/PostgreSQL)

## Getting Started

### Frontend Setup

```bash
cd devoracraft-website
npm install
npm run dev
```

### Backend Setup

```bash
cd devoracraft-website/backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Environment Variables

Create `.env` file in the backend directory:

```
PORT=3001
JWT_SECRET=your-secret-key
MAILCHIMP_API_KEY=your-key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=your-list-id
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CALENDAR_TYPE=calendly
CALENDAR_URL=your-calendly-url
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@example.com
```

## Features

- 6 main pages (Home, Packages, Portfolio, How It Works, About, Contact)
- Multi-step contact form with file uploads
- Admin dashboard for managing submissions
- Email automation (confirmation + notifications)
- Calendar integration (Calendly/Notion Calendar)
- Responsive design (mobile-first)
- SEO optimized
- Accessibility compliant (WCAG 2.1 AA)

## Project Structure

```
devoracraft-website/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── backend/
│   ├── routes/         # API routes
│   ├── db/             # Database layer
│   ├── services/       # Business logic
│   └── data/           # JSON database files
└── public/             # Static assets
```

## Deployment

1. Build frontend: `npm run build`
2. Deploy frontend to hosting (Vercel, Netlify, etc.)
3. Deploy backend to server (Node.js hosting)
4. Configure environment variables
5. Set up database (migrate from JSON to production database if needed)

## License

Private - Studio Thielman
