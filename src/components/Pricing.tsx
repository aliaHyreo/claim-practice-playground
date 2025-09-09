import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";

interface PricingData {
  claimLines: {
    procedure: string;
    modifiers: string;
    units: number;
    cxPercent: number;
    allowed: number;
    billedAmount: number;
    writeOff: number;
  }[];
}

interface PricingProps {
  pricingData?: PricingData;
}

const Pricing = ({ pricingData }: PricingProps) => {
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [claimLines, setClaimLines] = useState(
    pricingData?.claimLines || [
      {
        procedure: "E0973",
        modifiers: "NU,EU, KX",
        units: 1,
        cxPercent: 100,
        allowed: 100,
        billedAmount: 300,
        writeOff: 200
      }
    ]
  );

  const handleInputChange = (index: number, field: string, value: string | number) => {
    const updatedLines = [...claimLines];
    updatedLines[index] = {
      ...updatedLines[index],
      [field]: value
    };
    setClaimLines(updatedLines);
  };

  const handleReset = () => {
    setClaimLines([
      {
        procedure: "E0973",
        modifiers: "NU,EU, KX",
        units: 1,
        cxPercent: 100,
        allowed: 100,
        billedAmount: 300,
        writeOff: 200
      }
    ]);
    setSelectedAction("");
  };

  const handleSubmit = () => {
    console.log("Submitting action:", selectedAction);
    // Handle submission logic here
  };

  return (
    <div className="space-y-6">
      {/* Claim Lines Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">Claim Lines</h3>
        </div>
        
        <div className="p-6">
          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 mb-4 text-sm font-medium text-gray-700">
            <div>Procedure</div>
            <div>Modifiers</div>
            <div>Units</div>
            <div>CX %</div>
            <div>$ Allowed</div>
            <div>$ Billed Amount</div>
            <div>$ Write-Off</div>
          </div>

          {/* Table Rows */}
          {claimLines.map((line, index) => (
            <div key={index} className="grid grid-cols-7 gap-4 mb-4 items-center">
              {/* Line Number */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-600">
                  {index + 1}
                </div>
                <Input
                  value={line.procedure}
                  onChange={(e) => handleInputChange(index, 'procedure', e.target.value)}
                  className="h-9"
                />
              </div>

              {/* Modifiers */}
              <Input
                value={line.modifiers}
                onChange={(e) => handleInputChange(index, 'modifiers', e.target.value)}
                className="h-9"
              />

              {/* Units */}
              <Input
                type="number"
                value={line.units}
                onChange={(e) => handleInputChange(index, 'units', parseInt(e.target.value) || 0)}
                className="h-9"
              />

              {/* CX % */}
              <Input
                value={`${line.cxPercent}%`}
                onChange={(e) => handleInputChange(index, 'cxPercent', parseInt(e.target.value.replace('%', '')) || 0)}
                className="h-9"
              />

              {/* $ Allowed */}
              <Input
                type="number"
                value={line.allowed}
                onChange={(e) => handleInputChange(index, 'allowed', parseFloat(e.target.value) || 0)}
                className="h-9"
              />

              {/* $ Billed Amount */}
              <Input
                type="number"
                value={line.billedAmount}
                onChange={(e) => handleInputChange(index, 'billedAmount', parseFloat(e.target.value) || 0)}
                className="h-9"
              />

              {/* $ Write-Off */}
              <Input
                type="number"
                value={line.writeOff}
                onChange={(e) => handleInputChange(index, 'writeOff', parseFloat(e.target.value) || 0)}
                className="h-9"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="flex justify-between items-center">
        {/* Action Dropdown and Submit */}
        <div className="flex items-center gap-3">
          <Select value={selectedAction} onValueChange={setSelectedAction}>
            <SelectTrigger className="w-40 bg-orange-100 border-orange-200 text-orange-800 font-medium hover:bg-orange-200">
              <SelectValue placeholder="Find items" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pay">Pay</SelectItem>
              <SelectItem value="deny">Deny</SelectItem>
              <SelectItem value="pend">Pend</SelectItem>
              <SelectItem value="route">Route</SelectItem>
            </SelectContent>
          </Select>
          
          {selectedAction && (
            <Button 
              onClick={handleSubmit}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Submit
            </Button>
          )}
        </div>

        {/* Pricing Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="bg-orange-600 hover:bg-orange-700 text-white border-orange-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Apply Pricing
          </Button>
          
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Get Pricing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;