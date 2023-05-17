import { timeParse } from "d3";
import { AreaChartData } from "../../types/AreaChart";

export const dateParser = timeParse("%Y-%m-%d");
export const dateAccessor = (d: AreaChartData) => dateParser(d.date) as Date;
export const temperatureMinAccessor = (d: AreaChartData) => d.temperatureMin;
export const temperatureMaxAccessor = (d: AreaChartData) => d.temperatureMax;
export const uvAccessor = (d: AreaChartData) => d.uvIndex;
export const precipProbabilityAccessor = (d: AreaChartData) => d.precipProbability;
export const precipTypeProbabilityAccessor = (d: AreaChartData) => d.precipType;
export const cloudAccessor = (d: AreaChartData) => d.cloudCover;
