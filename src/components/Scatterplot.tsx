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

// TODO get it dynamic

const Scatterplot = () => {
  const [ref, bounds] = useMeasure();
  const [dataset, setDataset] = useState<WeatherReport[]>([]);
  const [showHelper, setShowHelper] = useState(false);

  useEffect(() => {
    setDataset(scatterplotFakeData);
  }, []);

  // Tooltip utils
  const tooltip = d3.select("#tooltip");

  const addTooltipText = (text: string) => tooltip.text(text);

  const handleTooltipPosition = (d: WeatherReport) => {
    const circlePosition = xScale(xAccessor(d));
    const tooltipWidth = +tooltip.style("width").split("px")[0];

    const isLeftOverFlow = () => !(circlePosition > tooltipWidth / 2 + 30);
    const isRightOverFlow = () => !(bounds.width - circlePosition > tooltipWidth / 2);

    const newPos = isLeftOverFlow()
      ? circlePosition
      : isRightOverFlow()
      ? bounds.width - circlePosition - tooltipWidth / 2
      : 0;

    d3.select("#tooltip")
      .style("transform", `translate(-50% , -50px)`)
      .style("top", `${yScale(yAccessor(d))}px`)
      .style("left", `${xScale(xAccessor(d)) + newPos}px`);
  };

  const showTooltip = () => tooltip.style("opacity", 1);
  const hideTooltip = () => tooltip.style("opacity", 0);

  const handleOnMouseOut = () => hideTooltip();

  const handleOnMouseOver = (d: WeatherReport) => {
    handleTooltipPosition(d);
    addTooltipText(`Moon Phase : ${Math.round(d.moonPhase * 100)}%`);
    showTooltip();
  };

  // scales
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

  // Delaunay
  const delaunay = d3.Delaunay.from(
    dataset,
    (d) => xScale(xAccessor(d)),
    (d) => yScale(yAccessor(d))
  );

  const voronoi = delaunay.voronoi();
  voronoi.xmax = bounds.width - margins.left - margins.right;
  voronoi.ymax = bounds.height - margins.top - margins.bottom;

  // tailwind styles
  const helperDotsStyle = `w-3 h-3 rounded-full`;
  const helperContainerStyle = `flex gap-4 items-center`;

  return (
    <div className={`bg-white w-[${window.innerWidth}] gap-6 flex flex-col m-6 p-2 rounded-lg`}>
      <h1 className="font-semibold text-center">Scatter chart</h1>
      <div className="flex justify-between px-8">
        <div className="flex gap-8">
          <div className={helperContainerStyle}>
            <p>Day</p>
            <div className={`${helperDotsStyle} bg-[#e879f9]`} />
          </div>
          <div className={helperContainerStyle}>
            <p>Night</p>
            <div className={`${helperDotsStyle} bg-[#5eead4] `} />
          </div>
          <div className={helperContainerStyle}>
            <p>Moon phase</p>
            <div className={`${helperDotsStyle} bg-[#facc15]`} />
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9, y: 5 }}
          onClick={() => setShowHelper(!showHelper)}
          className="border-gray-400 border-2 px-2 py-1 rounded-md"
          type="button"
        >
          {showHelper ? "hide helpers" : "show helpers"}
        </motion.button>
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
                    repeat: 6,
                    repeatType: "reverse",
                    duration: 0.4,
                  }}
                  cx={xScale(xAccessor(d))}
                  cy={yScale(yAccessor(d))}
                  fill={colors.yellow}
                  opacity={0.2}
                />
                <circle
                  onMouseEnter={() => !showHelper && handleOnMouseOver(d)}
                  onMouseOut={() => !showHelper && handleOnMouseOut()}
                  cx={xScale(xAccessor(d))}
                  cy={yScale(yAccessor(d))}
                  r={5}
                  fill={d.icon === "clear-day" ? colors.purple : colors.green}
                />
              </motion.g>
            ))}

            {/* voronoi */}
            <g>
              {dataset.map((d, i) => (
                <AnimatePresence>
                  {showHelper && (
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ pathLength: 0 }}
                      onMouseEnter={() => handleOnMouseOver(d)}
                      onMouseOut={() => handleOnMouseOut()}
                      d={voronoi.renderCell(i)}
                      fill="transparent"
                      strokeWidth={2}
                      opacity={0.4}
                      stroke={showHelper ? colors.gray : undefined}
                    />
                  )}
                </AnimatePresence>
              ))}
            </g>

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
          <div
            id={"tooltip"}
            className="opacity-0 absolute transition-all whitespace-nowrap pointer-events-none bg-slate-200 p-2 rounded-md w-[160px] text-center"
          />
        </div>
      </div>
      <p className="flex items-center origin-center justify-center mt-2 pb-4">Dew Point</p>
    </div>
  );
};

export default Scatterplot;
