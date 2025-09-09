import { ClaimHeaderInfo } from "@/services/claimsService";
import { Badge } from "@/components/ui/badge";

interface ClaimHeaderInformationProps {
  claimHeaderInfo: ClaimHeaderInfo;
}

const ClaimHeaderInformation = ({ claimHeaderInfo }: ClaimHeaderInformationProps) => {
  const { generalClaimData, benefitIndicators, diagnosisCodes } = claimHeaderInfo;

  const InfoField = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-1">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="font-medium text-foreground">{value}</div>
    </div>
  );

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
            <InfoField label="ServiceFromDate" value={generalClaimData.serviceFromDate} />
            <InfoField label="ServiceToDate" value={generalClaimData.serviceToDate} />
            <InfoField label="Assignment of benefits" value={generalClaimData.assignmentOfBenefits} />
            <InfoField label="Provider participation" value={generalClaimData.providerParticipation} />
            
            <InfoField label="Provider contract #" value={generalClaimData.providerContract} />
            <InfoField label="Treatment auth #" value={generalClaimData.treatmentAuth} />
            <InfoField label="Patient account #" value={generalClaimData.patientAccount} />
            <InfoField label="Emergency" value={generalClaimData.emergency} />
            
            <InfoField label="Employment" value={generalClaimData.employment} />
            <InfoField label="Covered ZIP radius" value={generalClaimData.coveredZipRadius} />
            <InfoField label="Frequency" value={generalClaimData.frequency} />
            <InfoField label="BBI Indicator" value={generalClaimData.bbiIndicator} />
            
            <InfoField label="PCI Indicator" value={generalClaimData.pciIndicator} />
            <InfoField label="FSB Ind" value={generalClaimData.fsbInd} />
            <InfoField label="FSB Exclusion" value={generalClaimData.fsbExclusion} />
          </div>
        </div>
      </div>

      {/* Benefit Indicators Section */}
      <div className="bg-card rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SectionHeader title="Benefit Indicators" />
          <div className="col-span-full grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/30">
            <InfoField label="COB" value={benefitIndicators.cob} />
            <InfoField label="COB Rule" value={benefitIndicators.cobRule} />
            <InfoField label="Med Ind" value={benefitIndicators.medInd} />
            <InfoField label="Medicare advantage" value={benefitIndicators.medicareAdvantage} />
            
            <InfoField label="CDHP" value={benefitIndicators.cdhp} />
            <InfoField label="Plan Payer" value={benefitIndicators.planPayer} />
            <InfoField label="COB %" value={benefitIndicators.cobPercentage} />
          </div>
        </div>
      </div>

      {/* Diagnosis Codes Section */}
      <div className="bg-card rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SectionHeader title="Diagnosis Codes" />
          <div className="col-span-full grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/30">
            <InfoField label="Dx 1" value={diagnosisCodes.dx1} />
            <InfoField label="Dx 2" value={diagnosisCodes.dx2} />
            <InfoField label="Dx 3" value={diagnosisCodes.dx3} />
            <InfoField label="Med Rule" value={diagnosisCodes.medRule} />
          </div>
        </div>
      </div>

      {/* Condition Codes Section (Placeholder) */}
      <div className="bg-card rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SectionHeader title="Condition Codes" />
          <div className="col-span-full p-4 bg-muted/30">
            <div className="text-sm text-muted-foreground italic">
              Condition codes section - to be implemented
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimHeaderInformation;