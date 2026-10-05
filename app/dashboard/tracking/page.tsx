import React from "react";
import { Metadata } from "next";
import { FreightShipment } from "@/types";
import { ShipmentTrackingTimeline } from "./components/ShipmentTrackingTimeline";
import { registerTrackingStep } from "./tracking-step-registry";

export const metadata: Metadata = {
  title: "Shipment Tracking Terminal | Vasista Global Trade",
  description: "Real-time container logistics, carrier milestones, and maritime freight tracking.",
};

/**
 * ============================================================================
 * EXTENSION DEMONSTRATION: DEVELOPER INJECTING A NEW STEP IN 3 LINES
 * ============================================================================
 * A developer can register a custom compliance milestone right here without
 * modifying any global timeline code or shared components!
 */
registerTrackingStep({
  stepCode: "PHYTO_CUSTOMS_CLEARANCE",
  title: "Phytosanitary & Plant Quarantine Approval",
  description: "Official Plant Protection & Quarantine inspection certificate issued at port.",
  iconName: "ShieldAlert",
  category: "COMPLIANCE",
});

/**
 * Mock Data simulating Prisma query:
 * const shipment = await prisma.shipment.findUnique({ where: { trackingNumber }, include: { trackingSteps: true, originPort: true, destinationPort: true } });
 */
async function getShipmentByTrackingNumber(trackingNumber: string): Promise<FreightShipment> {
  return {
    id: "ship_902812",
    trackingNumber: trackingNumber || "VAS-IN-849201",
    containerNumber: "MEDU8492015",
    billOfLading: "MEDUIN9940120",
    carrierName: "MSC Mediterranean Shipping Company",
    vesselName: "MSC TINA",
    voyageNumber: "VU2604W",
    status: "ON_HIGH_SEAS",
    totalWeightMT: 1250.0,
    incoterm: "CIF",
    originPort: {
      id: "port_1",
      code: "INVTZ",
      name: "Visakhapatnam Port",
      country: "India",
      countryCode: "IN",
      city: "Visakhapatnam",
      isGateway: true,
    },
    destinationPort: {
      id: "port_2",
      code: "SGSIN",
      name: "Port of Singapore",
      country: "Singapore",
      countryCode: "SG",
      city: "Singapore",
      isGateway: true,
    },
    etd: "2026-10-02T10:00:00Z",
    eta: "2026-10-18T18:00:00Z",
    trackingSteps: [
      {
        id: "step_1",
        shipmentId: "ship_902812",
        stepCode: "BOOKING_CONFIRMED",
        title: "Order Indented & Confirmed",
        location: "Visakhapatnam Port Commercial Desk",
        status: "BOOKING_CONFIRMED",
        orderIndex: 1,
        isCompleted: true,
        isCurrent: false,
        completedAt: "2026-09-28T09:30:00Z",
      },
      {
        id: "step_2",
        shipmentId: "ship_902812",
        stepCode: "ORIGIN_PORT_STAGED",
        title: "Cargo Discharged at Port Berth",
        location: "Berth 5 Stockyard, Visakhapatnam",
        status: "ORIGIN_PORT_STAGED",
        orderIndex: 2,
        isCompleted: true,
        isCurrent: false,
        completedAt: "2026-09-30T14:15:00Z",
        metadata: {
          siloLocation: "Stackyard B-12",
          rakeIndentNo: "ECoR-99210",
        },
      },
      {
        id: "step_3",
        shipmentId: "ship_902812",
        stepCode: "LAB_INSPECTION_PASSED",
        title: "Third-Party Spec Assay Verified",
        location: "SGS India Testing Lab, Vizag",
        status: "LAB_INSPECTION_PASSED",
        orderIndex: 3,
        isCompleted: true,
        isCurrent: false,
        completedAt: "2026-10-01T11:00:00Z",
        metadata: {
          assayCertificateNo: "SGS-VIZ-2026-8812",
          purityResult: "95.4% CaCO3 (Target 95.0% min)",
        },
      },
      // INJECTED NEW STEP EXAMPLE (seamlessly works!)
      {
        id: "step_4",
        shipmentId: "ship_902812",
        stepCode: "PHYTO_CUSTOMS_CLEARANCE",
        title: "Phytosanitary & Plant Quarantine Approval",
        location: "Customs House, Visakhapatnam",
        status: "CUSTOMS_EXPORT_CLEARED",
        orderIndex: 4,
        isCompleted: true,
        isCurrent: false,
        completedAt: "2026-10-02T16:00:00Z",
        metadata: {
          quarantineSealNo: "PQ-IN-88231",
        },
      },
      {
        id: "step_5",
        shipmentId: "ship_902812",
        stepCode: "VESSEL_LOADED",
        title: "Vessel Loaded & Mates Receipt",
        location: "Berth 5, Visakhapatnam Port",
        status: "VESSEL_LOADED",
        orderIndex: 5,
        isCompleted: true,
        isCurrent: false,
        completedAt: "2026-10-03T04:20:00Z",
        metadata: {
          billOfLading: "MEDUIN9940120",
          grossTonnage: "1,250.00 MT",
        },
      },
      {
        id: "step_6",
        shipmentId: "ship_902812",
        stepCode: "ON_HIGH_SEAS",
        title: "Maritime Ocean Transit",
        location: "Bay of Bengal (Coordinates: 14.2°N, 83.9°E)",
        status: "ON_HIGH_SEAS",
        orderIndex: 6,
        isCompleted: false,
        isCurrent: true,
        metadata: {
          speedKnots: "14.2 kts",
          navStatus: "Underway using Engine",
        },
      },
      {
        id: "step_7",
        shipmentId: "ship_902812",
        stepCode: "DESTINATION_DISCHARGED",
        title: "Port Discharge & Import Clearance",
        location: "Pasir Panjang Terminal, Singapore",
        status: "DESTINATION_DISCHARGED",
        orderIndex: 7,
        isCompleted: false,
        isCurrent: false,
      },
    ],
  };
}

export default async function ShipmentTrackingPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const query = resolvedParams.q || "VAS-IN-849201";
  const shipment = await getShipmentByTrackingNumber(query);

  return (
    <div className="min-h-screen bg-[#040812] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Institutional Trade Desk Logistics
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-rajdhani tracking-tight text-white">
              Container & Freight Tracking Skeleton
            </h1>
          </div>

          <form action="/dashboard/tracking" method="GET" className="flex items-center gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Enter Container / Tracking ID..."
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-400 text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-amber-300 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Modular Timeline Component */}
        <ShipmentTrackingTimeline shipment={shipment} />
      </div>
    </div>
  );
}
