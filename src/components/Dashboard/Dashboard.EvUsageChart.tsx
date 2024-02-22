import { BoltIcon } from "@heroicons/react/24/outline";
import { Card, LineChart, Select, SelectItem, Subtitle } from "@tremor/react";
import React, { useState } from "react";

const DashboardEvUsageChart: React.FC<{
  data: any[];
  totalNumberOfCP: number;
  onSelectedCpChange: Function;
  selectedCP: number;
}> = ({ data, totalNumberOfCP, onSelectedCpChange, selectedCP }) => {
  const handleValueChange = (value: string) => {
    const cpId = parseInt(value);
    onSelectedCpChange(cpId);
  };

  return (
    <Card className="mx-auto">
      <Subtitle>Charging Point Usage(KwH) per day in a year</Subtitle>
      <Select
        id="chargingPoint"
        name="chargingPoint"
        value={selectedCP.toString()}
        onValueChange={handleValueChange}
        className="mt-2"
      >
        {Array.from(Array(totalNumberOfCP).keys()).map((i) => (
          <SelectItem key={i} value={i.toString()} icon={BoltIcon}>
            Charging Point {i}
          </SelectItem>
        ))}
      </Select>

      <LineChart
        className="h-80"
        data={data}
        index="day"
        categories={["kWh"]}
        colors={["indigo"]}
      />
    </Card>
  );
};

export default DashboardEvUsageChart;
