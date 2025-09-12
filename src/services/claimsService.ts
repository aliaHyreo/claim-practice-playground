import { supabase } from "@/integrations/supabase/client";

export interface MemberInfo {
  id?: string;
  prefix: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  sex: string;
  hcid: string;
  memberPrefix: string;
  programCode: string;
  relationship: string;
  memberCode: string;
  contractType: string;
  erisa: string;
  pcp: string;
  pcpState: string;
  pcpRelationship: string;
  subscriberId: string;
  groupName: string;
  groupContract: string;
  detailContractCode: string;
  product: string;
  groupId: string;
  networkName: string;
  networkId: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  effectiveDate?: string;
  endDate?: string;
}

export interface ContractInfo {
  contractId: string;
  groupNumber: string;
  effectiveDate: string;
  endDate: string;
}

export interface ProviderInfo {
  billingName: string;
  billingNPI: string;
  billingTaxId: string;
  emergencyPricingInd: string;
  taxonomy: string;
  specialty: string;
  networkOption: string;
  licenseNumber: string;
  providerEpin: string;
  renderingNPI: string;
  renderingName: string;
  renderingAddress: string;
  pricingState: string;
  npi8: string;
  nsbIndicator: string;
  serviceFacilityTier: string;
  serviceProvider: string;
  referringNPI7: string;
  referringNPI: string;
  referringPhysician: string;
  taxonomy6: string;
  pricingZip: string;
  providerSps: string;
  bhaProviderIndicator: string;
  locationCode: string;
  nationalState: string;
  address5: string;
  address: string;
  medicareId: string;
  providerEpin4: string;
  providerSps3: string;
  facilityType: string;
  billingName2: string;
  alternateFacilityNPI: string;
}

export interface PaymentInfo {
  claim: {
    deductible: number;
    copay: number;
    coinsurance: number;
    coins: number;
    totalPaid: number;
    patientResponsibility: number;
    patientLiability: number;
    memberSurcharge: number;
    nonEligible: number;
    hraPaid: number;
    claimPaid: number;
    pricingAllowedAmount: number;
    totalCharge: number;
    finalizationCode: string;
    primaryPaidAmount: number;
    allowedAmount: number;
    writeOffAmount: number;
    benefitPeriod: string;
    benefitPeriodUsed: number;
    benefitPeriodRemaining: number;
    lifetimeBenefit: number;
    lifetimeBenefitUsed: number;
    lifetimeBenefitRemaining: number;
  };
  member: {
    memberPaidAmount: number;
    checkNumber: string;
    checkStatus: string;
    checkStatusDate: string;
    paidTo: string;
    accountNumber: string;
    eftCheckDate: string;
    priced: string;
  };
  provider: any;
  drg: any;
}

export interface ClaimHeaderInfo {
  generalClaimData: {
    serviceFromDate: string;
    serviceToDate: string;
    assignmentOfBenefits: string;
    providerParticipation: string;
    providerContract: string;
    treatmentAuth: string;
    patientAccount: string;
    emergency: string;
    employment: string;
    coveredZipRadius: string;
    frequency: string;
    bbiIndicator: string;
    pciIndicator: string;
    fsbInd: string;
    fsbExclusion: string;
  };
  benefitIndicators: {
    cob: string;
    cobRule: string;
    medInd: string;
    medicareAdvantage: string;
    cdhp: string;
    planPayer: string;
    cobPercentage: string;
  };
  diagnosisCodes: {
    dx1: string;
    dx2: string;
    dx3: string;
    medRule: string;
  };
}

export interface ClaimData {
  originalClaim: any;
  claimsXten: any;
  overrides: any;
  adjustments: any;
}

export interface SearchData {
  claimImage?: any;
}

export interface ClaimLine {
  lineNo: number;
  serviceFromDate: string;
  serviceToDate: string;
  pos: string;
  service: string;
  procedureCode: string;
  modifiers: string[];
  units: number;
  diagnosis: string;
  billed: number;
}

export interface ClaimForm {
  id?: string;
  dcn: string;
  patientName: string;
  dob: string;
  serviceFromDate: string;
  serviceToDate: string;
  claimLineCodeImage: string;
  claimLineCodeSystem: string;
  zipCode: string;
  eligibilityValidation: string[];
}

