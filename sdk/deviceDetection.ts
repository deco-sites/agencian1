import { UAParser } from "npm:ua-parser-js";

export interface DeviceInfo {
  isPhone: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isDesktop: boolean;
}

export function detectDevice(userAgent: string): DeviceInfo {
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();

  const isPhone = device.type === "mobile";
  const isTablet = device.type === "tablet";
  const isMobile = isPhone || isTablet;
  const isDesktop = !isPhone && !isTablet;

  return {
    isPhone,
    isTablet,
    isMobile,
    isDesktop,
  };
}
