import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, User } from "lucide-react";
import Header from "@/components/Header";

interface IterationData {
  iteration: number;
  stepsCompletion: string[];
  totalStepsPassed: string;
  timeTakenMin: number;
  remarks: string;
}

interface ScenarioData {
  scenarioNumber: string;
  title: string;
  description: string;
  details?: string[];
  steps?: string[];
  table?: IterationData[];
}

const scenariosData: ScenarioData[] = [
  {
    scenarioNumber: "507",
    title: "Eligibility Partial Edit Resolution",
    description: "All data matches perfectly! Patient information verified successfully.",
    details: [
      "Patient Name: John Doe",
      "Birth Date: 01/15/1980",
      "Subscriber ID: SUB123456"
    ],
    steps: [
      "Note patient details from Member Information.",
      "Compare claim details with original claim form.",
      "Search & Apply correct member if name mismatch found",
      "Add the Pay-S action code.",
    ],
    table: [
      {
        iteration: 1,
        stepsCompletion: ["🟢", "⚪", "🟢", "⚪"],
        totalStepsPassed: "2/4",
        timeTakenMin: 3,
        remarks: "Missed DOB and forgot Pay-S code"
      },
      {
        iteration: 2,
        stepsCompletion: ["🟢", "🟢", "🟢", "🟢"],
        totalStepsPassed: "4/4",
        timeTakenMin: 5,
        remarks: "All steps completed correctly"
      }
    ]
  },
  {
    scenarioNumber: "509",
    title: "Contract Validity Verification",
    description: "Service date falls within contract period and correct group applied. Payment can be processed!",
    details: [
      "Service Date: 03/15/2024",
      "Contract Period: 01/01/2024 to 12/31/2024",
      "Applied Group: GRP789"
    ],
    steps: [
      "Verify that the patient name and other information match.",
      "Verify if the group was active on the service date.",
      "Update group ID if the claim was filed under the wrong group.",
      "Add the Pay-S action code.",
    ],
    table: [
      {
        iteration: 1,
        stepsCompletion: ["⚪", "⚪", "🟢", "🟢"],
        totalStepsPassed: "2/4",
        timeTakenMin: 2,
        remarks: "Incorrect patient name"
      },
      {
        iteration: 2,
        stepsCompletion: ["🟢", "🟢", "🟢", "🟢"],
        totalStepsPassed: "4/4",
        timeTakenMin: 6,
        remarks: "All steps completed correctly"
      }
    ]
  },
  {
    scenarioNumber: "597",
    title: "No Active Eligibility Verification",
    description: "Service date is outside contract period. Claim correctly DENIED for no active eligibility.",
    details: [
      "Service Date: 06/20/2023",
      "Contract Period: 01/01/2024 to 12/31/2024",
      "Action Taken: DENY"
    ],
    steps: [
      "Verify member details and service dates in Member Information.",
      "Check eligibility history for any coverage gaps.",
      "Confirm if no active coverage exists for the billed period.",
      "Add the Deny-X action code.",
      "Reject the claim if coverage is not active."
    ],
    table: [
      {
        iteration: 1,
        stepsCompletion: ["⚪", "⚪", "⚪", "⚪", "🟢"],
        totalStepsPassed: "1/5",
        timeTakenMin: 3,
        remarks: "Wrong service date"
      },
      {
        iteration: 2,
        stepsCompletion: ["🟢", "🟢", "🟢", "🟢", "🟢"],
        totalStepsPassed: "5/5",
        timeTakenMin: 4,
        remarks: "All steps completed correctly"
      }
    ]
  }
];

const ScenarioReport = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-64px)] bg-background p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Report Header */}
          <Card className="mb-6">
            <CardHeader className="bg-primary/5">
              <div className="flex items-center gap-4">
                <User className="w-12 h-12 text-primary" />
                <div>
                  <CardTitle className="text-3xl">Consolidated Performance Report</CardTitle>
                  <p className="text-lg text-muted-foreground mt-1">
                    Candidate: James Anderson
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Scenarios Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {scenariosData.map((scenario) => (
              <AccordionItem 
                key={scenario.scenarioNumber} 
                value={scenario.scenarioNumber}
                className="border rounded-lg bg-card"
              >
                <AccordionTrigger className="px-6 hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-lg">
                        Scenario {scenario.scenarioNumber} - {scenario.title}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {scenario.description}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-4">
                    {/* Details */}
                    {scenario.details && scenario.details.length > 0 && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-3">Validation Details:</h4>
                        <ul className="space-y-2">
                          {scenario.details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Steps */}
                    {scenario.steps && scenario.steps.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Steps:</h4>
                        <ol className="space-y-2 list-decimal list-inside">
                          {scenario.steps.map((step, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Iterations Table */}
                    {scenario.table && scenario.table.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Performance Data:</h4>
                        <div className="overflow-x-auto rounded-lg border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-24">Iteration</TableHead>
                                <TableHead>Steps Completion</TableHead>
                                <TableHead className="w-40">Total Steps Passed</TableHead>
                                <TableHead className="w-32">Time (min)</TableHead>
                                <TableHead>Remarks</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {scenario.table.map((row, index) => (
                                <TableRow
                                  key={index}
                                  className={
                                    index === scenario.table!.length - 1
                                      ? "bg-green-50 dark:bg-green-950/20"
                                      : ""
                                  }
                                >
                                  <TableCell className="font-medium">
                                    {row.iteration}
                                  </TableCell>
                                  <TableCell className="font-mono text-lg">
                                    {row.stepsCompletion.join(" ")}
                                  </TableCell>
                                  <TableCell className="font-semibold">
                                    {row.totalStepsPassed}
                                  </TableCell>
                                  <TableCell>{row.timeTakenMin}</TableCell>
                                  <TableCell className="text-sm">
                                    {row.remarks}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Summary Card */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h4 className="font-semibold text-foreground mb-2">Overall Summary</h4>
              <p className="text-sm text-muted-foreground mb-4">
                All {scenariosData.length} scenarios have been completed and validated successfully. 
                The candidate demonstrated proficiency across all test scenarios with progressive improvement in iteration performance.
              </p>
              <div className="flex justify-center pt-2">
                <Button
                  onClick={() => navigate("/search")}
                  size="lg"
                >
                  Back to Search Claims
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ScenarioReport;
