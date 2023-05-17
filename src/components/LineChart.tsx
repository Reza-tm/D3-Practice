import { MouseEvent, useEffect, useState } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";
import "./style.css";

type Data = {
  date: string;
  temperatureMax: number;
};

const LineChart = () => {
  // init data
  const [dataset, setDataset] = useState<Data[]>([]);
  useEffect(() => {
    d3.json("/weather-data.json").then((data) => {
      setDataset(data as Data[]);
    });
  }, []);

  // dimensions
  const [ref, { width, height }] = useMeasure();
  const margins = {
    top: 40,
    bottom: 60,
    left: 40,
    right: 0,
  };

  const dateParser = d3.timeParse("%Y-%m-%d");
  const xAccessor = (d: Data) => dateParser(d.date) as Date;
  const yAccessor = (d: Data) => d.temperatureMax as number;

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, xAccessor) as [Date, Date])
    .range([margins.left, width - margins.right]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor) as [number, number])
    .range([height - margins.bottom, margins.top]);

  //TODO fix types
  const pathGen = d3
    .line()
    .curve(d3.curveCardinal)
    .x((d: any) => xScale(xAccessor(d)))
    .y((d: any) => yScale(yAccessor(d)));
  const path = pathGen(dataset as any);

  // utils
  const getActiveData = (e: MouseEvent<SVGElement>) => {
    const [x] = d3.pointer(e);
    const bisect = d3.bisector(xAccessor).left;
    const activeIndex = bisect(dataset, xScale.invert(x));

    return dataset[activeIndex];
  };

  const getPositionsByData = (data: Data) => {
    return {
      x: xScale(xAccessor(data)),
      y: yScale(yAccessor(data)),
    };
  };

  const handleCircle = (x: number, y: number) => {
    d3.select(".circle").style("opacity", 1).attr("transform", `translate(${x},${y})`);
  };

  const parseStringDateToLocalDate = (date: string) => {
    return dateParser(date)?.toLocaleString("default", { month: "long", day: "numeric" }) || "";
  };

  const setDateText = (text: string) => {
    d3.select("#date").text(text);
  };
  const setMaxTempText = (maxTemp: number) => {
    d3.select("#max-temp").text(`Max-temp : ${maxTemp} deg`);
  };

  const handleTooltip = (x: number, y: number) => {
    d3.select("#tooltip")
      .style("opacity", 1)
      .style("top", `${y}px`)
      .style("left", `${x}px`)
      .style("transform", "translate(5px, -105%)");
  };

  const handleOnMouseMove = (e: MouseEvent<SVGElement>) => {
    const _d = getActiveData(e);
    const { x, y } = getPositionsByData(_d);
    handleCircle(x, y);
    const date = parseStringDateToLocalDate(_d.date);
    setDateText(date);
    setMaxTempText(_d.temperatureMax);
    handleTooltip(x, y);
  };

  return (
    <div className="bg-white  rounded-lg p-4 m-4">
      <div className="h-[500px] w-full relative" ref={ref}>
        {width && height && (
          <svg onMouseMove={handleOnMouseMove} viewBox={`0 0 ${width} ${height}`}>
            {/* y axis */}
            <g>
              {yScale.ticks(6).map((e) => (
                <>
                  <text opacity={0.4} x={0} y={yScale(e)}>
                    {e}
                  </text>
                  <line
                    stroke="#D5DBEB"
                    strokeDasharray={"6,15"}
                    strokeWidth={2}
                    x1={margins.left}
                    x2={width}
                    y1={yScale(e)}
                    y2={yScale(e)}
                  />
                </>
              ))}
            </g>
            {/* detail */}

            <motion.path
              initial={{
                opacity: 0,
                pathLength: 0,
              }}
              animate={{
                opacity: 1,
                pathLength: 1,
              }}
              transition={{
                duration: 1.5,
              }}
              filter="drop-shadow( 0px 4px 3px linear-gradient(180deg, rgba(56,95,222,1) 0%, rgba(255,255,255,1) 100%)"
              d={path as string}
              fill="none"
              stroke="#385FDE"
              strokeWidth={3}
            />
            {/* circle */}
            <g className="circle transition-all" style={{ opacity: 0 }}>
              <line y1={-height} y2={height} stroke="#F1F2F7" strokeWidth={2} />
              <circle cx={0} cy={0} r={5} fill="white" stroke="#385FDE" strokeWidth={3} />
            </g>
            {/* x axis */}
            <g className="circle">
              <rect
                width={width}
                height={margins.bottom - 20}
                y={height - margins.bottom + 20}
                fill="#F9F9F9"
                rx={10}
              ></rect>
              {xScale.ticks().map((e) => (
                <text x={xScale(e)} y={height - margins.bottom + 45}>
                  {e.toLocaleString("default", { month: "short" })}
                </text>
              ))}
            </g>
          </svg>
        )}
        <div
          className=" opacity-0 bg-[#192948] transition-all delay-100 absolute text-sm flex flex-col gap-2 text-white px-5 py-2 rounded-bl-none rounded-lg w-fit"
          id="tooltip"
        >
          <p id="max-temp" />
          <p id="date" />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
