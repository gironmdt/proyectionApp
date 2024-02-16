export interface ScaleData {
  scale: string;
  minimum_altitude: number;
  maximum_altitude: number;
  initial_production_week: number;
  production_start_days: number;
  yield_per_plant_during_cycle: number;
  production_weeks: number;
  week_data: number [];
}


export interface ScalesData {
  scales: ScaleData[];
}