import {
  arrivalProbabilities,
  chargingDemandProbabilities,
} from "./probabilityTables";


export type SimulationResults = {
  numberOfChargepoints: number;
  totalEnergyConsumed: number;
  theoreticalMaxDemand: number;
  peakPowerDemand: number;
  concurrencyFactor: number;
  dailyUsagePerChargepoint: DailyUsagePerChargepoints;
};

export type SimulatorParams = {
  numberOfChargepoints: number;
  chargingPowerPerChargepoint: number; //KW
  consumptionOfCars: number; // kWh/100km
  arrivalProbabilityMultiplier: number; // Percentage, default: 100
};


export interface ChargepointUsage {
  [chargepoint: number]: number[];
}

export interface DailyUsagePerChargepoints {
  [chargepoint: number]: number[];
}

const ticksPerYear = 35040;

function doesEvArrive(hour: number, multiplier: number) {
  const arrivalProb = arrivalProbabilities.find(
    (p) => hour >= p.start && hour < p.end
  );
  const scaledProbability = arrivalProb
    ? arrivalProb.probability * (multiplier / 100)
    : 0;

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

export function runTheSimulation(params: SimulatorParams): SimulationResults{
  const {
    numberOfChargepoints,
    chargingPowerPerChargepoint,
    consumptionOfCars,
    arrivalProbabilityMultiplier,
  } = params;

  // Initialize the structure with arrays to hold kW usage for each chargepoint per tick
  // chargepointUsage[0][0] would be the usage of the first chargepoint at the first tick
  let chargepointUsage: ChargepointUsage = {};

  for (
    let chargepoint = 0;
    chargepoint < params.numberOfChargepoints;
    chargepoint++
  ) {
    chargepointUsage[chargepoint] = new Array(ticksPerYear).fill(0);
  }


  let totalEnergyConsumed = 0;
  let peakPowerDemand = 0;

  for (let tick = 0; tick < ticksPerYear; tick++) {
    let currentPowerDemand = 0;
    const dayOfTheYear = tick % (24 * 4); // Calculate the day of the year based on the tick
    const hourOfDay = Math.floor(dayOfTheYear / 4); // Calculate the hour of the day based on the tick

    for (
      let chargepoint = 0;
      chargepoint < numberOfChargepoints;
      chargepoint++
    ) {
      if (doesEvArrive(hourOfDay, arrivalProbabilityMultiplier)) {
        let demandKm = getEvChargingDemand();

        // Calculate energy needed based on demand (18kWh per 100kms)
        let kWhNeeded = demandKm * (consumptionOfCars / 100);
        totalEnergyConsumed += kWhNeeded;
        currentPowerDemand += chargingPowerPerChargepoint; // Assuming no delays etc..

        // Assuming the chargepoint is used for the entire tick if an EV arrives
        if (kWhNeeded > params.chargingPowerPerChargepoint) {
          chargepointUsage[chargepoint][tick] =
            params.chargingPowerPerChargepoint;
        } else {
          chargepointUsage[chargepoint][tick] = kWhNeeded;
        }
      }
    }

    peakPowerDemand = Math.max(peakPowerDemand, currentPowerDemand);
  }

  let theoreticalMaxDemand = numberOfChargepoints * chargingPowerPerChargepoint;
  let concurrencyFactor = (peakPowerDemand / theoreticalMaxDemand) * 100;

  let dailyUsagePerChargepoint: DailyUsagePerChargepoints = {};

  Object.keys(chargepointUsage).forEach((chargepoint:any) => {
    dailyUsagePerChargepoint[chargepoint] = [];

    for (let day = 0; day < 365; day++) {
      let dailySum = 0;
        // there are 96 ticks in one day (24 hours * 4 ticks per hour)
        for (let tick = day * 96; tick < (day + 1) * 96; tick++) {
        dailySum += chargepointUsage[chargepoint][tick];
      }
      // Convert from kW per 15 min to total kWh for the day
      dailyUsagePerChargepoint[chargepoint].push(dailySum / 4);
    }
  });


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
    concurrencyFactor,
    dailyUsagePerChargepoint,
    numberOfChargepoints
  };
}

export const simulator = {
  runTheSimulation,
};
