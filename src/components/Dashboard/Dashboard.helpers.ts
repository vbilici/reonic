import { DailyUsagePerChargepoint } from "@/app/libs/simulator/simulator";

// Function to convert a single chargepoint's daily usage to array of objects for visualisation matters
export interface DailyChargepointUsageVisualisation {
  day: number;
  kWh: number;
}

export function getDailyUsageforOneCP(
  chargepointId: number,
  dailyUsagePerChargepoint: DailyUsagePerChargepoint
): DailyChargepointUsageVisualisation[] {
  if (Object.keys(dailyUsagePerChargepoint).length === 0) return [];
  
  return dailyUsagePerChargepoint[chargepointId].map((kWh, index) => ({
    day: index + 1,
    kWh,
  }));
}
