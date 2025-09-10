import React from 'react';
import { ClaimLine } from '@/services/claimsService';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ClaimLinesProps {
  claimLines?: ClaimLine[];
}

const ClaimLines: React.FC<ClaimLinesProps> = ({ claimLines }) => {
  if (!claimLines || claimLines.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-gray-500 text-center">No claim lines available.</p>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-xl shadow p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm uppercase tracking-wide">
                Line No.
              </th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm uppercase tracking-wide">
                ServiceFromDate
              </th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm uppercase tracking-wide">
                ServiceToDate
              </th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm uppercase tracking-wide">
                POS
              </th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm uppercase tracking-wide">
                Service
              </th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm uppercase tracking-wide">
                Procedure
              </th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm uppercase tracking-wide">
                Modifiers
              </th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm uppercase tracking-wide">
                Units
              </th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm uppercase tracking-wide">
                Diagnosis
              </th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm uppercase tracking-wide">
                Billed
              </th>
            </tr>
          </thead>
          <tbody>
            {claimLines.map((line, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-2">
                  <Input
                    defaultValue={line.lineNo}
                    className="text-sm min-w-[80px]"
                  />
                </td>
                <td className="py-2 px-2">
                  <Input
                    defaultValue={line.serviceFromDate}
                    className="text-sm min-w-[120px]"
                  />
                </td>
                <td className="py-2 px-2">
                  <Input
                    defaultValue={line.serviceToDate}
                    className="text-sm min-w-[120px]"
                  />
                </td>
                <td className="py-2 px-2">
                  <Input
                    defaultValue={line.pos}
                    className="text-sm min-w-[80px]"
                  />
                </td>
                <td className="py-2 px-2">
                  <Input
                    defaultValue={line.service}
                    className="text-sm min-w-[100px]"
                  />
                </td>
                <td className="py-2 px-2">
                  <Input
                    defaultValue={line.procedureCode}
                    className="text-sm min-w-[100px]"
                  />
                </td>
                <td className="py-2 px-2">
                  <Input
                    defaultValue={line.modifiers.join(', ')}
                    className="text-sm min-w-[120px]"
                  />
                </td>
                <td className="py-2 px-2">
                  <Input
                    defaultValue={line.units}
                    className="text-sm min-w-[80px]"
                  />
                </td>
                <td className="py-2 px-2">
                  <Input
                    defaultValue={line.diagnosis}
                    className="text-sm min-w-[100px]"
                  />
                </td>
                <td className="py-2 px-2">
                  <Input
                    defaultValue={line.billed}
                    className="text-sm min-w-[100px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-gray-500 text-sm">
        Rows: {claimLines.length}
      </div>
    </Card>
  );
};

export default ClaimLines;