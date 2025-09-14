-- Remove unnecessary John Wick entries that are not used in scenarios 507, 509, or 597
-- Keeping only the H987654321 entries needed for scenarios 509 and 597

DELETE FROM members WHERE id IN (
  'aadd6700-786e-4631-93a7-8ef89ae60e5a', -- John Wick with hcid=33333333 (not used)
  '3b88e48d-4bc6-44d6-9768-83ab608c1008'  -- John Wick with hcid=23456789 (not used)
);