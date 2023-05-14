import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { colors, scatterplotFakeData } from "../constant/scatterplot";
import * as d3 from "d3";
import { motion } from "framer-motion";
import "./style.css";

type WeatherReport = { moonPhase: number; dewPoint: number; humidity: number; icon: string };

const xAccessor = (d: WeatherReport) => d.dewPoint;
const yAccessor = (d: WeatherReport) => d.humidity;
const moonPhaseAccessor = (d: WeatherReport) => d.moonPhase;

const axisOffset = {
  top: 20,
  bottom: 30,
  right: 50,
  left: 50,
};
const margins = {
  top: 0,
  bottom: 20,
  left: 1,
  right: 20,
};

// TODO get it dynamic
const toolTipWidth = 160;

const Scatterplot = () => {
  const [ref, bounds] = useMeasure();
  const [dataset, setDataset] = useState<WeatherReport[]>([]);
  const [moonPhase, setMoonPhase] = useState(100);
  const [showPopOver, setShowPopOver] = useState(false);

  useEffect(() => {
    setDataset(scatterplotFakeData);
  }, []);

  const handleOnMouseOver = (e: SVGCircleElement, d: WeatherReport) => {
    const circlePosition = +e.getAttribute("cx")!;

    const isLeftOverFlow = () => !(circlePosition > toolTipWidth / 2 + 30);
    const isRightOverFlow = () => !(bounds.width - circlePosition > toolTipWidth / 2);

    const newPos = isLeftOverFlow()
      ? circlePosition
      : isRightOverFlow()
      ? bounds.width - circlePosition - toolTipWidth / 2
      : 0;

    setMoonPhase(d.moonPhase * 100);
    setShowPopOver(true);
    d3.select("#tooltip")
      .style("transform", `translate(-50% , -50px)`)
      .style("top", `${yScale(yAccessor(d))}px`)
      .style("left", `${xScale(xAccessor(d)) + newPos}px`);
  };
  const handleOnMouseOut = () => {
    setShowPopOver(false);
  };

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor) as [number, number])
    .range([axisOffset.left, bounds.width - axisOffset.right]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor) as [number, number])
    .range([bounds.height - axisOffset.bottom, axisOffset.top])
    .nice();

  const moonPhaseScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, moonPhaseAccessor) as [number, number])
    .range([1, 3])
    .nice();

  return (
    <div className={`bg-white w-[${window.innerWidth}] gap-6 flex flex-col m-6 p-2 rounded-lg`}>
      <h1 className="font-semibold text-center">Scatter chart</h1>
      <div className="flex gap-8 justify-center">
        <div className="flex gap-4 items-center">
          <p>Day</p>
          <div className="w-3 h-3 bg-[#e879f9] rounded-full" />
        </div>
        <div className="flex gap-4 items-center">
          <p>Night</p>
          <div className="w-3 h-3 bg-[#5eead4] rounded-full" />
        </div>
        <div className="flex gap-4 items-center">
          <p>Moon phase</p>
          <div className="w-6 h-6 bg-[#facc15] opacity-30 rounded-full" />
        </div>
      </div>
      <div className="flex w-full h-full gap-2">
        <p className="flex items-center -rotate-90 origin-center">Humidity</p>
        <div ref={ref} className="h-[500px] w-full pb-5  relative">
          <svg viewBox={`0 0 ${bounds.width} ${bounds.height}`} style={{ flexShrink: 0 }}>
            {/* y axis */}
            <g>
              {yScale.ticks(5).map((e) => (
                <g key={`y-axis${e}`}>
                  <text fontSize={10} x={10} y={yScale(e) - 5}>
                    {e}
                  </text>
                  <line
                    y1={yScale(e)}
                    y2={yScale(e)}
                    strokeWidth={1.5}
                    x1={5}
                    x2={bounds.width - margins.right}
                    stroke={colors.gray}
                    strokeDasharray={3}
                  />
                </g>
              ))}
              <line
                strokeDasharray={3}
                x1={margins.left}
                x2={margins.left}
                y1={margins.top}
                y2={bounds.height - margins.bottom}
                stroke={colors.gray}
              />
            </g>

            {/* details */}
            {dataset.map((d, i) => (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: (i + 1) * 0.01,
                }}
                key={`detail-${i}`}
              >
                <motion.circle
                  initial={{ r: 5 }}
                  animate={{ r: 5 * moonPhaseScale(moonPhaseAccessor(d)) }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                  }}
                  cx={xScale(xAccessor(d))}
                  cy={yScale(yAccessor(d))}
                  fill={colors.yellow}
                  opacity={0.2}
                />
                <circle
                  onMouseOver={(e) => handleOnMouseOver(e.target as SVGCircleElement, d)}
                  onMouseOut={() => handleOnMouseOut()}
                  cx={xScale(xAccessor(d))}
                  cy={yScale(yAccessor(d))}
                  r={5}
                  fill={d.icon === "clear-day" ? colors.purple : colors.green}
                />
              </motion.g>
            ))}

            {/* x axis */}
            <g>
              {xScale.ticks().map((e) => (
                <g key={`x-axis${e}`}>
                  <text fontSize={10} x={xScale(e)} y={bounds.height}>
                    {e}
                  </text>
                  <line
                    y1={yScale(e)}
                    y2={yScale(e)}
                    x1={5}
                    strokeWidth={1.5}
                    x2={bounds.width}
                    stroke="#BCBCBD"
                    strokeDasharray={3}
                  />
                </g>
              ))}
              <line
                strokeDasharray={3}
                x1={margins.left}
                x2={bounds.width - margins.right}
                y1={bounds.height - margins.bottom}
                y2={bounds.height - margins.bottom}
                stroke="#BCBCBD"
              />
            </g>
          </svg>
          <motion.div
            animate={{ opacity: showPopOver ? 1 : 0 }}
            transition={{
              delay: 0.2,
              repeatDelay: 1,
            }}
            id={"tooltip"}
            className={`absolute pointer-events-none bg-slate-200 p-2 rounded-md w-[${toolTipWidth}px] text-center`}
          >
            Moon Phase : {Math.round(moonPhase)}%
          </motion.div>
        </div>
      </div>

      <p className="flex items-center origin-center justify-center mt">Dew Point</p>
    </div>
  );
};

export default Scatterplot;
