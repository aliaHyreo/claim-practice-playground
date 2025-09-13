-- Update scenario 2 claim to include 509 edit (contract validation) with other edits
UPDATE claims 
SET edits = ARRAY['507', '601', '509']
WHERE dcn = '25048AA1001';