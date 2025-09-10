import { ClaimHeaderInfo } from "@/services/claimsService";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClaimHeaderInformationProps {
  claimHeaderInfo: ClaimHeaderInfo;
}

const ClaimHeaderInformation = ({ claimHeaderInfo }: ClaimHeaderInformationProps) => {
  const { generalClaimData, benefitIndicators, diagnosisCodes } = claimHeaderInfo;

  const editableFields = ["ServiceFromDate", "ServiceToDate", "Dx 1", "Dx 2", "Dx 3", "Patient account #"];
  
  const EditableField = ({ label, value }: { label: string; value: string }) => {
    const isEditable = editableFields.includes(label);
    
    return (
      <div className="space-y-2">
        <Label htmlFor={label.replace(/\s+/g, '-').toLowerCase()} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        <Input
          id={label.replace(/\s+/g, '-').toLowerCase()}
          defaultValue={value}
          className="text-sm"
          readOnly={!isEditable}
          tabIndex={isEditable ? 0 : -1}
          style={!isEditable ? { 
            cursor: 'default',
            backgroundColor: 'transparent',
            border: '1px solid hsl(var(--border))',
            outline: 'none',
            boxShadow: 'none'
          } : {}}
          onFocus={!isEditable ? (e) => e.target.blur() : undefined}
        />
      </div>
    );
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="col-span-full">
      <h4 className="text-sm font-semibold text-background px-4 py-2 bg-primary rounded-t-lg">
        {title}
      </h4>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* General Claim Data Section */}
      <div className="bg-card rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SectionHeader title="General Claim Data" />
          <div className="col-span-full grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/30">
            <EditableField label="ServiceFromDate" value={generalClaimData.serviceFromDate} />
            <EditableField label="ServiceToDate" value={generalClaimData.serviceToDate} />
            <EditableField label="Assignment of benefits" value={generalClaimData.assignmentOfBenefits} />
            <EditableField label="Provider participation" value={generalClaimData.providerParticipation} />
            
            <EditableField label="Provider contract #" value={generalClaimData.providerContract} />
            <EditableField label="Treatment auth #" value={generalClaimData.treatmentAuth} />
            <EditableField label="Patient account #" value={generalClaimData.patientAccount} />
            <EditableField label="Emergency" value={generalClaimData.emergency} />
            
            <EditableField label="Employment" value={generalClaimData.employment} />
            <EditableField label="Covered ZIP radius" value={generalClaimData.coveredZipRadius} />
            <EditableField label="Frequency" value={generalClaimData.frequency} />
            <EditableField label="BBI Indicator" value={generalClaimData.bbiIndicator} />
            
            <EditableField label="PCI Indicator" value={generalClaimData.pciIndicator} />
            <EditableField label="FSB Ind" value={generalClaimData.fsbInd} />
            <EditableField label="FSB Exclusion" value={generalClaimData.fsbExclusion} />
          </div>
        </div>
      </div>

      {/* Benefit Indicators Section */}
      <div className="bg-card rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SectionHeader title="Benefit Indicators" />
          <div className="col-span-full grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/30">
            <EditableField label="COB" value={benefitIndicators.cob} />
            <EditableField label="COB Rule" value={benefitIndicators.cobRule} />
            <EditableField label="Med Ind" value={benefitIndicators.medInd} />
            <EditableField label="Medicare advantage" value={benefitIndicators.medicareAdvantage} />
            
            <EditableField label="CDHP" value={benefitIndicators.cdhp} />
            <EditableField label="Plan Payer" value={benefitIndicators.planPayer} />
            <EditableField label="COB %" value={benefitIndicators.cobPercentage} />
          </div>
        </div>
      </div>

      {/* Diagnosis Codes Section */}
      <div className="bg-card rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SectionHeader title="Diagnosis Codes" />
          <div className="col-span-full grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/30">
            <EditableField label="Dx 1" value={diagnosisCodes.dx1} />
            <EditableField label="Dx 2" value={diagnosisCodes.dx2} />
            <EditableField label="Dx 3" value={diagnosisCodes.dx3} />
            <EditableField label="Med Rule" value={diagnosisCodes.medRule} />
          </div>
        </div>
      </div>

      {/* Condition Codes Section */}
      <div className="bg-card rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SectionHeader title="Condition Codes" />
          <div className="col-span-full grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/30">
            <EditableField label="Condition Code 1" value="" />
            <EditableField label="Condition Code 2" value="" />
            <EditableField label="Condition Code 3" value="" />
            <EditableField label="Condition Code 4" value="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimHeaderInformation;