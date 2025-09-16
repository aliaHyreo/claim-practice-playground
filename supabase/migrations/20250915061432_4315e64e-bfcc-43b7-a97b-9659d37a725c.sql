-- Update edits for Claim Number 25048AA1001 (scenario 509) to match 597 pattern with 509 as error
UPDATE claims 
SET edits = ARRAY['RNB', 'IAF', 'PLP', '334', 'REL', '509']
WHERE dcn = '25048AA1001';