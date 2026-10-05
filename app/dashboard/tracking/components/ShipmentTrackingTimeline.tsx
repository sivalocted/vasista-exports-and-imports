"use client";

import React from "react";
import { FreightShipment, ShipmentTrackingStep } from "@/types";
import { getTrackingStepDefinition } from "../tracking-step-registry";

interface TimelineProps {
  shipment: FreightShipment;
  onAddStepClick?: () => void;
}

/**
 * Modular Tracking Step Item — completely isolated component.
 */
function StepItem({
  step,
  isLast,
}: {
  step: ShipmentTrackingStep;
  isLast: boolean;
}) {
  const definition = getTrackingStepDefinition(step.stepCode);

  return (
    <div className="relative flex items-start gap-4 pb-8 group">
      {/* Connecting Vertical Line */}
      {!isLast && (
        <div
          className={`absolute left-5 top-10 bottom-0 w-0.5 transition-colors ${
            step.isCompleted ? "bg-amber-400" : "bg-white/10"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Step Indicator Dot */}
      <div
        className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          step.isCurrent
            ? "border-amber-400 bg-amber-400/20 text-amber-400 ring-4 ring-amber-400/20 shadow-lg shadow-amber-400/30"
            : step.isCompleted
            ? "border-amber-400 bg-amber-400 text-gray-900"
            : "border-white/20 bg-[#0b101b] text-gray-400"
        }`}
      >
        {step.isCompleted ? (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="text-xs font-bold">{step.orderIndex}</span>
        )}
      </div>

      {/* Step Body */}
      <div className="flex-1 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 hover:border-amber-400/30 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-base">{definition.title}</span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-amber-400 border border-amber-400/20">
              {definition.category}
            </span>
          </div>
          {step.completedAt && (
            <span className="text-xs font-mono text-gray-400">
              {new Date(step.completedAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-300/80 leading-relaxed">
          {step.description || definition.description}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400 font-mono">
          <svg className="h-3.5 w-3.5 text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{step.location}</span>
        </div>

        {/* Dynamic Metadata Render (No global code edit needed!) */}
        {step.metadata && Object.keys(step.metadata).length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
            {Object.entries(step.metadata).map(([key, val]) => (
              <div key={key} className="bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="text-gray-400 text-[10px] uppercase block tracking-wider">{key}</span>
                <span className="text-amber-200 font-mono font-medium">{String(val)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Main Shipment Tracking Timeline Skeleton.
 */
export function ShipmentTrackingTimeline({
  shipment,
  onAddStepClick,
}: TimelineProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#080d19] p-6 lg:p-8 text-white shadow-2xl">
      {/* Shipment Header Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-2xl font-bold tracking-tight text-white">
              {shipment.trackingNumber}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-400/10 text-amber-400 border border-amber-400/30">
              {shipment.status.replace(/_/g, " ")}
            </span>
          </div>
          <div className="text-xs text-gray-400 font-mono flex items-center gap-3">
            <span>Container: <strong className="text-white">{shipment.containerNumber}</strong></span>
            <span>·</span>
            <span>Carrier: <strong className="text-white">{shipment.carrierName}</strong></span>
            {shipment.vesselName && (
              <>
                <span>·</span>
                <span>Vessel: <strong className="text-white">{shipment.vesselName}</strong></span>
              </>
            )}
          </div>
        </div>

        {/* Port Pair Summary */}
        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3">
          <div>
            <div className="text-[10px] uppercase text-gray-400 tracking-wider">Origin Port</div>
            <div className="font-semibold text-sm text-white">{shipment.originPort.name}</div>
            <div className="text-xs font-mono text-amber-400">{shipment.originPort.code}</div>
          </div>
          <div className="text-gray-500 font-bold px-2">➔</div>
          <div>
            <div className="text-[10px] uppercase text-gray-400 tracking-wider">Destination Port</div>
            <div className="font-semibold text-sm text-white">{shipment.destinationPort.name}</div>
            <div className="text-xs font-mono text-amber-400">{shipment.destinationPort.code}</div>
          </div>
        </div>
      </div>

      {/* Tracking Steps Timeline */}
      <div className="relative pl-2">
        {shipment.trackingSteps.map((step, idx) => (
          <StepItem
            key={step.id || step.stepCode}
            step={step}
            isLast={idx === shipment.trackingSteps.length - 1}
          />
        ))}
      </div>

      {/* Developer Inject Button Demonstration */}
      {onAddStepClick && (
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onAddStepClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 hover:bg-amber-400 hover:text-gray-900 text-white transition-all border border-white/10"
          >
            <span>+ Inject New Tracking Milestone</span>
          </button>
        </div>
      )}
    </div>
  );
}
