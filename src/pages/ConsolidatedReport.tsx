import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConsolidatedReport = () => {
  const navigate = useNavigate();

  const consolidatedData = [
    {
      scenarioNumber: "507",
      title: "Eligibility Partial Edit Resolution",
      description: "All data matches perfectly! Patient information verified successfully.",
      totalIterations: 4,
      last3Iterations: "4/4 – 6 min,4/4 – 5 min,4/4 – 5 min",
      bestPerformance: "4/4 - 5 min",
    //   bestTime: "5 min",
      remarks: "Improved on 2nd iteration"
    },
    {
      scenarioNumber: "509",
      title: "Contract Validity Verification",
      description: "Service date falls within contract period and correct group applied. Payment can be processed!",
      totalIterations: 2,
      last3Iterations: "3/4 – 7 min,4/4 – 6 min,—",
      bestPerformance: "4/4 - 6 min",
    //   bestTime: "6 min",
      remarks: "All steps completed correctly"
    },
    {
      scenarioNumber: "597",
      title: "No Active Eligibility Verification",
      description: "Service date is outside contract period. Claim correctly DENIED for no active eligibility.",
      totalIterations: 2,
      last3Iterations: "4/5 – 4 min,5/5 – 3 min,—",
      bestPerformance: "5/5 - 3 min",
    //   bestTime: "3 min",
      remarks: "Perfect resolution in 2nd iteration"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Consolidated Scenario Report</h1>
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Summary of Scenarios Completed by James Anderson</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Total Iterations</TableHead>
                  <TableHead>Last 3 Iterations <br></br> (Performance / Time)</TableHead>
                  <TableHead>Best Performance</TableHead>
                  {/* <TableHead>Remarks</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {consolidatedData.map((item) => (
                  <TableRow key={item.scenarioNumber}>
                    <TableCell className="font-medium">{item.scenarioNumber}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className="max-w-md">{item.description}</TableCell>
                    <TableCell>{item.totalIterations}</TableCell>
                    <TableCell>
                    {item.last3Iterations.split(',').map((entry, index) => (
                        <span key={index}>
                        {entry.trim()}
                        <br />
                        </span>
                    ))}
                    </TableCell>
                    <TableCell>{item.bestPerformance}</TableCell>
                    {/* <TableCell>{item.bestTime}</TableCell> */}
                    {/* <TableCell>{item.remarks}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsolidatedReport;