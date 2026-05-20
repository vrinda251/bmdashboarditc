import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors align-middle ml-1"
          aria-label="More info"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs whitespace-pre-wrap leading-relaxed bg-popover text-popover-foreground border shadow-lg">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
