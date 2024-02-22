import { SimulatorParams, runTheSimulation } from './simulator';

describe('runTheSimulation', () => {

  it('calculates the theoretical maximum power demand correctly', () => {
    const params: SimulatorParams = {
      numberOfChargepoints: 30,
      chargingPowerPerChargepoint: 15,
      consumptionOfCars: 20,
      arrivalProbabilityMultiplier: 100
    };

    const result = runTheSimulation(params);

    expect(result.theoreticalMaxDemand).toBe(450);
  });


  it('calculates the maximum demand correctly', () => {
    const params: SimulatorParams = {
      numberOfChargepoints: 20,
      chargingPowerPerChargepoint: 11,
      consumptionOfCars: 18,
      arrivalProbabilityMultiplier: 100
    };

    const result = runTheSimulation(params);
    expect(result.peakPowerDemand).toBeGreaterThanOrEqual(77);
    expect(result.peakPowerDemand).toBeLessThanOrEqual(121);
  });


  it('calculates the concurrency factor correctly', () => {
    const params: SimulatorParams = {
      numberOfChargepoints: 20,
      chargingPowerPerChargepoint: 11,
      consumptionOfCars: 18,
      arrivalProbabilityMultiplier: 100
    };

    const result = runTheSimulation(params);
    expect(result.concurrencyFactor).toBeGreaterThanOrEqual(35);
    expect(result.concurrencyFactor).toBeLessThanOrEqual(55);
  });
});