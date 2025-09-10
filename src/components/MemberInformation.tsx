import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type MemberInfo } from "@/services/claimsService";

interface MemberInformationProps {
  memberInfo: MemberInfo;
}

const MemberInformation = ({ memberInfo }: MemberInformationProps) => {
  const [formData, setFormData] = useState(memberInfo);

  const handleInputChange = (field: keyof MemberInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const EditableField = ({ label, field }: { label: string; field: keyof MemberInfo }) => (
    <div className="space-y-2">
      <Label htmlFor={field} className="text-sm text-muted-foreground">
        {label}
      </Label>
      <Input
        id={field}
        value={formData[field] || ''}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="h-10"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Patient Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-primary bg-primary/10 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">
            Patient
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="First Name" field="firstName" />
            <EditableField label="Middle name" field="middleName" />
            <EditableField label="Last name" field="lastName" />
            <EditableField label="HCID" field="hcid" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="DOB" field="dob" />
            <EditableField label="Sex" field="sex" />
            <EditableField label="Member prefix" field="memberPrefix" />
            <EditableField label="Program Code" field="programCode" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Relationship" field="relationship" />
            <EditableField label="Member code" field="memberCode" />
            <EditableField label="Contract type" field="contractType" />
            <EditableField label="ERISA" field="erisa" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="PCP" field="pcp" />
            <EditableField label="PCP state" field="pcpState" />
            <EditableField label="PCP relationship" field="pcpRelationship" />
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
            <EditableField label="Group name" field="groupName" />
            <EditableField label="Group contract #" field="groupContract" />
            <EditableField label="Detail contract code" field="detailContractCode" />
            <EditableField label="Product" field="product" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Group ID" field="groupId" />
            <EditableField label="Network name" field="networkName" />
            <EditableField label="Network ID" field="networkId" />
            <div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberInformation;