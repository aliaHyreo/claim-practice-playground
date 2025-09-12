import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { type MemberInfo } from "@/services/claimsService";

// Utility functions for date format conversion
const formatDateToDisplay = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
};

const formatDateForInput = (dateString: string): string => {
  if (!dateString) return '';
  // If it's already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
  
  // Try to parse MM/DD/YYYY format
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const [month, day, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
};

interface MemberInformationProps {
  memberInfo: MemberInfo;
}

const MemberInformation = ({ memberInfo }: MemberInformationProps) => {
  const [formData, setFormData] = useState(memberInfo);
  const [searchData, setSearchData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    subscriberId: ''
  });

  const handleInputChange = (field: keyof MemberInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearchChange = (field: string, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching for member:', searchData);
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
            <Button onClick={handleSearch} className="w-32">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
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