-- Add effective_date and end_date columns to members table
ALTER TABLE public.members 
ADD COLUMN IF NOT EXISTS effective_date date,
ADD COLUMN IF NOT EXISTS end_date date;

-- Update the expired contract record with old dates
UPDATE public.members 
SET effective_date = '2020-04-28', 
    end_date = '2022-06-07' 
WHERE hcid = 'H987654321' AND group_id = '200000A001';

-- Update the valid contract record with current dates  
UPDATE public.members 
SET effective_date = '2023-01-01', 
    end_date = '2024-01-01' 
WHERE hcid = 'H987654321' AND group_id = '200000M001';