export interface EditDetail {
  code: string;
  description: string;
  status: 'soft' | 'critical';
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
    actionCode: "-"
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
    actionCode: "-"
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