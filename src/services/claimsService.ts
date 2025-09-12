import { supabase } from "@/integrations/supabase/client";

export interface EditDetail {
  code: string;
  description: string;
  status: 'resolved' | 'critical';
}

export interface MemberInfo {
  id?: string;
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  sex: string;
  memberPrefix: string;
  hcid: string;
  relationship: string;
  memberCode: string;
  contractType: string;
  erisa: string;
  pcp: string;
  pcpState: string;
  pcpRelationship: string;
  programCode: string;
  subscriberId: string;
  groupName: string;
  groupId: string;
  groupContract: string;
  detailContractCode: string;
  product: string;
  networkId: string;
  networkName: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface ProviderInfo {
  renderingNPI: string;
  renderingName: string;
  renderingAddress: string;
  pricingState: string;
  pricingZIP: string;
  providerSPS: string;
  providerEPIN: string;
  licenseNumber: string;
  networkOption: string;
  specialty: string;
  taxonomy: string;
  emergencyPricingInd: string;
  billingTaxId: string;
  billingNPI: string;
  billingName2: string;
  facilityType: string;
  providerSPS3: string;
  providerEPIN4: string;
  medicareId: string;
  address5: string;
  nationalState: string;
  locationCode: string;
  bhaProviderIndicator: string;
  taxonomy6: string;
  referringPhysician: string;
  referringNPI7: string;
  serviceProvider: string;
  serviceFacilityTier: string;
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

export interface ClaimImageData {
  patientName: string;
  dob: string;
  zip: string;
  serviceDates: {
    from: string;
    to: string;
  };
  claimLineCodeSystem: string;
  claimLineCodeImage: string;
  eligibilityValidation: string[];
}

export interface SearchData {
  claimImage: ClaimImageData;
}

export interface ClaimData {
  originalClaim: {
    lineNo: number;
    from: string;
    procedure: string;
    modifiers: string;
    units: number;
    billed: number;
  };
  claimsXten: {
    billed: number;
    procedure: string;
    modifiers: string;
    units: number;
    payPercent: number;
  };
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
      const { data: claim, error } = await supabase
        .from('claims')
        .select('*')
        .eq('dcn', dcn)
        .single();

      if (error || !claim) {
        console.error('Error fetching claim:', error);
        return null;
      }

      // Get member info if it exists
      const memberInfo = await this.getMemberInfoForClaim(claim.dcn);
      
      // Get claim form (source of truth)
      const searchData = await this.getClaimFormData(claim.dcn);

      return {
        id: claim.id,
        dcn: claim.dcn,
        title: claim.title,
        lastName: claim.last_name,
        dob: claim.dob,
        sex: claim.sex,
        memberCode: claim.member_code,
        contractType: claim.contract_type,
        relationship: claim.relationship,
        pcp: claim.pcp,
        erisa: claim.erisa,
        billed: claim.billed,
        allowed: claim.allowed,
        paid: claim.paid,
        edits: claim.edits,
        actionCode: claim.action_code,
        status: claim.status,
        scenarioType: claim.scenario_type,
        memberInfo,
        searchData,
        // Get real data from database
        providerInfo: await this.getProviderInfo(),
        claimLines: await this.getClaimLinesForClaim(claim.id),
        paymentInfo: this.getMockPaymentInfo(),
        claimHeaderInfo: this.getMockClaimHeaderInfo(),
        claimData: this.getMockClaimData()
      };
    } catch (error) {
      console.error('Error in getClaimByDCN:', error);
      return null;
    }
  }

  static async getMemberInfoForClaim(dcn: string): Promise<MemberInfo | undefined> {
    try {
      // Fetch member with wrong test data (missing 'S' in last name)
      const { data: member, error } = await supabase
        .from('members')
        .select('*')
        .eq('hcid', '23456789')
        .single();

      if (error || !member) {
        console.error('Error fetching member info:', error);
        return undefined;
      }

      return {
        id: member.id,
        prefix: member.prefix || '',
        firstName: member.first_name,
        middleName: member.middle_name || '',
        lastName: member.last_name, // This will be wrong (missing 'S')
        dob: member.dob,
        sex: member.sex || '',
        memberPrefix: member.member_prefix || '',
        hcid: member.hcid || '',
        relationship: member.relationship || '',
        memberCode: member.member_code || '',
        contractType: member.contract_type || '',
        erisa: member.erisa || '',
        pcp: member.pcp || '',
        pcpState: member.pcp_state || '',
        pcpRelationship: member.pcp_relationship || '',
        programCode: member.program_code || '',
        subscriberId: member.subscriber_id || '',
        groupName: member.group_name || '',
        groupId: member.group_id || '',
        groupContract: member.group_contract || '',
        detailContractCode: member.detail_contract_code || '',
        product: member.product || '',
        networkId: member.network_id || '',
        networkName: member.network_name || '',
        address: member.address || '',
        city: member.city || '',
        state: member.state || '',
        zipCode: member.zip_code || ''
      };
    } catch (error) {
      console.error('Error fetching member info:', error);
      return undefined;
    }
  }

  static async getClaimFormData(dcn: string): Promise<SearchData | undefined> {
    try {
      const { data: claimForm, error } = await supabase
        .from('claim_forms')
        .select('*')
        .eq('dcn', dcn)
        .single();

      if (error || !claimForm) {
        console.error('Error fetching claim form:', error);
        return undefined;
      }

      return {
        claimImage: {
          patientName: claimForm.patient_name,
          dob: claimForm.dob,
          zip: claimForm.zip_code,
          serviceDates: {
            from: claimForm.service_date_from,
            to: claimForm.service_date_to
          },
          claimLineCodeSystem: claimForm.claim_line_code_system,
          claimLineCodeImage: claimForm.claim_line_code_image,
          eligibilityValidation: claimForm.eligibility_validation
        }
      };
    } catch (error) {
      console.error('Error fetching claim form data:', error);
      return undefined;
    }
  }

  static async searchMembers(searchCriteria: {
    firstName?: string;
    lastName?: string;
    dob?: string;
    subscriberId?: string;
  }): Promise<MemberSearchResult[]> {
    try {
      let query = supabase.from('members').select(`
        id, prefix, first_name, middle_name, last_name, dob, sex,
        hcid, subscriber_id, group_name, address, city, state, zip_code
      `);

      if (searchCriteria.firstName) {
        query = query.ilike('first_name', `%${searchCriteria.firstName}%`);
      }
      if (searchCriteria.lastName) {
        query = query.ilike('last_name', `%${searchCriteria.lastName}%`);
      }
      if (searchCriteria.dob) {
        query = query.eq('dob', searchCriteria.dob);
      }
      if (searchCriteria.subscriberId) {
        query = query.eq('subscriber_id', searchCriteria.subscriberId);
      }

      const { data: members, error } = await query;

      if (error) {
        console.error('Error searching members:', error);
        return [];
      }

      return members?.map(member => ({
        id: member.id,
        prefix: member.prefix,
        firstName: member.first_name,
        middleName: member.middle_name,
        lastName: member.last_name,
        dob: member.dob,
        sex: member.sex,
        hcid: member.hcid,
        subscriberId: member.subscriber_id,
        groupName: member.group_name,
        address: member.address,
        city: member.city,
        state: member.state,
        zipCode: member.zip_code
      })) || [];
    } catch (error) {
      console.error('Error in searchMembers:', error);
      return [];
    }
  }

  static async getMemberById(id: string): Promise<MemberInfo | null> {
    try {
      const { data: member, error } = await supabase
        .from('members')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !member) {
        console.error('Error fetching member:', error);
        return null;
      }

      return {
        id: member.id,
        prefix: member.prefix,
        firstName: member.first_name,
        middleName: member.middle_name,
        lastName: member.last_name,
        dob: member.dob,
        sex: member.sex,
        memberPrefix: member.member_prefix,
        hcid: member.hcid,
        relationship: member.relationship,
        memberCode: member.member_code,
        contractType: member.contract_type,
        erisa: member.erisa,
        pcp: member.pcp,
        pcpState: member.pcp_state,
        pcpRelationship: member.pcp_relationship,
        programCode: member.program_code,
        subscriberId: member.subscriber_id,
        groupName: member.group_name,
        groupId: member.group_id,
        groupContract: member.group_contract,
        detailContractCode: member.detail_contract_code,
        product: member.product,
        networkId: member.network_id,
        networkName: member.network_name,
        address: member.address,
        city: member.city,
        state: member.state,
        zipCode: member.zip_code
      };
    } catch (error) {
      console.error('Error in getMemberById:', error);
      return null;
    }
  }

  static async validateMemberData(memberInfo: MemberInfo, claimForm: ClaimForm): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];

    // Validate patient name
    const memberFullName = `${memberInfo.firstName} ${memberInfo.lastName}`.trim();
    if (memberFullName !== claimForm.patientName.trim()) {
      errors.push(`Patient name mismatch: Expected "${claimForm.patientName}", got "${memberFullName}"`);
    }

    // Validate DOB
    if (memberInfo.dob !== claimForm.dob) {
      errors.push(`DOB mismatch: Expected "${claimForm.dob}", got "${memberInfo.dob}"`);
    }

    // Validate ZIP code if available
    if (memberInfo.zipCode && memberInfo.zipCode !== claimForm.zipCode) {
      errors.push(`ZIP code mismatch: Expected "${claimForm.zipCode}", got "${memberInfo.zipCode}"`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static async updateClaimStatus(dcn: string, actionCode: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('claims')
        .update({ 
          action_code: actionCode,
          status: actionCode === 'pay' ? 'approved' : 'processed'
        })
        .eq('dcn', dcn);

      if (error) {
        console.error('Error updating claim status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in updateClaimStatus:', error);
      return false;
    }
  }

  static getEditDetails(edits: string[]): EditDetail[] {
    const editMap: Record<string, EditDetail> = {
      'SPS': { code: 'SPS', description: 'Spouse eligibility verification required', status: 'resolved' },
      'PLP': { code: 'PLP', description: 'Primary liability payer check needed', status: 'resolved' },
      'RNB': { code: 'RNB', description: 'Relationship not on benefits', status: 'resolved' },
      '334': { code: '334', description: 'Provider specialty code validation', status: 'resolved' },
      'REL': { code: 'REL', description: 'Relationship code verification', status: 'resolved' },
      'IAF': { code: 'IAF', description: 'Ineligible amount found', status: 'resolved' },
      '507': { code: '507', description: 'Member information validation required', status: 'critical' }
    };

    return edits.map(edit => editMap[edit] || { 
      code: edit, 
      description: `Edit ${edit} - Manual review required`, 
      status: 'critical' 
    });
  }

  // Search claims by DCN - for backward compatibility
  static searchClaims(dcn: string): Claim[] {
    // This will be replaced with database search
    const mockClaims = this.getAllClaims();
    if (!dcn.trim()) {
      return mockClaims;
    }
    
    return mockClaims.filter(claim => 
      claim.dcn.toLowerCase().includes(dcn.toLowerCase())
    );
  }

  static getAllClaims(): Claim[] {
    // Mock implementation - to be replaced with database query
    return [
      {
        dcn: "25048AA1000",
        title: "John",
        lastName: "Wick",
        dob: "1982-08-18",
        sex: "M",
        memberCode: "20",
        contractType: "H",
        relationship: "Spouse",
        pcp: "-",
        erisa: "Y",
        billed: 300,
        allowed: 100,
        paid: 0,
        edits: ["SPS", "PLP", "RNB", "334", "REL", "IAF", "507"],
        actionCode: "-"
      }
    ];
  }

  // Simulate refreshing claim data - for backward compatibility
  static async refreshClaimData(dcn: string): Promise<Claim | null> {
    const claim = await this.getClaimByDCN(dcn);
    if (claim) {
      // Simulate some random changes
      const randomBilled = Math.floor(Math.random() * 1000) + 100;
      const randomAllowed = Math.floor(randomBilled * 0.8);
      const randomPaid = Math.floor(randomAllowed * 0.9);
      
      return {
        ...claim,
        billed: randomBilled,
        allowed: randomAllowed,
        paid: randomPaid
      };
    }
    return null;
  }

  // Mock data methods (to be implemented later)
  private static getMockProviderInfo(): ProviderInfo {
    return {
      renderingNPI: "67926782",
      renderingName: "James Clinic",
      renderingAddress: "2426 BERKSHIRE AV Fox Cities.",
      pricingState: "WI",
      pricingZIP: "44011",
      providerSPS: "-",
      providerEPIN: "-",
      licenseNumber: "-",
      networkOption: "N/Y",
      specialty: "V01",
      taxonomy: "2345678232",
      emergencyPricingInd: "-",
      billingTaxId: "1234567B",
      billingNPI: "1234567",
      billingName2: "MILLERS RENTAL",
      facilityType: "-",
      providerSPS3: "5987543",
      providerEPIN4: "-",
      medicareId: "-",
      address5: "203 ROMIG RD 0954642",
      nationalState: "NY",
      locationCode: "-",
      bhaProviderIndicator: "YA",
      taxonomy6: "-",
      referringPhysician: "Kim Konch",
      referringNPI7: "5974200",
      serviceProvider: "James Clinic",
      serviceFacilityTier: "-",
      npi8: "-",
      nsbIndicator: "None",
      alternateFacilityNPI: "-"
    };
  }

  private static getMockPaymentInfo(): PaymentInfo {
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

  private static getMockClaimHeaderInfo(): ClaimHeaderInfo {
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

  private static getMockClaimLines(): ClaimLine[] {
    return [
      {
        lineNo: 1,
        serviceFromDate: "8/4/2023",
        serviceToDate: "8/4/2023",
        pos: "12",
        service: "DME",
        procedureCode: "E9973",
        modifiers: ["NU EU, KX"],
        units: 1,
        diagnosis: "G800",
        billed: 300
      }
    ];
  }

  private static getMockClaimData(): any {
    return {
      originalClaim: {
        lineNo: 1,
        from: "8/4/2023...",
        procedure: "E9973",
        modifiers: "NU,EU, KX",
        units: 1,
        billed: 300
      },
      claimsXten: {
        billed: 300,
        procedure: "E9973",
        modifiers: "NU,EU, KX",
        units: 1,
        payPercent: 50
      }
    };
  }

  static async getProviderInfo(): Promise<ProviderInfo | undefined> {
    try {
      const { data: provider, error } = await supabase
        .from('providers')
        .select('*')
        .limit(1)
        .single();

      if (error || !provider) {
        console.error('Error fetching provider info:', error);
        return this.getMockProviderInfo();
      }

      return {
        renderingNPI: provider.rendering_npi || '',
        renderingName: provider.rendering_name || '',
        renderingAddress: provider.rendering_address || '',
        pricingState: provider.pricing_state || '',
        pricingZIP: provider.pricing_zip || '',
        providerSPS: provider.provider_sps || '',
        providerEPIN: provider.provider_epin || '',
        licenseNumber: provider.license_number || '',
        networkOption: provider.network_option || '',
        specialty: provider.specialty || '',
        taxonomy: provider.taxonomy || '',
        emergencyPricingInd: provider.emergency_pricing_ind || '',
        billingTaxId: provider.billing_tax_id || '',
        billingNPI: provider.billing_npi || '',
        billingName2: provider.billing_name2 || '',
        facilityType: provider.facility_type || '',
        providerSPS3: provider.provider_sps3 || '',
        providerEPIN4: provider.provider_epin4 || '',
        medicareId: provider.medicare_id || '',
        address5: provider.address5 || '',
        nationalState: provider.national_state || '',
        locationCode: provider.location_code || '',
        bhaProviderIndicator: provider.bha_provider_indicator || '',
        taxonomy6: provider.taxonomy6 || '',
        referringPhysician: provider.referring_physician || '',
        referringNPI7: provider.referring_npi7 || '',
        serviceProvider: provider.service_provider || '',
        serviceFacilityTier: provider.service_facility_tier || '',
        npi8: provider.npi8 || '',
        nsbIndicator: provider.nsb_indicator || '',
        alternateFacilityNPI: provider.alternate_facility_npi || ''
      };
    } catch (error) {
      console.error('Error fetching provider info:', error);
      return this.getMockProviderInfo();
    }
  }

  static async getClaimLinesForClaim(claimId: string): Promise<ClaimLine[]> {
    try {
      const { data: claimLines, error } = await supabase
        .from('claim_lines')
        .select('*')
        .eq('claim_id', claimId);

      if (error || !claimLines) {
        console.error('Error fetching claim lines:', error);
        return this.getMockClaimLines();
      }

      return claimLines.map(line => ({
        lineNo: line.line_no || 0,
        serviceFromDate: line.service_from_date || '',
        serviceToDate: line.service_to_date || '',
        pos: line.pos || '',
        service: line.service || '',
        procedureCode: line.procedure_code || '',
        modifiers: line.modifiers || [],
        units: line.units || 0,
        diagnosis: line.diagnosis || '',
        billed: line.billed || 0
      }));
    } catch (error) {
      console.error('Error fetching claim lines:', error);
      return this.getMockClaimLines();
    }
  }
}