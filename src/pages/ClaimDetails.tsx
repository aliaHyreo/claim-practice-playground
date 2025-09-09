import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { ClaimsService, type Claim } from "@/services/claimsService";
import { useToast } from "@/hooks/use-toast";
import EventResolution from "@/components/EventResolution";
import MemberInformation from "@/components/MemberInformation";
import ProviderInformation from "@/components/ProviderInformation";

const ClaimDetails = () => {
  const { dcn } = useParams<{ dcn: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (dcn) {
      const foundClaim = ClaimsService.getClaimByDCN(dcn);
      setClaim(foundClaim);
      
      if (!foundClaim) {
        toast({
          title: "Claim not found",
          description: `No claim found with DCN: ${dcn}`,
          variant: "destructive",
        });
      }
    }
  }, [dcn, toast]);

  const handleRefresh = async () => {
    if (!dcn) return;
    
    setIsRefreshing(true);
    
    // Simulate API delay
    setTimeout(() => {
      const refreshedClaim = ClaimsService.refreshClaimData(dcn);
      if (refreshedClaim) {
        setClaim(refreshedClaim);
        toast({
          title: "Data refreshed",
          description: "Claim data has been updated with latest information.",
        });
      }
      setIsRefreshing(false);
    }, 1000);
  };

  const getEditBadgeVariant = (edit: string) => {
    return edit === "507" ? "destructive" : "secondary";
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
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">DCN</span>
                <span className="font-bold text-lg">{claim.dcn}</span>
              </div>
              
              {/* Edits badges */}
              <div className="flex flex-wrap gap-1">
                {claim.edits.map((edit) => (
                  <Badge 
                    key={edit} 
                    variant={getEditBadgeVariant(edit)}
                    className="text-xs px-2 py-1"
                  >
                    {edit}
                  </Badge>
                ))}
              </div>
              
              <div className="ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="rounded-lg"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Financial info row */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Billed</span>
                <div className="font-semibold">${claim.billed}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Claim Allowed</span>
                <div className="font-semibold">${claim.allowed}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Paid</span>
                <div className="font-semibold">${claim.paid}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Action Code</span>
                <div className="font-semibold">{claim.actionCode || '-'}</div>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Action</span>
                <div className="font-semibold">
                  <Button variant="link" className="h-auto p-0 text-primary">
                    Find items
                  </Button>
                </div>
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
                      <MemberInformation memberInfo={claim.memberInfo} />
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

              {[
                { value: "payment-info", title: "Payment Information" },
                { value: "claim-header", title: "Claim Header" },
                { value: "claim-lines", title: "Claim Lines" },
                { value: "claim-data", title: "Claim Data" },
                { value: "search", title: "Search" },
              ].map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">{tab.title}</h3>
                      <div className="text-muted-foreground">
                        Tab content will be added later. This is a placeholder for the {tab.title.toLowerCase()} functionality.
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClaimDetails;