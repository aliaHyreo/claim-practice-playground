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

  const hasCodeMismatch = claimImageData.claimLineCodeSystem !== claimImageData.claimLineCodeImage;

  return (
    <div className="space-y-6">
      {/* HCFA Form */}
      <Card className="bg-white rounded-xl shadow max-w-full overflow-hidden">
        <CardHeader className="border-b bg-gray-50 rounded-t-xl p-4">
          <div className="flex items-start justify-between">
            {/* QR Code placeholder */}
            <div className="w-16 h-16 bg-black border-2 border-gray-800 flex items-center justify-center text-white text-xs">
              QR
            </div>
            
            <div className="flex-1 text-center">
              <CardTitle className="text-lg font-bold text-red-600 mb-1">
                HEALTH INSURANCE CLAIM FORM
              </CardTitle>
              <div className="text-sm text-red-500">
                APPROVED BY NATIONAL UNIFORM CLAIM COMMITTEE (NUCC) 02/12
              </div>
            </div>
            
            <div className="w-16 h-16 border border-gray-400 bg-gray-50 flex items-center justify-center text-xs text-gray-600">
              PICA
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Top Section - Insurance Type */}
          <div className="grid grid-cols-7 border-b">
            <div className="col-span-4 border-r">
              <div className="p-2 border-b bg-red-50">
                <span className="text-red-600 text-xs font-semibold">1. MEDICARE MEDICAID TRICARE CHAMPVA</span>
              </div>
              <div className="p-3 grid grid-cols-4 gap-2">
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1" />
                  Medicare
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1" />
                  Medicaid
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1" />
                  TRICARE CHAMPUS
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1" />
                  CHAMPVA
                </label>
              </div>
            </div>
            
            <div className="col-span-2 border-r">
              <div className="p-2 border-b bg-red-50">
                <span className="text-red-600 text-xs font-semibold">GROUP HEALTH PLAN</span>
              </div>
              <div className="p-3">
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1" />
                  FECA BLK LUNG
                </label>
              </div>
            </div>
            
            <div className="col-span-1">
              <div className="p-2 border-b bg-red-50">
                <span className="text-red-600 text-xs font-semibold">OTHER</span>
              </div>
              <div className="p-3">
                <span className="text-xs">(ID#)</span>
              </div>
            </div>
          </div>

          {/* Patient Information Section */}
          <div className="grid grid-cols-3 border-b">
            <div className="border-r">
              <div className="p-2 bg-red-50 border-b">
                <span className="text-red-600 text-xs font-semibold">2. PATIENT'S NAME (Last Name, First Name, Middle Initial)</span>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{claimImageData.patientName}</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs mt-1 border-green-200 text-green-700">
                  ✓ Matches
                </Badge>
              </div>
            </div>
            
            <div className="border-r">
              <div className="p-2 bg-red-50 border-b">
                <span className="text-red-600 text-xs font-semibold">3. PATIENT'S BIRTH DATE</span>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-3 gap-1 mb-2">
                  <div className="text-center border rounded px-1 py-1 bg-blue-50">08</div>
                  <div className="text-center border rounded px-1 py-1 bg-blue-50">18</div>
                  <div className="text-center border rounded px-1 py-1 bg-blue-50">1982</div>
                </div>
                <div className="text-xs text-gray-600">MM DD YYYY</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-600">SEX</span>
                  <label className="flex items-center text-xs">
                    <input type="checkbox" checked className="mr-1" />
                    M
                  </label>
                  <label className="flex items-center text-xs">
                    <input type="checkbox" className="mr-1" />
                    F
                  </label>
                </div>
                <Badge variant="outline" className="text-xs mt-1 border-green-200 text-green-700">
                  ✓ Matches
                </Badge>
              </div>
            </div>
            
            <div>
              <div className="p-2 bg-red-50 border-b">
                <span className="text-red-600 text-xs font-semibold">4. INSURED'S NAME (Last Name, First Name, Middle Initial)</span>
              </div>
              <div className="p-3">
                <span className="font-medium">James Clinic</span>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-3 border-b">
            <div className="border-r">
              <div className="p-2 bg-red-50 border-b">
                <span className="text-red-600 text-xs font-semibold">5. PATIENT'S ADDRESS (No., Street)</span>
              </div>
              <div className="p-3 space-y-2">
                <div>25689 Avenue</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-gray-600">CITY</div>
                    <div>Highway 16S, Lake, Michigan</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">STATE</div>
                    <div>WI</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">ZIP CODE</div>
                  <div>{claimImageData.zip}</div>
                </div>
              </div>
            </div>
            
            <div className="border-r">
              <div className="p-2 bg-red-50 border-b">
                <span className="text-red-600 text-xs font-semibold">6. PATIENT RELATIONSHIP TO INSURED</span>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1" />
                    Self
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" checked className="mr-1" />
                    Spouse
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1" />
                    Child
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1" />
                    Other
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <div className="p-2 bg-red-50 border-b">
                <span className="text-red-600 text-xs font-semibold">7. INSURED'S ADDRESS (No., Street)</span>
              </div>
              <div className="p-3 space-y-2">
                <div>2426 BERKSHIRE AV</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-gray-600">CITY</div>
                    <div>Fox Cities</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">STATE</div>
                    <div>WI</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">ZIP CODE</div>
                  <div>44011</div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Lines Section */}
          <div className="border-b">
            <div className="p-2 bg-red-50 border-b">
              <span className="text-red-600 text-xs font-semibold">24. A-J. PROCEDURES, SERVICES, OR SUPPLIES</span>
            </div>
            
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-gray-100 border-b text-xs font-semibold">
              <div className="p-2 border-r text-center">A</div>
              <div className="p-2 border-r text-center">DATES OF SERVICE</div>
              <div className="p-2 border-r text-center">B</div>
              <div className="p-2 border-r text-center">C</div>
              <div className="p-2 border-r text-center">D. PROCEDURES, SERVICES</div>
              <div className="p-2 border-r text-center">E</div>
              <div className="p-2 border-r text-center">F</div>
              <div className="p-2 border-r text-center">G</div>
              <div className="p-2 border-r text-center">H</div>
              <div className="p-2 border-r text-center">I</div>
              <div className="p-2 border-r text-center">J</div>
              <div className="p-2 text-center">RENDERING PROVIDER ID. #</div>
            </div>
            
            {/* Service Line 1 */}
            <div className="grid grid-cols-12 border-b text-sm">
              <div className="p-2 border-r text-center font-bold">1</div>
              <div className="p-2 border-r">
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div>08</div>
                  <div>03</div>
                  <div>23</div>
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs mt-1">
                  <div>08</div>
                  <div>03</div>
                  <div>23</div>
                </div>
              </div>
              <div className="p-2 border-r text-center">12</div>
              <div className="p-2 border-r text-center">
                <div className="flex items-center gap-2">
                  <span className={hasCodeMismatch ? 'text-red-600 font-semibold' : ''}>
                    {claimImageData.claimLineCodeImage}
                  </span>
                  {hasCodeMismatch && <XCircle className="w-3 h-3 text-red-600" />}
                </div>
              </div>
              <div className="p-2 border-r">NU EU KX</div>
              <div className="p-2 border-r text-center">1</div>
              <div className="p-2 border-r text-center">G800</div>
              <div className="p-2 border-r text-center">300.00</div>
              <div className="p-2 border-r text-center">1</div>
              <div className="p-2 border-r"></div>
              <div className="p-2 border-r text-center">NPI</div>
              <div className="p-2 text-center">67926782</div>
            </div>
            
            {/* Empty service lines */}
            {[2, 3, 4, 5, 6].map(num => (
              <div key={num} className="grid grid-cols-12 border-b text-sm h-12">
                <div className="p-2 border-r text-center font-bold text-gray-400">{num}</div>
                <div className="p-2 border-r"></div>
                <div className="p-2 border-r"></div>
                <div className="p-2 border-r"></div>
                <div className="p-2 border-r"></div>
                <div className="p-2 border-r"></div>
                <div className="p-2 border-r"></div>
                <div className="p-2 border-r"></div>
                <div className="p-2 border-r"></div>
                <div className="p-2 border-r"></div>
                <div className="p-2 border-r text-center text-gray-400">NPI</div>
                <div className="p-2"></div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-3">
            <div className="border-r p-3">
              <div className="text-red-600 text-xs font-semibold mb-2">25. FEDERAL TAX I.D. NUMBER</div>
              <div className="font-medium">23456789</div>
            </div>
            <div className="border-r p-3">
              <div className="text-red-600 text-xs font-semibold mb-2">26. PATIENT'S ACCOUNT NO.</div>
              <div className="font-medium">56789290</div>
            </div>
            <div className="p-3">
              <div className="text-red-600 text-xs font-semibold mb-2">28. TOTAL CHARGE</div>
              <div className="font-medium">300.00</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Alerts */}
      {hasCodeMismatch && (
        <Card className="bg-red-50 border border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-800 text-sm font-medium mb-2">
              <XCircle className="w-4 h-4" />
              Procedure Code Mismatch Detected
            </div>
            <div className="text-red-700 text-sm">
              System code ({claimImageData.claimLineCodeSystem}) differs from claim image code ({claimImageData.claimLineCodeImage})
            </div>
          </CardContent>
        </Card>
      )}

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
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaimImage;