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

  const EditableField = ({ label, field, readonly = false }: { label: string; field: keyof ProviderInfo; readonly?: boolean }) => (
    <div className="space-y-2">
      <Label htmlFor={field} className="text-sm text-muted-foreground">
        {label}
      </Label>
      <Input
        id={field}
        value={formData[field] || ''}
        onChange={readonly ? undefined : (e) => handleInputChange(field, e.target.value)}
        className={readonly ? "h-10 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-default" : "h-10"}
        readOnly={readonly}
        tabIndex={readonly ? -1 : 0}
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
            <EditableField label="Name" field="renderingName" readonly />
            <EditableField label="Address" field="renderingAddress" readonly />
            <EditableField label="Pricing state" field="pricingState" readonly />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Pricing ZIP" field="pricingZip" readonly />
            <EditableField label="Provider SPS" field="providerSps" readonly />
            <EditableField label="Provider EPIN" field="providerEpin" readonly />
            <EditableField label="License #" field="licenseNumber" readonly />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Network option" field="networkOption" readonly />
            <EditableField label="Specialty" field="specialty" readonly />
            <EditableField label="Taxonomy" field="taxonomy" />
            <EditableField label="Emergency Pricing ind" field="emergencyPricingInd" readonly />
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
            <EditableField label="Billing Tax id" field="billingTaxId" readonly />
            <EditableField label="NPI" field="billingNPI" />
            <EditableField label="Name" field="billingName" readonly />
            <EditableField label="Facility type" field="facilityType" readonly />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="Provider SPS" field="providerSps" readonly />
            <EditableField label="Provider EPIN" field="providerEpin" readonly />
            <EditableField label="Medicare ID" field="medicareId" readonly />
            <EditableField label="Address" field="address" readonly />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <EditableField label="National state" field="nationalState" readonly />
            <EditableField label="Location code" field="locationCode" readonly />
            <EditableField label="BHA provider indicator" field="bhaProviderIndicator" readonly />
            <EditableField label="Taxonomy" field="taxonomy" readonly />
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
            <EditableField label="Referring Referring physician" field="referringPhysician" readonly />
            <EditableField label="NPI" field="referringNPI" readonly />
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
            <EditableField label="provider" field="serviceProvider" readonly />
            <EditableField label="Service facility/facility tier" field="serviceFacilityTier" readonly />
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
            <EditableField label="NPI8" field="npi8" readonly />
            <EditableField label="NSB Indicator" field="nsbIndicator" readonly />
            <EditableField label="Alternate Facility NPI" field="alternateFacilityNPI" readonly />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderInformation;