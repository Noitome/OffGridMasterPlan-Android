import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TermTooltipProps {
  term: string;
  definition: string;
  className?: string;
}

export function TermTooltip({ term, definition, className = "" }: TermTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className={`underline decoration-dotted decoration-gray-400 underline-offset-4 cursor-help hover:text-blue-600 transition-colors ${className}`}>
            {term}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-sm bg-slate-900 text-white border-slate-800">
          <p>{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
