import React, { useState } from 'react';
import { ClaimData as ClaimDataType } from '@/services/claimsService';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ClaimDataProps {
  claimData?: ClaimDataType;
  onActionCodeChange?: (actionCode: string) => void;
}

const ClaimData: React.FC<ClaimDataProps> = ({ claimData, onActionCodeChange }) => {
  const [selectedActionCode, setSelectedActionCode] = useState<string>('');

  if (!claimData) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">No claim data available.</p>
      </Card>
    );
  }

  const handleActionCodeChange = (value: string) => {
    setSelectedActionCode(value);
    onActionCodeChange?.(value);
  };

  return (
    <Card className="p-6">
      <Tabs defaultValue="editing" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editing" className='data-[state=active]:bg-white'>Editing</TabsTrigger>
          <TabsTrigger value="details" className='data-[state=active]:bg-white'>Details</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6 space-y-6">
          {/* Additional Claim Data Section */}
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                {/* <span className="text-base">-</span> */}
                Additional Claim Data
              </h3>
            </div>
            
            <div className="space-y-6">
              {/* Claim Source */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Claim Source</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Media type</Label>
                    <div className="text-sm">PC</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Pricing source</Label>
                    <div className="text-sm">——</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Pricing system</Label>
                    <div className="text-sm">WP</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Mixer PAR</Label>
                    <div className="text-sm">Y</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Receiver ID</Label>
                    <div className="text-sm">WGSCA</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Received at EDI</Label>
                    <div className="text-sm">05/28/2025 05:07</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Provider error</Label>
                    <div className="text-sm">P000</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Image control #</Label>
                    <div className="text-sm">——</div>
                  </div>
                </div>
              </div>

              {/* Miscellaneous Data */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Miscellaneous Data</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">EPSDT</Label>
                    <div className="text-sm">No</div>
                    {/* <div className="text-sm text-blue-600">No</div> */}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Family planning</Label>
                    <div className="text-sm">No</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">GTESS date</Label>
                    <div className="text-sm">——</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Date of illness</Label>
                    <div className="text-sm">——</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Rule Data Section */}
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                {/* <span className="text-red-500">+</span> */}
                Additional Rule Data
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="action-code" className="text-sm font-medium">
                  Adjustment Reason
                </Label>
                <Select value={selectedActionCode} onValueChange={handleActionCodeChange}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select action code..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S">S - Pay</SelectItem>
                    <SelectItem value="X">X - Deny</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedActionCode && (
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedActionCode === 'S' ? 'Pay' : 'Deny'}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="editing" className="mt-6 space-y-4">
          {/* Editing Badge */}
          {/* <Badge className="bg-muted text-foreground px-4 py-2 rounded-full">
            Editing
          </Badge> */}

          {/* Claims Xten Editing Title */}
          <h2 className="text-xl font-semibold text-foreground border-b pb-2">
            Claims Xten Editing
          </h2>

          {/* Side-by-side Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Claim Table */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Original Claim
              </h3>
              <div className="bg-background rounded-lg shadow overflow-hidden border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-3 py-2 text-left text-foreground font-medium">Line No</th>
                      <th className="px-3 py-2 text-left text-foreground font-medium">From</th>
                      <th className="px-3 py-2 text-left text-foreground font-medium">Procedure</th>
                      <th className="px-3 py-2 text-left text-foreground font-medium">Modifiers</th>
                      <th className="px-3 py-2 text-left text-foreground font-medium">Units</th>
                      <th className="px-3 py-2 text-left text-foreground font-medium">Billed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-2 py-2">
                        <Input defaultValue={claimData.originalClaim.lineNo} className="text-sm h-8" />
                      </td>
                      <td className="px-2 py-2">
                        <Input defaultValue={claimData.originalClaim.from} className="text-sm h-8" />
                      </td>
                      <td className="px-2 py-2">
                        <Input defaultValue={claimData.originalClaim.procedure} className="text-sm h-8" />
                      </td>
                      <td className="px-2 py-2">
                        <Input defaultValue={claimData.originalClaim.modifiers} className="text-sm h-8" />
                      </td>
                      <td className="px-2 py-2">
                        <Input defaultValue={claimData.originalClaim.units} className="text-sm h-8" />
                      </td>
                      <td className="px-2 py-2">
                        <Input defaultValue={claimData.originalClaim.billed} className="text-sm h-8" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="px-3 py-2 text-xs text-muted-foreground bg-muted">
                  Rows: 1
                </div>
              </div>
            </div>

            {/* Claims Xten Table */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Claims Xten
              </h3>
              <div className="bg-background rounded-lg shadow overflow-hidden border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-3 py-2 text-left text-foreground font-medium">Billed</th>
                      <th className="px-3 py-2 text-left text-foreground font-medium">Procedure</th>
                      <th className="px-3 py-2 text-left text-foreground font-medium">Modifiers</th>
                      <th className="px-3 py-2 text-left text-foreground font-medium">Units</th>
                      <th className="px-3 py-2 text-left text-foreground font-medium">Pay %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-2 py-2">
                        <Input defaultValue={claimData.claimsXten.billed} className="text-sm h-8" />
                      </td>
                      <td className="px-2 py-2">
                        <Input defaultValue={claimData.claimsXten.procedure} className="text-sm h-8" />
                      </td>
                      <td className="px-2 py-2">
                        <Input defaultValue={claimData.claimsXten.modifiers} className="text-sm h-8" />
                      </td>
                      <td className="px-2 py-2">
                        <Input defaultValue={claimData.claimsXten.units} className="text-sm h-8" />
                      </td>
                      <td className="px-2 py-2">
                        <Input defaultValue={`${claimData.claimsXten.payPercent}%`} className="text-sm h-8" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="px-3 py-2 text-xs text-muted-foreground bg-muted">
                  Rows: 1
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ClaimData;