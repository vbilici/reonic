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
  const [dailyUsagePerChargepoint, setDailyUsagePerChargepoint] = useState<
    DailyChargepointUsageVisualisation[]
  >([]);

  const [dailyAvg, setDailyAvg] = useState<number>(0);
  const [selectedCP, setSelectedCP] = useState<number>(0);

  useEffect(() => {
    const dailyUsagePerChargepointDict = getDailyUsageforOneCP(
      selectedCP,
      results.dailyUsagePerChargepoint
    );
    setDailyUsagePerChargepoint(dailyUsagePerChargepointDict);

    setDailyAvg(getDailyAvgUsageForOnCP(selectedCP, results.dailyUsagePerChargepoint));

    console.log("dailyAvg", dailyAvg);
  }, [results.dailyUsagePerChargepoint, selectedCP]);

  const handleSelectedCPChange = (cp: number) => {
    setSelectedCP(cp);
  };

  return (
    <>
      <Card className="mx-auto mb-6">
        <List>
          <ListItem>
            <span>Total Energy Consumed</span>
            <span>{results.totalEnergyConsumed.toFixed(2)} KWh</span>
          </ListItem>
          <ListItem>
            <span>Theoritical Max Demand</span>
            <span>{results.theoreticalMaxDemand} KW</span>
          </ListItem>
          <ListItem>
            <span>Peak Power Demand</span>
            <span>{results.peakPowerDemand} KW</span>
          </ListItem>
          <ListItem>
            <span>Concurrency Factor</span>
            <span>{results.concurrencyFactor.toFixed(2)} %</span>
          </ListItem>
        </List>
      </Card>
      <DashboardEvUsageChart
        data={dailyUsagePerChargepoint}
        totalNumberOfCP={20}
        selectedCP={selectedCP}
        onSelectedCpChange={handleSelectedCPChange}
        avgDailyUsage={dailyAvg}
      />
    </>
  );
}
