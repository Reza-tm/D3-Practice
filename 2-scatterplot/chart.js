// import d3 from "d3";
const xAccessor = (d) => d.dewPoint;
const yAccessor = (d) => d.humidity;

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
    .attr("height", dimensions.height);

  const bounds = wrapper
    .append("g")
    .style("transform", `translate(${dimensions.margin.left}px , ${dimensions.margin.top}px)`);

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

  const dots = bounds
    .selectAll("circle")
    .data(dataSet)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("r", 3)
    .attr("fill", "gray");
};

await drawChart();
