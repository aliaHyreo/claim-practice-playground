import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { ClaimImageData } from "@/services/claimsService";
import { Input } from "@/components/ui/input";

interface ClaimImageProps {
  claimImageData: ClaimImageData;
}

const ClaimImage = ({ claimImageData }: ClaimImageProps) => {
  // Handle null or undefined claimImageData
  if (!claimImageData) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">No claim image data available.</div>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: '2-digit' 
    });
  };

  const hasCodeMismatch = claimImageData?.claimLineCodeSystem !== claimImageData?.claimLineCodeImage;

  return (
    <div className="space-y-6">
      {/* HCFA Form */}
      <Card className="bg-white rounded-xl shadow max-w-full overflow-hidden">
        <CardHeader className="border-b bg-gray-50 rounded-t-xl p-2">
          <div className="flex items-start justify-between">
            {/* QR Code */}
            <div className="w-20 h-20 bg-black border-2 border-gray-800 flex flex-col items-center justify-center text-white text-xs">
              <div className="grid grid-cols-6 gap-0.5 w-16 h-16">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`} />
                ))}
              </div>
            </div>
            
            <div className="flex-1 text-center px-4">
              <CardTitle className="text-xl font-bold text-red-600 mb-1">
                HEALTH INSURANCE CLAIM FORM
              </CardTitle>
              <div className="text-xs text-red-500">
                APPROVED BY NATIONAL UNIFORM CLAIM COMMITTEE (NUCC) 02/12
              </div>
            </div>
            
            <div className="w-20 h-20 border-2 border-gray-800 bg-gray-50 flex items-center justify-center text-xs text-gray-800 font-bold">
              PICA
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Top Section - Insurance Type */}
          <div className="grid grid-cols-8 border-b border-gray-800">
            <div className="col-span-4 border-r border-gray-800">
              <div className="p-1 border-b border-gray-800 bg-red-50">
                <span className="text-red-600 text-xs font-bold">1. MEDICARE   MEDICAID   TRICARE   CHAMPVA</span>
              </div>
              <div className="p-2 grid grid-cols-4 gap-2">
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1 w-3 h-3" />
                  Medicare
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1 w-3 h-3" />
                  Medicaid
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1 w-3 h-3" />
                  TRICARE CHAMPUS
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1 w-3 h-3" />
                  CHAMPVA
                </label>
              </div>
            </div>
            
            <div className="col-span-2 border-r border-gray-800">
              <div className="p-1 border-b border-gray-800 bg-red-50">
                <span className="text-red-600 text-xs font-bold">GROUP HEALTH PLAN</span>
              </div>
              <div className="p-2">
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1 w-3 h-3" />
                  FECA
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1 w-3 h-3" />
                  BLK LUNG
                </label>
              </div>
            </div>
            
            <div className="col-span-1 border-r border-gray-800">
              <div className="p-1 border-b border-gray-800 bg-red-50">
                <span className="text-red-600 text-xs font-bold">OTHER</span>
              </div>
              <div className="p-2 text-center">
                <span className="text-xs">(ID#)</span>
              </div>
            </div>
            
            <div className="col-span-1">
              <div className="p-1 border-b border-gray-800 bg-red-50">
                <span className="text-red-600 text-xs font-bold">1a. INSURED'S I.D. NUMBER</span>
              </div>
              <div className="p-2">
                <Input defaultValue="EMN23466789" className="text-xs h-6 border-none" />
              </div>
            </div>
          </div>

          {/* Patient Information Section */}
          <div className="grid grid-cols-3 border-b border-gray-800">
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">2. PATIENT'S NAME (Last Name, First Name, Middle Initial)</span>
              </div>
              <div className="p-2">
                <Input defaultValue="John,Wick" className="text-sm h-6 border-none font-medium" />
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">3. PATIENT'S BIRTH DATE</span>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-3 gap-1 mb-2">
                  <Input defaultValue="08" className="text-center h-6 text-xs border" />
                  <Input defaultValue="18" className="text-center h-6 text-xs border" />
                  <Input defaultValue="1982" className="text-center h-6 text-xs border" />
                </div>
                <div className="text-xs text-gray-600 mb-2">MM   DD   YY</div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold">SEX</span>
                  <label className="flex items-center text-xs">
                    <input type="checkbox" checked className="mr-1 w-3 h-3" />
                    M
                  </label>
                  <label className="flex items-center text-xs">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    F
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">4. INSURED'S NAME (Last Name, First Name, Middle Initial)</span>
              </div>
              <div className="p-2">
                <Input defaultValue="James Clinic" className="text-sm h-6 border-none" />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-3 border-b border-gray-800">
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">5. PATIENT'S ADDRESS (No., Street)</span>
              </div>
              <div className="p-2 space-y-1">
                <Input defaultValue="25689 Avenue" className="text-sm h-6 border-none" />
                <div className="grid grid-cols-2 gap-1">
                  <div>
                    <div className="text-xs text-gray-600">CITY</div>
                    <Input defaultValue="Highway 16S, Lake , Michigan" className="text-xs h-5 border-none" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">STATE</div>
                    <Input defaultValue="WI" className="text-xs h-5 border-none" />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">ZIP CODE</div>
                  <Input defaultValue="41701" className="text-xs h-5 border-none" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">TELEPHONE (Include Area Code)</div>
                  <Input defaultValue="(" className="text-xs h-5 border-none w-8 inline" />
                  <Input defaultValue=")" className="text-xs h-5 border-none w-8 inline ml-6" />
                </div>
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">6. PATIENT RELATIONSHIP TO INSURED</span>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    Self
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" checked className="mr-1 w-3 h-3" />
                    Spouse
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    Child
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    Other
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">7. INSURED'S ADDRESS (No., Street)</span>
              </div>
              <div className="p-2 space-y-1">
                <Input defaultValue="2426 BERKSHIRE AV" className="text-sm h-6 border-none" />
                <div className="grid grid-cols-2 gap-1">
                  <div>
                    <div className="text-xs text-gray-600">CITY</div>
                    <Input defaultValue="Fox Cities" className="text-xs h-5 border-none" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">STATE</div>
                    <Input defaultValue="WI" className="text-xs h-5 border-none" />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">ZIP CODE</div>
                  <Input defaultValue="44011" className="text-xs h-5 border-none" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">TELEPHONE (Include Area Code)</div>
                  <Input defaultValue="(" className="text-xs h-5 border-none w-8 inline" />
                  <Input defaultValue=")" className="text-xs h-5 border-none w-8 inline ml-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Sections */}
          <div className="grid grid-cols-3 border-b border-gray-800">
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">8. RESERVED FOR NUCC USE</span>
              </div>
              <div className="p-2 space-y-1">
                <div className="flex gap-2">
                  <label className="flex items-center text-xs">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    YES
                  </label>
                  <label className="flex items-center text-xs">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    NO
                  </label>
                </div>
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">9. OTHER ACCIDENT?</span>
              </div>
              <div className="p-2">
                <div className="flex gap-2 text-xs">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    YES
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    NO
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">9. INSURANCE PLAN NAME OR PROGRAM NAME</span>
              </div>
              <div className="p-2">
                <Input defaultValue="ANTHEM BLUE CROSS AND BLUE SHIELD" className="text-xs h-6 border-none" />
              </div>
            </div>
          </div>

          {/* Insurance Plan Section */}
          <div className="grid grid-cols-3 border-b border-gray-800">
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">d. INSURANCE PLAN NAME OR PROGRAM NAME</span>
              </div>
              <div className="p-2">
                <Input defaultValue="" className="text-xs h-6 border-none" />
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">10a. CLAIM CODES (Designated by NUCC)</span>
              </div>
              <div className="p-2">
                <Input defaultValue="" className="text-xs h-6 border-none" />
              </div>
            </div>
            
            <div>
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">d. IS THERE ANOTHER HEALTH BENEFIT PLAN?</span>
              </div>
              <div className="p-2">
                <div className="flex gap-2 text-xs">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    YES
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    NO
                  </label>
                </div>
                <div className="text-xs mt-1">If yes, complete items 9, 9a, and 9d.</div>
              </div>
            </div>
          </div>

          {/* Patient Signature Section */}
          <div className="border-b border-gray-800">
            <div className="p-1 bg-red-50 border-b border-gray-800">
              <span className="text-red-600 text-xs font-bold">READ BACK OF FORM BEFORE COMPLETING & SIGNING THIS FORM.</span>
            </div>
            <div className="grid grid-cols-2 h-20">
              <div className="border-r border-gray-800 p-2">
                <div className="text-xs text-gray-600 mb-2">12. PATIENT'S OR AUTHORIZED PERSON'S SIGNATURE I authorize the release of any medical or other information necessary to process this claim. I also request payment of government benefits either to myself or to the party who accepts assignment below.</div>
                <div className="mt-4">
                  <Input defaultValue="Y" className="text-center w-12 h-6 text-xs border-b border-gray-800 border-t-0 border-l-0 border-r-0" />
                  <span className="text-xs ml-4">SIGNED</span>
                  <Input defaultValue="" className="ml-8 w-20 h-6 text-xs border-b border-gray-800 border-t-0 border-l-0 border-r-0" />
                  <span className="text-xs ml-4">DATE</span>
                </div>
              </div>
              <div className="p-2">
                <div className="text-xs text-gray-600 mb-2">13. INSURED'S OR AUTHORIZED PERSON'S SIGNATURE I authorize payment of medical benefits to the undersigned physician or supplier for services described below.</div>
                <div className="mt-4">
                  <Input defaultValue="P" className="text-center w-12 h-6 text-xs border-b border-gray-800 border-t-0 border-l-0 border-r-0" />
                  <span className="text-xs ml-4">SIGNED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Illness/Injury Section */}
          <div className="grid grid-cols-3 border-b border-gray-800">
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">14. DATE OF CURRENT ILLNESS, INJURY, or PREGNANCY (LMP)</span>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-3 gap-1">
                  <Input defaultValue="" className="text-center h-5 text-xs border" />
                  <Input defaultValue="" className="text-center h-5 text-xs border" />
                  <Input defaultValue="" className="text-center h-5 text-xs border" />
                </div>
                <div className="text-xs text-gray-600 mt-1">MM   DD   YY</div>
                <div className="text-xs text-gray-600 mt-1">QUAL</div>
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">15. OTHER DATE</span>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-3 gap-1">
                  <Input defaultValue="" className="text-center h-5 text-xs border" />
                  <Input defaultValue="" className="text-center h-5 text-xs border" />
                  <Input defaultValue="" className="text-center h-5 text-xs border" />
                </div>
                <div className="text-xs text-gray-600 mt-1">MM   DD   YY</div>
                <div className="text-xs text-gray-600 mt-1">QUAL</div>
              </div>
            </div>
            
            <div>
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">16. DATES PATIENT UNABLE TO WORK IN CURRENT OCCUPATION</span>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-6 gap-1">
                  <div>
                    <div className="text-xs text-gray-600">FROM</div>
                    <Input defaultValue="" className="text-center h-5 text-xs border" />
                    <div className="text-xs text-gray-600">MM</div>
                  </div>
                  <div>
                    <Input defaultValue="" className="text-center h-5 text-xs border mt-4" />
                    <div className="text-xs text-gray-600">DD</div>
                  </div>
                  <div>
                    <Input defaultValue="" className="text-center h-5 text-xs border mt-4" />
                    <div className="text-xs text-gray-600">YY</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">TO</div>
                    <Input defaultValue="" className="text-center h-5 text-xs border" />
                    <div className="text-xs text-gray-600">MM</div>
                  </div>
                  <div>
                    <Input defaultValue="" className="text-center h-5 text-xs border mt-4" />
                    <div className="text-xs text-gray-600">DD</div>
                  </div>
                  <div>
                    <Input defaultValue="" className="text-center h-5 text-xs border mt-4" />
                    <div className="text-xs text-gray-600">YY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Provider Information */}
          <div className="grid grid-cols-3 border-b border-gray-800">
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">17. NAME OF REFERRING PROVIDER OR OTHER SOURCE</span>
              </div>
              <div className="p-2">
                <Input defaultValue="DN" className="text-sm h-6 border-none w-8 inline" />
                <Input defaultValue="Kim , Konch" className="text-sm h-6 border-none inline ml-2" />
                <div className="mt-2 grid grid-cols-2 gap-1">
                  <div>
                    <div className="text-xs text-gray-600">17a</div>
                    <Input defaultValue="" className="text-xs h-5 border-none" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">17b NPI</div>
                    <Input defaultValue="5974200" className="text-xs h-5 border-none" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">18. HOSPITALIZATION DATES RELATED TO CURRENT SERVICES</span>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-6 gap-1">
                  <div>
                    <div className="text-xs text-gray-600">FROM</div>
                    <Input defaultValue="" className="text-center h-5 text-xs border" />
                    <div className="text-xs text-gray-600">MM</div>
                  </div>
                  <div>
                    <Input defaultValue="" className="text-center h-5 text-xs border mt-4" />
                    <div className="text-xs text-gray-600">DD</div>
                  </div>
                  <div>
                    <Input defaultValue="" className="text-center h-5 text-xs border mt-4" />
                    <div className="text-xs text-gray-600">YY</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">TO</div>
                    <Input defaultValue="" className="text-center h-5 text-xs border" />
                    <div className="text-xs text-gray-600">MM</div>
                  </div>
                  <div>
                    <Input defaultValue="" className="text-center h-5 text-xs border mt-4" />
                    <div className="text-xs text-gray-600">DD</div>
                  </div>
                  <div>
                    <Input defaultValue="" className="text-center h-5 text-xs border mt-4" />
                    <div className="text-xs text-gray-600">YY</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">20. OUTSIDE LAB?</span>
              </div>
              <div className="p-2">
                <div className="flex gap-2 text-xs mb-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    YES
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    NO
                  </label>
                </div>
                <div className="text-xs font-bold">$ CHARGES</div>
              </div>
            </div>
          </div>

          {/* Additional Claim Information */}
          <div className="border-b border-gray-800">
            <div className="p-1 bg-red-50 border-b border-gray-800">
              <span className="text-red-600 text-xs font-bold">19. ADDITIONAL CLAIM INFORMATION (Designated by NUCC)</span>
            </div>
            <div className="p-2">
              <Input defaultValue="" className="text-xs h-6 border-none w-full" />
            </div>
          </div>

          {/* Diagnosis Information */}
          <div className="border-b border-gray-800">
            <div className="p-1 bg-red-50 border-b border-gray-800">
              <span className="text-red-600 text-xs font-bold">21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY Relate A-L to service line below (24E)</span>
              <span className="ml-8 text-xs font-bold">ICD Ind</span>
            </div>
            <div className="p-2">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-xs">A. <Input defaultValue="G800" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                  <div className="text-xs mt-1">E. <Input defaultValue="" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                  <div className="text-xs mt-1">I. <Input defaultValue="" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                </div>
                <div>
                  <div className="text-xs">B. <Input defaultValue="" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                  <div className="text-xs mt-1">F. <Input defaultValue="" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                  <div className="text-xs mt-1">J. <Input defaultValue="" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                </div>
                <div>
                  <div className="text-xs">C. <Input defaultValue="" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                  <div className="text-xs mt-1">G. <Input defaultValue="" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                  <div className="text-xs mt-1">K. <Input defaultValue="" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                </div>
                <div>
                  <div className="text-xs">D. <Input defaultValue="" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                  <div className="text-xs mt-1">H. <Input defaultValue="" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                  <div className="text-xs mt-1">L. <Input defaultValue="" className="text-xs h-6 border-b border-gray-800 border-t-0 border-l-0 border-r-0 inline w-16" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Lines Section */}
          <div className="border-b border-gray-800">
            <div className="p-1 bg-red-50 border-b border-gray-800">
              <span className="text-red-600 text-xs font-bold">24. A. DATES OF SERVICE   B.   C.   D. PROCEDURES, SERVICES, OR SUPPLIES   E.   F.   G.   H.   I.   J.   RENDERING</span>
            </div>
            
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-gray-100 border-b border-gray-800 text-xs font-bold">
              <div className="p-1 border-r border-gray-800 text-center">A</div>
              <div className="p-1 border-r border-gray-800 text-center">
                <div>From</div>
                <div>MM  DD  YY</div>
                <div>To</div>
                <div>MM  DD  YY</div>
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <div>B</div>
                <div>PLACE OF</div>
                <div>SERVICE</div>
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <div>C</div>
                <div>EMG</div>
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <div>D</div>
                <div>PROCEDURES, SERVICES, OR SUPPLIES</div>
                <div>(Explain Unusual Circumstances)</div>
                <div>CPT/HCPCS          MODIFIER</div>
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <div>E</div>
                <div>DIAGNOSIS</div>
                <div>POINTER</div>
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <div>F</div>
                <div>$ CHARGES</div>
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <div>G</div>
                <div>DAYS</div>
                <div>OR</div>
                <div>UNITS</div>
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <div>H</div>
                <div>EPSDT</div>
                <div>Family</div>
                <div>Plan</div>
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <div>I</div>
                <div>ID.</div>
                <div>QUAL</div>
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <div>J</div>
                <div>RENDERING</div>
                <div>PROVIDER ID. #</div>
              </div>
              <div className="p-1 text-center">
                <div>A</div>
                <div>NEPATIENT</div>
                <div>I</div>
                <div>OR</div>
                <div>PHYSICALN</div>
              </div>
            </div>
            
            {/* Service Line 1 */}
            <div className="grid grid-cols-12 border-b border-gray-800 text-sm">
              <div className="p-1 border-r border-gray-800 text-center font-bold">1</div>
              <div className="p-1 border-r border-gray-800">
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <Input defaultValue="08" className="text-center h-5 border-none px-0" />
                  <Input defaultValue="03" className="text-center h-5 border-none px-0" />
                  <Input defaultValue="23" className="text-center h-5 border-none px-0" />
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs mt-1">
                  <Input defaultValue="08" className="text-center h-5 border-none px-0" />
                  <Input defaultValue="03" className="text-center h-5 border-none px-0" />
                  <Input defaultValue="23" className="text-center h-5 border-none px-0" />
                </div>
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <Input defaultValue="12" className="text-center h-6 text-xs border-none" />
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <Input defaultValue="" className="text-center h-6 text-xs border-none" />
              </div>
              <div className="p-1 border-r border-gray-800">
                <Input defaultValue="E0973" className="text-xs h-6 border-none" />
                <div className="grid grid-cols-4 gap-1 mt-1">
                  <Input defaultValue="NU" className="text-center h-5 text-xs border-none" />
                  <Input defaultValue="EU" className="text-center h-5 text-xs border-none" />
                  <Input defaultValue="KX" className="text-center h-5 text-xs border-none" />
                  <Input defaultValue="" className="text-center h-5 text-xs border-none" />
                </div>
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <Input defaultValue="1" className="text-center h-6 text-xs border-none" />
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <Input defaultValue="300.00" className="text-center h-6 text-xs border-none" />
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <Input defaultValue="1" className="text-center h-6 text-xs border-none" />
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <Input defaultValue="" className="text-center h-6 text-xs border-none" />
              </div>
              <div className="p-1 border-r border-gray-800 text-center">
                <span className="text-xs">NPI</span>
              </div>
              <div className="p-1 text-center">
                <Input defaultValue="67926782" className="text-center h-6 text-xs border-none" />
              </div>
            </div>
            
            {/* Empty service lines */}
            {[2, 3, 4, 5, 6].map(num => (
              <div key={num} className="grid grid-cols-12 border-b border-gray-800 text-sm h-12">
                <div className="p-1 border-r border-gray-800 text-center font-bold text-gray-400">{num}</div>
                <div className="p-1 border-r border-gray-800">
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <Input defaultValue="" className="text-center h-4 border-none" />
                    <Input defaultValue="" className="text-center h-4 border-none" />
                    <Input defaultValue="" className="text-center h-4 border-none" />
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-xs mt-1">
                    <Input defaultValue="" className="text-center h-4 border-none" />
                    <Input defaultValue="" className="text-center h-4 border-none" />
                    <Input defaultValue="" className="text-center h-4 border-none" />
                  </div>
                </div>
                <div className="p-1 border-r border-gray-800 text-center">
                  <Input defaultValue="" className="text-center h-6 text-xs border-none" />
                </div>
                <div className="p-1 border-r border-gray-800 text-center">
                  <Input defaultValue="" className="text-center h-6 text-xs border-none" />
                </div>
                <div className="p-1 border-r border-gray-800">
                  <Input defaultValue="" className="text-xs h-6 border-none" />
                </div>
                <div className="p-1 border-r border-gray-800 text-center">
                  <Input defaultValue="" className="text-center h-6 text-xs border-none" />
                </div>
                <div className="p-1 border-r border-gray-800 text-center">
                  <Input defaultValue="" className="text-center h-6 text-xs border-none" />
                </div>
                <div className="p-1 border-r border-gray-800 text-center">
                  <Input defaultValue="" className="text-center h-6 text-xs border-none" />
                </div>
                <div className="p-1 border-r border-gray-800 text-center">
                  <Input defaultValue="" className="text-center h-6 text-xs border-none" />
                </div>
                <div className="p-1 border-r border-gray-800 text-center">
                  <span className="text-xs text-gray-400">NPI</span>
                </div>
                <div className="p-1 text-center">
                  <Input defaultValue="" className="text-center h-6 text-xs border-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section - Resubmission and Prior Authorization */}
          <div className="grid grid-cols-3 border-b border-gray-800">
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">22. RESUBMISSION CODE</span>
              </div>
              <div className="p-2">
                <Input defaultValue="" className="text-xs h-6 border-none w-full" />
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">ORIGINAL REF. NO.</span>
              </div>
              <div className="p-2">
                <Input defaultValue="" className="text-xs h-6 border-none w-full" />
              </div>
            </div>
            
            <div>
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">23. PRIOR AUTHORIZATION NUMBER</span>
              </div>
              <div className="p-2">
                <Input defaultValue="" className="text-xs h-6 border-none w-full" />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-6 border-b border-gray-800">
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">25. FEDERAL TAX I.D. NUMBER</span>
              </div>
              <div className="p-2">
                <Input defaultValue="23456789" className="text-sm h-6 border-none" />
                <div className="text-xs mt-1">SSN EIN</div>
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">26. PATIENT'S ACCOUNT NO.</span>
              </div>
              <div className="p-2">
                <Input defaultValue="56789290" className="text-sm h-6 border-none" />
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">27. ACCEPT ASSIGNMENT? (For govt claims, see back)</span>
              </div>
              <div className="p-2">
                <div className="flex gap-2 text-xs">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    YES
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    NO
                  </label>
                </div>
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">28. TOTAL CHARGE</span>
              </div>
              <div className="p-2">
                <Input defaultValue="0.00" className="text-sm h-6 border-none" />
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">29. AMOUNT PAID</span>
              </div>
              <div className="p-2">
                <Input defaultValue="300.00" className="text-sm h-6 border-none" />
              </div>
            </div>
            
            <div>
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">30. Rsvd for NUCC Use</span>
              </div>
              <div className="p-2">
                <Input defaultValue="" className="text-sm h-6 border-none" />
              </div>
            </div>
          </div>

          {/* Provider Information Section */}
          <div className="grid grid-cols-3 border-b border-gray-800">
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">31. SIGNATURE OF PHYSICIAN OR SUPPLIER INCLUDING DEGREES OR CREDENTIALS</span>
              </div>
              <div className="p-2 space-y-1">
                <div className="text-xs">(I certify that the statements on the reverse apply to this bill and are made a part thereof.)</div>
                <div className="mt-4">
                  <Input defaultValue="" className="w-full h-6 text-xs border-b border-gray-800 border-t-0 border-l-0 border-r-0" />
                  <span className="text-xs">SIGNED</span>
                  <Input defaultValue="" className="ml-8 w-20 h-6 text-xs border-b border-gray-800 border-t-0 border-l-0 border-r-0" />
                  <span className="text-xs ml-4">DATE</span>
                </div>
              </div>
            </div>
            
            <div className="border-r border-gray-800">
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">32. SERVICE FACILITY LOCATION INFORMATION</span>
              </div>
              <div className="p-2 space-y-1">
                <Input defaultValue="MILLERS RENTAL" className="text-sm h-6 border-none" />
                <Input defaultValue="203 ROMIG RD" className="text-sm h-6 border-none" />
                <Input defaultValue="NY 0954642" className="text-sm h-6 border-none" />
                <div className="mt-2">
                  <div className="text-xs">a <Input defaultValue="5987543" className="text-xs h-5 border-none inline w-16" /></div>
                  <div className="text-xs">b <Input defaultValue="" className="text-xs h-5 border-none inline w-16" /></div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="p-1 bg-red-50 border-b border-gray-800">
                <span className="text-red-600 text-xs font-bold">33. BILLING PROVIDER INFO & PH #</span>
              </div>
              <div className="p-2 space-y-1">
                <Input defaultValue="MILLERS RENTAL" className="text-sm h-6 border-none" />
                <Input defaultValue="203 ROMIG RD" className="text-sm h-6 border-none" />
                <Input defaultValue="NY 0954642" className="text-sm h-6 border-none" />
                <div className="mt-2">
                  <div className="text-xs">a <Input defaultValue="12345678" className="text-xs h-5 border-none inline w-16" /> <Input defaultValue="5987543" className="text-xs h-5 border-none inline w-16" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Instructions */}
          <div className="bg-white p-2 text-center">
            <div className="text-xs text-red-600 font-bold">
              NUCC Instruction Manual available at www.nucc.org
            </div>
            <div className="text-xs text-center mt-2">
              PLEASE PRINT OR TYPE
            </div>
            <div className="text-xs text-right font-bold">
              APPROVED OMB-0938-1197 FORM 1500 (02-12)
            </div>
            <div className="text-xs text-right mt-2 border border-gray-800 inline-block px-2 py-1">
              <strong>Clear Form*</strong>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Alerts */}
      {/* hasCodeMismatch && (
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
      )*/} 

      {/* Eligibility Validation Section */}
      {/* <Card className="bg-yellow-50 border border-yellow-200">
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
      </Card> */}
    </div>
  );
};

export default ClaimImage;