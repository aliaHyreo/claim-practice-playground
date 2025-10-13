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
  static async getClaimByClaimNumber(dcn: string): Promise<Claim | null> {
    try {
      const { data: claimData, error: claimError } = await supabase
        .from('claims')
        .select('*')
        .eq('dcn', dcn)
        .maybeSingle();

      if (claimError) throw claimError;
      if (!claimData) return null;

      // Get member info separately
      const memberInfo = await getMemberInfoByClaimNumber(dcn);

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
        providerInfo: this.getMockProviderInfo(dcn),
        paymentInfo: this.getMockPaymentInfo(dcn),
        claimHeaderInfo: this.getMockClaimHeaderInfo(dcn),
        claimLines: ClaimsService.getMockClaimLines(dcn),
        claimData: this.getMockClaimData(dcn),
        searchData: { claimImage: this.getMockClaimImageData(dcn) }
      };
    } catch (error) {
      console.error('Error getting claim by Claim Number:', error);
      return null;
    }
  }

  static async refreshClaimData(dcn: string): Promise<Claim | null> {
    // In a real application, this would refresh data from external systems
    // For now, just return the same data
    return this.getClaimByClaimNumber(dcn);
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
    return edits.map(edit => {
      switch(edit) {
        case "507":
          return {
            code: edit,
            description: "Eligibility found is partial",
            type: 'error',
            status: 'critical'
          };
        case "509":
          return {
            code: edit,
            description: "Contract not in effect for group/member",
            type: 'error',
            status: 'critical'
          };
        case "597":
          return {
            code: edit,
            description: "No active eligibility for service dates",
            type: 'error',
            status: 'critical'
          };
        default:
          return {
            code: edit,
            description: `Scenario ${edit} description`,
            type: 'warning',
            status: 'active'
          };
      }
    });
  }

  static getMockProviderInfo(dcn?: string): ProviderInfo {
    // Scenario 1: Claim Number 25048AA1000
    if (dcn === "25048AA1000") {
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
    
    // Scenario 2: Claim Number 25048AA1001
    if (dcn === "25048AA1001") {
      return {
        billingName: "KENTUCKY HEALTH CLINIC",
        billingNPI: "2345678901",
        billingTaxId: "234567890",
        emergencyPricingInd: "Y",
        taxonomy: "208D00000X",
        specialty: "Internal Medicine",
        networkOption: "Out-of-Network",
        licenseNumber: "KY67890",
        providerEpin: "EPIN789",
        renderingNPI: "8765432109",
        renderingName: "Dr. Williams",
        renderingAddress: "456 Health Ave, Louisville, KY 40202",
        pricingState: "KY",
        npi8: "76543210",
        nsbIndicator: "N",
        alternateFacilityNPI: "2222222222",
        serviceFacilityTier: "Tier 2",
        serviceProvider: "Secondary",
        referringNPI7: "8888888888",
        referringNPI: "8888888888",
        referringPhysician: "Dr. Davis",
        taxonomy6: "208D00000X",
        pricingZip: "40202",
        providerSps: "SPS789",
        bhaProviderIndicator: "Y",
        locationCode: "LOC002",
        nationalState: "KY",
        address5: "456 Health Ave",
        address: "456 Health Ave, Louisville, KY 40202",
        medicareId: "MED789012",
        providerEpin4: "EPIN012",
        providerSps3: "SPS012",
        facilityType: "Clinic",
        billingName2: "KENTUCKY HEALTH CLINIC"
      };
    }
    
    // Scenario 3: Claim Number 25048AA1002
    if (dcn === "25048AA1002") {
      return {
        billingName: "EMERGENCY MEDICAL CENTER",
        billingNPI: "3456789012",
        billingTaxId: "345678901",
        emergencyPricingInd: "Y",
        taxonomy: "207T00000X",
        specialty: "Emergency Medicine",
        networkOption: "In-Network",
        licenseNumber: "TX34567",
        providerEpin: "EPIN345",
        renderingNPI: "7654321098",
        renderingName: "Dr. Rodriguez",
        renderingAddress: "789 Emergency Blvd, Dallas, TX 75201",
        pricingState: "TX",
        npi8: "65432109",
        nsbIndicator: "Y",
        alternateFacilityNPI: "3333333333",
        serviceFacilityTier: "Tier 1",
        serviceProvider: "Emergency",
        referringNPI7: "9999999999",
        referringNPI: "9999999999",
        referringPhysician: "Dr. Martinez",
        taxonomy6: "207T00000X",
        pricingZip: "75201",
        providerSps: "SPS345",
        bhaProviderIndicator: "N",
        locationCode: "LOC003",
        nationalState: "TX",
        address5: "789 Emergency Blvd",
        address: "789 Emergency Blvd, Dallas, TX 75201",
        medicareId: "MED345678",
        providerEpin4: "EPIN678",
        providerSps3: "SPS678",
        facilityType: "Hospital",
        billingName2: "EMERGENCY MEDICAL CENTER"
      };
    }
    
    // Default scenario 1 data
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

  static getMockPaymentInfo(dcn?: string): PaymentInfo {
    // Scenario 1: Claim Number 25048AA1000
    if (dcn === "25048AA1000") {
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
    
    // Scenario 2: Claim Number 25048AA1001
    if (dcn === "25048AA1001") {
      return {
        claim: {
          deductible: 500,
          copay: 0,
          coinsurance: 20,
          coins: 40,
          totalPaid: 160,
          patientResponsibility: 540,
          patientLiability: 540,
          memberSurcharge: 0,
          nonEligible: 0,
          hraPaid: 0,
          claimPaid: 160,
          pricingAllowedAmount: 200,
          totalCharge: 200,
          finalizationCode: "PARTIAL",
          primaryPaidAmount: 160,
          allowedAmount: 200,
          writeOffAmount: 40,
          benefitPeriod: "Calendar Year",
          benefitPeriodUsed: 2500,
          benefitPeriodRemaining: 500,
          lifetimeBenefit: 15000,
          lifetimeBenefitUsed: 8000,
          lifetimeBenefitRemaining: 7000
        },
        member: {
          memberPaidAmount: 160,
          checkNumber: "CHK789012",
          checkStatus: "Check Processed",
          checkStatusDate: "2025-08-15",
          paidTo: "KENTUCKY HEALTH CLINIC",
          accountNumber: "ACC789012",
          eftCheckDate: "2025-08-14",
          priced: "Y"
        },
        provider: {},
        drg: {}
      };
    }
    
    // Scenario 3: Claim Number 25048AA1002
    if (dcn === "25048AA1002") {
      return {
        claim: {
          deductible: 1000,
          copay: 100,
          coinsurance: 10,
          coins: 150,
          totalPaid: 1350,
          patientResponsibility: 1250,
          patientLiability: 1250,
          memberSurcharge: 50,
          nonEligible: 0,
          hraPaid: 200,
          claimPaid: 1350,
          pricingAllowedAmount: 2500,
          totalCharge: 2500,
          finalizationCode: "PAID",
          primaryPaidAmount: 1350,
          allowedAmount: 2500,
          writeOffAmount: 1150,
          benefitPeriod: "Calendar Year",
          benefitPeriodUsed: 5000,
          benefitPeriodRemaining: 3000,
          lifetimeBenefit: 25000,
          lifetimeBenefitUsed: 12000,
          lifetimeBenefitRemaining: 13000
        },
        member: {
          memberPaidAmount: 1350,
          checkNumber: "CHK345678",
          checkStatus: "Check Issued",
          checkStatusDate: "2025-09-10",
          paidTo: "EMERGENCY MEDICAL CENTER",
          accountNumber: "ACC345678",
          eftCheckDate: "2025-09-09",
          priced: "Y"
        },
        provider: {},
        drg: {}
      };
    }
    
    // Default scenario 1 data
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

  static getMockClaimHeaderInfo(dcn?: string): ClaimHeaderInfo {
    // Scenario 1: Claim Number 25048AA1000
    if (dcn === "25048AA1000") {
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
    
    // Scenario 2: Claim Number 25048AA1001
    if (dcn === "25048AA1001") {
      return {
        generalClaimData: {
          serviceFromDate: "08/04/2023",
          serviceToDate: "08/04/2023",
          assignmentOfBenefits: "N",
          providerParticipation: "NON-PAR",
          providerContract: "OUTNET1",
          treatmentAuth: "AUTH456789",
          patientAccount: "KY789.45612",
          emergency: "Yes",
          employment: "Yes",
          coveredZipRadius: "50",
          frequency: "1",
          bbiIndicator: "Y",
          pciIndicator: "N",
          fsbInd: "Partial",
          fsbExclusion: "N"
        },
        benefitIndicators: {
          cob: "Yes",
          cobRule: "Primary",
          medInd: "Yes",
          medicareAdvantage: "No",
          cdhp: "Y",
          planPayer: "Y",
          cobPercentage: "80"
        },
        diagnosisCodes: {
          dx1: "Z00.00",
          dx2: "M25.511",
          dx3: "I10",
          medRule: "ACTIVE"
        }
      };
    }
    
    // Scenario 3: Claim Number 25048AA1002
    if (dcn === "25048AA1002") {
      return {
        generalClaimData: {
          serviceFromDate: "09/15/2023",
          serviceToDate: "09/17/2023",
          assignmentOfBenefits: "Y",
          providerParticipation: "PAR",
          providerContract: "EMRG001",
          treatmentAuth: "EMRG789123",
          patientAccount: "TX345.67890",
          emergency: "Yes",
          employment: "No",
          coveredZipRadius: "25",
          frequency: "2",
          bbiIndicator: "N",
          pciIndicator: "Y",
          fsbInd: "Full",
          fsbExclusion: "Y"
        },
        benefitIndicators: {
          cob: "No",
          cobRule: "-",
          medInd: "No",
          medicareAdvantage: "No",
          cdhp: "N",
          planPayer: "N",
          cobPercentage: "0"
        },
        diagnosisCodes: {
          dx1: "S72.001A",
          dx2: "V87.0XXA",
          dx3: "Z87.891",
          medRule: "TRAUMA"
        }
      };
    }
    
    // Default scenario 1 data
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

  static getMockClaimData(dcn?: string): ClaimData {
    // Scenario 1: Claim Number 25048AA1000
    if (dcn === "25048AA1000") {
      return {
        originalClaim: {
          lineNo: 1,
          from: "8/3/2023",
          procedure: "84284",
          modifiers: "",
          units: 1,
          billed: 300
        },
        claimsXten: {
          billed: 300,
          procedure: "84284",
          modifiers: "",
          units: 1,
          payPercent: 30
        },
        overrides: {},
        adjustments: {}
      };
    }
    
    // Scenario 2: Claim Number 25048AA1001
    if (dcn === "25048AA1001") {
      return {
        originalClaim: {
          lineNo: 1,
          from: "8/4/2023",
          procedure: "99213",
          modifiers: "25",
          units: 1,
          billed: 200
        },
        claimsXten: {
          billed: 200,
          procedure: "99213",
          modifiers: "25",
          units: 1,
          payPercent: 100
        },
        overrides: {
          procedureCode: "99213",
          contractGroup: "200000M001"
        },
        adjustments: {
          reason: "Contract group updated to active contract"
        }
      };
    }
    
    // Scenario 3: Claim Number 25048AA1002
    if (dcn === "25048AA1002") {
      return {
        originalClaim: {
          lineNo: 1,
          from: "9/15/2023",
          procedure: "99285",
          modifiers: "ER,25",
          units: 1,
          billed: 2500
        },
        claimsXten: {
          billed: 2500,
          procedure: "99285",
          modifiers: "ER,25",
          units: 1,
          payPercent: 100
        },
        overrides: {
          emergencyInd: "Y",
          authRequired: "N"
        },
        adjustments: {
          reason: "Emergency service authorization override"
        }
      };
    }
    
    // Default scenario 1 data
    return {
      originalClaim: {
        lineNo: 1,
        from: "8/3/2023",
        procedure: "84284",
        modifiers: "",
        units: 1,
        billed: 300
      },
      claimsXten: {
        billed: 300,
        procedure: "84284",
        modifiers: "",
        units: 1,
        payPercent: 100
      },
      overrides: {},
      adjustments: {}
    };
  }

  static getMockClaimImageData(dcn: string): ClaimImageData {
    // Scenario 1: Claim Number 25048AA1000 - Member name mismatch (John Wick S vs John Wick)
    if (dcn === "25048AA1000") {
      return {
        dcn: "25048AA1000",
        patientName: "John Wick", // This is the CORRECT name from claim image
        dob: "1982-08-18",
        zip: "41701",
        serviceDates: { from: "2023-08-03", to: "2023-08-03" },
        claimLineCodeSystem: "84284",
        claimLineCodeImage: "E9973", // Different from system code to show mismatch
        eligibilityValidation: [
          "Confirm patient name",
          "Confirm DOB", 
          "Confirm contact information",
          "Ensure eligibility dates match claim line",
          "Update claim line if mismatch detected",
          "Run member search with Member ID to confirm eligibility"
        ]
      };
    }
    
    // Scenario 2: Claim Number 25048AA1001 - Contract group mismatch (509 edit)
    if (dcn === "25048AA1001") {
      return {
        dcn: "25048AA1001",
        patientName: "John Wick", // Correct name matching member information
        dob: "1982-08-18", // Same as scenario 1
        zip: "41701", // Same as scenario 1
        serviceDates: { from: "2023-08-04", to: "2023-08-04" }, // Service dates requiring active contract
        claimLineCodeSystem: "99213", // Updated to match scenario 2
        claimLineCodeImage: "99213", // Updated to match scenario 2
        eligibilityValidation: [
          "Confirm contract group",
          "Verify eligibility dates", 
          "Check contract validation",
          "Update contract if expired",
          "Apply correct contract group"
        ]
      };
    }
    
    // Scenario 3: Claim Number 25048AA1002 - 597 SOFT EDIT (Service date outside contract)
    if (dcn === "25048AA1002") {
      return {
        dcn: "25048AA1002",
        patientName: "Sarah Elizabeth Johnson", // Matches member information exactly
        dob: "1990-03-22", // Matches member information
        zip: "75201", // Matches member information
        serviceDates: { from: "2024-04-04", to: "2024-04-04" }, // Service dates OUTSIDE contract period
        claimLineCodeSystem: "99285", // Emergency procedure code
        claimLineCodeImage: "99285", // Matches system code
        eligibilityValidation: [
          "Confirm service dates against contract period",
          "Verify contract effective and end dates", 
          "Check if service dates fall within coverage",
          "Service date 04/04/2024 outside contract period 01/01/2023-01/01/2024",
          "No active eligibility for service dates - DENY claim"
        ]
      };
    }
    
    // Default claim image data
    return {
      dcn: dcn,
      patientName: "Unknown Patient",
      dob: "1990-01-01",
      zip: "00000",
      serviceDates: { from: "2023-01-01", to: "2023-01-01" },
      claimLineCodeSystem: "00000",
      claimLineCodeImage: "00000",
      eligibilityValidation: ["No validation data available"]
    };
  }

  static getMockClaimLines(dcn?: string): ClaimLine[] {
    // Scenario 1: Claim Number 25048AA1000
    if (dcn === "25048AA1000") {
      return [
        {
          lineNo: 1,
          serviceFromDate: "08/03/2023",
          serviceToDate: "08/03/2023",
          pos: "11",
          service: "Lab Test", 
          procedureCode: "84284",
          modifiers: [],
          units: 1,
          diagnosis: "G800",
          billed: 300
        }
      ];
    }
    
    // Scenario 2: Claim Number 25048AA1001 - Service dates that require active group (509 edit)
    if (dcn === "25048AA1001") {
      return [
        {
          lineNo: 1,
          serviceFromDate: "2023-08-04", // Service date in YYYY-MM-DD format requiring active contract
          serviceToDate: "2023-08-04", // Service date in YYYY-MM-DD format
          pos: "11", 
          service: "Office Visit",
          procedureCode: "99213",
          modifiers: ["25"],
          units: 1,
          diagnosis: "Z00.00",
          billed: 200
        }
      ];
    }
    
    // Scenario 3: Claim Number 25048AA1002 - 597 SOFT EDIT (Service date outside contract period)
    if (dcn === "25048AA1002") {
      return [
        {
          lineNo: 1,
          serviceFromDate: "2024-04-04", // Service date OUTSIDE contract period (01/01/2023 - 01/01/2024)
          serviceToDate: "2024-04-04", // Service date OUTSIDE contract period
          pos: "23",
          service: "Emergency Visit",
          procedureCode: "99285",
          modifiers: ["ER", "25"],
          units: 1,
          diagnosis: "S72.001A",
          billed: 2500
        }
      ];
    }
    
    // Default scenario 1 data
    return [
      {
        lineNo: 1,
        serviceFromDate: "08/03/2023",
        serviceToDate: "08/03/2023",
        pos: "11",
        service: "Lab Test", 
        procedureCode: "84284",
        modifiers: [],
        units: 1,
        diagnosis: "G800",
        billed: 300
      }
    ];
  }
}

// Get member info by ClaimNumber - loads the first (expired) contract initially
export const getMemberInfoByClaimNumber = async (dcn: string): Promise<MemberInfo | null> => {
  try {
    // SCENARIO 1 (Claim Number: 25048AA1000) - PATIENT DATA IS WRONG
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
        networkId: "NET789",
        address: "456 Wrong St",
        city: "Wrong City",
        state: "CA",
        zipCode: "90210",
        effectiveDate: "01/01/2020",
        endDate: "12/31/2024"
      };
    }
    
    // SCENARIO 2 (Claim Number: 25048AA1001) - PATIENT DATA IS CORRECT, GROUP DATA IS WRONG (509 edit)
    if (dcn === "25048AA1001") {
      // Return all correct patient data but with expired group information
      return {
        prefix: "Mr",
        firstName: "John", // ✅ CORRECT - Matches claim form exactly
        middleName: "", // ✅ CORRECT - No middle name to match "John Wick" from claim form
        lastName: "Wick", // ✅ CORRECT - Matches claim form exactly "John Wick" 
        dob: "1982-08-18", // ✅ CORRECT - Matches claim form
        sex: "M",
        hcid: "9876543210987654", // ✅ CORRECT - Available for searching contracts
        memberPrefix: "01",
        programCode: "HMO",
        relationship: "Self",
        memberCode: "001",
        contractType: "Individual",
        erisa: "Y",
        pcp: "Dr. Jane Smith",
        pcpState: "KY",
        pcpRelationship: "Primary",
        subscriberId: "123456789", // ✅ CORRECT - Matches claim form
        groupName: "Tech Solutions Inc",
        groupContract: "500L", // ❌ WRONG - Expired group contract
        detailContractCode: "500L",
        product: "HMO Standard",
        groupId: "200000A001", // ❌ WRONG - Expired group ID
        networkName: "Primary Network",
        networkId: "NET001",
        address: "123 Main St", // ✅ CORRECT - Matches claim form
        city: "Louisville", // ✅ CORRECT - Matches claim form  
        state: "KY", // ✅ CORRECT - Matches claim form
        zipCode: "41701", // ✅ CORRECT - Matches claim form
        effectiveDate: "04/28/2020", // ❌ WRONG - Expired effective date (MM/DD/YYYY format)
        endDate: "06/07/2022" // ❌ WRONG - Expired end date (MM/DD/YYYY format)
      };
    }
    
    // SCENARIO 3 (Claim Number: 25048AA1002) - 597 SOFT EDIT (SERVICE DATE OUTSIDE CONTRACT)
    if (dcn === "25048AA1002") {
      return {
        prefix: "Ms",
        firstName: "Sarah",
        middleName: "Elizabeth",
        lastName: "Johnson",
        dob: "1990-03-22",
        sex: "F",
        hcid: "H123456789597", // Unique HCID for scenario 3
        memberPrefix: "02",
        programCode: "PPO",
        relationship: "Self",
        memberCode: "002",
        contractType: "Family",
        erisa: "N",
        pcp: "Dr. Michael Brown",
        pcpState: "TX",
        pcpRelationship: "Primary",
        subscriberId: "987654321",
        groupName: "Tech Innovations Corp",
        groupContract: "500L", // Contract matches claim
        detailContractCode: "500L",
        product: "PPO Gold",
        groupId: "300000C001", // Group matches claim
        networkName: "Nationwide Health",
        networkId: "NET999",
        address: "789 Tech Blvd",
        city: "Dallas",
        state: "TX",
        zipCode: "75201",
        effectiveDate: "01/01/2023", // MM/DD/YYYY format
        endDate: "01/01/2024" // MM/DD/YYYY format - expired before service date
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
    if (hcid === "9876543210987654") {
      return [
        {
          contractId: "500L",
          groupNumber: "200000A001", // Old/expired contract
          effectiveDate: "04/28/2020", // MM/DD/YYYY format
          endDate: "06/07/2022"
        },
        {
          contractId: "500L", 
          groupNumber: "200000M001", // New/valid contract that covers service dates
          effectiveDate: "01/01/2023", // MM/DD/YYYY format
          endDate: "01/01/2024"
        }
      ];
    }
    
    // Mock contract data for scenario 3 testing (597 - Service date outside contract)
    if (hcid === "H123456789597") {
      return [
        {
          contractId: "500L",
          groupNumber: "300000C001", // Contract matches but is expired relative to service date
          effectiveDate: "01/01/2023", // MM/DD/YYYY format
          endDate: "01/01/2024" // MM/DD/YYYY format - expired before service date 2024-04-04
        }
      ];
    }
    
    return [];
  } catch (error) {
    console.error('Error searching contracts:', error);
    return [];
  }
};