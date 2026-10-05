"use server";

import { RfqFormData, RfqSubmissionResult } from "@/types";

/**
 * Server Action: Process institutional Request for Quote (RFQ).
 */
export async function submitRfqAction(data: RfqFormData): Promise<RfqSubmissionResult> {
  if (!data.commodityName || !data.requestedQuantity || !data.email || !data.phone) {
    return {
      success: false,
      message: "Please provide all required fields (commodity, quantity, email, and contact number).",
    };
  }

  const generatedRfqNumber = `RFQ-VAS-${Date.now().toString().slice(-6)}`;

  // In production with Prisma:
  // await prisma.quoteRequest.create({
  //   data: {
  //     rfqNumber: generatedRfqNumber,
  //     buyerType: data.buyerType,
  //     commodityName: data.commodityName,
  //     hsCode: data.hsCode,
  //     requestedQuantity: data.requestedQuantity,
  //     unit: data.unit,
  //     targetIncoterm: data.targetIncoterm,
  //     destinationCustom: data.destinationCustom,
  //     requiredSpecs: data.targetSpecs,
  //     buyerName: data.buyerName,
  //     companyName: data.companyName,
  //     email: data.email,
  //     phone: data.phone,
  //   }
  // });

  const summary = encodeURIComponent(
    `*NEW TRADE RFQ [${generatedRfqNumber}]*\n` +
    `• Type: ${data.buyerType}\n` +
    `• Commodity: ${data.commodityName} (HS: ${data.hsCode || "N/A"})\n` +
    `• Volume: ${data.requestedQuantity} ${data.unit}\n` +
    `• Incoterm: ${data.targetIncoterm}\n` +
    `• Destination Port: ${data.destinationCustom || "Direct Indian Maritime Gateway"}\n` +
    `• Buyer: ${data.buyerName} (${data.companyName})\n` +
    `• Contact: ${data.phone}`
  );

  const whatsappUrl = `https://wa.me/918591938908?text=${summary}`;

  return {
    success: true,
    rfqNumber: generatedRfqNumber,
    message: `RFQ ${generatedRfqNumber} registered with the institutional trade desk.`,
    whatsappUrl,
  };
}
