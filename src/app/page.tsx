import { Title, Subtitle } from "@tremor/react";
import Dashboard from "@/components/Dashboard";

export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Reonic Coding Challenge</Title>
      <Subtitle className="mb-6">EV Charging Simulator</Subtitle>
      <Dashboard />
    </main>
  );
}
