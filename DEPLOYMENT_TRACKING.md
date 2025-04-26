# Deployment Tracking Setup Guide

This document provides instructions for setting up the deployment tracking functionality with Supabase.

## Supabase Setup

1. Create a Supabase account at [supabase.com](https://supabase.com) if you don't have one
2. Create a new project
3. Get your project URL and anon key from the project settings

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace the values with your actual Supabase project URL and anon key.

## Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create the `chain_deployments` table by running the following SQL:

```sql
CREATE TABLE chain_deployments (
  id SERIAL PRIMARY KEY,
  chain_id INTEGER NOT NULL UNIQUE,
  chain_name TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add an index for faster queries
CREATE INDEX idx_chain_deployments_chain_id ON chain_deployments(chain_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function
CREATE TRIGGER update_chain_deployments_timestamp
BEFORE UPDATE ON chain_deployments
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
```

## RLS Policies (Optional but Recommended)

To secure your data, you can set up Row Level Security (RLS):

1. Go to Authentication > Policies
2. Enable RLS on the `chain_deployments` table
3. Add the following policies:

For reading data (anyone can read):
```sql
CREATE POLICY "Anyone can read chain_deployments" 
ON chain_deployments 
FOR SELECT 
USING (true);
```

For inserting/updating (only authenticated users):
```sql
CREATE POLICY "Only authenticated users can insert" 
ON chain_deployments 
FOR INSERT 
TO authenticated 
USING (true);

CREATE POLICY "Only authenticated users can update" 
ON chain_deployments 
FOR UPDATE 
TO authenticated 
USING (true);
```

## Features

With this setup, the application will:

1. Track each successful contract deployment by chain
2. Record the total number of deployments per blockchain
3. Display global deployment statistics in the UI
4. Provide insights on which chains are most popular

## Troubleshooting

- If you see errors about "RLS policy" in the console, ensure your RLS policies are set up correctly
- If deployment tracking doesn't work, check that your environment variables are set correctly
- For any database issues, check the Supabase dashboard for logs 