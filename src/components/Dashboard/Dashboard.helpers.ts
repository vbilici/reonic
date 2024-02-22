import { DailyUsagePerChargepoints } from "@/app/libs/simulator/simulator";

// Function to convert a single chargepoint's daily usage to array of objects for visualisation matters
export interface DailyChargepointUsageVisualisation {
  day: number;
  kWh: number;
}

export function getDailyUsageforOneCP(
  chargepointId: number,
  dailyUsagePerChargepoint: DailyUsagePerChargepoints
): DailyChargepointUsageVisualisation[] {
  if (Object.keys(dailyUsagePerChargepoint).length === 0) return [];
  
  return dailyUsagePerChargepoint[chargepointId].map((kWh, index) => ({
    day: index + 1,
    kWh,
  }));
}

    
export function getDailyAvgUsageForOnCP(
  chargepointId: number,
  dailyUsagePerChargepoint: DailyUsagePerChargepoints
): number {
  if (Object.keys(dailyUsagePerChargepoint).length === 0) return 0;
  
  const dailyUsage = dailyUsagePerChargepoint[chargepointId];
  const totalUsage = dailyUsage.reduce((sum, kWh) => sum + kWh, 0);
  const averageUsage = totalUsage / dailyUsage.length;

  return averageUsage;
}

    