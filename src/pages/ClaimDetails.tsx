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

const ClaimDetails = () => {
  const { dcn } = useParams<{ dcn: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [currentMemberInfo, setCurrentMemberInfo] = useState<MemberInfo | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (dcn) {
      ClaimsService.getClaimByDCN(dcn).then(foundClaim => {
        setClaim(foundClaim);
        
        if (!foundClaim) {
          toast({
            title: "Claim not found",
            description: `No claim found with DCN: ${dcn}`,
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
    return edit === "507" ? "destructive" : "secondary";
  };

  const handleActionSubmit = () => {
    // Scenario 1: Basic data validation
    if (selectedAction === "pay" && dcn === "25048AA1000") {
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
        toast({
          title: "🎉 VALIDATION SUCCESS - SCENARIO 1 PASS",
          description: `✅ All data matches perfectly!\n• Patient Name: ${expectedClaimFormData.firstName} ${expectedClaimFormData.lastName}\n• Birth Date: ${expectedClaimFormData.dob}\n• Subscriber ID: ${expectedClaimFormData.subscriberId}`,
          duration: 8000,
          className: "border-2 border-green-500 bg-green-50 text-green-900"
        });
        setTimeout(() => navigate("/search"), 1500);
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
    } 
    // Scenario 2: Contract validation
    else if (selectedAction === "pay" && dcn === "25048AA1001") {
      const currentMemberData = currentMemberInfo || claim?.memberInfo;
      
      if (!currentMemberData) {
        toast({
          title: "❌ DATA VALIDATION ERROR",
          description: "No member information available for validation. Please search and select the correct member first.",
          variant: "destructive",
          duration: 7000,
          className: "border-2 border-red-500 bg-red-50 text-red-900"
        });
        setSelectedAction("");
        return;
      }

      // Get service dates from claim lines for validation
      const serviceDateFrom = claim?.claimLines?.[0]?.serviceFromDate; // Should be "2023-08-04"
      const serviceDateTo = claim?.claimLines?.[0]?.serviceToDate; // Should be "2023-08-04"
      
      if (!serviceDateFrom || !serviceDateTo) {
        toast({
          title: "❌ SERVICE DATE ERROR",
          description: "Service dates not found in claim lines. Cannot validate contract coverage.",
          variant: "destructive",
          duration: 7000,
          className: "border-2 border-red-500 bg-red-50 text-red-900"
        });
        setSelectedAction("");
        return;
      }

      // Helper function to format date for display (MM/DD/YYYY)
      const formatDateForValidationDisplay = (dateString: string): string => {
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

      // Check if contract dates are available and if they're expired
      const effectiveDate = currentMemberData.effectiveDate;
      const endDate = currentMemberData.endDate;
      
      if (!effectiveDate || !endDate) {
        toast({
          title: "❌ CONTRACT VALIDATION ERROR - SCENARIO 2 FAIL",
          description: `Group information is incorrect. Current Group# ${currentMemberData.groupId || currentMemberData.groupContract} has expired contract dates. Please search by HCID "${currentMemberData.hcid}" in Member tab under Search to find the correct active contract.`,
          variant: "destructive",
          duration: 12000,
          className: "border-2 border-red-500 bg-red-50 text-red-900"
        });
        setSelectedAction("");
        return;
      }

      // Check if current contract is expired even if dates exist
      const currentDate = new Date();
      const contractEndDate = new Date(endDate);
      
      if (contractEndDate < currentDate) {
        toast({
          title: "❌ CONTRACT VALIDATION ERROR - SCENARIO 2 FAIL",
          description: `Group information is incorrect. Current Group# ${currentMemberData.groupId || currentMemberData.groupContract} has expired contract (ended ${formatDateForValidationDisplay(endDate)}). Please search by HCID "${currentMemberData.hcid}" in Member tab under Search to find the correct active contract.`,
          variant: "destructive",
          duration: 12000,
          className: "border-2 border-red-500 bg-red-50 text-red-900"
        });
        setSelectedAction("");
        return;
      }

      // Validate service dates fall within contract period
      const serviceDate = new Date(serviceDateFrom);
      const contractStart = new Date(effectiveDate);
      const contractEnd = new Date(endDate);

      const isServiceDateValid = serviceDate >= contractStart && serviceDate <= contractEnd;
      
      if (isServiceDateValid) {
        toast({
          title: "🎉 VALIDATION SUCCESS - SCENARIO 2 PASS",
          description: `✅ Contract validation successful!\n• Service Date: ${formatDateForValidationDisplay(serviceDateFrom)}\n• Contract Period: ${formatDateForValidationDisplay(effectiveDate)} to ${formatDateForValidationDisplay(endDate)}\n• Group#: ${currentMemberData.groupId}`,
          duration: 8000,
          className: "border-2 border-green-500 bg-green-50 text-green-900"
        });
        setTimeout(() => navigate("/search"), 1500);
      } else {
        toast({
          title: "❌ CONTRACT VALIDATION ERROR - SCENARIO 2 FAIL",
          description: `Service date ${formatDateForValidationDisplay(serviceDateFrom)} falls outside contract period ${formatDateForValidationDisplay(effectiveDate)} to ${formatDateForValidationDisplay(endDate)}. Please select the correct active contract for Group# ${currentMemberData.groupId}.`,
          variant: "destructive",
          duration: 10000,
          className: "border-2 border-red-500 bg-red-50 text-red-900"
        });
      }
    } else {
      toast({
        title: "Action Submitted",
        description: `Action "${selectedAction}" has been submitted successfully.`,
      });
    }
    setSelectedAction("");
  };

  const handleContractApply = (contractData: {
    groupId: string;
    groupContract: string;
    effectiveDate: string;
    endDate: string;
  }) => {
    // Update the current member info with the new contract data
    const updatedMemberInfo = {
      ...currentMemberInfo,
      groupId: contractData.groupId,
      groupContract: contractData.groupContract,
      effectiveDate: contractData.effectiveDate,
      endDate: contractData.endDate
    };
    
    setCurrentMemberInfo(updatedMemberInfo);
    
    // Also update the claim data
    if (claim) {
      setClaim(prev => prev ? { 
        ...prev, 
        memberInfo: updatedMemberInfo 
      } : null);
    }
  };

  const handleMemberUpdate = (updatedMember: MemberInfo) => {
    setCurrentMemberInfo(updatedMember);
    if (claim) {
      setClaim(prev => prev ? { ...prev, memberInfo: updatedMember } : null);
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
              Back to Search
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
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/search")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Claims Simulator</h1>
        </div>

        {/* Claim Header Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Main header row */}
            <div className="flex items-center gap-6">
              {/* DCN Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                <div className="text-xs text-blue-600 font-medium mb-1">DCN</div>
                <div className="font-bold text-sm text-blue-900">{claim.dcn}</div>
              </div>
              
              {/* Edits Section */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                <span className="text-xs text-blue-600 font-medium mb-1">Edits</span>
                <div className="flex gap-1">
                  {claim.edits.map((edit) => (
                    <Badge 
                      key={edit} 
                      className={`text-xs px-2 py-1 font-medium rounded ${
                        edit === "507" 
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="event-resolution" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
                <TabsTrigger value="event-resolution" className="text-xs md:text-sm">
                  Event Resolution
                </TabsTrigger>
                <TabsTrigger value="member-info" className="text-xs md:text-sm">
                  Member Information
                </TabsTrigger>
                <TabsTrigger value="provider-info" className="text-xs md:text-sm">
                  Provider Information
                </TabsTrigger>
                <TabsTrigger value="payment-info" className="text-xs md:text-sm">
                  Payment Information
                </TabsTrigger>
                <TabsTrigger value="claim-header" className="text-xs md:text-sm">
                  Claim Header
                </TabsTrigger>
                <TabsTrigger value="claim-lines" className="text-xs md:text-sm">
                  Claim Lines
                </TabsTrigger>
                <TabsTrigger value="claim-data" className="text-xs md:text-sm">
                  Claim Data
                </TabsTrigger>
                <TabsTrigger value="search" className="text-xs md:text-sm">
                  Search
                </TabsTrigger>
              </TabsList>

              <TabsContent value="event-resolution">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Event Resolution</h3>
                    <EventResolution edits={claim.edits} />
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
                <ClaimData key={`data-${refreshKey}`} claimData={claim.claimData} />
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
    </div>
  );
};

export default ClaimDetails;