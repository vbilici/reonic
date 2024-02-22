import { BoltIcon } from "@heroicons/react/24/outline";
import { Card, LineChart, Select, SelectItem, Subtitle, Text } from "@tremor/react";
import React from "react";

const DashboardEvUsageChart: React.FC<{
  data: any[];
  totalNumberOfCP: number;
  onSelectedCpChange: Function;
  selectedCP: number;
  avgDailyUsage: number;
}> = ({ data, totalNumberOfCP, onSelectedCpChange, selectedCP, avgDailyUsage }) => {
  const handleValueChange = (value: string) => {
    const cpId = parseInt(value);
    onSelectedCpChange(cpId);
  };

  return (
    <Card className="mx-auto">
      <Subtitle>Charging Point Usage(KWh) per day in a year</Subtitle>
      <Select
        id="chargingPoint"
        name="chargingPoint"
        value={selectedCP.toString()}
        onValueChange={handleValueChange}
        className="mt-2 mb-6"
      >
        {Array.from(Array(totalNumberOfCP).keys()).map((i) => (
          <SelectItem key={i} value={i.toString()} icon={BoltIcon}>
            Charging Point {i + 1}
          </SelectItem>
        ))}
      </Select>

      <Text>Average Daily usage per year: <span className="font-bold">{avgDailyUsage.toFixed(2)} KWh</span></Text>

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
