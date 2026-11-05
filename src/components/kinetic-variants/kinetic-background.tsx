"use client";

import React from "react";
import { TunnelCanvas } from "./tunnel-canvas";
import { ThreadsCanvas } from "./threads-canvas";
import { EtherCanvas } from "./ether-canvas";
import { GridScanCanvas } from "./grid-scan-canvas";
import { AsciiCanvas } from "./ascii-canvas";

export function KineticBackground({ variant = "tunnel" }: { variant?: string }) {
  switch (variant) {
    case "threads":
      return <ThreadsCanvas />;
    case "ether":
      return <EtherCanvas />;
    case "gridscan":
      return <GridScanCanvas />;
    case "ascii":
      return <AsciiCanvas />;
    case "tunnel":
    default:
      return <TunnelCanvas />;
  }
}
