'use client';

import { SimulationResults } from '@/app/libs/simulator/simulator';
import { Card, List, ListItem } from '@tremor/react';

export default function DashboardResults(results:SimulationResults) {
  return (
    <Card className="mx-auto">
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

  );
}