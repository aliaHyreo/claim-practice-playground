import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type ProviderInfo } from "@/services/claimsService";

interface ProviderInformationProps {
  providerInfo: ProviderInfo;
}

const ProviderInformation = ({ providerInfo }: ProviderInformationProps) => {
  const [formData, setFormData] = useState(providerInfo);

  const handleInputChange = (field: keyof ProviderInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const EditableField = ({ label, field }: { label: string; field: keyof ProviderInfo }) => (
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
      {/* Rendering Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-primary bg-primary/10 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">
            Rendering
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Rendering NPI" field="renderingNPI" />
            <EditableField label="Name" field="renderingName" />
            <EditableField label="Address" field="renderingAddress" />
            <EditableField label="Pricing state" field="pricingState" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Pricing ZIP" field="pricingZIP" />
            <EditableField label="Provider SPS" field="providerSPS" />
            <EditableField label="Provider EPIN" field="providerEPIN" />
            <EditableField label="License #" field="licenseNumber" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Network option" field="networkOption" />
            <EditableField label="Specialty" field="specialty" />
            <EditableField label="Taxonomy" field="taxonomy" />
            <EditableField label="Emergency Pricing ind" field="emergencyPricingInd" />
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
            <EditableField label="Billing Tax id" field="billingTaxId" />
            <EditableField label="NPI" field="billingNPI" />
            <EditableField label="Name2" field="billingName2" />
            <EditableField label="Facility type" field="facilityType" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Provider SPS3" field="providerSPS3" />
            <EditableField label="Provider EPIN4" field="providerEPIN4" />
            <EditableField label="Medicare ID" field="medicareId" />
            <EditableField label="Address5" field="address5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="National state" field="nationalState" />
            <EditableField label="Location code" field="locationCode" />
            <EditableField label="BHA provider indicator" field="bhaProviderIndicator" />
            <EditableField label="Taxonomy6" field="taxonomy6" />
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
            <EditableField label="Referring Referring physician" field="referringPhysician" />
            <EditableField label="NPI7" field="referringNPI7" />
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
            <EditableField label="provider" field="serviceProvider" />
            <EditableField label="Service facility/facility tier" field="serviceFacilityTier" />
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
            <EditableField label="NPI8" field="npi8" />
            <EditableField label="NSB Indicator" field="nsbIndicator" />
            <EditableField label="Alternate Facility NPI" field="alternateFacilityNPI" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderInformation;