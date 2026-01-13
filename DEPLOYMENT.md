# Deployment Guide

## Prerequisites

1. Node.js 18+ installed
2. Domain: studiothielman.com
3. Hosting accounts for frontend and backend
4. Email service (SMTP) configured
5. Mailchimp account (optional)
6. Calendar service (Calendly/Notion Calendar)

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to project: `cd devoracraft-website`
3. Run: `vercel`
4. Follow prompts to configure
5. Set environment variable: `VITE_API_URL=https://api.studiothielman.com`

### Option 2: Netlify

1. Build the project: `npm run build`
2. Deploy `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Option 3: Traditional Hosting

1. Build: `npm run build`
2. Upload `dist` folder contents to web server
3. Configure server to serve index.html for all routes

## Backend Deployment

### Option 1: Railway/Render

1. Connect GitHub repository
2. Set root directory to `backend`
3. Configure environment variables
4. Deploy

### Option 2: VPS/Server

1. SSH into server
2. Clone repository
3. Install dependencies: `cd backend && npm install`
4. Set up PM2: `npm install -g pm2`
5. Start server: `pm2 start server.js --name devoracraft-api`
6. Configure reverse proxy (Nginx) to forward requests to port 3001

### Environment Variables

Create `.env` file in backend directory:

```env
PORT=3001
JWT_SECRET=your-very-secure-secret-key-here
MAILCHIMP_API_KEY=your-key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=your-list-id
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CALENDAR_TYPE=calendly
CALENDAR_URL=https://calendly.com/your-calendar
FRONTEND_URL=https://studiothielman.com
ADMIN_EMAIL=admin@studiothielman.com
```

## Database Migration

The current setup uses JSON files for storage. For production, consider migrating to:

- **SQLite** (simple, file-based)
- **PostgreSQL** (recommended for production)
- **MongoDB** (if preferred)

Update the database layer in `backend/db/` to use your chosen database.

## Initial Admin User Setup

1. Start backend server
2. POST to `/api/auth/register`:
```json
{
  "username": "admin",
  "email": "admin@studiothielman.com",
  "password": "secure-password-here"
}
```

## Post-Deployment Checklist

- [ ] Frontend accessible at studiothielman.com
- [ ] Backend API accessible
- [ ] Form submissions working
- [ ] Email notifications sending
- [ ] Admin dashboard accessible
- [ ] File uploads working
- [ ] Calendar links generating
- [ ] SSL certificate installed
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Database backups configured

## Monitoring

- Set up error tracking (Sentry, etc.)
- Monitor server logs
- Set up uptime monitoring
- Configure email alerts for errors
