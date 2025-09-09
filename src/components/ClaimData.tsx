import React from 'react';
import { ClaimData as ClaimDataType } from '@/services/claimsService';
import { Card } from '@/components/ui/card';

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
    <div className="space-y-6">
      {/* Financial Summary Card */}
      <Card className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Financial Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-gray-600 text-sm">Original Claim (Billed)</label>
            <div className="text-gray-900 font-medium text-lg">${claimData.billed}</div>
          </div>
          
          <div>
            <label className="text-gray-600 text-sm">System Allowed (from Payment Info)</label>
            <div className="text-gray-900 font-medium text-lg">${claimData.allowed}</div>
          </div>
          
          <div>
            <label className="text-gray-600 text-sm">Final Contract Amount (Payable)</label>
            <div className="text-gray-900 font-medium text-lg">${claimData.finalContractAmount}</div>
          </div>
        </div>
      </Card>

      {/* Explanation Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="text-blue-800 font-semibold text-sm mb-3">Calculation Flow</h4>
        <div className="space-y-2">
          {claimData.explanation.map((step, index) => (
            <p key={index} className="text-gray-700 text-sm leading-relaxed">
              {step}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClaimData;