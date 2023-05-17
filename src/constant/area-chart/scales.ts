import { extent, scaleLinear, scaleOrdinal, scaleSqrt, scaleTime } from "d3";
import { AreaChartData } from "../../types/AreaChart";
import {
  cloudAccessor,
  dateAccessor,
  precipProbabilityAccessor,
  temperatureMaxAccessor,
  temperatureMinAccessor,
} from "./accessors";
import { boundsMessures } from "./messures";

export const generateAngleScale = (dataset: AreaChartData[]) =>
  scaleTime()
    .domain(extent(dataset, dateAccessor) as [Date, Date])
    .range([0, Math.PI * 2]);

export const generateRadiusScale = (dataset: AreaChartData[]) => {
  const minTemps = dataset.map(temperatureMinAccessor);
  const maxTemps = dataset.map(temperatureMaxAccessor);
  const domain = extent([...minTemps, ...maxTemps]) as [number, number];
  return scaleLinear().domain(domain).range([0, boundsMessures.radius]).nice();
};

export const generateCloudRadiusScale = (dataset: AreaChartData[]) => {
  return scaleSqrt()
    .domain(extent(dataset, cloudAccessor) as [number, number])
    .range([1, 10]);
};

export const generatePrecipRadiusScale = (dataset: AreaChartData[]) => {
  return scaleSqrt()
    .domain(extent(dataset, precipProbabilityAccessor) as [number, number])
    .range([0, 8]);
};

export const generatePrecipTypeScale = (types: string[]) => {
  return scaleOrdinal().domain(types).range(["#54a0ff", "#636e72", "#b2bec3"]);
};