export interface MemberSearchResult {
  id: string;
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  sex: string;
  hcid: string;
  subscriberId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ClaimImageData {
  dcn?: string;
  patientName?: string;
  dob?: string;
  [key: string]: any;
}

export interface EditDetail {
  code: string;
  description: string;
  type: string;
  status: string;
}

export interface Claim {
  id?: string;
  dcn: string;
  title: string;
  lastName: string;
  dob: string;
  sex: string;
  memberCode: string;
  contractType: string;
  relationship: string;
  pcp: string;
  erisa: string;
  billed: number;
  allowed: number;
  paid: number;
  edits: string[];
  actionCode?: string;
  status?: string;
  scenarioType?: string;
  memberInfo?: MemberInfo;
  providerInfo?: ProviderInfo;
  paymentInfo?: PaymentInfo;
  claimHeaderInfo?: ClaimHeaderInfo;
  claimLines?: ClaimLine[];
  claimData?: ClaimData;
  searchData?: SearchData;
}

export class ClaimsService {
  static async getClaimByDCN(dcn: string): Promise<Claim | null> {
    try {
      const { data: claimData, error: claimError } = await supabase
        .from('claims')
        .select('*')
        .eq('dcn', dcn)
        .maybeSingle();

      if (claimError) throw claimError;
      if (!claimData) return null;

      // Get member info separately
      const memberInfo = await getMemberInfoByDCN(dcn);

      // Get claim lines
      const { data: linesData, error: linesError } = await supabase
        .from('claim_lines')
        .select('*')
        .eq('claim_id', claimData.id);

      if (linesError) throw linesError;

      const claimLines: ClaimLine[] = linesData?.map(line => ({
        lineNo: line.line_no || 0,
        serviceFromDate: line.service_from_date || '',
        serviceToDate: line.service_to_date || '',
        pos: line.pos || '',
        service: line.service || '',
        procedureCode: line.procedure_code || '',
        modifiers: line.modifiers || [],
        units: line.units || 0,
        diagnosis: line.diagnosis || '',
        billed: Number(line.billed) || 0
      })) || [];

      return {
        id: claimData.id,
        dcn: claimData.dcn,
        title: claimData.title || '',
        lastName: claimData.last_name || '',
        dob: claimData.dob || '',
        sex: claimData.sex || '',
        memberCode: claimData.member_code || '',
        contractType: claimData.contract_type || '',
        relationship: claimData.relationship || '',
        pcp: claimData.pcp || '',
        erisa: claimData.erisa || '',
        billed: Number(claimData.billed) || 0,
        allowed: Number(claimData.allowed) || 0,
        paid: Number(claimData.paid) || 0,
        edits: claimData.edits || [],
        actionCode: claimData.action_code,
        status: claimData.status,
        scenarioType: claimData.scenario_type,
        memberInfo,
        providerInfo: this.getMockProviderInfo(),
        paymentInfo: this.getMockPaymentInfo(),
        claimHeaderInfo: this.getMockClaimHeaderInfo(),
        claimLines,
        claimData: this.getMockClaimData(),
        searchData: { claimImage: null }
      };
    } catch (error) {
      console.error('Error getting claim by DCN:', error);
      return null;
    }
  }

  static async refreshClaimData(dcn: string): Promise<Claim | null> {
    // In a real application, this would refresh data from external systems
    // For now, just return the same data
    return this.getClaimByDCN(dcn);
  }

  static async getAllClaims(): Promise<Claim[]> {
    try {
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data?.map(claim => ({
        id: claim.id,
        dcn: claim.dcn,
        title: claim.title || '',
        lastName: claim.last_name || '',
        dob: claim.dob || '',
        sex: claim.sex || '',
        memberCode: claim.member_code || '',
        contractType: claim.contract_type || '',
        relationship: claim.relationship || '',
        pcp: claim.pcp || '',
        erisa: claim.erisa || '',
        billed: Number(claim.billed) || 0,
        allowed: Number(claim.allowed) || 0,
        paid: Number(claim.paid) || 0,
        edits: claim.edits || [],
        actionCode: claim.action_code,
        status: claim.status,
        scenarioType: claim.scenario_type
      })) || [];
    } catch (error) {
      console.error('Error getting all claims:', error);
      return [];
    }
  }

