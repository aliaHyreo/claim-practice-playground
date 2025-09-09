import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClaimsService, type EditDetail } from "@/services/claimsService";

interface EventResolutionProps {
  edits: string[];
}

const EventResolution = ({ edits }: EventResolutionProps) => {
  const editDetails = ClaimsService.getEditDetails(edits);

  return (
    <div className="space-y-4">
      {/* Info section */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is the claim number. These are the edits triggering on this case. Blue edits are soft edits (auto-resolved). 
            The highlighted one (507) requires manual resolution. This tab is read-only and shows event resolution details.
          </p>
        </CardContent>
      </Card>

      {/* Edits list */}
      <div className="space-y-3">
        {editDetails.map((edit) => (
          <Card
            key={edit.code}
            className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
              edit.status === 'critical' ? 'border-destructive/50 bg-destructive/5' : 'hover:bg-muted/30'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Badge
                  variant={edit.status === 'critical' ? 'destructive' : 'secondary'}
                  className="shrink-0 font-mono text-xs"
                >
                  {edit.code}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium leading-relaxed ${
                    edit.status === 'critical' 
                      ? 'text-destructive' 
                      : 'text-primary'
                  }`}>
                    {edit.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventResolution;