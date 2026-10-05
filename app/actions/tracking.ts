"use server";

import { revalidatePath } from "next/cache";
import { ShipmentStatus } from "@/types";

/**
 * Server Action: Inject or append a new tracking milestone to an existing shipment.
 *
 * Notice how this mutation adheres to strict type safety and doesn't require
 * touching any frontend UI components.
 */
export async function injectTrackingStepAction(formData: FormData) {
  const shipmentId = formData.get("shipmentId") as string;
  const stepCode = formData.get("stepCode") as string;
  const title = formData.get("title") as string;
  const location = formData.get("location") as string;
  const status = formData.get("status") as ShipmentStatus;
  const description = formData.get("description") as string;

  if (!shipmentId || !stepCode || !title || !location) {
    return { success: false, error: "Missing required tracking parameters." };
  }

  try {
    // In production with Prisma:
    // await prisma.trackingStep.create({
    //   data: {
    //     shipmentId,
    //     stepCode,
    //     title,
    //     location,
    //     status,
    //     description,
    //     orderIndex: nextOrderIndex,
    //     isCompleted: true,
    //     completedAt: new Date(),
    //   }
    // });

    revalidatePath(`/dashboard/tracking`);
    return { success: true, message: `Milestone ${title} recorded.` };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
