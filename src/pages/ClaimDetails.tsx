import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { ClaimsService, type Claim, type MemberInfo } from "@/services/claimsService";
import { useToast } from "@/hooks/use-toast";
import EventResolution from "@/components/EventResolution";
import MemberInformation from "@/components/MemberInformation";
import ProviderInformation from "@/components/ProviderInformation";
import PaymentInformation from "@/components/PaymentInformation";
import ClaimHeaderInformation from "@/components/ClaimHeaderInformation";
import ClaimLines from "@/components/ClaimLines";
import ClaimData from "@/components/ClaimData";
import SearchTabs from "@/components/SearchTabs";
import Glossary from "@/components/Glossary";
import Header from "@/components/Header";

const ClaimDetails = () => {
  const { dcn } = useParams<{ dcn: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [currentMemberInfo, setCurrentMemberInfo] = useState<MemberInfo | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [actionCode, setActionCode] = useState<string>('');
  const [filteredEdits, setFilteredEdits] = useState<string[]>([]);

  useEffect(() => {
    if (dcn) {
      ClaimsService.getClaimByClaimNumber(dcn).then(foundClaim => {
        setClaim(foundClaim);
        // Initialize filtered edits with all edits by default
        if (foundClaim) {
          setFilteredEdits(foundClaim.edits || []);
        }
        
        if (!foundClaim) {
          toast({
            title: "Claim not found",
            description: `No claim found with Claim Number: ${dcn}`,
            variant: "destructive",
          });
        }
      });
    }
  }, [dcn, toast]);

  const handleRefresh = async () => {
    if (!dcn) return;
    
    setIsRefreshing(true);
    
    // Simulate API delay
    setTimeout(() => {
      ClaimsService.refreshClaimData(dcn).then(refreshedClaim => {
        if (refreshedClaim) {
          setClaim(refreshedClaim);
          setRefreshKey(prev => prev + 1); // Force re-render of all child components
          toast({
            title: "Data refreshed",
            description: "Claim data has been updated with latest information.",
          });
        }
        setIsRefreshing(false);
      });
    }, 1000);
  };

  const getEditBadgeVariant = (edit: string) => {
    switch(edit) {
      case "507":
        return "destructive"; // Red for critical member info mismatch
      case "509": 
        return "destructive"; // Orange/warning for contract validation
      case "597":
        return "destructive"; // Red for no active eligibility
      default:
        return "secondary";
    }
  };

  const handleActionSubmit = () => {
    const actionValue = selectedAction as string;
    
    // Handle different scenarios based on Claim Number
    if (dcn === "25048AA1000") {
      // Scenario 1: Basic data validation
      if (actionValue === "pay") {
        // Validate scenario 1 - check if corrected member data matches expected claim form data from claim image
        const expectedClaimFormData = {
          firstName: "John",
          lastName: "Wick", 
          dob: "08/18/1982", // MM/DD/YYYY format matching claim image
          dobCompare: "1982-08-18", // Internal format for comparison
          subscriberId: "123456789" // Align with selected member data to allow validation
        };

        const currentMemberData = currentMemberInfo || claim?.memberInfo;
        
        if (!currentMemberData) {
          toast({
            title: "❌ DATA MISMATCH ERROR",
            description: "No member information available for validation. Please search and select the correct member first.",
            variant: "destructive",
            duration: 7000,
            className: "border-2 border-red-500 bg-red-50 text-red-900"
          });
          setSelectedAction("");
          return;
        }

        // Check if all required fields match between claim form and member information
        const fieldsMatch = 
          currentMemberData.firstName?.trim().toLowerCase() === expectedClaimFormData.firstName.toLowerCase() &&
          currentMemberData.lastName?.trim().toLowerCase() === expectedClaimFormData.lastName.toLowerCase() &&
          currentMemberData.dob === expectedClaimFormData.dobCompare &&
          currentMemberData.subscriberId === expectedClaimFormData.subscriberId;
        
        if (fieldsMatch) {
          navigate("/report", {
            state: {
              scenarioData: {
                scenarioNumber: "507",
                title: "Eligibility Partial Edit Resolution",
                description: "All data matches perfectly! Patient information verified successfully.",
                details: [
                  `Patient Name: ${expectedClaimFormData.firstName} ${expectedClaimFormData.lastName}`,
                  `Birth Date: ${expectedClaimFormData.dob}`,
                  `Subscriber ID: ${expectedClaimFormData.subscriberId}`
                ],
                steps: [
                  `Note patient details from Member Information.`,
                  `Compare claim details with original claim form.`,
                  `Search & Apply correct member if name mismatch found`,
                  `Add the Pay-S action code.`,
                ],
                table: [
                  {
                    "iteration": 1,
                    "stepsCompletion": ["🟢", "⚪", "🟢", "⚪"],
                    "totalStepsPassed": "2/4",
                    "timeTakenMin": 3,
                    "remarks": "Missed DOB and forgot Pay-S code"
                  },
                  {
                    "iteration": 2,
                    "stepsCompletion": ["🟢", "🟢", "🟢", "🟢"],
                    "totalStepsPassed": "4/4",
                    "timeTakenMin": 5,
                    "remarks": "All steps completed correctly"
                  }
                ]
              }
            }
          });
        } else {
          // Helper function to format date for display
          const formatDateForDisplay = (dateString: string): string => {
            if (!dateString) return '';
            try {
              const date = new Date(dateString);
              if (isNaN(date.getTime())) return dateString;
              
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              const year = date.getFullYear();
              
              return `${month}/${day}/${year}`;
            } catch (error) {
              return dateString;
            }
          };

          // Create detailed mismatch information with consistent date formatting
          const mismatches = [];
          if (currentMemberData.firstName?.trim().toLowerCase() !== expectedClaimFormData.firstName.toLowerCase()) {
            mismatches.push(`Patient Name (First): "${currentMemberData.firstName}" ≠ Claim Form: "${expectedClaimFormData.firstName}"`);
          }
          if (currentMemberData.lastName?.trim().toLowerCase() !== expectedClaimFormData.lastName.toLowerCase()) {
            mismatches.push(`Patient Name (Last): "${currentMemberData.lastName}" ≠ Claim Form: "${expectedClaimFormData.lastName}"`);
          }
          if (currentMemberData.dob !== expectedClaimFormData.dobCompare) {
            const memberDobDisplay = formatDateForDisplay(currentMemberData.dob || '');
            mismatches.push(`Patient Birth Date: "${memberDobDisplay}" ≠ Claim Form: "${expectedClaimFormData.dob}"`);
          }
          if (currentMemberData.subscriberId !== expectedClaimFormData.subscriberId) {
            mismatches.push(`Subscriber ID: "${currentMemberData.subscriberId}" ≠ Claim Form: "${expectedClaimFormData.subscriberId}"`);
          }
          
          toast({
            title: "❌ DATA MISMATCH ERROR - SCENARIO 1 FAIL",
            description: `Member information does not match claim form data. Mismatches: ${mismatches.join(", ")}. Please correct the member information.`,
            variant: "destructive",
            duration: 10000,
            className: "border-2 border-red-500 bg-red-50 text-red-900"
          });
        }
      } else {
        // toast({
        //   title: "Action Submitted",
        //   description: `Action "${actionValue}" has been submitted successfully.`,
        // });
        toast({
          title: "❌ ERROR - SCENARIO 1 FAIL",
          description: `507 Scenario Failed`,
          variant: "destructive",
          duration: 10000,
          className: "border-2 border-red-500 bg-red-50 text-red-900"
        });
      }
    } else if (dcn === "25048AA1001") {
      // Scenario 2: Contract validation (509 edit)
      if (actionValue === "pay") {
        const currentMemberData = currentMemberInfo || claim?.memberInfo;
        
        // Service dates from claim lines - should be "2023-08-04"
        const claimServiceDate = claim?.claimLines?.[0]?.serviceFromDate; // "2023-08-04"
        
        // Contract dates from member info - check for group "200000M001" which should have valid dates
        const contractEffectiveDate = currentMemberData?.effectiveDate;
        const contractEndDate = currentMemberData?.endDate;
        const appliedGroup = currentMemberData?.groupId;
        
        console.log("Scenario 509 validation:", {
          claimServiceDate,
          contractEffectiveDate,
          contractEndDate,
          appliedGroup
        });
        
        // Parse dates for comparison
        const parseDate = (dateStr: string): Date => {
          if (!dateStr) return new Date(0);
          
          // Handle MM/DD/YYYY format
          if (dateStr.includes('/')) {
            const [month, day, year] = dateStr.split('/');
            return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          }
          
          // Handle YYYY-MM-DD format
          return new Date(dateStr);
        };
        
        const serviceDate = parseDate(claimServiceDate || '');
        const effectiveDate = parseDate(contractEffectiveDate || '');
        const endDate = parseDate(contractEndDate || '');
        
        // Check if service date falls within contract period AND correct group is applied
        const isServiceDateValid = serviceDate >= effectiveDate && serviceDate <= endDate;
        const isCorrectGroupApplied = appliedGroup === "200000M001";
        
        if (isServiceDateValid && isCorrectGroupApplied) {
          navigate("/report", {
            state: {
              scenarioData: {
                scenarioNumber: "509",
                title: "Contract Validity Verification",
                description: "Service date falls within contract period and correct group applied. Payment can be processed!",
                details: [
                  `Service Date: ${claimServiceDate}`,
                  `Contract Period: ${contractEffectiveDate} to ${contractEndDate}`,
                  `Applied Group: ${appliedGroup}`
                ],
                steps: [
                  `Verify that the patient name and other information match.`,
                  `Verify if the group was active on the service date.`,
                  `Update group ID if the claim was filed under the wrong group.`,
                  `Add the Pay-S action code.`,
                ],
                table: [
                  {
                    "iteration": 1,
                    "stepsCompletion": ["⚪", "⚪", "🟢", "🟢"],
                    "totalStepsPassed": "2/4",
                    "timeTakenMin": 2,
                    "remarks": "Incorrect patient name"
                  },
                  {
                    "iteration": 2,
                    "stepsCompletion": ["🟢", "🟢", "🟢", "🟢"],
                    "totalStepsPassed": "4/4",
                    "timeTakenMin": 6,
                    "remarks": "All steps completed correctly"
                  }
                ]
              }
            }
          });
        } else if (!isCorrectGroupApplied) {
          toast({
            title: "❌ INCORRECT GROUP APPLIED - SCENARIO 509",
            description: `Please apply group "200000M001" from the Member tab. Current applied group: "${appliedGroup || 'None'}"`,
            variant: "destructive",
            duration: 12000,
            className: "border-2 border-red-500 bg-red-50 text-red-900"
          });
        } else {
          toast({
            title: "❌ CONTRACT DATE ERROR - SCENARIO 509",
            description: `Service date ${claimServiceDate} falls outside contract period (${contractEffectiveDate} to ${contractEndDate}). Please apply the correct group/contract from Member tab.`,
            variant: "destructive",
            duration: 12000,
            className: "border-2 border-red-500 bg-red-50 text-red-900"
          });
        }
      } else {
        // toast({
        //   title: "Action Submitted",
        //   description: `Action "${actionValue}" has been submitted successfully.`,
        // });
        toast({
          title: "❌ CONTRACT DATE ERROR - SCENARIO 509",
          description: `509 Scenario Failed`,
          variant: "destructive",
          duration: 10000,
          className: "border-2 border-red-500 bg-red-50 text-red-900"
        });
      }
    } else if (dcn === "25048AA1002") {
      // Scenario 3: 597 SOFT EDIT - Service date outside contract period validation
      const currentMemberData = currentMemberInfo || claim?.memberInfo;
      const claimServiceDate = claim?.claimLines?.[0]?.serviceFromDate; // Should be "2024-04-04"
      const contractEffectiveDate = currentMemberData?.effectiveDate; // "01/01/2023"
      const contractEndDate = currentMemberData?.endDate; // "01/01/2024"
      
      // Parse dates for comparison
      const parseDate = (dateStr: string): Date => {
        if (!dateStr) return new Date('1900-01-01');
        
        // Handle MM/DD/YYYY format (from contract data)
        if (dateStr.includes('/') && dateStr.split('/')[2]?.length === 4) {
          const [month, day, year] = dateStr.split('/');
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }
        
        // Handle YYYY-MM-DD format (from claim lines)
        return new Date(dateStr);
      };
      
      const serviceDate = parseDate(claimServiceDate || '');
      const effectiveDate = parseDate(contractEffectiveDate || '');
      const endDate = parseDate(contractEndDate || '');
      
      // Check if service date falls OUTSIDE contract period (this is expected for 597)
      const isServiceDateOutsideContract = serviceDate < effectiveDate || serviceDate > endDate;
      
      if (actionValue === "deny" && isServiceDateOutsideContract) {
        // Correct action for scenario 597 - DENY when service date is outside contract
        navigate("/report", {
          state: {
            scenarioData: {
              scenarioNumber: "597",
              title: "No Active Eligibility Verification",
              description: "Service date is outside contract period. Claim correctly DENIED for no active eligibility.",
              details: [
                `Service Date: ${claimServiceDate}`,
                `Contract Period: ${contractEffectiveDate} to ${contractEndDate}`,
                `Action Taken: DENY`
              ],
              steps: [
                `Verify member details and service dates in Member Information.`,
                `Check eligibility history for any coverage gaps.`,
                `Confirm if no active coverage exists for the billed period.`,
                `Add the Deny-X action code.`,
                `Reject the claim if coverage is not active.`
              ],
              table: [
                {
                  "iteration": 1,
                  "stepsCompletion": ["⚪", "⚪", "⚪", "⚪", "🟢"],
                  "totalStepsPassed": "1/5",
                  "timeTakenMin": 3,
                  "remarks": "Wrong service date"
                },
                {
                  "iteration": 2,
                  "stepsCompletion": ["🟢", "🟢", "🟢", "🟢", "🟢"],
                  "totalStepsPassed": "5/5",
                  "timeTakenMin": 4,
                  "remarks": "All steps completed correctly"
                }
              ]
            }
          }
        });
      } else if (actionValue === "pay" && isServiceDateOutsideContract) {
        // Wrong action for scenario 597 - trying to PAY when should DENY
        toast({
          title: "❌ INCORRECT ACTION - SCENARIO 597",
          description: `Service date ${claimServiceDate} is outside contract period (${contractEffectiveDate} to ${contractEndDate}). No active eligibility - must DENY claim.`,
          variant: "destructive",
          duration: 12000,
          className: "border-2 border-red-500 bg-red-50 text-red-900"
        });
      } else {
        // Any other incorrect actions
        toast({
          title: "❌ VALIDATION ERROR - SCENARIO 597",
          description: `For scenario 597, service date ${claimServiceDate} is outside active contract period. Please select DENY action.`,
          variant: "destructive",
          duration: 12000,
          className: "border-2 border-red-500 bg-red-50 text-red-900"
        });
      }
    } else {
      toast({
        title: "Action Submitted",
        description: `Action "${actionValue}" has been submitted successfully.`,
      });
    }
    setSelectedAction("");
  };
  const handleActionCodeChange = (newActionCode: string) => {
    setActionCode(newActionCode);
    if (claim) {
      setClaim({ ...claim, actionCode: newActionCode });
    }
    toast({
      title: "Action Code Updated",
      description: `Action code changed to: ${newActionCode === 'S' ? 'S - Pay' : 'X - Deny'}`,
    });
  };

  const handleContractApply = (contractData: {
    groupId: string;
    groupContract: string;
    effectiveDate: string;
    endDate: string;
  }) => {
    // Get the current member information (fallback to claim.memberInfo if currentMemberInfo is null)
    const existingMemberInfo = currentMemberInfo || claim?.memberInfo;
    
    if (!existingMemberInfo) {
      console.error("No existing member info found to preserve");
      return;
    }
    
    // For scenario 509, preserve ALL existing member data and only update the group/contract fields
    const updatedMemberInfo = {
      ...existingMemberInfo, // Preserve ALL existing fields (patient, subscriber, etc.)
      // Only update the specific group/contract fields
      groupId: contractData.groupId,
      groupContract: contractData.groupContract,
      effectiveDate: contractData.effectiveDate,
      endDate: contractData.endDate,
      // Update related group fields consistently
      groupName: contractData.groupId === "200000M001" ? "Health Plan Group 2023" : 
                 contractData.groupId === "200000A001" ? "Tech Solutions Inc" : existingMemberInfo.groupName,
      detailContractCode: contractData.groupContract || contractData.groupId
    };
    
    setCurrentMemberInfo(updatedMemberInfo);
    
    // Update claim data while preserving all other claim fields
    if (claim) {
      setClaim(prev => prev ? { 
        ...prev, 
        memberInfo: updatedMemberInfo 
      } : null);
    }
    
    // Check if this is scenario 509 and if the correct group is selected
    if (dcn === "25048AA1001" && claim) {
      const isCorrectGroup = contractData.groupId === "200000M001";
      
      if (isCorrectGroup) {
        // Remove 509 edit from filteredEdits but keep all other edits
        const newFilteredEdits = (claim.edits || []).filter(edit => edit !== "509");
        setFilteredEdits(newFilteredEdits);
        
        console.log("509 scenario: Correct group selected, removing 509", {
          original: claim.edits,
          filtered: newFilteredEdits,
          selectedGroup: contractData.groupId
        });
      } else {
        // Wrong group selected, keep all edits including 509
        setFilteredEdits(claim.edits || []);
        
        console.log("509 scenario: Wrong group selected, keeping 509", {
          selectedGroup: contractData.groupId,
          expectedGroup: "200000M001"
        });
      }
    }
    
    console.log("Contract applied - Preserved all fields, updated only group info:", {
      original: existingMemberInfo,
      updated: updatedMemberInfo
    });
  };

  const handleMemberUpdate = (updatedMember: MemberInfo) => {
    setCurrentMemberInfo(updatedMember);
    if (claim) {
      setClaim(prev => prev ? { ...prev, memberInfo: updatedMember } : null);
    }

    // Check if this is scenario 507 and if the selected member matches claim image data
    if (dcn === "25048AA1000" && claim?.searchData?.claimImage) {
      const claimImageData = claim.searchData.claimImage;
      
      // For 507 scenario, check if the selected member matches the claim image exactly
      const isCorrectMember = 
        updatedMember.firstName?.trim().toLowerCase() === "john" &&
        updatedMember.lastName?.trim().toLowerCase() === "wick" &&
        updatedMember.dob === "1982-08-18" &&
        updatedMember.subscriberId === "123456789";
      
      if (isCorrectMember) {
        // Remove 507 edit from filteredEdits but keep all other edits
        const newFilteredEdits = (claim.edits || []).filter(edit => edit !== "507");
        setFilteredEdits(newFilteredEdits);
        
        console.log("507 scenario: Correct member selected, removing 507", {
          original: claim.edits,
          filtered: newFilteredEdits
        });
      } else {
        // Wrong member selected or no member, keep all edits including 507
        setFilteredEdits(claim.edits || []);
        
        console.log("507 scenario: Wrong member selected, keeping 507", {
          selected: updatedMember,
          expected: claimImageData
        });
      }
    }
  };

  if (!claim) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/search")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground text-lg">Claim not found</div>
              <div className="text-muted-foreground text-sm mt-2">
                The requested claim could not be located.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="flex-1 p-4 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/search")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Claims Simulator</h1>
        </div>

        {/* Claim Header Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Main header row */}
            <div className="flex items-center gap-6">
              {/* Claim Number Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                <div className="text-xs text-blue-600 font-medium mb-1">Claim Number</div>
                <div className="font-bold text-sm text-blue-900">{claim.dcn}</div>
              </div>
              
              {/* Edits Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                <span className="text-xs text-blue-600 font-medium mb-1">Edits</span>
                 <div className="flex gap-1">
                   {filteredEdits.map((edit) => (
                     <Badge 
                       key={edit} 
                       className={`text-xs px-2 py-1 font-medium rounded ${
                         edit === "507" 
                           ? "bg-red-100 text-red-800 border-red-200" 
                           : edit === "509"
                           ? "bg-red-100 text-red-800 border-red-200"
                           : edit === "597"
                           ? "bg-red-100 text-red-800 border-red-200"
                           : "bg-blue-100 text-blue-800 border-blue-200"
                       }`}
                     >
                       {edit}
                     </Badge>
                   ))}
                 </div>
              </div>

              {/* Financial Information */}
              <div className="flex items-center gap-6 ml-auto">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xs text-blue-600 font-medium">Billed</div>
                    <div className="font-bold text-sm">${claim.billed}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-blue-600 font-medium">Claim Allowed</div>
                    <div className="font-bold text-sm">{claim.allowed}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-blue-600 font-medium">Paid</div>
                    <div className="font-bold text-sm">${claim.paid}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-blue-600 font-medium">Action Code</div>
                    <div className="font-bold text-sm">{claim.actionCode || '-'}</div>
                  </div>
                </div>

                {/* Action Section */}
                <div className="bg-red-100 border border-red-200 rounded-2xl px-4 py-2">
                  <span className="text-xs text-blue-600 font-medium mb-1">Action</span>
                  <div className="flex items-center gap-2">
                    <Select value={selectedAction} onValueChange={setSelectedAction}>
                      <SelectTrigger className="w-32 h-8 text-xs bg-white border-gray-300 hover:bg-gray-50">
                        <SelectValue placeholder="Find items" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                        <SelectItem value="pay">Pay</SelectItem>
                        <SelectItem value="deny">Deny</SelectItem>
                        {/* <SelectItem value="pend">Pend</SelectItem>
                        <SelectItem value="route">Route</SelectItem> */}
                      </SelectContent>
                    </Select>
                    {selectedAction && (
                      <Button
                        size="sm"
                        onClick={handleActionSubmit}
                        className="h-8 px-3 text-xs bg-green-600 hover:bg-green-700"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </div>

                {/* Refresh Button */}
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button> */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="event-resolution" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
                <TabsTrigger value="event-resolution" className="text-xs md:text-sm data-[state=active]:bg-white">
                  Event Resolution
                </TabsTrigger>
                <TabsTrigger value="member-info" className="text-xs md:text-sm data-[state=active]:bg-white">
                  Member Info
                </TabsTrigger>
                <TabsTrigger value="provider-info" className="text-xs md:text-sm data-[state=active]:bg-white">
                  Provider Info
                </TabsTrigger>
                <TabsTrigger value="payment-info" className="text-xs md:text-sm data-[state=active]:bg-white">
                  Payment Info
                </TabsTrigger>
                <TabsTrigger value="claim-header" className="text-xs md:text-sm data-[state=active]:bg-white">
                  Claim Header
                </TabsTrigger>
                <TabsTrigger value="claim-lines" className="text-xs md:text-sm data-[state=active]:bg-white">
                  Claim Lines
                </TabsTrigger>
                <TabsTrigger value="claim-data" className="text-xs md:text-sm data-[state=active]:bg-white">
                  Claim Data
                </TabsTrigger>
                <TabsTrigger value="search" className="text-xs md:text-sm data-[state=active]:bg-white">
                  Search
                </TabsTrigger>
              </TabsList>

              <TabsContent value="event-resolution">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Event Resolution</h3>
                    <EventResolution edits={filteredEdits} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="member-info">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Member Information</h3>
                    {claim.memberInfo ? (
                      <MemberInformation 
                        memberInfo={currentMemberInfo || claim.memberInfo}
                        onMemberUpdate={handleMemberUpdate}
                      />
                    ) : (
                      <div className="text-muted-foreground">No member information available.</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="provider-info">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Provider Information</h3>
                    {claim.providerInfo ? (
                      <ProviderInformation providerInfo={claim.providerInfo} />
                    ) : (
                      <div className="text-muted-foreground">No provider information available.</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment-info">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                    {claim.paymentInfo ? (
                      <PaymentInformation paymentInfo={claim.paymentInfo} />
                    ) : (
                      <div className="text-muted-foreground">No payment information available.</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="claim-header">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Claim Header</h3>
                    {claim.claimHeaderInfo ? (
                      <ClaimHeaderInformation claimHeaderInfo={claim.claimHeaderInfo} />
                    ) : (
                      <div className="text-muted-foreground">No claim header information available.</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="claim-lines">
                <ClaimLines key={`lines-${refreshKey}`} claimLines={claim.claimLines} />
              </TabsContent>

              <TabsContent value="claim-data">
                <ClaimData 
                  key={`data-${refreshKey}`} 
                  claimData={claim.claimData} 
                  onActionCodeChange={handleActionCodeChange}
                />
              </TabsContent>

              <TabsContent value="search">
                <SearchTabs 
                  searchData={claim.searchData} 
                  onContractApply={handleContractApply}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

        {/* Right Sidebar - Navigator */}
        <Glossary />
      </div>
    </div>
  );
};

export default ClaimDetails;