export type AreaChartData = {
  date: string;
  temperatureMin: number;
  temperatureMax: number;
  uvIndex: number;
  precipProbability: number;
  precipType: string;
  cloudCover: number;
};

export type MonthCoordinate = {
  pos: number[];
  labelPos: number[];
  date: string;
};

export type ResultData = {
  date: string;
  temperatureMin: string;
  temperatureMax: string;
  uvIndex: number;
  precipProbability: string;
  precipType: string;
  cloudCover: number;
};
