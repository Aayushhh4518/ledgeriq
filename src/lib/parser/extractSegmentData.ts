import { SegmentData } from "@/types/financial";

export function extractSegmentData(text: string): SegmentData {
  const result: SegmentData = {
    iphone: 0,
    mac: 0,
    ipad: 0,
    wearables: 0,
    services: 0,
  };

  // Apple product lines regex
  const iphoneMatch = text.match(/iPhone\s+\$?\s*([\d,]+)/i);
  if (iphoneMatch) result.iphone = Number(iphoneMatch[1].replace(/,/g, "")) || 0;

  const macMatch = text.match(/Mac\s+\$?\s*([\d,]+)/i);
  if (macMatch) result.mac = Number(macMatch[1].replace(/,/g, "")) || 0;

  const ipadMatch = text.match(/iPad\s+\$?\s*([\d,]+)/i);
  if (ipadMatch) result.ipad = Number(ipadMatch[1].replace(/,/g, "")) || 0;

  const wearablesMatch = text.match(/Wearables(?:, Home and Accessories)?\s+\$?\s*([\d,]+)/i);
  if (wearablesMatch) result.wearables = Number(wearablesMatch[1].replace(/,/g, "")) || 0;

  const servicesMatch = text.match(/Services\s+\$?\s*([\d,]+)/i);
  if (servicesMatch) result.services = Number(servicesMatch[1].replace(/,/g, "")) || 0;

  return result;
}
