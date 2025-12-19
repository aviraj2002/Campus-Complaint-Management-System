"use client";

import type { Complaint, User } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { assignStaff, updateStatus } from "@/app/actions/complaints";
import { useToast } from "@/hooks/use-toast";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { Calendar, User as UserIcon, Tag, MessageSquare, Loader2 } from "lucide-react";
import { format } from "date-fns";
import React from "react";

interface ComplaintCardProps {
  complaint: Complaint;
  currentUser: User;
  staffList?: User[];
}

export function ComplaintCard({ complaint, currentUser, staffList = [] }: ComplaintCardProps) {
  const { toast } = useToast();
  const [isAssigning, setIsAssigning] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleAssignStaff = async (staffId: string) => {
    setIsAssigning(true);
    const result = await assignStaff(complaint.id, staffId);
    if (result?.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Staff assigned successfully." });
    }
    setIsAssigning(false);
  };

  const handleUpdateStatus = async (status: "in-progress" | "resolved") => {
    setIsUpdating(true);
    const result = await updateStatus(complaint.id, status);
    if (result?.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Status updated successfully." });
    }
    setIsUpdating(false);
  };
  
  const assignedStaff = staffList.find(staff => staff.uid === complaint.assignedStaffId);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
            <CardTitle className="font-headline text-lg mb-2">{complaint.title}</CardTitle>
            <StatusBadge status={complaint.status} />
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(complaint.createdAt), "PPP")}</span>
          </div>
          <PriorityBadge priority={complaint.priority} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 text-sm">
            <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <p className="text-muted-foreground">{complaint.description}</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium capitalize">{complaint.category}</span>
        </div>
        { (currentUser.role === 'admin' || currentUser.role === 'staff') &&
          <div className="flex items-center gap-3 text-sm">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span>Student: {complaint.student?.name || 'Unknown'} ({complaint.student?.email || 'N/A'})</span>
          </div>
        }
        { assignedStaff &&
          <div className="flex items-center gap-3 text-sm">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span>Assigned to: {assignedStaff.name} ({assignedStaff.email})</span>
          </div>
        }
      </CardContent>
      <CardFooter>
        {currentUser.role === 'admin' && (
          <div className="flex items-center gap-2">
            <Select onValueChange={handleAssignStaff} disabled={isAssigning}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assign to Staff" />
              </SelectTrigger>
              <SelectContent>
                {staffList.map((staff) => (
                  <SelectItem key={staff.uid} value={staff.uid}>
                    {staff.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isAssigning && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
        )}
        {(currentUser.role === 'admin' || currentUser.role === 'staff') && complaint.status !== 'resolved' && (
          <div className="flex items-center gap-2 ml-auto">
            {complaint.status !== 'in-progress' &&
              <Button size="sm" variant="outline" onClick={() => handleUpdateStatus('in-progress')} disabled={isUpdating}>Mark as In Progress</Button>
            }
            <Button size="sm" onClick={() => handleUpdateStatus('resolved')} disabled={isUpdating}>
              {isUpdating ? <Loader2 className="h-4 w-4 animate-spin"/> : 'Mark as Resolved' }
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
