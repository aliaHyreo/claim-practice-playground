import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentInfo } from "@/services/claimsService";

interface PaymentInformationProps {
  paymentInfo: PaymentInfo;
}

const PaymentInformation = ({ paymentInfo }: PaymentInformationProps) => {
  const [formData, setFormData] = useState(paymentInfo);

  const handleClaimInputChange = (field: keyof typeof paymentInfo.claim, value: string) => {
    setFormData(prev => ({
      ...prev,
      claim: { ...prev.claim, [field]: value }
    }));
  };

  const handleProviderInputChange = (field: keyof typeof paymentInfo.provider, value: string) => {
    setFormData(prev => ({
      ...prev,
      provider: { ...prev.provider, [field]: value }
    }));
  };

  const handleDrgInputChange = (field: keyof typeof paymentInfo.drg, value: string) => {
    setFormData(prev => ({
      ...prev,
      drg: { ...prev.drg, [field]: value }
    }));
  };

  const EditableClaimField = ({ label, field }: { label: string; field: keyof typeof paymentInfo.claim }) => (
    <div className="space-y-2">
      <Label htmlFor={String(field)} className="text-sm text-muted-foreground">
        {label}
      </Label>
      <Input
        id={String(field)}
        value={formData.claim[field]?.toString() || ''}
        onChange={(e) => handleClaimInputChange(field, e.target.value)}
        className="h-10"
      />
    </div>
  );

  const EditableProviderField = ({ label, field }: { label: string; field: keyof typeof paymentInfo.provider }) => (
    <div className="space-y-2">
      <Label htmlFor={String(field)} className="text-sm text-muted-foreground">
        {label}
      </Label>
      <Input
        id={String(field)}
        value={formData.provider[field]?.toString() || ''}
        onChange={(e) => handleProviderInputChange(field, e.target.value)}
        className="h-10"
      />
    </div>
  );

  const EditableDrgField = ({ label, field }: { label: string; field: keyof typeof paymentInfo.drg }) => (
    <div className="space-y-2">
      <Label htmlFor={String(field)} className="text-sm text-muted-foreground">
        {label}
      </Label>
      <Input
        id={String(field)}
        value={formData.drg[field]?.toString() || ''}
        onChange={(e) => handleDrgInputChange(field, e.target.value)}
        className="h-10"
      />
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium mb-4">
      {title}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Claim Section */}
      <Card>
        <SectionHeader title="Claim" />
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <EditableClaimField label="Deduct" field="deductible" />
            <EditableClaimField label="Copay" field="copay" />
            <EditableClaimField label="Coins" field="coins" />
            <EditableClaimField label="Patient liab" field="patientLiability" />
            <EditableClaimField label="Member sur" field="memberSurcharge" />
            <EditableClaimField label="Non-elg" field="nonEligible" />
            <EditableClaimField label="HRA paid" field="hraPaid" />
            <EditableClaimField label="Claim paid" field="claimPaid" />
            <EditableClaimField label="Pricing allowed amount" field="pricingAllowedAmount" />
            <EditableClaimField label="Total charge" field="totalCharge" />
            <EditableClaimField label="Finalization code" field="finalizationCode" />
          </div>
        </CardContent>
      </Card>

      {/* Provider Section */}
      <Card>
        <SectionHeader title="Provider" />
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <EditableProviderField label="Provider disc" field="providerDiscount" />
            <EditableProviderField label="Provider liab" field="providerLiability" />
            <EditableProviderField label="Provider risk withhold" field="providerRiskWithhold" />
            <EditableProviderField label="Provider sur" field="providerSurcharge" />
            <EditableProviderField label="Interest" field="interest" />
            <EditableProviderField label="Penalty" field="penalty" />
            <EditableProviderField label="L/R Ind" field="lrIndicator" />
            <EditableProviderField label="System Interest" field="systemInterest" />
          </div>
        </CardContent>
      </Card>

      {/* DRG Section */}
      <Card>
        <SectionHeader title="DRG" />
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <EditableDrgField label="Amount" field="amount" />
            <EditableDrgField label="Check #" field="checkNumber" />
            <EditableDrgField label="Check date" field="checkDate" />
            <EditableDrgField label="Payment system" field="paymentSystem" />
            <EditableDrgField label="Check status" field="checkStatus" />
            <EditableDrgField label="Check status date" field="checkStatusDate" />
            <EditableDrgField label="Paid to" field="paidTo" />
            <EditableDrgField label="Account #" field="accountNumber" />
            <EditableDrgField label="EFT check date" field="eftCheckDate" />
            <EditableDrgField label="Priced" field="priced" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentInformation;