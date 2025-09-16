-- Add missing data for Claim Number 25048AA1001 (scenario 509)
UPDATE claims 
SET 
  title = 'Mr.',
  sex = 'M',
  member_code = '10',
  contract_type = 'H',
  relationship = 'Primary',
  pcp = 'Dr. Smith',
  erisa = 'N'
WHERE dcn = '25048AA1001';