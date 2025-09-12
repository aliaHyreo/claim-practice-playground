import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  type MemberInfo, 
  type MemberSearchResult, 
  searchMembers, 
  getMemberById 
} from "@/services/claimsService";

// Utility functions for date format conversion
// Utility function to format date for display (MM/DD/YYYY)
const formatDateToDisplay = (dateString: string): string => {
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

// Utility function to format date for input field (YYYY-MM-DD)
const formatDateForInput = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    // Handle MM/DD/YYYY format
    if (dateString.includes('/')) {
      const [month, day, year] = dateString.split('/');
      if (month && day && year) {
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }
    
    // Handle YYYY-MM-DD format (already correct)
    if (dateString.includes('-') && dateString.length === 10) {
      return dateString;
    }
    
    // Handle other formats
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    return '';
  }
};

interface MemberInformationProps {
  memberInfo: MemberInfo;
  onMemberUpdate?: (updatedMember: MemberInfo) => void;
}

const MemberInformation = ({ memberInfo, onMemberUpdate }: MemberInformationProps) => {
  const [formData, setFormData] = useState(memberInfo);
  const [searchData, setSearchData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    subscriberId: ''
  });
  const [searchResults, setSearchResults] = useState<MemberSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof MemberInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearchChange = (field: string, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    if (!searchData.firstName && !searchData.lastName && !searchData.dob && !searchData.subscriberId) {
      toast({
        title: "Search Error",
        description: "Please enter at least one search criteria",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchMembers(searchData);
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "No Results",
          description: "No members found matching the search criteria",
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${results.length} member(s)`,
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to search members. Please try again.",
        variant: "destructive",
      });
    }
    setIsSearching(false);
  };

  const handleSelectMember = async (memberResult: MemberSearchResult) => {
    try {
      const fullMemberInfo = await getMemberById(memberResult.id);
      if (fullMemberInfo) {
        setFormData(fullMemberInfo);
        onMemberUpdate?.(fullMemberInfo);
        setSearchResults([]);
        toast({
          title: "Member Selected",
          description: `Selected ${memberResult.firstName} ${memberResult.lastName}`,
        });
      }
    } catch (error) {
      console.error('Error selecting member:', error);
      toast({
        title: "Selection Error",
        description: "Failed to load member details. Please try again.",
        variant: "destructive",
      });
    }
  };

  const EditableField = ({ label, field, readonly = false }: { label: string; field: keyof MemberInfo; readonly?: boolean }) => (
    <div className="space-y-2">
      <Label htmlFor={field} className="text-sm text-muted-foreground">
        {label}
      </Label>
      <Input
        id={field}
        type={field === 'dob' ? 'date' : 'text'}
        value={field === 'dob' ? formatDateForInput(formData[field] || '') : (formData[field] || '')}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={`h-10 ${readonly ? 'focus:ring-0 focus:ring-offset-0 focus:border-input cursor-default' : ''}`}
        readOnly={readonly}
        tabIndex={readonly ? -1 : 0}
        placeholder={field === 'dob' ? 'MM/DD/YYYY' : undefined}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-primary bg-primary/10 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">
            Search Member
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="searchFirstName" className="text-sm text-muted-foreground">
                First Name
              </Label>
              <Input
                id="searchFirstName"
                value={searchData.firstName}
                onChange={(e) => handleSearchChange('firstName', e.target.value)}
                placeholder="Enter first name"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="searchLastName" className="text-sm text-muted-foreground">
                Last Name
              </Label>
              <Input
                id="searchLastName"
                value={searchData.lastName}
                onChange={(e) => handleSearchChange('lastName', e.target.value)}
                placeholder="Enter last name"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="searchDob" className="text-sm text-muted-foreground">
                DOB
              </Label>
              <Input
                id="searchDob"
                type="date"
                value={formatDateForInput(searchData.dob)}
                onChange={(e) => handleSearchChange('dob', e.target.value)}
                className="h-10"
                placeholder="MM/DD/YYYY"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="searchSubscriberId" className="text-sm text-muted-foreground">
                Subscriber ID
              </Label>
              <Input
                id="searchSubscriberId"
                value={searchData.subscriberId}
                onChange={(e) => handleSearchChange('subscriberId', e.target.value)}
                placeholder="Enter subscriber ID"
                className="h-10"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSearch} disabled={isSearching} className="w-32">
              <Search className="mr-2 h-4 w-4" />
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Search Results - Select the correct member:</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {searchResults.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleSelectMember(member)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">
                          {member.firstName} {member.middleName} {member.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          DOB: {formatDateToDisplay(member.dob)} | Subscriber ID: {member.subscriberId}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {member.address}, {member.city}, {member.state} {member.zipCode}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Check className="h-4 w-4 mr-2" />
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Patient Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-primary bg-primary/10 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">
            Patient
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="First Name" field="firstName" readonly />
            <EditableField label="Middle name" field="middleName" readonly />
            <EditableField label="Last name" field="lastName" readonly />
            <EditableField label="HCID" field="hcid" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="DOB" field="dob" readonly />
            <EditableField label="Sex" field="sex" readonly />
            <EditableField label="Member prefix" field="memberPrefix" readonly />
            <EditableField label="Program Code" field="programCode" readonly />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Relationship" field="relationship" readonly />
            <EditableField label="Member code" field="memberCode" readonly />
            <EditableField label="Contract type" field="contractType" readonly />
            <EditableField label="ERISA" field="erisa" readonly />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="PCP" field="pcp" readonly />
            <EditableField label="PCP state" field="pcpState" readonly />
            <EditableField label="PCP relationship" field="pcpRelationship" readonly />
            <div></div>
          </div>
        </CardContent>
      </Card>

      {/* Subscriber Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-primary bg-primary/10 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">
            Subscriber
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Subscriber ID" field="subscriberId" />
          </div>
        </CardContent>
      </Card>

      {/* Group Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-primary bg-primary/10 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">
            Group
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Group name" field="groupName" readonly />
            <EditableField label="Group contract #" field="groupContract" readonly />
            <EditableField label="Detail contract code" field="detailContractCode" readonly />
            <EditableField label="Product" field="product" readonly />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Group ID" field="groupId" readonly />
            <EditableField label="Network name" field="networkName" readonly />
            <EditableField label="Network ID" field="networkId" readonly />
            <div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberInformation;