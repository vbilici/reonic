import { arrivalProbabilities, chargingDemandProbabilities } from './probabilityTables';

const ticksPerYear = 35040;

export type SimulationResults = {
  totalEnergyConsumed: number;
  theoreticalMaxDemand: number;
  peakPowerDemand: number;
  concurrencyFactor: number;
};

export type SimulatorParams = {
  numberOfChargepoints: number;
  chargingPowerPerChargepoint: number; //KW
  consumptionOfCars: number; // kWh/100km
  arrivalProbabilityMultiplier: number; // Percentage, default: 100
}

function doesEvArrive(hour:number, multiplier: number) {
  const arrivalProb = arrivalProbabilities.find(p => hour >= p.start && hour < p.end);
  const scaledProbability = arrivalProb ? arrivalProb.probability * (multiplier / 100) : 0;

  const randomValue = Math.random(); 

  return arrivalProb && randomValue < scaledProbability; // Return true if the random value is less than the probability
}


function getEvChargingDemand() {
  const randomValue = Math.random();
  let cumulativeProbability = 0;

  for (const demand of chargingDemandProbabilities) {
      cumulativeProbability += demand.probability;
      if (randomValue < cumulativeProbability) {
          return demand.km; // Return the demand if the random value is less than the cumulative probability
      }
  }

  return 0; // In case no demand is selected, very unlikely
}


export function runTheSimulation(params: SimulatorParams){

  const {numberOfChargepoints, chargingPowerPerChargepoint, consumptionOfCars, arrivalProbabilityMultiplier} = params;

  console.log('Running the simulation with the following parameters:', numberOfChargepoints);
  let totalEnergyConsumed = 0;
  let peakPowerDemand = 0;

  for (let tick = 0; tick < ticksPerYear; tick++) {
      let currentPowerDemand = 0;
      const dayOfTheYear= tick % (24 * 4) // Calculate the day of the year based on the tick
      const hourOfDay = Math.floor(dayOfTheYear / 4) // Calculate the hour of the day based on the tick

      for (let chargepoint = 0; chargepoint < numberOfChargepoints; chargepoint++) {
          if (doesEvArrive(hourOfDay, arrivalProbabilityMultiplier)) {
              let demandKm = getEvChargingDemand();

              // Calculate energy needed based on demand (18kWh per 100kms)
              let kWhNeeded = demandKm * (consumptionOfCars / 100); 
              totalEnergyConsumed += kWhNeeded;
              currentPowerDemand += chargingPowerPerChargepoint; // Assuming no delays etc..
          }
      }

      peakPowerDemand = Math.max(peakPowerDemand, currentPowerDemand);
  }

  let theoreticalMaxDemand = numberOfChargepoints * chargingPowerPerChargepoint;
  let concurrencyFactor = (peakPowerDemand / theoreticalMaxDemand) * 100;


/*
  console.log(`Total Energy Consumed: ${totalEnergyConsumed} kWh`);
  console.log(`Theoretical Maximum Power Demand: ${theoreticalMaxDemand} kW`);
  console.log(`Actual Maximum Power Demand: ${peakPowerDemand} kW`);
  console.log(`Concurrency Factor: ${concurrencyFactor}%`);
*/
  return {
    totalEnergyConsumed,
    theoreticalMaxDemand,
    peakPowerDemand,
    concurrencyFactor
  }

}


export const simulator ={
  runTheSimulation
}