import * as d3 from "d3";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { histogramFakeData } from "../constant/histogram";
import kFormatter from "../utils/KFormatter";
import "./style.css";

type DataSetType = {
  month: string;
  income: number;
  expenses: number;
};

const margin = {
  top: 20,
  bottom: 40,
  left: 60,
  right: 20,
};

const Histogram = () => {
  const [dataSet, setDataSet] = useState<DataSetType[]>([]);
  const [shouldHasDelay, setShouldHasDelay] = useState(true);
  const [ref, bounds] = useMeasure();
  const chartWidth = bounds.width - margin.right;

  useEffect(() => {
    const sortedData = histogramFakeData.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
    const stringDateData = sortedData.map((d) => ({
      ...d,
      month: d.date.toLocaleString("default", { month: "short" }),
    }));
    setDataSet(stringDateData);
  }, []);

  const xScale = d3
    .scaleBand()
    .domain(dataSet.map((d) => d.month))
    .range([margin.left, chartWidth])
    .padding(0.2);

  const maxYDomain = d3.max(dataSet.flatMap((d) => [d.expenses, d.income])) || 0;
  const yScale = d3
    .scaleLinear()
    .domain([0, maxYDomain])
    .range([bounds.height - margin.bottom, margin.top]);

  const getBarHeight = (data: number) => {
    return d3.max([bounds.height - yScale(data) - margin.bottom, 0]);
  };

  const isSpentOverload = (d: DataSetType) => d.expenses > d.income;

  const afterBarMountDelayTime = dataSet.length * 0.2;

  const dotsStyle = "w-3 h-3 rounded-full";
  const dotsContainerStyle = "flex gap-2 items-center";

  return (
    <div
      className={`bg-white w-[${window.innerWidth}px] h-[500px] rounded-lg m-3 gap-5 p-4 flex flex-col justify-between`}
    >
      <p className="font-semibold spacing tracking-wider">Acitvity</p>
      <div ref={ref} className="h-full">
        {bounds.height && (
          <svg viewBox={`0 0 ${bounds.width} ${bounds.height}`} className="text-gray-600">
            {/* y Axis */}
            {yScale.ticks(4).map((d, i) => (
              <g key={`${i}-y-axis`}>
                <text alignmentBaseline="central" y={yScale(d)} fill="currentColor" fontSize={12}>
                  {kFormatter(d)}
                </text>
                <line
                  x={100}
                  y={200}
                  y1={yScale(d)}
                  y2={yScale(d)}
                  x1={margin.left}
                  x2={chartWidth}
                  stroke="#EBEBEB"
                />
              </g>
            ))}

            {/* details */}
            <motion.g>
              {dataSet.map((d, i) => {
                return (
                  <g
                    className="text-gray-400"
                    transform={`translate(${xScale(d.month) || 0 + margin.left})`}
                  >
                    <g>
                      <motion.rect
                        initial={{
                          height: 0,
                          width: xScale.bandwidth(),
                          attrY: bounds.height - margin.bottom,
                          opacity: 0,
                        }}
                        transition={{
                          delay: shouldHasDelay ? i * 0.2 : 0,
                          type: "spring",
                          width: {
                            delay: shouldHasDelay ? afterBarMountDelayTime : 0,
                            duration: 0.4,
                          },
                        }}
                        animate={{
                          height: getBarHeight(d.income),
                          attrY: yScale(d.income),
                          opacity: 1,
                          width: xScale.bandwidth() / 2,
                        }}
                        fill="#292728"
                      />
                      <motion.rect
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                        }}
                        onAnimationComplete={() => setShouldHasDelay(false)}
                        transition={{
                          type: "spring",
                          delay: shouldHasDelay ? afterBarMountDelayTime + 0.5 : 0,
                          duration: 1,
                        }}
                        height={getBarHeight(d.expenses)}
                        y={yScale(d.expenses)}
                        x={xScale.bandwidth() / 2}
                        fill="#EBEBEB"
                        width={xScale.bandwidth() / 2}
                      />
                    </g>
                  </g>
                );
              })}
            </motion.g>

            {/* x Axis */}
            {dataSet.map((d, i) => (
              <motion.text
                initial={{
                  fill: "#4b5563",
                }}
                animate={{
                  x: isSpentOverload(d) ? [-1, 1, -1, 1] : 0,
                  fill: isSpentOverload(d) ? "#f87171" : "#4b5563",
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    duration: 0.2,
                    repeatDelay: 2,
                    repeatType: "loop",
                    delay: afterBarMountDelayTime * 1.5,
                  },
                  fill: {
                    delay: afterBarMountDelayTime * 1.5,
                  },
                }}
                key={`x-axis-${i}`}
                x={(xScale(d.month) || 0) + xScale.bandwidth() / 2}
                fontSize={12}
                y={bounds.height - 10}
                textAnchor="middle"
              >
                {d.month}
              </motion.text>
            ))}
          </svg>
        )}
      </div>
      <div className="flex w-full gap-6 justify-center">
        <div className={dotsContainerStyle}>
          <div className={`${dotsStyle}  bg-[#292728]`} />
          <p className="text-gray-400">Income</p>
        </div>
        <div className={dotsContainerStyle}>
          <div className={`${dotsStyle} bg-[#EBEBEB]`} />
          <p className="text-gray-400">Spent</p>
        </div>
      </div>
    </div>
  );
};

export default Histogram;
