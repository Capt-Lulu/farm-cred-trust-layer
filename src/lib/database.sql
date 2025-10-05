-- Creating database schema for enhanced user profiles and verification system

-- User profiles table with verification status
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('farmer', 'cooperative', 'bank')),
  
  -- Verification status
  nin_verified BOOLEAN DEFAULT FALSE,
  nin_data JSONB,
  bvn_verified BOOLEAN DEFAULT FALSE,
  bvn_data JSONB,
  cross_verification_verified BOOLEAN DEFAULT FALSE,
  cross_verification_data JSONB,
  farm_verification_verified BOOLEAN DEFAULT FALSE,
  farm_verification_request_id VARCHAR(255),
  farm_verification_status VARCHAR(20) CHECK (farm_verification_status IN ('pending', 'assigned', 'in_progress', 'completed', 'rejected')),
  
  -- Farm data (for farmers)
  farm_location JSONB,
  farm_photos TEXT[],
  farm_type VARCHAR(50),
  farm_size VARCHAR(20),
  
  -- Bank data (for banks)
  bank_name VARCHAR(255),
  bank_code VARCHAR(10),
  
  -- Cooperative data (for cooperatives)
  cooperative_name VARCHAR(255),
  cooperative_id VARCHAR(100),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verification requests table
CREATE TABLE IF NOT EXISTS verification_requests (
  id VARCHAR(50) PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  farmer_name VARCHAR(255) NOT NULL,
  farmer_phone VARCHAR(20) NOT NULL,
  farm_location JSONB NOT NULL,
  farm_photos TEXT[] NOT NULL,
  farm_type VARCHAR(50) NOT NULL,
  farm_size VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'rejected')),
  priority VARCHAR(10) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  assigned_agent_id VARCHAR(50),
  scheduled_visit TIMESTAMP WITH TIME ZONE,
  verification_report JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  certification_id VARCHAR(100) NOT NULL UNIQUE,
  location JSONB NOT NULL,
  specializations TEXT[] NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_verifications INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  profile_photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verification reports table
CREATE TABLE IF NOT EXISTS verification_reports (
  id VARCHAR(50) PRIMARY KEY,
  agent_id VARCHAR(50) NOT NULL REFERENCES agents(id),
  request_id VARCHAR(50) NOT NULL REFERENCES verification_requests(id) ON DELETE CASCADE,
  visit_date TIMESTAMP WITH TIME ZONE NOT NULL,
  farm_exists BOOLEAN NOT NULL,
  farm_size_accurate BOOLEAN NOT NULL,
  farm_type_accurate BOOLEAN NOT NULL,
  location_accurate BOOLEAN NOT NULL,
  additional_notes TEXT,
  verification_photos TEXT[],
  gps_coordinates JSONB NOT NULL,
  recommendation VARCHAR(30) NOT NULL CHECK (recommendation IN ('approve', 'reject', 'requires_additional_info')),
  confidence_score INTEGER NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_type ON user_profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_user_profiles_verification_status ON user_profiles(nin_verified, bvn_verified, cross_verification_verified, farm_verification_verified);
CREATE INDEX IF NOT EXISTS idx_verification_requests_status ON verification_requests(status);
CREATE INDEX IF NOT EXISTS idx_verification_requests_farmer_id ON verification_requests(farmer_id);
CREATE INDEX IF NOT EXISTS idx_agents_location ON agents USING GIN(location);
CREATE INDEX IF NOT EXISTS idx_agents_active ON agents(is_active);

-- Row Level Security (RLS) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_reports ENABLE ROW LEVEL SECURITY;

-- Users can only access their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can only access their own verification requests
CREATE POLICY "Users can view own verification requests" ON verification_requests
  FOR SELECT USING (auth.uid() = farmer_id);

CREATE POLICY "Users can create own verification requests" ON verification_requests
  FOR INSERT WITH CHECK (auth.uid() = farmer_id);

-- Agents can view assigned verification requests (in real app, this would be more sophisticated)
CREATE POLICY "Public can view verification reports" ON verification_reports
  FOR SELECT USING (true);

-- Insert some sample agents
INSERT INTO agents (id, name, email, phone, certification_id, location, specializations, rating, total_verifications) VALUES
('AGT-001', 'Adebayo Ogundimu', 'adebayo.ogundimu@farmcred.com', '+2348123456789', 'NAERLS-2024-001', 
 '{"state": "Lagos", "lga": "Ikorodu", "coordinates": {"latitude": 6.6018, "longitude": 3.5106}}',
 '{"Crop Farming", "Livestock", "Farm Management"}', 4.8, 156),
('AGT-002', 'Fatima Abdullahi', 'fatima.abdullahi@farmcred.com', '+2348234567890', 'NAERLS-2024-002',
 '{"state": "Lagos", "lga": "Alimosho", "coordinates": {"latitude": 6.6500, "longitude": 3.4000}}',
 '{"Poultry", "Aquaculture", "Organic Farming"}', 4.9, 203),
('AGT-003', 'Chinedu Okwu', 'chinedu.okwu@farmcred.com', '+2348345678901', 'NAERLS-2024-003',
 '{"state": "Lagos", "lga": "Ikeja", "coordinates": {"latitude": 6.6000, "longitude": 3.3500}}',
 '{"Mixed Farming", "Irrigation Systems", "Soil Management"}', 4.7, 89)
ON CONFLICT (id) DO NOTHING;
