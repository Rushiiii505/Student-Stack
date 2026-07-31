-- Create the perks table
CREATE TABLE IF NOT EXISTS perks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT,
    benefit_value DECIMAL,
    url TEXT NOT NULL,
    logo_url TEXT,
    last_verified_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Setup Row Level Security (RLS)
ALTER TABLE perks ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow public read access" ON perks
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Allow service role to insert/update (for the daily cron job)
-- Service role bypasses RLS anyway, but good practice to note.
