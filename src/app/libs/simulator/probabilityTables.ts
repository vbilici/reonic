export type ArrivalProbability = {
  start: number;
  end: number;
  probability: number;
};

export const arrivalProbabilities: ArrivalProbability[] = [
  { start: 0, end: 1, probability: 0.0094 }, //start and end hours
  { start: 1, end: 2, probability: 0.0094 },
  { start: 2, end: 3, probability: 0.0094 },
  { start: 3, end: 4, probability: 0.0094 },
  { start: 4, end: 5, probability: 0.0094 },
  { start: 5, end: 6, probability: 0.0094 },
  { start: 6, end: 7, probability: 0.0094 },
  { start: 7, end: 8, probability: 0.0094 },
  { start: 8, end: 9, probability: 0.0283 },
  { start: 9, end: 10, probability: 0.0283 },
  { start: 10, end: 11, probability: 0.0566 },
  { start: 11, end: 12, probability: 0.0566 },
  { start: 12, end: 13, probability: 0.0566 },
  { start: 13, end: 14, probability: 0.0755 },
  { start: 14, end: 15, probability: 0.0755 },
  { start: 15, end: 16, probability: 0.0755 },
  { start: 16, end: 17, probability: 0.1038 },
  { start: 17, end: 18, probability: 0.1038 },
  { start: 18, end: 19, probability: 0.1038 },
  { start: 19, end: 20, probability: 0.0472 },
  { start: 20, end: 21, probability: 0.0472 },
  { start: 21, end: 22, probability: 0.0472 },
  { start: 22, end: 23, probability: 0.0094 },
  { start: 23, end: 24, probability: 0.0094 },
];

export type DistanceProbability = {
  km: number;
  probability: number;
};

export const chargingDemandProbabilities: DistanceProbability[] = [
  { km: 0, probability: 0.3431 },
  { km: 5, probability: 0.049 },
  { km: 10, probability: 0.098 },
  { km: 20, probability: 0.1176 },
  { km: 30, probability: 0.0882 },
  { km: 50, probability: 0.1176 },
  { km: 100, probability: 0.1078 },
  { km: 200, probability: 0.049 },
  { km: 300, probability: 0.0294 },
];
