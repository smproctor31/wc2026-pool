-- Run this in your Supabase project: SQL Editor → New Query → Paste → Run

-- Create the pools table
CREATE TABLE IF NOT EXISTS pools (
  id UUID PRIMARY KEY,
  state JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE pools ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read pools (needed for share links)
CREATE POLICY "Anyone can read pools"
  ON pools FOR SELECT
  USING (true);

-- Allow anyone to insert pools (for creating a new pool)
CREATE POLICY "Anyone can create pools"
  ON pools FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update pools (for entering match results)
CREATE POLICY "Anyone can update pools"
  ON pools FOR UPDATE
  USING (true);

-- Enable real-time updates on the pools table
ALTER PUBLICATION supabase_realtime ADD TABLE pools;
