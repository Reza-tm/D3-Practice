import { WeatherReport } from "../types/weatherReport";

export const xAccessor = (d: WeatherReport) => d.dewPoint;
export const yAccessor = (d: WeatherReport) => d.humidity;
