-- Seva Mela 2025 - Database Schema
-- This file creates the necessary tables for the Seva Mela application

-- Table: players
-- Stores participant information
CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(name, category)
);

-- Table: game_scores
-- Stores individual game progress for each player
CREATE TABLE game_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    game_id TEXT NOT NULL,
    scanned BOOLEAN DEFAULT FALSE,
    stage_percent INTEGER DEFAULT 0,
    coins_earned INTEGER DEFAULT 0,
    game_percent INTEGER DEFAULT NULL,  -- NULL means not awarded yet, 0+ means awarded
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, game_id)
);

-- Indexes for better query performance
CREATE INDEX idx_players_category ON players(category);
CREATE INDEX idx_players_is_admin ON players(is_admin);
CREATE INDEX idx_game_scores_player_id ON game_scores(player_id);
CREATE INDEX idx_game_scores_game_id ON game_scores(game_id);
CREATE INDEX idx_game_scores_scanned ON game_scores(scanned);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_players_updated_at
    BEFORE UPDATE ON players
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_game_scores_updated_at
    BEFORE UPDATE ON game_scores
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow all operations for service role (for now)
-- You can customize these based on your security requirements
CREATE POLICY "Enable all access for service role" ON players
    FOR ALL USING (true);

CREATE POLICY "Enable all access for service role" ON game_scores
    FOR ALL USING (true);

-- Sample data fix query (run this if you have existing data with game_percent = 0)
-- This sets game_percent to NULL for players who scanned but haven't been awarded yet
-- UPDATE game_scores 
-- SET game_percent = NULL 
-- WHERE scanned = true 
--   AND game_percent = 0 
--   AND stage_percent > 0;