import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TooltipTermProps {
  term: string;
  description: string;
  className?: string;
}

export default function TooltipTerm({ term, description, className }: TooltipTermProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex items-center border-b border-dotted border-muted-foreground/70 cursor-help",
            className
          )}
        >
          {term}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={6}>
        {description}
      </TooltipContent>
    </Tooltip>
  );
}
