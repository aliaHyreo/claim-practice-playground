export interface EditDetail {
  code: string;
  description: string;
  status: 'soft' | 'critical';
}

export interface MemberInfo {
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

export interface ClaimData {
  billed: number;
  allowed: number;
  finalContractAmount: number;
  explanation: string[];
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

export interface Claim {
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
  memberInfo?: MemberInfo;
  providerInfo?: ProviderInfo;
  paymentInfo?: PaymentInfo;
  claimHeaderInfo?: ClaimHeaderInfo;
  claimLines?: ClaimLine[];
  claimData?: ClaimData;
}

// Edit descriptions and statuses
const editDetails: Record<string, EditDetail> = {
  "SPS": { code: "SPS", description: "USE PA MENU OPTION TO VIEW PRV", status: "soft" },
  "PLP": { code: "PLP", description: "PROVIDER PER ADDRESS SELECTED", status: "soft" },
  "RNB": { code: "RNB", description: "RENDERING NPI IS BLANK", status: "soft" },
  "334": { code: "334", description: "FIRST 2 CHAR REQ IN PRVDR SEC NIM", status: "soft" },
  "REL": { code: "REL", description: "RELATED CLAIM IN HISTORY", status: "soft" },
  "IAF": { code: "IAF", description: "IMAGE ADJUDICATION FAILURE", status: "soft" },
  "507": { code: "507", description: "ELIGIBILITY FOUND IS PARTIAL", status: "critical" }
};

// Mock data for claims
const mockClaims: Claim[] = [
  {
    dcn: "DCN-00012345",
    title: "John",
    lastName: "Doe",
    dob: "5/1/1980",
    sex: "M",
    memberCode: "MC-987654",
    contractType: "PPO",
    relationship: "Self",
    pcp: "Dr. Smith",
    erisa: "N",
    billed: 300,
    allowed: 100,
    paid: 0,
    edits: ["SPS", "PLP", "RNB", "334", "REL", "IAF", "507"],
    actionCode: "-",
    memberInfo: {
      prefix: "Mr.",
      firstName: "John",
      middleName: "",
      lastName: "Doe",
      dob: "Wed, May 01, 1980",
      sex: "M",
      memberPrefix: "EMN",
      hcid: "23456789",
      relationship: "Self",
      memberCode: "MC-987654",
      contractType: "PPO",
      erisa: "N",
      pcp: "Dr. Smith",
      pcpState: "-",
      pcpRelationship: "-",
      programCode: "-",
      subscriberId: "123456789",
      groupName: "ABC Group",
      groupId: "200000M001",
      groupContract: "0AA",
      detailContractCode: "500L",
      product: "LOCAL",
      networkId: "-",
      networkName: "-"
    },
    providerInfo: {
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
    },
    paymentInfo: {
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
        checkStatusDate: "Sun, Jun 1, 2025",
        paidTo: "MEDICAL GROUP LLC",
        accountNumber: "-",
        eftCheckDate: "",
        priced: ""
      }
    },
    claimHeaderInfo: {
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
        fsbExclusion: "X",
      },
      benefitIndicators: {
        cob: "No",
        cobRule: "-",
        medInd: "No",
        medicareAdvantage: "Yes",
        cdhp: "N",
        planPayer: "N",
        cobPercentage: "0",
      },
      diagnosisCodes: {
        dx1: "G800",
        dx2: "0",
        dx3: "0",
        medRule: "-",
      },
    },
    claimLines: [
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
    ],
    claimData: {
      billed: 300,
      allowed: 100,
      finalContractAmount: 0,
      explanation: [
        "Provider billed $300 for this claim.",
        "System adjudication rules allowed $100.",
        "Based on contract agreements and claim edits, final payable amount is $0."
      ]
    }
  },
  {
    dcn: "25048AA1000",
    title: "John",
    lastName: "Wick",
    dob: "8/18/1982",
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
    actionCode: "-",
    memberInfo: {
      prefix: "Mr.",
      firstName: "John",
      middleName: "",
      lastName: "Wick",
      dob: "Wed, Aug 18, 1982",
      sex: "M",
      memberPrefix: "EMN",
      hcid: "23456789",
      relationship: "Spouse",
      memberCode: "20",
      contractType: "H",
      erisa: "Y",
      pcp: "-",
      pcpState: "-",
      pcpRelationship: "-",
      programCode: "-",
      subscriberId: "123456789",
      groupName: "ABC Group",
      groupId: "200000M001",
      groupContract: "0AA",
      detailContractCode: "500L",
      product: "LOCAL",
      networkId: "-",
      networkName: "-"
    },
    providerInfo: {
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
    },
    paymentInfo: {
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
        checkStatusDate: "Sun, Jun 1, 2025",
        paidTo: "MEDICAL GROUP LLC",
        accountNumber: "-",
        eftCheckDate: "",
        priced: ""
      }
    },
    claimHeaderInfo: {
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
        fsbExclusion: "X",
      },
      benefitIndicators: {
        cob: "No",
        cobRule: "-",
        medInd: "No",
        medicareAdvantage: "Yes",
        cdhp: "N",
        planPayer: "N",
        cobPercentage: "0",
      },
      diagnosisCodes: {
        dx1: "G800",
        dx2: "0",
        dx3: "0",
        medRule: "-",
      },
    },
    claimLines: [
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
    ],
    claimData: {
      billed: 300,
      allowed: 100,
      finalContractAmount: 0,
      explanation: [
        "Provider billed $300 for this claim.",
        "System adjudication rules allowed $100.",
        "Based on contract agreements and claim edits, final payable amount is $0."
      ]
    }
  },
  {
    dcn: "25048AA2000",
    title: "Jane",
    lastName: "Smith",
    dob: "3/15/1975",
    sex: "F",
    memberCode: "15",
    contractType: "PPO",
    relationship: "Self",
    pcp: "Dr. Johnson",
    erisa: "N",
    billed: 150,
    allowed: 120,
    paid: 100,
    edits: ["PLP", "REL"],
    actionCode: "A"
  },
  {
    dcn: "25048AA3000",
    title: "Robert",
    lastName: "Brown",
    dob: "11/22/1990",
    sex: "M",
    memberCode: "30",
    contractType: "HMO",
    relationship: "Child",
    pcp: "Dr. Williams",
    erisa: "Y",
    billed: 500,
    allowed: 450,
    paid: 400,
    edits: ["SPS", "334", "507"],
    actionCode: "B"
  }
];

export class ClaimsService {
  // Search claims by DCN
  static searchClaims(dcn: string): Claim[] {
    if (!dcn.trim()) {
      return mockClaims;
    }
    
    return mockClaims.filter(claim => 
      claim.dcn.toLowerCase().includes(dcn.toLowerCase())
    );
  }

  // Get claim by exact DCN
  static getClaimByDCN(dcn: string): Claim | null {
    return mockClaims.find(claim => 
      claim.dcn.toLowerCase() === dcn.toLowerCase()
    ) || null;
  }

  // Get all claims
  static getAllClaims(): Claim[] {
    return mockClaims;
  }

  // Get edit details for a claim
  static getEditDetails(edits: string[]): EditDetail[] {
    return edits.map(editCode => 
      editDetails[editCode] || { 
        code: editCode, 
        description: "Unknown edit code", 
        status: "soft" as const 
      }
    );
  }

  // Simulate refreshing claim data
  static refreshClaimData(dcn: string): Claim | null {
    const claim = this.getClaimByDCN(dcn);
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
}