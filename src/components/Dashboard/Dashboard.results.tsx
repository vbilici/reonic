"use client";

import { SimulationResults } from "@/app/libs/simulator/simulator";
import { Card, List, ListItem } from "@tremor/react";
import {
  DailyChargepointUsageVisualisation,
  getDailyAvgUsageForOnCP,
  getDailyUsageforOneCP,
} from "./Dashboard.helpers";
import { useEffect, useState } from "react";
import DashboardEvUsageChart from "./Dashboard.EvUsageChart";

export default function DashboardResults(results: SimulationResults) {
  const [dailyUsageforOneCP, setDailyUsageforOneCP] = useState<
    DailyChargepointUsageVisualisation[]
  >([]);
  const {
    totalEnergyConsumed,
    theoreticalMaxDemand,
    peakPowerDemand,
    concurrencyFactor,
    dailyUsagePerChargepoint,
    numberOfChargepoints
  } = results;

  const [dailyAvg, setDailyAvg] = useState<number>(0);
  const [selectedCP, setSelectedCP] = useState<number>(0);

  useEffect(() => {
    const dailyUsagePerChargepointDict = getDailyUsageforOneCP(
      selectedCP,
      dailyUsagePerChargepoint
    );
    setDailyUsageforOneCP(dailyUsagePerChargepointDict);

    setDailyAvg(getDailyAvgUsageForOnCP(selectedCP, dailyUsagePerChargepoint));
  }, [dailyUsagePerChargepoint, selectedCP, dailyAvg]);

  const handleSelectedCPChange = (cp: number) => {
    setSelectedCP(cp);
  };

  return (
    <>
      <Card className="mx-auto mb-6">
        <List>
          <ListItem>
            <span>Total Energy Consumed</span>
            <span>{totalEnergyConsumed.toFixed(2)} KWh</span>
          </ListItem>
          <ListItem>
            <span>Theoritical Max Demand</span>
            <span>{theoreticalMaxDemand} KW</span>
          </ListItem>
          <ListItem>
            <span>Peak Power Demand</span>
            <span>{peakPowerDemand} KW</span>
          </ListItem>
          <ListItem>
            <span>Concurrency Factor</span>
            <span>{concurrencyFactor.toFixed(2)} %</span>
          </ListItem>
        </List>
      </Card>
      <DashboardEvUsageChart
        data={dailyUsageforOneCP}
        totalNumberOfCP={numberOfChargepoints}
        selectedCP={selectedCP}
        onSelectedCpChange={handleSelectedCPChange}
        avgDailyUsage={dailyAvg}
      />
    </>
  );
}
