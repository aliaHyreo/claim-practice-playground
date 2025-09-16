-- Insert claim data for Scenario 2 (Claim Number: 25048AA1001)
INSERT INTO claims (dcn, billed, allowed, paid, edits, scenario_type, status) 
VALUES ('25048AA1001', 300.00, 100.00, 0.00, ARRAY['507'], 'scenario_2', 'pending');

-- Insert claim lines for Scenario 2 with service dates 2023-08-04
INSERT INTO claim_lines (claim_id, line_no, service_from_date, service_to_date, pos, service, procedure_code, modifiers, units, diagnosis, billed)
SELECT id, 1, '2023-08-04', '2023-08-04', '11', 'Office Visit', 'E9973', ARRAY['NU', 'EU', 'KX'], 1, 'G800', 300.00
FROM claims WHERE dcn = '25048AA1001';

-- Insert member data for the correct John Wick member with HCID for contract searching
INSERT INTO members (
  first_name, last_name, dob, hcid, subscriber_id, sex, 
  group_name, group_id, group_contract, 
  address, city, state, zip_code,
  relationship, member_code, contract_type, erisa, pcp, pcp_state
) VALUES (
  'John', 'Wick', '1982-08-18', 'H987654321', '123456789', 'M',
  'ABC Corporation', '200000A001', '200000A001',
  '123 Main St', 'Los Angeles', 'CA', '90210',
  'Self', '001', 'Individual', 'Y', 'Dr. Jane Smith', 'CA'
);

-- Insert the second member record with the correct/active contract for scenario 2
INSERT INTO members (
  first_name, last_name, dob, hcid, subscriber_id, sex,
  group_name, group_id, group_contract,
  address, city, state, zip_code, 
  relationship, member_code, contract_type, erisa, pcp, pcp_state
) VALUES (
  'John', 'Wick', '1982-08-18', 'H987654321', '123456789', 'M',
  'ABC Corporation', '200000M001', '200000M001', 
  '123 Main St', 'Los Angeles', 'CA', '90210',
  'Self', '001', 'Individual', 'Y', 'Dr. Jane Smith', 'CA'
);