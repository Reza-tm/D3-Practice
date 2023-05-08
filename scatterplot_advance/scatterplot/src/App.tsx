import { useEffect, useRef } from "react";
import "./App.css";
import { createDimensions } from "./constants/dimensions";
import { select, json, axisBottom, axisLeft, active } from "d3";
import { generateWindSpeedScale, generateXScale, generateYScale } from "./utils/scales";
import { WeatherReport } from "./types/weatherReport";
import { xAccessor, yAccessor } from "./utils/accessors";
import { Dimensions } from "./types/Dimensions";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const createChart = () => {
    if (ref.current) {
      const { ...dimensions } = createDimensions(ref.current);
      drawChart(dimensions);
    } else {
      console.error("cannot find container");
    }
  };

  useEffect(() => {
    createChart();
    window.addEventListener("resize", createChart);
  }, []);

  async function drawChart(dimensions: Dimensions) {
    const { boundsHeight, boundsWidth, height, margin, width } = dimensions;
    let dataSet = await json<WeatherReport[]>("/my_weather_data.json");
    if (!dataSet) {
      throw new Error("data not defined!");
    }

    dataSet = dataSet.slice(0, 50);

    const svg = select("#wrapper").attr("width", width).attr("height", height);

    svg.select("g").remove();

    const bound = svg.append("g").style("transform", `translate(${margin.left}px,${margin.top}px)`);

    // scales
    const xScale = generateXScale(dataSet, boundsWidth);
    const yScale = generateYScale(dataSet, boundsHeight);
    const windScale = generateWindSpeedScale(dataSet);

    // draw

    const dots = bound.selectAll("circle").data(dataSet).join("g");
    dots
      .append("circle")
      .attr("cx", (d: WeatherReport) => xScale(+xAccessor(d)))
      .attr("cy", (d: WeatherReport) => yScale(+yAccessor(d)))
      .attr("fill", "#facc15")
      .style("opacity", ".1")

      .transition()
      .delay(function (_d, i) {
        return i * 50;
      })
      .duration(1000)
      .on("start", function repeat(d: WeatherReport) {
        active(this)!
          .attr("r", "0")
          .transition()
          .attr("r", () => 5 * windScale(d.moonPhase))
          .transition()
          .on("start", repeat as any);
      });

    dots
      .append("circle")
      .attr("cx", (d: WeatherReport) => xScale(+xAccessor(d)))
      .attr("cy", (d: WeatherReport) => yScale(+yAccessor(d)))
      .attr("r", 5)
      .style("fill", (d) => (d.icon === "clear-day" ? "#e879f9" : "#5eead4"));

    // axises

    // y axis
    const yAxisGenerator = axisLeft(yScale)
      .tickSizeInner(-boundsWidth)
      .tickSizeOuter(0)
      .ticks(5)
      .tickPadding(-25);
    const yAxis = bound
      .append("g")
      .call(yAxisGenerator)
      .attr("stroke-dasharray", "3")
      .attr("fill", "");

    yAxis.selectAll(".tick text").style("transform", "translateY(-10px)").style("opacity", 0.7);
    yAxis.selectAll("line").attr("stroke", "#BCBCBD");
    yAxis.select(".domain").attr("stroke", "#BCBCBD").attr("d", `M0,${boundsHeight}V0`);

    yAxis
      .append("text")
      .attr("x", -boundsHeight / 2)
      .attr("y", -margin.left + 35)
      .style("text-anchor", "middle")
      .style("transform", "rotate(-90deg)")
      .html("Humidity")
      .style("font-size", 16);

    // x axis
    const xAxisGenerator = axisBottom(xScale)
      .tickSizeOuter(0)
      .tickSizeInner(-boundsHeight)
      .tickPadding(10);

    const xAxis = bound
      .append("g")
      .call(xAxisGenerator)
      .style("transform", `translateY(${boundsHeight}px)`)
      .attr("stroke-dasharray", "3")
      .attr("fill", "");

    xAxis.selectAll("line").style("display", "none");
    xAxis.select(".domain").attr("d", `M0,0H${boundsWidth}`).attr("stroke", "#BCBCBD");
    xAxis.selectAll("text").style("opacity", 0.7);

    xAxis
      .append("text")
      .attr("x", boundsWidth / 2)
      .attr("y", margin.bottom / 2 + 15)
      .html("Dew Point")
      .style("font-size", 16);
  }

  return (
    <div className="flex flex-col py-6 flex-nowrap items-center bg-slate-50 w-[90vw] h-[70vh] rounded-lg justify-end box-content">
      <div className="flex flex-col gap-4 items-center">
        <p className="text-xl font-bold">Scatter Chart</p>
        <div className="flex gap-8">
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
      </div>
      <div className="w-full h-full" ref={ref}>
        <svg id="wrapper" />
      </div>
    </div>
  );
}

export default App;