  static async searchClaims(query: string): Promise<Claim[]> {
    try {
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .or(`dcn.ilike.%${query}%,last_name.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data?.map(claim => ({
        id: claim.id,
        dcn: claim.dcn,
        title: claim.title || '',
        lastName: claim.last_name || '',
        dob: claim.dob || '',
        sex: claim.sex || '',
        memberCode: claim.member_code || '',
        contractType: claim.contract_type || '',
        relationship: claim.relationship || '',
        pcp: claim.pcp || '',
        erisa: claim.erisa || '',
        billed: Number(claim.billed) || 0,
        allowed: Number(claim.allowed) || 0,
        paid: Number(claim.paid) || 0,
        edits: claim.edits || [],
        actionCode: claim.action_code,
        status: claim.status,
        scenarioType: claim.scenario_type
      })) || [];
    } catch (error) {
      console.error('Error searching claims:', error);
      return [];
    }
  }

  static getEditDetails(edits: string[]): EditDetail[] {
    return edits.map(edit => ({
      code: edit,
      description: `Edit ${edit} description`,
      type: 'warning',
      status: 'active'
    }));
  }

  static getMockProviderInfo(): ProviderInfo {
    return {
      billingName: "MEDICAL GROUP LLC",
      billingNPI: "1234567890",
      billingTaxId: "123456789",
      emergencyPricingInd: "N",
      taxonomy: "207Q00000X",
      specialty: "Family Medicine",
      networkOption: "In-Network",
      licenseNumber: "MD12345",
      providerEpin: "EPIN123",
      renderingNPI: "9876543210",
      renderingName: "Dr. Smith",
      renderingAddress: "123 Medical St, City, State 12345",
      pricingState: "CA",
      npi8: "87654321",
      nsbIndicator: "Y",
      alternateFacilityNPI: "1111111111",
      serviceFacilityTier: "Tier 1",
      serviceProvider: "Primary",
      referringNPI7: "7777777777",
      referringNPI: "7777777777",
      referringPhysician: "Dr. Johnson",
      taxonomy6: "207Q00000X",
      pricingZip: "12345",
      providerSps: "SPS123",
      bhaProviderIndicator: "N",
      locationCode: "LOC001",
      nationalState: "CA",
      address5: "123 Medical St",
      address: "123 Medical St, City, State 12345",
      medicareId: "MED123456",
      providerEpin4: "EPIN456",
      providerSps3: "SPS456",
      facilityType: "Office",
      billingName2: "MEDICAL GROUP LLC"
    };
  }

  static getMockPaymentInfo(): PaymentInfo {
    return {
      claim: {
        deductible: 0,
        copay: 20,
        coinsurance: 0,
        coins: 0,
        totalPaid: 240,
        patientResponsibility: 60,
        patientLiability: 60,
        memberSurcharge: 0,
        nonEligible: 0,
        hraPaid: 0,
        claimPaid: 240,
        pricingAllowedAmount: 300,
        totalCharge: 300,
        finalizationCode: "PAID",
        primaryPaidAmount: 240,
        allowedAmount: 300,
        writeOffAmount: 60,
        benefitPeriod: "Calendar Year",
        benefitPeriodUsed: 1200,
        benefitPeriodRemaining: 800,
        lifetimeBenefit: 10000,
        lifetimeBenefitUsed: 5000,
        lifetimeBenefitRemaining: 5000
      },
      member: {
        memberPaidAmount: 240,
        checkNumber: "CHK123456",
        checkStatus: "Check not Found",
        checkStatusDate: "2025-06-01",
        paidTo: "MEDICAL GROUP LLC",
        accountNumber: "-",
        eftCheckDate: "",
        priced: ""
      },
      provider: {},
      drg: {}
    };
  }

  static getMockClaimHeaderInfo(): ClaimHeaderInfo {
    return {
      generalClaimData: {
        serviceFromDate: "08/03/2023",
        serviceToDate: "08/03/2023",
        assignmentOfBenefits: "Y",
        providerParticipation: "PAR",
        providerContract: "CEPMS0",
        treatmentAuth: "-",
        patientAccount: "N41127.23297",
        emergency: "No",
        employment: "No",
        coveredZipRadius: "-",
        frequency: "-",
        bbiIndicator: "-",
        pciIndicator: "-",
        fsbInd: "None",
        fsbExclusion: "X"
      },
      benefitIndicators: {
        cob: "No",
        cobRule: "-",
        medInd: "No",
        medicareAdvantage: "Yes",
        cdhp: "N",
        planPayer: "N",
        cobPercentage: "0"
      },
      diagnosisCodes: {
        dx1: "G800",
        dx2: "0",
        dx3: "0",
        medRule: "-"
      }
    };
  }

  static getMockClaimData(): ClaimData {
    return {
      originalClaim: {
        lineNo: 1,
        from: "8/4/2023",
        procedure: "E9973",
        modifiers: "NU,EU, KX",
        units: 1,
        billed: 300
      },
      claimsXten: {
        billed: 300,
        procedure: "E9973",
        modifiers: "NU,EU, KX",
        units: 1
      },
      overrides: {},
      adjustments: {}
    };
  }
}

// Get member info by DCN - loads the first (expired) contract initially
export const getMemberInfoByDCN = async (dcn: string): Promise<MemberInfo | null> => {
  try {
    // SCENARIO 1 (DCN: 25048AA1000) - PATIENT DATA IS WRONG
    if (dcn === "25048AA1000") {
      return {
        prefix: "Mr",
        firstName: "John",
        middleName: "D",
        lastName: "Smith", // ❌ WRONG - Should be "Wick" per claim form
        dob: "1980-05-15", // ❌ WRONG - Should be "1982-08-18" per claim form  
        sex: "M",
        hcid: "H123456789",
        memberPrefix: "01",
        programCode: "HMO",
        relationship: "Self",
        memberCode: "001",
        contractType: "Individual",
        erisa: "Y",
        pcp: "Dr. Jane Smith",
        pcpState: "CA",
        pcpRelationship: "Primary",
        subscriberId: "EMN23466789", // ❌ WRONG - Should be "123456789" per claim form
        groupName: "ABC Corporation",
        groupContract: "GRP001",
        detailContractCode: "DCC123",
        product: "Premium Health",
        groupId: "GID456",
        networkName: "HealthNet Plus",
        networkId: "NET789"
      };
    }
    
    // SCENARIO 2 (DCN: 25048AA1001) - PATIENT DATA IS CORRECT, GROUP DATA IS WRONG
    if (dcn === "25048AA1001") {
      const { data: memberData, error } = await supabase
        .from('members')
        .select('*')
        .eq('hcid', 'H987654321')
        .eq('group_id', '200000A001') // Load the EXPIRED contract first (wrong group)
        .single();

      if (error || !memberData) {
        console.error('Error fetching member data:', error);
        // Fallback data if database query fails
        return {
          prefix: "Mr",
          firstName: "John", // ✅ CORRECT - Matches claim form
          middleName: "D",
          lastName: "Wick", // ✅ CORRECT - Matches claim form
          dob: "1982-08-18", // ✅ CORRECT - Matches claim form
          sex: "M",
          hcid: "H987654321", // ✅ CORRECT - Available for searching contracts
          memberPrefix: "01",
          programCode: "HMO",
          relationship: "Self",
          memberCode: "001",
          contractType: "Individual",
          erisa: "Y",
          pcp: "Dr. Jane Smith",
          pcpState: "CA",
          pcpRelationship: "Primary",
          subscriberId: "123456789", // ✅ CORRECT - Matches claim form
          groupName: "ABC Corporation",
          groupContract: "200000A001", // ❌ WRONG - Expired group contract
          detailContractCode: "DCC123",
          product: "Premium Health",
          groupId: "200000A001", // ❌ WRONG - Expired group ID
          networkName: "HealthNet Plus",
          networkId: "NET789",
          effectiveDate: "2020-04-28", // ❌ WRONG - Expired effective date
          endDate: "2022-06-07" // ❌ WRONG - Expired end date
        };
      }

      // Return database data for Scenario 2
      return {
        prefix: memberData.prefix || "Mr",
        firstName: memberData.first_name, // ✅ CORRECT - John
        middleName: memberData.middle_name || "D",
        lastName: memberData.last_name, // ✅ CORRECT - Wick
        dob: memberData.dob, // ✅ CORRECT - 1982-08-18
        sex: memberData.sex,
        hcid: memberData.hcid, // ✅ CORRECT - H987654321
        memberPrefix: memberData.member_prefix || "01",
        programCode: memberData.program_code || "HMO",
        relationship: memberData.relationship,
        memberCode: memberData.member_code,
        contractType: memberData.contract_type,
        erisa: memberData.erisa,
        pcp: memberData.pcp,
        pcpState: memberData.pcp_state,
        pcpRelationship: memberData.pcp_relationship || "Primary",
        subscriberId: memberData.subscriber_id, // ✅ CORRECT - 123456789
        groupName: memberData.group_name,
        groupContract: memberData.group_contract, // ❌ WRONG - 200000A001 (expired)
        detailContractCode: memberData.detail_contract_code || "DCC123",
        product: memberData.product || "Premium Health",
        groupId: memberData.group_id, // ❌ WRONG - 200000A001 (expired)
        networkName: memberData.network_name || "HealthNet Plus",
        networkId: memberData.network_id || "NET789",
        effectiveDate: memberData.effective_date, // ❌ WRONG - 2020-04-28 (expired)
        endDate: memberData.end_date // ❌ WRONG - 2022-06-07 (expired)
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting member info:', error);
    return null;
  }
};

// Search for members by criteria
export const searchMembers = async (criteria: {
  firstName?: string;
  lastName?: string;
  dob?: string;
  subscriberId?: string;
}): Promise<MemberSearchResult[]> => {
  try {
    let query = supabase
      .from('members')
      .select('*');
    
    if (criteria.firstName) {
      query = query.ilike('first_name', `%${criteria.firstName}%`);
    }
    if (criteria.lastName) {
      query = query.ilike('last_name', `%${criteria.lastName}%`);
    }
    if (criteria.dob) {
      query = query.eq('dob', criteria.dob);
    }
    if (criteria.subscriberId) {
      query = query.eq('subscriber_id', criteria.subscriberId);
    }
    
    const { data, error } = await query.limit(10);
    
    if (error) throw error;

    return data?.map(member => ({
      id: member.id,
      prefix: member.prefix || '',
      firstName: member.first_name,
      middleName: member.middle_name || '',
      lastName: member.last_name,
      dob: member.dob,
      sex: member.sex || '',
      hcid: member.hcid || '',
      subscriberId: member.subscriber_id || '',
      address: member.address || '',
      city: member.city || '',
      state: member.state || '',
      zipCode: member.zip_code || ''
    })) || [];
  } catch (error) {
    console.error('Error searching members:', error);
    return [];
  }
};

// Get member info by ID
export const getMemberById = async (id: string): Promise<MemberInfo | null> => {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
      prefix: data.prefix || '',
      firstName: data.first_name,
      middleName: data.middle_name || '',
      lastName: data.last_name,
      dob: data.dob,
      sex: data.sex || '',
      hcid: data.hcid || '',
      memberPrefix: data.member_prefix || '',
      programCode: data.program_code || '',
      relationship: data.relationship || '',
      memberCode: data.member_code || '',
      contractType: data.contract_type || '',
      erisa: data.erisa || '',
      pcp: data.pcp || '',
      pcpState: data.pcp_state || '',
      pcpRelationship: data.pcp_relationship || '',
      subscriberId: data.subscriber_id || '',
      groupName: data.group_name || '',
      groupContract: data.group_contract || '',
      detailContractCode: data.detail_contract_code || '',
      product: data.product || '',
      groupId: data.group_id || '',
      networkName: data.network_name || '',
      networkId: data.network_id || '',
      effectiveDate: data.effective_date || '',
      endDate: data.end_date || ''
    };
  } catch (error) {
    console.error('Error getting member by ID:', error);
    throw error;
  }
};

// Search contracts by HCID
export const searchContractsByHCID = async (hcid: string): Promise<ContractInfo[]> => {
  try {
    // Mock contract data for scenario 2 testing
    if (hcid === "H987654321") {
      return [
        {
          contractId: "500L",
          groupNumber: "200000A001", // Old/expired contract
          effectiveDate: "2020-04-28",
          endDate: "2022-06-07"
        },
        {
          contractId: "500L", 
          groupNumber: "200000M001", // New/valid contract
          effectiveDate: "2023-01-01",
          endDate: "2024-01-01"
        }
      ];
    }
    
    return [];
  } catch (error) {
    console.error('Error searching contracts:', error);
    return [];
  }
};