import { TrackingStepDefinition, ShipmentStatus, ShipmentTrackingStep } from "@/types";

/**
 * ============================================================================
 * PLUGGABLE TRACKING STEP REGISTRY
 * ============================================================================
 * Architectural Pattern: Open-Closed Principle (OCP).
 *
 * Developers can add new tracking lifecycle milestones (e.g. Phytosanitary
 * Check, Sieve Lab Assay, Weighbridge Gross Out) in this registry WITHOUT
 * touching the UI rendering pipeline or database mutation actions.
 * ============================================================================
 */

export const CORE_TRACKING_STEPS: Record<string, TrackingStepDefinition> = {
  BOOKING_CONFIRMED: {
    stepCode: "BOOKING_CONFIRMED",
    title: "Order Indented & Confirmed",
    description: "Trade contract executed, buyer allocation reserved, and rake/container booking confirmed.",
    iconName: "FileCheck",
    category: "ORIGIN",
  },
  RAKE_INDENTED: {
    stepCode: "RAKE_INDENTED",
    title: "Railway Rake / Container Staging",
    description: "Indian Railways freight rake or 20ft/40ft shipping containers positioned at siding.",
    iconName: "TrainTrack",
    category: "ORIGIN",
  },
  ORIGIN_PORT_STAGED: {
    stepCode: "ORIGIN_PORT_STAGED",
    title: "Cargo Discharged at Port Berth",
    description: "Cargo stockpiled at dockside yard and awaiting vessel loading.",
    iconName: "Anchor",
    category: "ORIGIN",
  },
  LAB_INSPECTION_PASSED: {
    stepCode: "LAB_INSPECTION_PASSED",
    title: "Third-Party Spec Assay Verified",
    description: "SGS / Bureau Veritas sample drawn. Moisture, sieve size, and chemical purity certified.",
    iconName: "FlaskConical",
    category: "COMPLIANCE",
    validatePayload: (meta) => typeof meta["assayCertificateNo"] === "string",
  },
  CUSTOMS_EXPORT_CLEARED: {
    stepCode: "CUSTOMS_EXPORT_CLEARED",
    title: "Export Customs & LEO Issued",
    description: "Let Export Order (LEO) granted by Indian Customs authorities at gateway port.",
    iconName: "ShieldCheck",
    category: "COMPLIANCE",
  },
  VESSEL_LOADED: {
    stepCode: "VESSEL_LOADED",
    title: "Vessel Loaded & Mates Receipt",
    description: "Cargo loaded onto bulk carrier vessel / container stack; Master Bill of Lading released.",
    iconName: "Ship",
    category: "TRANSIT",
  },
  ON_HIGH_SEAS: {
    stepCode: "ON_HIGH_SEAS",
    title: "Maritime Ocean Transit",
    description: "Vessel underway on international maritime shipping lanes with satellite AIS tracking.",
    iconName: "Compass",
    category: "TRANSIT",
  },
  DESTINATION_DISCHARGED: {
    stepCode: "DESTINATION_DISCHARGED",
    title: "Port Discharge & Import Clearance",
    description: "Cargo berthed and discharged at destination gateway port; Bill of Entry processed.",
    iconName: "Warehouse",
    category: "DESTINATION",
  },
  DELIVERED_TO_PLANT: {
    stepCode: "DELIVERED_TO_PLANT",
    title: "Plant Gate Weighbridge & Handover",
    description: "Consignment weighed, inspected at receiver's manufacturing plant gate, and cleared.",
    iconName: "Factory",
    category: "DESTINATION",
  },
};

/**
 * Mutable registry store enabling runtime or plugin step extensions.
 */
const trackingStepRegistry: Map<string, TrackingStepDefinition> = new Map(
  Object.entries(CORE_TRACKING_STEPS)
);

/**
 * Register a new tracking step without altering global codebase.
 *
 * Example Usage by a third-party developer:
 * ```ts
 * registerTrackingStep({
 *   stepCode: "RADIOACTIVE_SURFACE_SCAN",
 *   title: "Scrap Radiation Pre-Shipment Inspection",
 *   description: "AERB / Portal monitor clearance certificate verified.",
 *   iconName: "Activity",
 *   category: "COMPLIANCE"
 * });
 * ```
 */
export function registerTrackingStep(step: TrackingStepDefinition): void {
  trackingStepRegistry.set(step.stepCode, step);
}

/**
 * Retrieve metadata for a tracking step code.
 */
export function getTrackingStepDefinition(stepCode: string): TrackingStepDefinition {
  const definition = trackingStepRegistry.get(stepCode);
  if (!definition) {
    return {
      stepCode,
      title: stepCode.replace(/_/g, " "),
      description: "Custom operational milestone.",
      iconName: "CircleDot",
      category: "TRANSIT",
    };
  }
  return definition;
}

/**
 * Get all registered step definitions ordered by workflow category.
 */
export function getAllRegisteredSteps(): TrackingStepDefinition[] {
  return Array.from(trackingStepRegistry.values());
}
