"use client";

import React, { useState } from "react";
import type { Complaint, User } from "@/types";
import { ComplaintList } from "../complaints/ComplaintList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComplaintForm } from "../complaints/ComplaintForm";

interface StudentViewProps {
  complaints: Complaint[];
  currentUser: User;
}

export function StudentView({ complaints, currentUser }: StudentViewProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">My Complaints</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              New Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a New Complaint</DialogTitle>
              <DialogDescription>
                Fill out the form below to submit a new complaint. Please be as detailed as possible.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <ComplaintForm setOpen={setOpen} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ComplaintList complaints={complaints} currentUser={currentUser} />
    </div>
  );
}
