import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const Glossary = () => {
  const [isOpen, setIsOpen] = useState(true);

  const scenarioData = [
    {
      code: "507",
      title: "Eligibility Found is Partial",
      summary: "Imagine you are looking at a claim and see event 507. The system has found some eligibility for the member, but not for every service date. Here is how you resolve it.\n\nFirst, review the Event Resolution screen carefully. Always address events in the order they appear from top to bottom. Some events depend on others being resolved first.\n\nAsk yourself: is this claim related to a newborn? Newborn eligibility events have codes like 092, 280, 281, 503, GRC, or NBN. If it is a newborn claim, follow the newborn guidelines for resolution.\n\nIf it is not a newborn claim, go to Member Information and note the patient's name, date of birth, gender, service dates, group number, and account prefix. These details are your reference points.\n\nNext, manually compare these details with the original claim form using the Search tab. Check that the patient name and other details match exactly.\n\nIf the member name is not correctly mentioned, use the search function in Member Information to find the correct member using similar details from the original claim form. Apply the correct member information. Once applied, the issue highlighted by event 507 should be resolved, and the event will no longer appear in the claim. At this point, the claim is ready to proceed."
    },
    {
      code: "509",
      title: "Contract Not in Effect",
      summary: "Event 509 appears when the system recognizes the member's group, but the contract was not active for the service date. Think of it as the system saying, \"I know this group exists, but its coverage was not in force when the service happened.\"\n\nTo resolve this, go to Member Information and verify the group number along with the contract's effective and termination dates.\n\nCheck whether the member's group was active on the service date. If the contract was active but the claim was filed under the wrong group number, update the group ID manually.\n\nIt is also a good practice to check whether a new group ID or contract renewal exists that started after the old one ended. Often, updating to the correct contract resolves the 509 event quickly."
    },
    {
      code: "597",
      title: "No Active Eligibility",
      summary: "Event 597 is the clearest signal that the member does not have coverage for the service dates. The system is telling you, \"I checked everywhere, but I cannot find any active eligibility for this claim.\"\n\nBegin by verifying the member details and service dates in Member Information. Sometimes small data entry errors, like a wrong date, can trigger this event.\n\nNext, review the member's eligibility history for gaps. Perhaps coverage ended just before the service date or began after it. If no coverage exists for the billed period, the claim must be rejected.\n\nUse the correct reject codes for your scenario. Document clearly why the claim is being rejected so that the next reviewer understands your reasoning."
    }
  ];

  const glossaryTerms = [
    { term: "Eligibility Event", definition: "A system alert that flags a problem with the member's coverage or contract setup for the claim." },
    { term: "Newborn Eligibility Event", definition: "A special case (codes 092, 280, 281, 503, GRC, NBN) where newborns are added to coverage; handled by separate newborn guidelines." },
    { term: "Group Number / Group ID", definition: "Identifies the employer or policy group under which the member is covered." },
    { term: "Account Prefix", definition: "A short code that links the member's plan to the correct region or line of business." },
    { term: "Effective Date / Termination Date (TRMDT or END DATE)", definition: "Start and end dates of coverage; coverage is valid through midnight before the termination date." },
    { term: "ITS (Inter Plan Teleprocessing System)", definition: "Refers to Blue plan claims shared across home and host plans; affects which reject code to use." },
    { term: "Reject Codes", definition: "System codes (like R01030, R85030) used to indicate the reason for claim denial." },
    { term: "Event Resolution Panel", definition: "The simulator screen listing all system events on a claim. Always resolve from top to bottom." }
  ];

  return (
    <aside className={cn(
      "flex-shrink-0 transition-all duration-300 border-l border-border bg-background",
      isOpen ? "w-72" : "w-4"
    )}>
      <div className="relative h-full">
        {/* Toggle Button */}
        {/* <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-0 top-4 -translate-x-1/2 z-10 bg-card border-border shadow-md hover:bg-accent rounded-full"
        >
          {isOpen ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button> */}

        {/* Navigator Panel */}
        <div className={cn(
          "h-full transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <div className="border-b border-border p-4">
            <h2 className="text-1xl font-bold text-foreground flex items-center gap-2">
              <Compass className="h-4 w-4 text-primary" />
              Navigator
            </h2>
          </div>
          
          <div className="overflow-y-auto h-full p-4 space-y-6">
          {/* <div className="overflow-y-auto h-[calc(100vh-80px)] p-4 space-y-6"> */}
            {/* Row 1: App Summary */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Overview</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                In Praxis, each scenario is designed to simulate real-world claim processing, where sometimes a claim cannot be automatically approved and requires a user to step in.
                Among the most common eligibility events you will encounter are 507, 509, and 597. These events are your signals that something needs attention. They guide you to check the member's information, review group details, and confirm service dates.
                Think of it like this: the system is giving you clues. Your job is to follow the clues, verify the details, and decide whether the claim can be processed. If everything checks out, the claim can be paid. If the claim does not meet the eligibility requirements even after your review, it should be rejected.
                By paying close attention to these events, you gain confidence in handling claims accurately, just as you would in the real-world claim processing environment.
              </p>
            </div>

            {/* Row 2: Scenario Accordion */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Scenarios</h3>
              <Accordion type="single" collapsible className="w-full">
                {scenarioData.map((scenario) => (
                  <AccordionItem key={scenario.code} value={scenario.code}>
                    <AccordionTrigger className="text-sm hover:no-underline">
                      <span className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary">{scenario.code}</span>
                        <span className="text-xs text-muted-foreground">-</span>
                        <span className="text-xs">{scenario.title}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                        {scenario.summary}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Row 3: Glossary of Key Terms */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Glossary of Key Terms</h3>
              <div className="space-y-3">
                {glossaryTerms.map((item) => (
                  <div key={item.term} className="space-y-1">
                    <h4 className="font-semibold text-xs text-foreground">{item.term}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Glossary;
