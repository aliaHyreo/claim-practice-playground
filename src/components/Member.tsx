import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MemberContract {
  contractId: string;
  caseEntity: string;
  group: string;
  hcid: string;
  effectiveDate: string;
  endDate: string;
  contractState: string;
}

interface MemberData {
  memberId: string;
  contracts: MemberContract[];
}

interface MemberProps {
  onContractApply?: (contractData: {
    groupId: string;
    groupContract: string;
    effectiveDate: string;
    endDate: string;
  }) => void;
}

const Member = ({ onContractApply }: MemberProps) => {
  const [memberId, setMemberId] = useState("");
  const [searchResults, setSearchResults] = useState<MemberData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  // Updated mock data for scenario 2 with HCID H987654321
  const getMockMemberData = (searchId: string): MemberData | null => {
    if (searchId === "H987654321") {
      return {
        memberId: "H987654321",
        contracts: [
          {
            contractId: "500L",
            caseEntity: "200000",
            group: "200000A001", // Old/expired contract
            hcid: "H987654321",
            effectiveDate: "4/28/2020",
            endDate: "6/7/2022",
            contractState: "WI"
          },
          {
            contractId: "500L",
            caseEntity: "200000",
            group: "200000M001", // New/valid contract for 2023 service dates
            hcid: "H987654321",
            effectiveDate: "1/1/2023",
            endDate: "1/1/2024",
            contractState: "WI"
          }
        ]
      };
    } 
    
    // Original mock data for other searches
    if (searchId === "23456789") {
      return {
        memberId: "23456789",
        contracts: [
          {
            contractId: "500L",
            caseEntity: "200000",
            group: "200000A001",
            hcid: "23456789",
            effectiveDate: "4/28/2020",
            endDate: "6/7/2022",
            contractState: "WI"
          },
          {
            contractId: "QTAK",
            caseEntity: "209647",
            group: "200000A001",
            hcid: "23456789",
            effectiveDate: "4/28/2020",
            endDate: "6/8/2027",
            contractState: "WI"
          },
          {
            contractId: "QTAK",
            caseEntity: "200000",
            group: "200000A001",
            hcid: "23456789",
            effectiveDate: "1/2/2023",
            endDate: "2/1/2023",
            contractState: "WI"
          },
          {
            contractId: "JKT",
            caseEntity: "209888",
            group: "200000A444",
            hcid: "23456789",
            effectiveDate: "4/28/2020",
            endDate: "6/7/2022",
            contractState: "WI"
          },
          {
            contractId: "500L",
            caseEntity: "200000",
            group: "200000M001",
            hcid: "23456789",
            effectiveDate: "1/1/2023",
            endDate: "1/1/2024",
            contractState: "WI"
          }
        ]
      };
    }
    
    return null;
  };

  const handleSearch = () => {
    if (memberId.trim()) {
      const results = getMockMemberData(memberId.trim());
      setSearchResults(results);
      setHasSearched(true);
      
      if (!results) {
        toast({
          title: "No Results Found",
          description: `No member found with ID: ${memberId}`,
          variant: "destructive",
        });
      }
    }
  };

  const handleClear = () => {
    setMemberId("");
    setSearchResults(null);
    setHasSearched(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleApplyContract = (contract: MemberContract) => {
    if (onContractApply) {
      // Convert date format from M/D/YYYY to YYYY-MM-DD for validation
      const formatDateForStorage = (dateString: string): string => {
        try {
          const [month, day, year] = dateString.split('/');
          const paddedMonth = month.padStart(2, '0');
          const paddedDay = day.padStart(2, '0');
          return `${year}-${paddedMonth}-${paddedDay}`;
        } catch (error) {
          return dateString;
        }
      };

      onContractApply({
        groupId: contract.group,
        groupContract: contract.group,
        effectiveDate: formatDateForStorage(contract.effectiveDate),
        endDate: formatDateForStorage(contract.endDate)
      });

      toast({
        title: "Contract Applied",
        description: `Group contract ${contract.group} has been applied to member information.`,
        duration: 5000,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Search Member</h2>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Member ID (HCID)</label>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <Input
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter HCID (e.g., H987654321)"
              className="w-48"
            />
            <Button 
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6"
            >
              Search
            </Button>
            <Button 
              onClick={handleClear}
              className="bg-orange-400 hover:bg-orange-500 text-white px-6"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Table Headers - Always visible */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-8 gap-4">
          <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
            Contract ID <span className="text-gray-400"></span>
          </div>
          <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
            Case/Entity <span className="text-gray-400"></span>
          </div>
          <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
            Group# <span className="text-gray-400"></span>
          </div>
          <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
            HCID# <span className="text-gray-400"></span>
          </div>
          <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
            Effective Date <span className="text-gray-400"></span>
          </div>
          <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
            End Date <span className="text-gray-400"></span>
          </div>
          <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
            Contract State <span className="text-gray-400"></span>
          </div>
          <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
            Action <span className="text-gray-400"></span>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {hasSearched && searchResults && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              {searchResults.contracts.map((contract, index) => (
                <div key={index} className="grid grid-cols-8 gap-4 py-2 text-sm border-b border-gray-100 last:border-b-0">
                  <div className="text-gray-900">{contract.contractId}</div>
                  <div className="text-gray-900">{contract.caseEntity}</div>
                  <div className="text-gray-900">{contract.group}</div>
                  <div className="text-gray-900">{contract.hcid}</div>
                  <div className="text-gray-900">{contract.effectiveDate}</div>
                  <div className="text-gray-900">{contract.endDate}</div>
                  <div className="text-gray-900">{contract.contractState}</div>
                  <div className="flex items-center">
                    <Button
                      size="sm"
                      onClick={() => handleApplyContract(contract)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <span className="text-xs text-gray-600">Rows: {searchResults.contracts.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {hasSearched && !searchResults && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-gray-500">
              No member found with ID: {memberId}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Member;