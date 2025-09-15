import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-gray via-background to-healthcare-gray flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            {/* <img src="../../public/logo.png" className="w-8 h-8 text-primary" /> */}
            <Stethoscope className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-foreground">
              Carelon ClaimDesk
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Practice claim edits and resolutions in a safe simulator.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Button 
            onClick={() => navigate("/search")}
            size="lg"
            className="w-full bg-primary hover:bg-healthcare-blue-dark text-primary-foreground font-semibold py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Start Simulator
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GetStarted;