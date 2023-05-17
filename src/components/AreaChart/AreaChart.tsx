import { useEffect, useState } from "react";
import * as d3 from "d3";
import { AreaChartData, ResultData } from "../../types/AreaChart";
import { generateAngleScale, generateRadiusScale } from "../../constant/area-chart/scales";
import { boundsMessures, messures } from "../../constant/area-chart/messures";
import { getCoordinatesForAngle } from "../../utils/AreaChartUtils";
import DateLine from "./DateLine";
import TemperatureCircle from "./TemperatureCircle";
import FreezingCircle from "./FreezingCircle";
import GradientFilter from "./GradientFilter";
import UvIndexLine from "./UvIndexLine";
import CloudCover from "./CloudCover";
import PrecipType from "./PrecipType";
import TemperatureArea from "./TemperatureArea";
import InteractionCircle from "./InteractionCircle";
import "../style.css";
import Tooltip from "./Tooltip";

const AreaChart = () => {
  const [dataset, setDataset] = useState<AreaChartData[]>([]);
  useEffect(() => {
    d3.json("/weather-data.json").then((data) => {
      setDataset(data as AreaChartData[]);
    });
  }, []);

  const angleScale = generateAngleScale(dataset);
  const radiusScale = generateRadiusScale(dataset);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const months = d3.timeMonth.range(...angleScale.domain());
  const monthCoordinates = months.map((e) => {
    const pos = getCoordinatesForAngle(angleScale(e));
    const labelPos = getCoordinatesForAngle(angleScale(e), 1.38);
    return {
      pos,
      labelPos,
      date: d3.timeFormat("%b")(e),
    };
  });

  const uvIndexThreshold = 8;
  const [activeData, setActiveData] = useState<ResultData>({} as ResultData);

  return (
    <div className="p-4 m-4 bg-white w-fit gap-6 flex justify-between rounded-lg">
      <Tooltip data={activeData} />
      {dataset.length > 0 && (
        <svg style={{ overflow: "visible" }} width={messures.width} height={messures.height}>
          {/* filters */}
          <GradientFilter id="temperature-gradient" />
          {/* bound */}
          <g
            id="bound"
            style={{
              transform: `translate(${boundsMessures.radius + messures.margins.left}px , ${
                boundsMessures.radius + messures.margins.top
              }px)`,
            }}
          >
            {/* base line and dates */}
            <DateLine monthCoordinates={monthCoordinates} />
            {/* temperature circle */}
            <TemperatureCircle ticks={radiusScale.ticks(4)} radiusScale={radiusScale} />
            {/* Freezing circle */}
            <FreezingCircle radius={radiusScale(32)} />
            {/* temperature area */}
            <TemperatureArea radiusScale={radiusScale} dataset={dataset} angleScale={angleScale} />
            {/* uv index */}
            <UvIndexLine
              scale={angleScale}
              uvData={dataset.filter((e) => e.uvIndex > uvIndexThreshold)}
            />
            {/* cloud cover */}
            <CloudCover angleScale={angleScale} dataset={dataset} />
            {/* precip type */}
            <PrecipType angleScale={angleScale} dataset={dataset} />
            {/* interactions*/}
            <InteractionCircle
              setActiveData={setActiveData}
              angleScale={angleScale}
              dataset={dataset}
            />
          </g>
        </svg>
      )}
    </div>
  );
};

export default AreaChart;
