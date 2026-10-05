/**
 * ============================================================================
 * VASISTA GLOBAL TRADE ARCHITECTURE — DOMAIN TYPES & CONTRACTS
 * ============================================================================
 * Strict TypeScript types governing B2B Product Catalog, Freight Tracking,
 * Port Relational Entities, and Request for Quote (RFQ) Form Engine.
 * ============================================================================
 */

export type ProductCategory =
  | "MINERALS_METALS"
  | "ENERGY_CARBON"
  | "CHEMICALS_INPUTS"
  | "FOOD_AGRI";

export type Incoterm = "CIF" | "FOB" | "CFR" | "EXW" | "DAP" | "DDP";

export type ShipmentStatus =
  | "BOOKING_CONFIRMED"
  | "RAKE_INDENTED"
  | "ORIGIN_PORT_STAGED"
  | "LAB_INSPECTION_PASSED"
  | "CUSTOMS_EXPORT_CLEARED"
  | "VESSEL_LOADED"
  | "ON_HIGH_SEAS"
  | "TRANSSHIPMENT_HUB"
  | "CUSTOMS_IMPORT_CLEARED"
  | "DESTINATION_DISCHARGED"
  | "IN_LAND_TRANSIT"
  | "DELIVERED_TO_PLANT"
  | "EXCEPTION_HOLD";

export interface PortSummary {
  id: string;
  code: string; // UN/LOCODE (e.g., INVTZ, INNSA, SGSIN)
  name: string;
  country: string;
  countryCode: string;
  city: string;
  isGateway: boolean;
}

export interface B2BProduct {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  hsCode: string;          // Required: Harmonized System Code (e.g. 2521.00)
  originCountry: string;   // Required: Origin Country
  moq: number;             // Required: Minimum Order Quantity value
  moqUnit: string;         // e.g. "MT", "20ft FCL", "Bags"
  leadTimeDays: number;
  shortDesc: string;
  chemicalAssay?: Record<string, string>;
  physicalSpecs?: string;
  standardGrades: string[];
  packagingTypes: string[];
  isFeatured: boolean;
  isActive: boolean;
  sellerId: string;
  sellerName?: string;
}

export interface TrackingStepDefinition {
  stepCode: string;
  title: string;
  description: string;
  iconName: string;
  category: "ORIGIN" | "TRANSIT" | "DESTINATION" | "COMPLIANCE";
  /** Optional custom validation hook before injecting this step into a shipment */
  validatePayload?: (metadata: Record<string, unknown>) => boolean;
}

export interface ShipmentTrackingStep {
  id: string;
  shipmentId: string;
  stepCode: string;
  title: string;
  description?: string;
  location: string;
  status: ShipmentStatus;
  orderIndex: number;
  isCompleted: boolean;
  isCurrent: boolean;
  completedAt?: string | Date | null;
  metadata?: Record<string, unknown>;
}

export interface FreightShipment {
  id: string;
  trackingNumber: string;    // e.g. VAS-IN-849201
  containerNumber: string;   // e.g. MEDU8492015 or Bulk Vessel Cargo
  billOfLading?: string;
  carrierName: string;
  vesselName?: string;
  voyageNumber?: string;
  status: ShipmentStatus;
  totalWeightMT: number;
  incoterm: Incoterm;
  originPort: PortSummary;
  destinationPort: PortSummary;
  etd?: string | Date;
  eta?: string | Date;
  atd?: string | Date;
  ata?: string | Date;
  trackingSteps: ShipmentTrackingStep[];
}

export interface RfqFormData {
  buyerType: "BUYER" | "SUPPLIER";
  commodityName: string;
  productId?: string;
  hsCode?: string;
  requestedQuantity: number;
  unit: "MT" | "FCL_20FT" | "FCL_40FT" | "RAKE" | "VESSEL";
  targetIncoterm: Incoterm;
  destinationPortId?: string;
  destinationCustom?: string;
  targetSpecs?: string;
  buyerName: string;
  companyName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface RfqSubmissionResult {
  success: boolean;
  rfqNumber?: string;
  message: string;
  whatsappUrl?: string;
}
