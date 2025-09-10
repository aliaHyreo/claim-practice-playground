import React from 'react';
import { ClaimData as ClaimDataType } from '@/services/claimsService';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface ClaimDataProps {
  claimData?: ClaimDataType;
}

const ClaimData: React.FC<ClaimDataProps> = ({ claimData }) => {
  if (!claimData) {
    return (
      <Card className="p-6">
        <p className="text-gray-500 text-center">No claim data available.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Editing Badge */}
      <Badge className="bg-gray-600 text-white px-4 py-2 rounded-full">
        Editing
      </Badge>

      {/* Claims Xten Editing Title */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Claims Xten Editing
      </h2>

      {/* Side-by-side Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Claim Table */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3 underline">
            Original Claim
          </h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-gray-700 font-medium">Line No</th>
                  <th className="px-3 py-2 text-left text-gray-700 font-medium">From</th>
                  <th className="px-3 py-2 text-left text-gray-700 font-medium">Procedure</th>
                  <th className="px-3 py-2 text-left text-gray-700 font-medium">Modifiers</th>
                  <th className="px-3 py-2 text-left text-gray-700 font-medium">Units</th>
                  <th className="px-3 py-2 text-left text-gray-700 font-medium">Billed</th>
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
            <div className="px-3 py-2 text-xs text-gray-500 bg-gray-50">
              Rows: 1
            </div>
          </div>
        </div>

        {/* Claims Xten Table */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3 underline">
            Claims Xten
          </h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-gray-700 font-medium">Billed</th>
                  <th className="px-3 py-2 text-left text-gray-700 font-medium">Procedure</th>
                  <th className="px-3 py-2 text-left text-gray-700 font-medium">Modifiers</th>
                  <th className="px-3 py-2 text-left text-gray-700 font-medium">Units</th>
                  <th className="px-3 py-2 text-left text-gray-700 font-medium">Pay %</th>
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
            <div className="px-3 py-2 text-xs text-gray-500 bg-gray-50">
              Rows: 1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimData;