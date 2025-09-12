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
    if (selectedAction === "Pay" && dcn === "25048AA1000") {
      // Validate scenario 1 - check if corrected member data matches expected claim form data
      const expectedData = {
        firstName: "John",
        lastName: "Wick", 
        dob: "1964-09-02",
        subscriberId: "WIC64090200"
      };

      const currentData = currentMemberInfo || claim?.memberInfo;
      
      if (currentData && 
          currentData.firstName === expectedData.firstName &&
          currentData.lastName === expectedData.lastName &&
          currentData.dob === expectedData.dob &&
          currentData.subscriberId === expectedData.subscriberId) {
        
        toast({
          title: "✅ Scenario 1 - PASS",
          description: "Member information has been successfully corrected and matches the claim form data!",
          duration: 5000,
        });
      } else {
        toast({
          title: "❌ Scenario 1 - FAIL", 
          description: "Member information does not match the expected claim form data. Please verify the member details.",
          variant: "destructive",
          duration: 5000,
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
                        <SelectItem value="pend">Pend</SelectItem>
                        <SelectItem value="route">Route</SelectItem>
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
                        key={`member-${refreshKey}`} 
                        memberInfo={claim.memberInfo}
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
                <SearchTabs key={`search-${refreshKey}`} searchData={claim.searchData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClaimDetails;