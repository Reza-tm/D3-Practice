import * as d3 from "d3";
import { messures } from "../../constant/area-chart/messures";
import { MouseEvent } from "react";
import { AreaChartData, ResultData } from "../../types/AreaChart";
import {
  cloudAccessor,
  precipProbabilityAccessor,
  precipTypeProbabilityAccessor,
  temperatureMaxAccessor,
  temperatureMinAccessor,
  uvAccessor,
} from "../../constant/area-chart/accessors";
import { motion } from "framer-motion";

type Props = {
  dataset: AreaChartData[];
  angleScale: d3.ScaleTime<number, number, never>;
  setActiveData: (d: ResultData) => void;
};

const InteractionCircle = (props: Props) => {
  const { angleScale, dataset, setActiveData } = props;
  const getAngleFromCoordinates = (x: number, y: number) => Math.atan2(y, x);
  let tooltipLine = d3.select("#tooltip-line");

  function handleMouseMove(e: MouseEvent<SVGElement>) {
    if (!tooltipLine.node()) {
      tooltipLine = d3.select("#tooltip-line");
    }
    const [x, y] = d3.pointer(e);

    let angle = getAngleFromCoordinates(x, y) + Math.PI / 2;
    if (angle < 0) angle = Math.PI * 2 + angle;
    tooltipLine.attr("opacity", 1);
    tooltipLine.attr("x2", x);
    tooltipLine.attr("y2", y);
  }

  function handleMouseDown(e: MouseEvent<SVGElement>) {
    const tooltip = d3.select("#tooltip");
    const point = d3.select("#point");

    tooltip.style("opacity", 1);
    const [x, y] = d3.pointer(e);

    let angle = getAngleFromCoordinates(x, y) + Math.PI / 2;
    if (angle < 0) angle = Math.PI * 2 + angle;

    point.style("transform", `translate(${x}px,${y}px)`);

    const date = angleScale.invert(angle);
    const dateString = d3.timeFormat("%Y-%m-%d")(date);
    const dataPoint = dataset.filter((d) => d.date == dateString)[0];
    if (!dataPoint) return;
    setActiveData({
      date: d3.timeFormat("%B %-d")(date),
      temperatureMin: `${d3.format(".1f")(temperatureMinAccessor(dataPoint))}°F`,
      temperatureMax: `${d3.format(".1f")(temperatureMaxAccessor(dataPoint))}°F`,
      uvIndex: uvAccessor(dataPoint),
      cloudCover: cloudAccessor(dataPoint),
      precipProbability: d3.format(".0%")(precipProbabilityAccessor(dataPoint)),
      precipType: precipTypeProbabilityAccessor(dataPoint) || "None",
    });
  }

  return (
    <g>
      <g id="point">
        <motion.circle
          initial={{ r: 2, strokeWidth: 1 }}
          animate={{ r: 4, strokeWidth: 3 }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          fill="transparent"
          stroke="#10b981"
          opacity={0.7}
        />
      </g>
      <line
        className="transition-all"
        id="tooltip-line"
        stroke="#10b981"
        opacity={0.5}
        strokeDasharray="5,3"
        strokeWidth={2}
      />
      <circle
        r={messures.radius}
        fill="transparent"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
      />
    </g>
  );
};

export default InteractionCircle;
