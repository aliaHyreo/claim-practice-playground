import { supabase } from "@/integrations/supabase/client";

export interface MemberInfo {
  id?: string;
  prefix: string;
  firstName: string;
  middleName: string;
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
}

export interface ProviderInfo {
  billingName: string;
  billingNPI: string;
  billingTaxId: string;
  renderingName: string;
  renderingNPI: string;
  renderingAddress: string;
  referringPhysician: string;
  referringNPI: string;
  taxonomy: string;
  specialty: string;
  networkOption: string;
  licenseNumber: string;
  providerEpin: string;
  providerSps: string;
  facilityType: string;
  address: string;
  medicareId: string;
  emergencyPricingInd: string;
  bhaProviderIndicator: string;
  locationCode: string;
  nationalState: string;
  pricingState: string;
  pricingZip: string;
  serviceFacilityTier: string;
  serviceProvider: string;
  npi8: string;
  nsbIndicator: string;
  alternateFacilityNPI: string;
}

export interface PaymentInfo {
  claim: {
    deductible: number;
    copay: number;
    coins: number;
    patientLiability: number;
    memberSurcharge: number;
    nonEligible: number;
    hraPaid: number;
    claimPaid: number;
    pricingAllowedAmount: number;
    totalCharge: number;
    finalizationCode: string;
  };
  provider: {
    providerDiscount: number;
    providerLiability: number;
    providerRiskWithhold: number;
    providerSurcharge: number;
    interest: number;
    penalty: number;
    lrIndicator: string;
    systemInterest: number;
  };
  drg: {
    amount: number;
    checkNumber: string;
    checkDate: string;
    paymentSystem: string;
    checkStatus: string;
    checkStatusDate: string;
    paidTo: string;
    accountNumber: string;
    eftCheckDate: string;
    priced: string;
  };
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
  zipCode: string;
  serviceDateFrom: string;
  serviceDateTo: string;
  claimLineCodeSystem: string;
  claimLineCodeImage: string;
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
  groupName: string;
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

      const memberInfo = await getMemberInfoByDCN(dcn);
      const providerInfo = await this.getProviderInfoByDCN(dcn);
      const claimLines = await this.getClaimLinesByDCN(dcn);

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
        billed: claimData.billed || 0,
        allowed: claimData.allowed || 0,
        paid: claimData.paid || 0,
        edits: claimData.edits || [],
        actionCode: claimData.action_code,
        status: claimData.status,
        scenarioType: claimData.scenario_type,
        memberInfo,
        providerInfo,
        paymentInfo: this.getMockPaymentInfo(),
        claimHeaderInfo: this.getMockClaimHeaderInfo(),
        claimLines,
        claimData: this.getMockClaimData(),
        searchData: { claimImage: {} }
      };
    } catch (error) {
      console.error('Error fetching claim:', error);
      throw error;
    }
  }

  static async getClaimLinesByDCN(dcn: string): Promise<ClaimLine[]> {
    try {
      const { data: claimData } = await supabase
        .from('claims')
        .select('id')
        .eq('dcn', dcn)
        .maybeSingle();

      if (!claimData) return [];

      const { data: linesData, error: linesError } = await supabase
        .from('claim_lines')
        .select('*')
        .eq('claim_id', claimData.id);

      if (linesError) throw linesError;

      return linesData?.map(line => ({
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
    } catch (error) {
      console.error('Error fetching claim lines:', error);
      return [];
    }
  }

  static async getProviderInfoByDCN(dcn: string): Promise<ProviderInfo | null> {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        billingName: data.billing_name2 || '',
        billingNPI: data.billing_npi || '',
        billingTaxId: data.billing_tax_id || '',
        renderingName: data.rendering_name || '',
        renderingNPI: data.rendering_npi || '',
        renderingAddress: data.rendering_address || '',
        referringPhysician: data.referring_physician || '',
        referringNPI: data.referring_npi7 || '',
        taxonomy: data.taxonomy || '',
        specialty: data.specialty || '',
        networkOption: data.network_option || '',
        licenseNumber: data.license_number || '',
        providerEpin: data.provider_epin || '',
        providerSps: data.provider_sps || '',
        facilityType: data.facility_type || '',
        address: data.address5 || '',
        medicareId: data.medicare_id || '',
        emergencyPricingInd: data.emergency_pricing_ind || '',
        bhaProviderIndicator: data.bha_provider_indicator || '',
        locationCode: data.location_code || '',
        nationalState: data.national_state || '',
        pricingState: data.pricing_state || '',
        pricingZip: data.pricing_zip || '',
        serviceFacilityTier: data.service_facility_tier || '',
        serviceProvider: data.service_provider || '',
        npi8: data.npi8 || '',
        nsbIndicator: data.nsb_indicator || '',
        alternateFacilityNPI: data.alternate_facility_npi || ''
      };
    } catch (error) {
      console.error('Error fetching provider info:', error);
      return null;
    }
  }

  static async refreshClaimData(dcn: string): Promise<Claim | null> {
    return this.getClaimByDCN(dcn);
  }

  static async searchClaims(criteria: { dcn?: string }): Promise<Claim[]> {
    try {
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .ilike('dcn', `%${criteria.dcn || ''}%`);

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
        billed: claim.billed || 0,
        allowed: claim.allowed || 0,
        paid: claim.paid || 0,
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

  static getMockPaymentInfo(): PaymentInfo {
    return {
      claim: {
        deductible: 0,
        copay: 0,
        coins: 0,
        patientLiability: 0,
        memberSurcharge: 0,
        nonEligible: 0,
        hraPaid: 0,
        claimPaid: 0,
        pricingAllowedAmount: 100,
        totalCharge: 300,
        finalizationCode: "-"
      },
      provider: {
        providerDiscount: 0,
        providerLiability: 0,
        providerRiskWithhold: 0,
        providerSurcharge: 0,
        interest: 0,
        penalty: 0,
        lrIndicator: "-",
        systemInterest: 0
      },
      drg: {
        amount: 0,
        checkNumber: "-",
        checkDate: "-",
        paymentSystem: "D",
        checkStatus: "Check not Found",
        checkStatusDate: "2025-06-01",
        paidTo: "MEDICAL GROUP LLC",
        accountNumber: "-",
        eftCheckDate: "",
        priced: ""
      }
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

// Get member info by DCN with intentionally wrong data for scenario testing
export const getMemberInfoByDCN = async (dcn: string): Promise<MemberInfo | null> => {
  try {
    // For scenario 1, return intentionally wrong test data (John Smith instead of John Wick)
    if (dcn === "25048AA1000") {
      return {
        prefix: "Mr",
        firstName: "John",
        middleName: "D",
        lastName: "Smith", // Wrong last name for scenario testing
        dob: "1980-05-15", // Wrong DOB for scenario testing
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
        subscriberId: "SUB654321", // Wrong subscriber ID for scenario testing
        groupName: "ABC Corporation",
        groupContract: "GRP001",
        detailContractCode: "DCC123",
        product: "Premium Health",
        groupId: "GID456",
        networkName: "HealthNet Plus",
        networkId: "NET789"
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

    const { data, error } = await query;
    
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
      groupName: member.group_name || '',
      address: member.address || '',
      city: member.city || '',
      state: member.state || '',
      zipCode: member.zip_code || ''
    })) || [];
  } catch (error) {
    console.error('Error searching members:', error);
    throw error;
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
      networkId: data.network_id || ''
    };
  } catch (error) {
    console.error('Error getting member by ID:', error);
    throw error;
  }
};