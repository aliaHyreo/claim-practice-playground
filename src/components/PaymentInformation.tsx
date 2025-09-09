import { Card, CardContent } from "@/components/ui/card";
import { PaymentInfo } from "@/services/claimsService";

interface PaymentInformationProps {
  paymentInfo: PaymentInfo;
}

const PaymentInformation = ({ paymentInfo }: PaymentInformationProps) => {
  const formatValue = (value: number | string | null) => {
    if (value === null || value === undefined || value === "") return "-";
    if (typeof value === "number" && value === 0) return "0";
    return value.toString();
  };

  const Field = ({ 
    label, 
    value, 
    isGrayed = false 
  }: { 
    label: string; 
    value: string | number | null; 
    isGrayed?: boolean;
  }) => (
    <div className="flex flex-col space-y-1">
      <span className={`text-sm ${isGrayed ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
      <span className={`font-medium ${isGrayed ? 'text-muted-foreground italic' : 'text-foreground'}`}>
        {formatValue(value)}
      </span>
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
            <Field label="Deduct" value={paymentInfo.claim.deductible} />
            <Field label="Copay" value={paymentInfo.claim.copay} />
            <Field label="Coins" value={paymentInfo.claim.coins} />
            <Field label="Patient liab" value={paymentInfo.claim.patientLiability} />
            <Field label="Member sur" value={paymentInfo.claim.memberSurcharge} />
            <Field label="Non-elg" value={paymentInfo.claim.nonEligible} />
            <Field label="HRA paid" value={paymentInfo.claim.hraPaid} />
            <Field label="Claim paid" value={paymentInfo.claim.claimPaid} />
            <Field label="Pricing allowed amount" value={paymentInfo.claim.pricingAllowedAmount} />
            <Field label="Total charge" value={paymentInfo.claim.totalCharge} />
            <Field label="Finalization code" value={paymentInfo.claim.finalizationCode} />
          </div>
        </CardContent>
      </Card>

      {/* Provider Section */}
      <Card>
        <SectionHeader title="Provider" />
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field label="Provider disc" value={paymentInfo.provider.providerDiscount} />
            <Field label="Provider liab" value={paymentInfo.provider.providerLiability} />
            <Field label="Provider risk withhold" value={paymentInfo.provider.providerRiskWithhold} />
            <Field label="Provider sur" value={paymentInfo.provider.providerSurcharge} />
            <Field label="Interest" value={paymentInfo.provider.interest} />
            <Field label="Penalty" value={paymentInfo.provider.penalty} />
            <Field label="L/R Ind" value={paymentInfo.provider.lrIndicator} />
            <Field label="System Interest" value={paymentInfo.provider.systemInterest} />
          </div>
        </CardContent>
      </Card>

      {/* DRG Section */}
      <Card>
        <SectionHeader title="DRG" />
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field label="Amount" value={paymentInfo.drg.amount} />
            <Field label="Check #" value={paymentInfo.drg.checkNumber} />
            <Field label="Check date" value={paymentInfo.drg.checkDate} />
            <Field label="Payment system" value={paymentInfo.drg.paymentSystem} />
            <Field label="Check status" value={paymentInfo.drg.checkStatus} />
            <Field label="Check status date" value={paymentInfo.drg.checkStatusDate} />
            <Field label="Paid to" value={paymentInfo.drg.paidTo} />
            <Field label="Account #" value={paymentInfo.drg.accountNumber} />
            <Field label="EFT check date" value={paymentInfo.drg.eftCheckDate} />
            <Field label="Priced" value={paymentInfo.drg.priced} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentInformation;