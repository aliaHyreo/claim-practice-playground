-- Insert claim lines data for scenario 1
INSERT INTO claim_lines (claim_id, line_no, service_from_date, service_to_date, pos, service, procedure_code, modifiers, units, diagnosis, billed) VALUES
((SELECT id FROM claims WHERE dcn = '25048AA1000'), 1, '2023-08-04', '2023-08-04', '12', 'DME', 'E9973', ARRAY['NU', 'EU', 'KX'], 1, 'G800', 300);

-- Insert provider data for scenario 1
INSERT INTO providers (rendering_npi, rendering_name, rendering_address, pricing_state, pricing_zip, provider_sps, provider_epin, license_number, network_option, specialty, taxonomy, emergency_pricing_ind, billing_tax_id, billing_npi, billing_name2, facility_type, provider_sps3, provider_epin4, medicare_id, address5, national_state, location_code, bha_provider_indicator, taxonomy6, referring_physician, referring_npi7, service_provider, service_facility_tier, npi8, nsb_indicator, alternate_facility_npi) VALUES
('67926782', 'James Clinic', '2426 BERKSHIRE AV Fox Cities.', 'WI', '44011', '-', '-', '-', 'N/Y', 'V01', '2345678232', '-', '1234567B', '1234567', 'MILLERS RENTAL', '-', '5987543', '-', '-', '203 ROMIG RD 0954642', 'NY', '-', 'YA', '-', 'Kim Konch', '5974200', 'James Clinic', '-', '-', 'None', '-');

-- Update member with WRONG test data for scenario 1 (missing 'S' in last name and different address)
UPDATE members 
SET 
  last_name = 'Wick',  -- Missing 'S' (should be 'Wick S')
  address = '456 Wrong Street',
  city = 'Wrong City',
  state = 'WI',
  zip_code = '55555'
WHERE hcid = '23456789' AND first_name = 'John';