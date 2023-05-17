import { dateAccessor } from "../constant/area-chart/accessors";
import { boundsMessures } from "../constant/area-chart/messures";
import { AreaChartData } from "../types/AreaChart";

export const getCoordinatesForAngle = (angle: number, offset = 1) => {
  return [
    Math.cos(angle - Math.PI / 2) * boundsMessures.radius * offset,
    Math.sin(angle - Math.PI / 2) * boundsMessures.radius * offset,
  ];
};

export const getXFromDataPoint = (d: AreaChartData, scale: (v: Date) => number, offset = 1.4) =>
  getCoordinatesForAngle(scale(dateAccessor(d)), offset)[0];

export const getYFromDataPoint = (d: AreaChartData, scale: (v: Date) => number, offset = 1.4) =>
  getCoordinatesForAngle(scale(dateAccessor(d)), offset)[1];
