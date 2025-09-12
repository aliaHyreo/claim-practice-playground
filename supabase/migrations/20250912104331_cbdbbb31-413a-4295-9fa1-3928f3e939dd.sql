-- Create claims table
CREATE TABLE public.claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dcn TEXT UNIQUE NOT NULL,
  title TEXT,
  last_name TEXT,
  dob DATE,
  sex TEXT,
  member_code TEXT,
  contract_type TEXT,
  relationship TEXT,
  pcp TEXT,
  erisa TEXT,
  billed DECIMAL,
  allowed DECIMAL,
  paid DECIMAL,
  edits TEXT[],
  action_code TEXT DEFAULT '-',
  status TEXT DEFAULT 'pending',
  scenario_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create members table
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prefix TEXT,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  dob DATE NOT NULL,
  sex TEXT,
  member_prefix TEXT,
  hcid TEXT,
  relationship TEXT,
  member_code TEXT,
  contract_type TEXT,
  erisa TEXT,
  pcp TEXT,
  pcp_state TEXT,
  pcp_relationship TEXT,
  program_code TEXT,
  subscriber_id TEXT,
  group_name TEXT,
  group_id TEXT,
  group_contract TEXT,
  detail_contract_code TEXT,
  product TEXT,
  network_id TEXT,
  network_name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create claim_forms table (source of truth)
CREATE TABLE public.claim_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dcn TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  dob DATE NOT NULL,
  zip_code TEXT,
  service_date_from DATE,
  service_date_to DATE,
  claim_line_code_system TEXT,
  claim_line_code_image TEXT,
  eligibility_validation TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create providers table
CREATE TABLE public.providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rendering_npi TEXT,
  rendering_name TEXT,
  rendering_address TEXT,
  pricing_state TEXT,
  pricing_zip TEXT,
  provider_sps TEXT,
  provider_epin TEXT,
  license_number TEXT,
  network_option TEXT,
  specialty TEXT,
  taxonomy TEXT,
  emergency_pricing_ind TEXT,
  billing_tax_id TEXT,
  billing_npi TEXT,
  billing_name2 TEXT,
  facility_type TEXT,
  provider_sps3 TEXT,
  provider_epin4 TEXT,
  medicare_id TEXT,
  address5 TEXT,
  national_state TEXT,
  location_code TEXT,
  bha_provider_indicator TEXT,
  taxonomy6 TEXT,
  referring_physician TEXT,
  referring_npi7 TEXT,
  service_provider TEXT,
  service_facility_tier TEXT,
  npi8 TEXT,
  nsb_indicator TEXT,
  alternate_facility_npi TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create claim_lines table
CREATE TABLE public.claim_lines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  claim_id UUID REFERENCES public.claims(id) ON DELETE CASCADE,
  line_no INTEGER,
  service_from_date DATE,
  service_to_date DATE,
  pos TEXT,
  service TEXT,
  procedure_code TEXT,
  modifiers TEXT[],
  units INTEGER,
  diagnosis TEXT,
  billed DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claim_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claim_lines ENABLE ROW LEVEL SECURITY;

-- Create policies (allowing all access for now since this is a simulator)
CREATE POLICY "Allow all access to claims" ON public.claims FOR ALL USING (true);
CREATE POLICY "Allow all access to members" ON public.members FOR ALL USING (true);
CREATE POLICY "Allow all access to claim_forms" ON public.claim_forms FOR ALL USING (true);
CREATE POLICY "Allow all access to providers" ON public.providers FOR ALL USING (true);
CREATE POLICY "Allow all access to claim_lines" ON public.claim_lines FOR ALL USING (true);

-- Insert test data for Scenario 1
-- Claim with incorrect member data
INSERT INTO public.claims (
  dcn, title, last_name, dob, sex, member_code, contract_type, relationship, 
  pcp, erisa, billed, allowed, paid, edits, scenario_type
) VALUES (
  '25048AA1000', 'John', 'Wick', '1982-08-18', 'M', '20', 'H', 'Spouse',
  '-', 'Y', 300, 100, 0, ARRAY['SPS', 'PLP', 'RNB', '334', 'REL', 'IAF', '507'], 'scenario1'
);

-- Insert claim form (source of truth) for Scenario 1
INSERT INTO public.claim_forms (
  dcn, patient_name, dob, zip_code, service_date_from, service_date_to,
  claim_line_code_system, claim_line_code_image, eligibility_validation
) VALUES (
  '25048AA1000', 'John Wick S', '1982-08-18', '41701', '2023-08-03', '2023-08-03',
  '84284', 'E9973', ARRAY[
    'Confirm patient name',
    'Confirm DOB', 
    'Confirm contact information',
    'Ensure eligibility dates match claim line',
    'Update claim line if mismatch detected',
    'Run member search with Member ID to confirm eligibility'
  ]
);

-- Insert multiple John members for search scenario
INSERT INTO public.members (
  prefix, first_name, middle_name, last_name, dob, sex, member_prefix, hcid,
  relationship, member_code, contract_type, erisa, pcp, subscriber_id,
  group_name, group_id, group_contract, detail_contract_code, product,
  address, city, state, zip_code
) VALUES
-- Correct John Wick S (the one we need to find)
(
  'Mr.', 'John', '', 'Wick S', '1982-08-18', 'M', 'EMN', '23456789',
  'Spouse', '20', 'H', 'Y', '-', '123456789',
  'ABC Group', '200000M001', '0AA', '500L', 'LOCAL',
  '2426 BERKSHIRE AV', 'Fox Cities', 'WI', '41701'
),
-- Other Johns to create search scenario
(
  'Mr.', 'John', 'A', 'Smith', '1980-05-15', 'M', 'EMN', '11111111',
  'Primary', '10', 'H', 'Y', '-', '111111111',
  'XYZ Group', '100000A001', '0BB', '400L', 'REGIONAL',
  '123 MAIN ST', 'Milwaukee', 'WI', '53201'
),
(
  'Mr.', 'John', 'B', 'Doe', '1975-12-03', 'M', 'EMN', '22222222',
  'Spouse', '20', 'H', 'N', '-', '222222222',
  'DEF Group', '300000B001', '0CC', '600L', 'NATIONAL',
  '456 OAK AVE', 'Madison', 'WI', '53703'
),
(
  'Mr.', 'John', '', 'Wick', '1982-08-18', 'M', 'EMN', '33333333',
  'Primary', '10', 'H', 'Y', '-', '333333333',
  'GHI Group', '400000C001', '0DD', '700L', 'LOCAL',
  '789 ELM ST', 'Green Bay', 'WI', '54301'
),
(
  'Mr.', 'John', 'C', 'Johnson', '1985-03-22', 'M', 'EMN', '44444444',
  'Child', '30', 'H', 'Y', '-', '444444444',
  'JKL Group', '500000D001', '0EE', '800L', 'PREMIUM',
  '321 PINE RD', 'Appleton', 'WI', '54911'
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_claims_updated_at
  BEFORE UPDATE ON public.claims
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_members_updated_at
  BEFORE UPDATE ON public.members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();