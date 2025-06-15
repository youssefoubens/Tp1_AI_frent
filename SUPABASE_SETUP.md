# Supabase Authentication & Database Setup Guide

This guide will help you set up Supabase authentication and database integration for the Moroccan Law App.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js (v16 or newer)
3. Your Moroccan Law App project

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `moroccan-law-app`
   - Database Password: Choose a strong password
   - Region: Choose the closest to your users
5. Click "Create new project"

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Project API Key (anon, public)

## Step 3: Update Environment Variables

Your `.env.local` file has been updated with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://axgfahjylmojbjgzvzih.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4Z2ZhaGp5bG1vamJqZ3p2emloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTIxMzAsImV4cCI6MjA2NTU2ODEzMH0.Qj_tGyaDmpQbsUq6fQJUWESFhBog7_Ev8mVDy6ToaMM
```

## Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase-setup.sql` and paste it into the SQL Editor
3. Click "Run" to execute the SQL commands

This will create:
- `profiles` table for user profiles
- `consultations` table for legal consultations
- `documents` table for generated documents
- `user_activity` table for tracking user actions
- Row Level Security policies
- Automatic profile creation trigger
- Performance indexes

## Step 5: Configure Authentication

### Email Authentication
Email authentication is already configured and working.

### OAuth Providers (Optional)

To enable Google and Facebook login:

1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Google:
   - Toggle "Enable sign in with Google"
   - Add your Google OAuth credentials
3. Enable Facebook:
   - Toggle "Enable sign in with Facebook"
   - Add your Facebook OAuth credentials

### Email Confirmation (Optional)

To require email confirmation:

1. Go to Authentication > Settings
2. Toggle "Enable email confirmations"
3. Customize email templates if needed

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`

3. Test the authentication flow:
   - Sign up with a new account
   - Sign in with existing credentials
   - Test logout functionality
   - Access protected routes (dashboard)

## Features Implemented

### ✅ Authentication
- Email/password authentication
- OAuth providers (Google, Facebook)
- Session management
- Protected routes
- Automatic redirects

### ✅ Database Integration
- User profiles
- Row Level Security
- Automatic profile creation
- TypeScript types
- Database utilities

### ✅ UI Components
- Updated AuthContext with real Supabase auth
- Enhanced signin/signup pages
- Protected dashboard
- Updated navbar with auth state
- Loading states and error handling

## File Changes Made

### Updated Files:
- `.env.local` - Updated with your Supabase credentials
- `app/lib/supabase.ts` - Enhanced client configuration
- `app/context/AuthContext.tsx` - Real Supabase authentication
- `app/auth/signin/page.tsx` - OAuth integration
- `app/auth/signup/page.tsx` - Real registration
- `middleware.ts` - Enhanced session handling
- `app/components/Dashboard.tsx` - Real auth integration
- `app/components/Navbar.tsx` - Auth state management
- `app/styles/navbar.css` - Logout button styles

### New Files:
- `app/auth/callback/page.tsx` - OAuth callback handler
- `app/lib/database.ts` - Database utilities
- `supabase-setup.sql` - Database schema
- `SUPABASE_SETUP.md` - This setup guide

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**
   - Check your environment variables
   - Ensure you're using the anon/public key, not the service role key

2. **"User not found"**
   - Check if the user profile was created automatically
   - Verify the trigger is working in the SQL Editor

3. **"Access denied"**
   - Check Row Level Security policies
   - Ensure the user is authenticated

4. **OAuth redirect issues**
   - Verify your OAuth provider settings
   - Check the callback URL configuration

### Getting Help:

- Check the [Supabase documentation](https://supabase.com/docs)
- Review the browser console for errors
- Check the Supabase dashboard logs

## Next Steps

1. Customize the database schema for your specific needs
2. Add more OAuth providers if needed
3. Implement password reset functionality
4. Add user profile management
5. Set up email templates
6. Configure production environment variables

Your Moroccan Law App now has full Supabase authentication and database integration! 🎉
