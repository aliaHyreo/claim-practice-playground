import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ArrowLeft, Copy, FileText } from "lucide-react";
import { ClaimsService, type Claim } from "@/services/claimsService";
import { useToast } from "@/hooks/use-toast";
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,} from "@/components/ui/tooltip";
import Glossary from "@/components/Glossary";

const SearchClaims = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [claims, setClaims] = useState<Claim[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const copyToClipboard = async (dcn: string) => {
    try {
      await navigator.clipboard.writeText(dcn);
      toast({
        title: "Copied!",
        description: `Claim Number ${dcn} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleSearch = async () => {
    if (searchTerm.length > 0) {
    const results = await ClaimsService.searchClaims(searchTerm);
    setClaims(results);
    setHasSearched(true);
    }
  };

  const handleClear = async () => {
    setClaims([]);
    setHasSearched(false);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <div className="flex-1 flex gap-0 overflow-hidden w-full px-4">
        {/* Left Sidebar - Scenarios */}
        <div className="flex flex-col w-full pt-4">
          <div className="w-full">
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <h1 className="text-3xl font-bold text-foreground">Search Claims</h1>
              </div>
          </div>
          <div className="flex w-full py-4">
            <aside className="w-56 flex-shrink-0 pr-2">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Scenarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <span className="text-muted-foreground font-medium">507</span>
                            <span className="text-muted-foreground">-</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard("25048AA1000")}
                              className="h-auto p-1 text-primary hover:text-primary/80 font-mono flex-1 justify-start"
                            >
                              25048AA1000
                              <Copy className="w-3 h-3 " />
                            </Button>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-white border border-neutral-700">
                          <p>Eligibility found is partial</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <span className="text-muted-foreground font-medium">509</span>
                            <span className="text-muted-foreground">-</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard("25048AA1001")}
                              className="h-auto p-1 text-primary hover:text-primary/80 font-mono flex-1 justify-start"
                            >
                              25048AA1001
                              <Copy className="w-3 h-3 " />
                            </Button>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-white border border-neutral-700">
                          <p>Contract not in effect for group/member</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <span className="text-muted-foreground font-medium">597</span>
                            <span className="text-muted-foreground">-</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard("25048AA1002")}
                              className="h-auto p-1 text-primary hover:text-primary/80 font-mono flex-1 justify-start"
                            >
                              25048AA1002
                              <Copy className="w-3 h-3 " />
                            </Button>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-white border border-neutral-700">
                          <p>No active eligibility for service dates</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("/SOP_s_for_Professional_claims_Eligibilty_edits.pdf", "_blank")}
                      className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      SOP Guidelines
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Center - Main Content */}
            <main className="flex-1 min-w-0 pl-2 pr-4 overflow-y-auto">

              {/* Search Section */}
              <Card className="mb-6">
                <CardContent>
                  <div className="flex gap-4 pt-6">
                    <Input
                      placeholder="Enter Claim Number"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="rounded-xl"
                    />
                    <Button 
                      onClick={handleSearch}
                      className="bg-primary hover:bg-healthcare-blue-dark px-6 rounded-xl whitespace-nowrap"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button 
                      onClick={handleClear}
                      className="bg-red-400 hover:bg-red-500 px-6 rounded-xl whitespace-nowrap"
                    >
                      {/* <Search className="w-4 h-4 mr-2" /> */}
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              {hasSearched && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Search Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {claims.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-muted-foreground text-lg">No claim found.</div>
                        <div className="text-muted-foreground text-sm mt-2">
                          Try a different Claim Number or check your search criteria.
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              <TableHead className="font-semibold">Title</TableHead>
                              <TableHead className="font-semibold">Last name</TableHead>
                              <TableHead className="font-semibold">DOB</TableHead>
                              <TableHead className="font-semibold">Sex</TableHead>
                              <TableHead className="font-semibold">Member code</TableHead>
                              <TableHead className="font-semibold">Contract type</TableHead>
                              <TableHead className="font-semibold">Relationship</TableHead>
                              <TableHead className="font-semibold">PCP</TableHead>
                              <TableHead className="font-semibold">ERISA</TableHead>
                              <TableHead className="font-semibold text-center">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {claims.map((claim) => (
                              <TableRow 
                                key={claim.dcn}
                                className="hover:bg-muted/30 transition-colors"
                              >
                                <TableCell className="font-medium">{claim.title}</TableCell>
                                <TableCell>{claim.lastName}</TableCell>
                                <TableCell>{claim.dob}</TableCell>
                                <TableCell>{claim.sex}</TableCell>
                                <TableCell>{claim.memberCode}</TableCell>
                                <TableCell>{claim.contractType}</TableCell>
                                <TableCell>{claim.relationship}</TableCell>
                                <TableCell>{claim.pcp}</TableCell>
                                <TableCell>{claim.erisa}</TableCell>
                                <TableCell className="text-center">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/claim/${claim.dcn}`)}
                                    className="text-primary border-primary hover:bg-primary hover:text-primary-foreground rounded-lg"
                                  >
                                    Open
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </main>
          </div>
        </div>

        {/* Right Sidebar - Navigator */}
        <Glossary />
      </div>
    </div>
  );
};

export default SearchClaims;