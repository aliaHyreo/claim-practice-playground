import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ProviderInfo } from "@/services/claimsService";

interface ProviderInformationProps {
  providerInfo: ProviderInfo;
}

const ProviderInformation = ({ providerInfo }: ProviderInformationProps) => {
  const InfoField = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="font-medium text-foreground">{value || '-'}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Rendering Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-primary bg-primary/10 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">
            Rendering
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="Rendering NPI" value={providerInfo.renderingNPI} />
            <InfoField label="Name" value={providerInfo.renderingName} />
            <InfoField label="Address" value={providerInfo.renderingAddress} />
            <InfoField label="Pricing state" value={providerInfo.pricingState} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="Pricing ZIP" value={providerInfo.pricingZIP} />
            <InfoField label="Provider SPS" value={providerInfo.providerSPS} />
            <InfoField label="Provider EPIN" value={providerInfo.providerEPIN} />
            <InfoField label="License #" value={providerInfo.licenseNumber} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="Network option" value={providerInfo.networkOption} />
            <InfoField label="Specialty" value={providerInfo.specialty} />
            <InfoField label="Taxonomy" value={providerInfo.taxonomy} />
            <InfoField label="Emergency Pricing ind" value={providerInfo.emergencyPricingInd} />
          </div>
        </CardContent>
      </Card>

      {/* Billing Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-primary bg-primary/10 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">
            Billing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="Billing Tax id" value={providerInfo.billingTaxId} />
            <InfoField label="NPI" value={providerInfo.billingNPI} />
            <InfoField label="Name2" value={providerInfo.billingName2} />
            <InfoField label="Facility type" value={providerInfo.facilityType} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="Provider SPS3" value={providerInfo.providerSPS3} />
            <InfoField label="Provider EPIN4" value={providerInfo.providerEPIN4} />
            <InfoField label="Medicare ID" value={providerInfo.medicareId} />
            <InfoField label="Address5" value={providerInfo.address5} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="National state" value={providerInfo.nationalState} />
            <InfoField label="Location code" value={providerInfo.locationCode} />
            <InfoField label="BHA provider indicator" value={providerInfo.bhaProviderIndicator} />
            <InfoField label="Taxonomy6" value={providerInfo.taxonomy6} />
          </div>
        </CardContent>
      </Card>

      {/* Referring Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-primary bg-primary/10 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">
            Referring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="Referring Referring physician" value={providerInfo.referringPhysician} />
            <InfoField label="NPI7" value={providerInfo.referringNPI7} />
          </div>
        </CardContent>
      </Card>

      {/* Service Facility Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-primary bg-primary/10 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">
            Service Facility
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="provider" value={providerInfo.serviceProvider} />
            <InfoField label="Service facility/facility tier" value={providerInfo.serviceFacilityTier} />
          </div>
        </CardContent>
      </Card>

      {/* Miscellaneous data Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-primary bg-primary/10 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">
            Miscellaneous data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoField label="NPI8" value={providerInfo.npi8} />
            <InfoField label="NSB Indicator" value={providerInfo.nsbIndicator} />
            <InfoField label="Alternate Facility NPI" value={providerInfo.alternateFacilityNPI} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderInformation;