import { Badge } from "@/components/ui/badge";
import type { ComplaintPriority } from "@/types";

interface PriorityBadgeProps {
  priority: ComplaintPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const priorityStyles: Record<ComplaintPriority, string> = {
    low: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700",
    high: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
  };

  return (
    <Badge variant="outline" className={`capitalize ${priorityStyles[priority]}`}>
      {priority}
    </Badge>
  );
}
