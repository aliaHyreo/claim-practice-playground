import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const Glossary = () => {
  const [isOpen, setIsOpen] = useState(false);

  const glossaryItems = [
    {
      code: "507",
      title: "Eligibility Found is Partial",
      description: "Member eligibility information is incomplete or partially available in the system."
    },
    {
      code: "509",
      title: "Contract Not in Effect",
      description: "The contract is not active or valid for the specified group/member during the service dates."
    },
    {
      code: "597",
      title: "No Active Eligibility",
      description: "No active eligibility found for the member on the dates of service submitted."
    }
  ];

  return (
    <div className={cn(
      "fixed right-0 top-0 h-screen transition-all duration-300 z-40",
      isOpen ? "w-80" : "w-12"
    )}>
      <div className="relative h-full">
        {/* Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50 bg-card border-border shadow-md hover:bg-accent rounded-full"
        >
          {isOpen ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        {/* Glossary Panel */}
        <Card className={cn(
          "h-full rounded-none border-l border-t-0 border-r-0 border-b-0 transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Glossary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
            <div className="space-y-4">
              {glossaryItems.map((item) => (
                <div
                  key={item.code}
                  className="p-3 rounded-lg bg-muted/50 border border-border hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono font-bold text-primary">{item.code}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Glossary;
