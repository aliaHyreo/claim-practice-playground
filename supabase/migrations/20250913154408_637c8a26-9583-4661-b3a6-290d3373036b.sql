-- Insert scenario 3 (597) claim data for Claim Number 25048AA1002
INSERT INTO claims (
  dcn, 
  title, 
  last_name, 
  dob, 
  sex, 
  member_code, 
  contract_type, 
  relationship, 
  pcp, 
  erisa, 
  billed, 
  allowed, 
  paid, 
  edits, 
  action_code, 
  status, 
  scenario_type
) VALUES (
  '25048AA1002',
  'Sarah',
  'Johnson', 
  '1990-03-22',
  'F',
  '002',
  'Family',
  'Self',
  'Dr. Michael Brown',
  'N',
  2500.00,
  2500.00,
  0.00,
  ARRAY['RNB', 'IAF', 'PLP', '334', 'REL', '597'], -- 597 soft edit at the end in red
  '-',
  'pending',
  'scenario_3'
);

-- Insert claim lines for scenario 3
INSERT INTO claim_lines (
  claim_id,
  line_no,
  service_from_date,
  service_to_date,
  pos,
  service,
  procedure_code,
  modifiers,
  units,
  diagnosis,
  billed
) VALUES (
  (SELECT id FROM claims WHERE dcn = '25048AA1002'),
  1,
  '2024-04-04', -- Service date outside contract period
  '2024-04-04', -- Service date outside contract period  
  '23',
  'Emergency Visit',
  '99285',
  ARRAY['ER', '25'],
  1,
  'S72.001A',
  2500.00
);