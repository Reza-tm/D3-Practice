// import d3 from "d3";

const xAccessor = (d) => d.dewPoint;
const yAccessor = (d) => d.humidity;

const colorAccessor = (d) => d.cloudCover;

const lowestDimensions = d3.min([window.innerHeight * 0.9, window.innerWidth * 0.9]);
const dimensions = {
  width: lowestDimensions,
  height: lowestDimensions,
  margin: {
    top: 10,
    right: 10,
    left: 60,
    bottom: 50,
  },
};

dimensions.boundsWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left;
dimensions.boundsHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

const drawChart = async () => {
  const dataSet = await d3.json("./my_weather_data.json");

  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .style("background", "#eeeeee");

  const bounds = wrapper
    .append("g")
    .style("transform", `translate(${dimensions.margin.left}px , ${dimensions.margin.top}px)`);
  console.log(bounds);

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataSet, xAccessor))
    .range([0, dimensions.boundsWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataSet, yAccessor))
    .range([dimensions.boundsHeight, 0])
    .nice();

  const colorScale = d3
    .scaleLinear()
    .domain(d3.extent(dataSet, colorAccessor))
    .range(["skyblue", "darkslategrey"]);

  const dots = bounds
    .selectAll("circle")
    .data(dataSet)
    .join("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("r", 3)
    .attr("fill", (d) => colorScale(colorAccessor(d)));

  // xAxis line
  const xAxisGenerator = d3.axisBottom().scale(xScale).ticks(20);
  const xAxis = bounds.append("g");
  xAxis.call(xAxisGenerator).style("transform", `translateY(${dimensions.boundsHeight - 10}px)`);

  const xAxisLabel = xAxis
    .append("text")
    .attr("x", dimensions.boundsWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .html("Dew point (&deg;F)");

  // yAxis line
  const yAxisGenerator = d3.axisLeft().scale(xScale).ticks(4);
  const yAxis = bounds.append("g");
  yAxis.call(yAxisGenerator);

  const yAxisLabel = yAxis
    .append("text")
    .attr("x", -dimensions.boundsHeight / 2)
    .attr("y", -dimensions.margin.left + 20)
    .attr("fill", "black")
    .style("transform", "rotate(-90deg)")
    .style("font-size", "1.4em")
    .style("text-anchor", "middle")
    .html("Relative humidity");
};

await drawChart();
