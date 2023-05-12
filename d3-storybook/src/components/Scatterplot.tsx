import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { colors, scatterplotFakeData } from "../constant/scatterplot";
import * as d3 from "d3";
import { AnimatePresence, motion } from "framer-motion";
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

const Scatterplot = () => {
  const [ref, bounds] = useMeasure();
  const [dataset, setDataset] = useState<WeatherReport[]>([]);
  const [moonPhase, setMoonPhase] = useState(100);
  const [showPopOver, setShowPopOver] = useState(false);

  useEffect(() => {
    setDataset(scatterplotFakeData);
  }, []);

  const handleOnMouseOver = (d: WeatherReport) => {
    setMoonPhase(d.moonPhase * 100);
    setShowPopOver(true);
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
    <div
      className={`bg-white w-[${window.innerWidth}] gap-6 flex flex-col m-6 p-2 rounded-lg relative`}
    >
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
      <div ref={ref} className="h-[500px] pb-5 flex gap-2">
        <p className="-rotate-90 flex items-center origin-center">Humidity</p>
        <div className="w-full h-full pb-5 flex flex-col gap-4">
          <svg viewBox={`0 0 ${bounds.width} ${bounds.height}`} style={{ flexShrink: 0 }}>
            {/* y axis */}
            <g>
              {yScale.ticks(5).map((e) => (
                <g>
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
                  onMouseOver={() => handleOnMouseOver(d)}
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
                <g>
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
        </div>
        <AnimatePresence>
          {showPopOver && (
            <motion.div
              id="moon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="top-5 absolute overflow-hidden rounded-full"
              style={{
                transform: `translate(-${moonPhase}px, -${moonPhase}px) scale(.8)`,
                width: 130,
                height: 130,
                boxShadow: `${moonPhase}px ${moonPhase}px 0 0 ${colors.yellow}70`,
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <p className="flex items-center origin-center justify-center -mt-6">Dew Point</p>
    </div>
  );
};

export default Scatterplot;
