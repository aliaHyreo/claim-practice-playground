import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ScenarioData {
  scenarioNumber: string;
  title: string;
  description: string;
  details?: string[];
}

const ScenarioReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scenarioData, setScenarioData] = useState<ScenarioData | null>(null);

  useEffect(() => {
    // Get scenario data from navigation state
    if (location.state && location.state.scenarioData) {
      setScenarioData(location.state.scenarioData);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-2 border-green-500 shadow-lg">
        <CardHeader className="bg-green-50 border-b-2 border-green-500">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
            <div>
              <CardTitle className="text-2xl text-green-900">
                🎉 Scenario Completed Successfully!
              </CardTitle>
              {scenarioData && (
                <p className="text-lg text-green-700 mt-1">
                  Scenario {scenarioData.scenarioNumber} - PASS
                </p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {scenarioData ? (
            <>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  {scenarioData.title}
                </h3>
                <p className="text-green-800">{scenarioData.description}</p>
              </div>

              {scenarioData.details && scenarioData.details.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Validation Details:</h4>
                  <ul className="space-y-2">
                    {scenarioData.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Report Summary</h4>
                <p className="text-sm text-muted-foreground">
                  This scenario has been validated and completed successfully. 
                  All requirements were met and the claim can be processed accordingly.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No scenario data available</p>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Button
              onClick={() => navigate("/search")}
              className="px-8 py-6 text-lg bg-primary hover:bg-primary/90"
            >
              Continue to Search Claims
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioReport;
