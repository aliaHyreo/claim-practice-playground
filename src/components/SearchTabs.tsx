import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClaimImage from "./ClaimImage";
import Member from "./Member";
import Pricing from "./Pricing";
import { SearchData } from "@/services/claimsService";

interface SearchTabsProps {
  searchData?: SearchData;
}

const SearchTabs = ({ searchData }: SearchTabsProps) => {
  if (!searchData) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-muted-foreground">No search data available.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="claim-image" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="claim-image" className="text-sm">
              Claim Image
            </TabsTrigger>
            <TabsTrigger value="member" className="text-sm">
              Member
            </TabsTrigger>
            <TabsTrigger value="pricing" className="text-sm">
              Pricing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="claim-image">
            <ClaimImage claimImageData={searchData.claimImage} />
          </TabsContent>

          <TabsContent value="member">
            <Member />
          </TabsContent>

          <TabsContent value="pricing">
            <Pricing />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SearchTabs;