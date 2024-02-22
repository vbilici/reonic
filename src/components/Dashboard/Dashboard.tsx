"use client";

import ConfigForm from "./Dashboard.form";
import DashboardResults from "./Dashboard.results";
import { useState } from "react";
import {
  SimulationResults,
  SimulatorParams,
  simulator,
} from "@/app/libs/simulator/simulator";

export default function Dashboard() {
  const [resultState, setResultState] = useState<SimulationResults>();

  const handleSubmit = (submitData: SimulatorParams) => {
    console.log(submitData);
    const results = simulator.runTheSimulation(submitData);
    setResultState(results);
  };
  
  return (
    <>
      <ConfigForm onSubmit={handleSubmit} />
      {resultState ? <DashboardResults {...resultState} /> : null}
    </>
  );
}
