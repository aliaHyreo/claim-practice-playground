import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type MemberInfo } from "@/services/claimsService";

interface MemberInformationProps {
  memberInfo: MemberInfo;
}

const MemberInformation = ({ memberInfo }: MemberInformationProps) => {
  const InfoField = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="font-medium text-foreground">{value || '-'}</div>
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
            <InfoField label="First Name" value={memberInfo.firstName} />
            <InfoField label="Middle name" value={memberInfo.middleName} />
            <InfoField label="Last name" value={memberInfo.lastName} />
            <InfoField label="HCID" value={memberInfo.hcid} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="DOB" value={memberInfo.dob} />
            <InfoField label="Sex" value={memberInfo.sex} />
            <InfoField label="Member prefix" value={memberInfo.memberPrefix} />
            <InfoField label="Program Code" value={memberInfo.programCode} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="Relationship" value={memberInfo.relationship} />
            <InfoField label="Member code" value={memberInfo.memberCode} />
            <InfoField label="Contract type" value={memberInfo.contractType} />
            <InfoField label="ERISA" value={memberInfo.erisa} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="PCP" value={memberInfo.pcp} />
            <InfoField label="PCP state" value={memberInfo.pcpState} />
            <InfoField label="PCP relationship" value={memberInfo.pcpRelationship} />
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
            <InfoField label="Subscriber ID" value={memberInfo.subscriberId} />
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
            <InfoField label="Group name" value={memberInfo.groupName} />
            <InfoField label="Group contract #" value={memberInfo.groupContract} />
            <InfoField label="Detail contract code" value={memberInfo.detailContractCode} />
            <InfoField label="Product" value={memberInfo.product} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="Group ID" value={memberInfo.groupId} />
            <InfoField label="Network name" value={memberInfo.networkName} />
            <InfoField label="Network ID" value={memberInfo.networkId} />
            <div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberInformation;