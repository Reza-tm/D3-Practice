import { scaleLinear, extent } from "d3";
import { WeatherReport } from "../types/weatherReport";
import { xAccessor, yAccessor } from "./accessors";

export const generateXScale = (data: WeatherReport[], boundWidth: number) => {
  const domain = extent(data, xAccessor) as [number, number];
  return scaleLinear()
    .domain(domain)
    .range([50, boundWidth - 50])
    .nice();
};

export const generateYScale = (data: WeatherReport[], boundHieght: number) => {
  const domain = extent(data, yAccessor) as [number, number];
  return scaleLinear()
    .domain(domain)
    .range([boundHieght - 30, 20])
    .nice();
};

export const generateWindSpeedScale = (data: WeatherReport[]) => {
  const domain = extent(data, (d) => d.moonPhase) as [number, number];
  return scaleLinear().domain(domain).range([1.2, 3]).nice();
};
