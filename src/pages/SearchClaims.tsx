import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ArrowLeft } from "lucide-react";
import { ClaimsService, type Claim } from "@/services/claimsService";

const SearchClaims = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [claims, setClaims] = useState<Claim[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    const results = await ClaimsService.searchClaims(searchTerm);
    setClaims(results);
    setHasSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
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

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">DCN Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 max-w-md">
              <Input
                placeholder="Enter DCN number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="rounded-xl"
              />
              <Button 
                onClick={handleSearch}
                className="bg-primary hover:bg-healthcare-blue-dark px-6 rounded-xl"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Search Results {claims.length > 0 && `(${claims.length})`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {claims.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground text-lg">No claim found.</div>
                  <div className="text-muted-foreground text-sm mt-2">
                    Try a different DCN number or check your search criteria.
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
                              Open Claim Detail
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
      </div>
    </div>
  );
};

export default SearchClaims;