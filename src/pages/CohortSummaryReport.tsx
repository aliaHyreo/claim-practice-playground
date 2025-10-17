import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CohortSummaryReport = () => {
    const navigate = useNavigate();

    const cohortData = [
        { id: "PR001", name: "James Anderson", scenarios: "507, 509, 597", completed: "3 out of 3", status: "Completed", score: "89" },
        { id: "PR002", name: "Ethan Parker", scenarios: "507, 509, 597", completed: "3 out of 3", status: "Completed", score: "74" },
        { id: "PR003", name: "Charlotte Hayes", scenarios: "507, 509, 597", completed: "3 out of 3", status: "Completed", score: "78" },
        { id: "PR004", name: "Lucas Bennett", scenarios: "507, 509, 597", completed: "1 out of 3", status: "Partial", score: "90" },
        { id: "PR005", name: "Grace Turner", scenarios: "507, 509, 597", completed: "2 out of 3", status: "Partial", score: "86" },
        { id: "PR006", name: "Henry Collins", scenarios: "507, 509, 597", completed: "0 out of 3", status: "Not Started", score: "—" },
        { id: "PR007", name: "Ella Reed", scenarios: "507, 509, 597", completed: "1 out of 3", status: "Partial", score: "72" },
        { id: "PR008", name: "Jack Foster", scenarios: "507, 509, 597", completed: "2 out of 3", status: "Partial", score: "81" },
        { id: "PR009", name: "Sophie Mitchell", scenarios: "507, 509, 597", completed: "3 out of 3", status: "Completed", score: "88" },
        { id: "PR010", name: "William Hart", scenarios: "507, 509, 597", completed: "2 out of 3", status: "Partial", score: "79" },
        { id: "PR011", name: "Lily Adams", scenarios: "507, 509, 597", completed: "3 out of 3", status: "Completed", score: "92" },
        { id: "PR012", name: "Isaac Cooper", scenarios: "507, 509, 597", completed: "1 out of 3", status: "Partial", score: "65" },
        { id: "PR013", name: "Emily Price", scenarios: "507, 509, 597", completed: "0 out of 3", status: "Not Started", score: "—" },
        { id: "PR014", name: "Benjamin Scott", scenarios: "507, 509, 597", completed: "3 out of 3", status: "Completed", score: "84" },
        { id: "PR015", name: "Ruby Hughes", scenarios: "507, 509, 597", completed: "2 out of 3", status: "Partial", score: "77" },
        { id: "PR016", name: "Samuel Wright", scenarios: "507, 509, 597", completed: "3 out of 3", status: "Completed", score: "90" },
        { id: "PR017", name: "Chloe Richardson", scenarios: "507, 509, 597", completed: "1 out of 3", status: "Partial", score: "70" },
        { id: "PR018", name: "Daniel Clark", scenarios: "507, 509, 597", completed: "2 out of 3", status: "Partial", score: "83" },
        { id: "PR019", name: "Isla Morgan", scenarios: "507, 509, 597", completed: "3 out of 3", status: "Completed", score: "88" },
        { id: "PR020", name: "Amelia Brooks", scenarios: "507, 509, 597", completed: "0 out of 3", status: "Not Started", score: "—" }
    ];

    return (
        <div className="min-h-screen bg-muted/30 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Cohort Summary Report - September 2025 (Week 1)</h1>
                    <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                </div>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Candidate Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Trainee ID</TableHead>
                                    <TableHead>Trainee Name</TableHead>
                                    <TableHead>Scenarios</TableHead>
                                    <TableHead>Completed</TableHead>
                                    <TableHead>Praxis Status</TableHead>
                                    <TableHead>Evaluation Score (%)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cohortData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.scenarios}</TableCell>
                                        <TableCell>{item.completed}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{item.score}</TableCell>
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

export default CohortSummaryReport;