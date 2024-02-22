import React, { useState, FormEvent } from "react";
import { Button, Card, NumberInput, Text } from "@tremor/react";
import { SimulatorParams } from "@/app/libs/simulator/simulator";


interface DashboardFormProps {
  onSubmit: (message: SimulatorParams) => void;
}


const ConfigForm: React.FC<DashboardFormProps> = ({onSubmit}) => {
  const [formState, setFormState] = useState<SimulatorParams>({
    numberOfChargepoints: 20,
    chargingPowerPerChargepoint: 11,
    consumptionOfCars: 18,
    arrivalProbabilityMultiplier: 100
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();   
    onSubmit && onSubmit(formState);
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <div className="">

          {/* 'we can create our custom re-usable components here' */}
          <div className="flex flex-wrap items-center mb-4">
            <Text className="flex-grow">Number of Chargepoints:</Text>
            <NumberInput
              name="numberOfChargepoints"
              value={formState.numberOfChargepoints}
              onChange={handleChange}
              className="ml-2 w-20"
              data-testid="numberOfChargepoints"
            />
          </div>
          <div className="flex flex-wrap items-center mb-4">
            <Text className="flex-grow">Charging Power per Chargepoint (Kw):</Text>
            <NumberInput
              name="chargingPowerPerChargepoint"
              value={formState.chargingPowerPerChargepoint}
              onChange={handleChange}
              className="ml-2 w-20"
              data-testid="chargingPowerPerChargepoint"
            />
          </div>
          <div className="flex flex-wrap items-center mb-4">
            <Text className="flex-grow">Consumption of Cars:</Text>
            <NumberInput
              name="consumptionOfCars"
              value={formState.consumptionOfCars}
              onChange={handleChange}
              className="ml-2 w-20"
              data-testid="consumptionOfCars"
            />
          </div>
          <div className="flex flex-wrap items-center mb-4">
            <Text className="flex-grow">Arrival Probability Multiplier (Percent):</Text>
            <NumberInput
              name="arrivalProbabilityMultiplier"
              value={formState.arrivalProbabilityMultiplier}
              min={20}
              max={200}
              onChange={handleChange}
              className="ml-2 w-20"
              data-testid="arrivalProbabilityMultiplier"
            />
          </div>
          <div className="flex flex-row justify-end  items-center">

            <Button type="submit" className="col-start-2 w-40 ml-2 ">Run The Simulation</Button>
          </div>
        </div>


      </form>
    </Card>
  );
};

export default ConfigForm;
