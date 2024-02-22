import { runTheSimulation } from './simulator';

describe('runTheSimulation', () => {

  it('calculates the theoretical maximum power demand correctly', () => {
    const params = {
      numberOfChargepoints: 30,
      chargingPowerPerChargepoint: 15,
      consumptionOfCars: 20,
    };

    const result = runTheSimulation(params);

    expect(result.theoreticalMaxDemand).toBe(450);
  });


  it('calculates the maximum demand correctly', () => {
    const params = {
      numberOfChargepoints: 20,
      chargingPowerPerChargepoint: 11,
      consumptionOfCars: 18,
    };

    const result = runTheSimulation(params);
    expect(result.peakPowerDemand).toBeGreaterThanOrEqual(77);
    expect(result.peakPowerDemand).toBeLessThanOrEqual(121);
  });


  it('calculates the concurrency factor correctly', () => {
    const params = {
      numberOfChargepoints: 20,
      chargingPowerPerChargepoint: 11,
      consumptionOfCars: 18,
    };

    const result = runTheSimulation(params);
    expect(result.concurrencyFactor).toBeGreaterThanOrEqual(35);
    expect(result.concurrencyFactor).toBeLessThanOrEqual(55);
  });
});