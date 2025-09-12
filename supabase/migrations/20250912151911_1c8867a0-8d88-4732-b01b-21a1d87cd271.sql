-- Insert claim record for Scenario 2 (DCN 25048AA1001)
INSERT INTO public.claims (
  dcn, 
  billed, 
  allowed, 
  paid, 
  edits, 
  action_code, 
  status, 
  scenario_type,
  last_name,
  dob,
  sex,
  member_code,
  contract_type,
  relationship,
  pcp,
  erisa
) VALUES (
  '25048AA1001',
  300.00,
  0.00,
  0.00,
  ARRAY['507'],
  '-',
  'pending',
  'scenario_2',
  'Wick',
  '1982-08-18',
  'M',
  '001',
  'Individual',
  'Self',
  'Dr. Jane Smith',
  'Y'
) ON CONFLICT (dcn) DO UPDATE SET
  scenario_type = 'scenario_2',
  edits = ARRAY['507'],
  last_name = 'Wick',
  dob = '1982-08-18';

-- Insert corresponding claim lines for Scenario 2
INSERT INTO public.claim_lines (
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
) 
SELECT 
  c.id,
  1,
  '2023-08-04',
  '2023-08-04',
  '11',
  'DME',
  'E9973',
  ARRAY['NU', 'EU', 'KX'],
  1,
  'G800',
  300.00
FROM public.claims c 
WHERE c.dcn = '25048AA1001'
ON CONFLICT DO NOTHING;