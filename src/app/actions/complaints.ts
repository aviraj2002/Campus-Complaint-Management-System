
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createComplaint as dbCreateComplaint, updateComplaint, getCurrentUser } from "@/lib/data";

const ComplaintSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["academic", "infrastructure", "hostel", "other"]),
  priority: z.enum(["low", "medium", "high"]),
});

export async function createComplaint(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== "student") {
    // This check is now illustrative, as real auth logic is on client
    console.error("Unauthorized attempt to create complaint");
    return { error: "Unauthorized" };
  }

  const validatedFields = ComplaintSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await dbCreateComplaint({
      ...validatedFields.data,
      studentId: user.uid,
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create complaint." };
  }
}

export async function assignStaff(complaintId: string, staffId: string) {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
        return { error: "Unauthorized" };
    }

  try {
    await updateComplaint(complaintId, { assignedStaffId: staffId, status: "assigned" });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to assign staff." };
  }
}

export async function updateStatus(complaintId: string, status: "in-progress" | "resolved") {
    const user = await getCurrentUser();
    if (!user || (user.role !== "admin" && user.role !== "staff")) {
        return { error: "Unauthorized" };
    }

  try {
    await updateComplaint(complaintId, { status });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update status." };
  }
}
