import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { ClaimImageData } from "@/services/claimsService";

interface ClaimImageProps {
  claimImageData: ClaimImageData;
}

const ClaimImage = ({ claimImageData }: ClaimImageProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: '2-digit' 
    });
  };

  const formatDateLong = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const hasCodeMismatch = claimImageData.claimLineCodeSystem !== claimImageData.claimLineCodeImage;

  return (
    <div className="space-y-6">
      {/* HCFA Form Header */}
      <Card className="bg-white rounded-xl shadow">
        <CardHeader className="border-b bg-gray-50 rounded-t-xl">
          <CardTitle className="text-lg font-bold text-center text-gray-900">
            HEALTH INSURANCE CLAIM FORM
          </CardTitle>
          <div className="text-center text-sm text-gray-600">
            APPROVED BY NATIONAL UNIFORM CLAIM COMMITTEE (NUCC) 02/12
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Patient Information Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Left Column - Patient Details */}
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b">
                  PATIENT INFORMATION
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-600 uppercase font-medium">
                      PATIENT'S NAME
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-900 font-medium">{claimImageData.patientName}</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <Badge variant="outline" className="text-xs mt-1 border-green-200 text-green-700">
                      Matches
                    </Badge>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-600 uppercase font-medium">
                      PATIENT'S BIRTH DATE
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-900 font-medium">{formatDateLong(claimImageData.dob)}</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <Badge variant="outline" className="text-xs mt-1 border-green-200 text-green-700">
                      Matches
                    </Badge>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-600 uppercase font-medium">
                      ZIP CODE
                    </label>
                    <div className="text-gray-900 font-medium mt-1">{claimImageData.zip}</div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-600 uppercase font-medium">
                      SEX
                    </label>
                    <div className="text-gray-900 font-medium mt-1">M</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b">
                  SERVICE INFORMATION
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-600 uppercase font-medium">
                      DATE(S) OF SERVICE - FROM
                    </label>
                    <div className="text-gray-900 font-medium mt-1">
                      {formatDate(claimImageData.serviceDates.from)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-600 uppercase font-medium">
                      DATE(S) OF SERVICE - TO
                    </label>
                    <div className="text-gray-900 font-medium mt-1">
                      {formatDate(claimImageData.serviceDates.to)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Procedure Code Validation */}
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b">
                  PROCEDURE CODE VALIDATION
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 uppercase font-medium">
                      SYSTEM CODE
                    </label>
                    <div className="text-gray-900 font-medium mt-1">{claimImageData.claimLineCodeSystem}</div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-600 uppercase font-medium">
                      CLAIM IMAGE CODE
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`font-medium ${hasCodeMismatch ? 'text-red-600' : 'text-gray-900'}`}>
                        {claimImageData.claimLineCodeImage}
                      </span>
                      {hasCodeMismatch ? (
                        <XCircle className="w-4 h-4 text-red-600" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <Badge 
                      variant={hasCodeMismatch ? "destructive" : "outline"} 
                      className={`text-xs mt-1 ${hasCodeMismatch ? '' : 'border-green-200 text-green-700'}`}
                    >
                      {hasCodeMismatch ? 'Mismatch Detected' : 'Matches'}
                    </Badge>
                  </div>
                </div>

                {hasCodeMismatch && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800 text-sm font-medium">
                      <AlertTriangle className="w-4 h-4" />
                      Code Mismatch Detected
                    </div>
                    <div className="text-red-700 text-xs mt-1">
                      System code ({claimImageData.claimLineCodeSystem}) differs from claim image code ({claimImageData.claimLineCodeImage})
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Eligibility Validation Section */}
          <Card className="bg-yellow-50 border border-yellow-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-yellow-800 font-semibold text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Eligibility Validation (Edit 507)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-yellow-800 text-sm font-medium mb-3">
                Required Actions:
              </div>
              <ul className="space-y-2">
                {claimImageData.eligibilityValidation.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-600 mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              {hasCodeMismatch && (
                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                  <div className="text-yellow-800 text-sm font-medium">
                    Action Required: Code Mismatch Resolution
                  </div>
                  <div className="text-yellow-700 text-xs mt-1">
                    Update claim line code from {claimImageData.claimLineCodeSystem} to {claimImageData.claimLineCodeImage} and revalidate eligibility.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaimImage;