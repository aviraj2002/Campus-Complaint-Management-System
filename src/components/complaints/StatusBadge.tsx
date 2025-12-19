import { Badge } from "@/components/ui/badge";
import type { ComplaintStatus } from "@/types";
import { Circle, CircleDashed, CircleCheck, UserCheck } from "lucide-react";

interface StatusBadgeProps {
  status: ComplaintStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles: Record<ComplaintStatus, { text: string; className: string; icon: React.ReactNode }> = {
    new: {
      text: "New",
      className: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700",
      icon: <Circle className="h-2.5 w-2.5 -ml-0.5 mr-1.5 fill-current" />
    },
    assigned: {
      text: "Assigned",
      className: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700",
      icon: <UserCheck className="h-3 w-3 -ml-0.5 mr-1.5" />
    },
    "in-progress": {
      text: "In Progress",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700",
      icon: <CircleDashed className="h-3 w-3 -ml-0.5 mr-1.5 animate-spin" />
    },
    resolved: {
      text: "Resolved",
      className: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
      icon: <CircleCheck className="h-3 w-3 -ml-0.5 mr-1.5" />
    },
  };

  const { text, className, icon } = statusStyles[status];

  return (
    <Badge variant="outline" className={`flex items-center ${className}`}>
      {icon}
      {text}
    </Badge>
  );
}
