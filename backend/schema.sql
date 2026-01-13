-- Database Schema for Studio Thielman Website

-- Submissions Table
CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  -- Section 1: Basic Information
  business_name TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT,
  language TEXT,
  package TEXT NOT NULL CHECK(package IN ('starter', 'growth', 'pro-max')),
  
  -- Section 2: Business Overview
  business_description TEXT NOT NULL,
  industry TEXT NOT NULL,
  has_existing_website BOOLEAN DEFAULT FALSE,
  existing_website_url TEXT,
  goals TEXT, -- JSON array
  ideal_customer TEXT NOT NULL,
  
  -- Section 3: Current Situation
  has_branding BOOLEAN DEFAULT FALSE,
  branding_details TEXT,
  biggest_challenge TEXT NOT NULL,
  timeline TEXT NOT NULL,
  
  -- Section 4: Assets & Media
  brand_colors TEXT,
  references TEXT,
  
  -- Section 5: Next Steps
  preferred_contact TEXT NOT NULL CHECK(preferred_contact IN ('email', 'phone', 'video-call')),
  best_time TEXT NOT NULL,
  timezone TEXT,
  additional_notes TEXT,
  
  -- Section 6: Terms
  understands_pricing BOOLEAN NOT NULL DEFAULT FALSE,
  ready_to_discuss BOOLEAN NOT NULL DEFAULT FALSE,
  accepts_privacy_policy BOOLEAN NOT NULL DEFAULT FALSE,
  wants_updates BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  status TEXT DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'scheduled', 'in-progress', 'completed', 'rejected')),
  notes TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Files Table
CREATE TABLE IF NOT EXISTS files (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  file_type TEXT CHECK(file_type IN ('logo', 'brand-image', 'existing-content')),
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_package ON submissions(package);
CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at ON submissions(submitted_at);
CREATE INDEX IF NOT EXISTS idx_files_submission_id ON files(submission_id);
