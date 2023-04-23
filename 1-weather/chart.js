const dateParser = d3.timeParse("%Y-%m-%d");

const yAccessor = (d) => d.temperatureMax;
const xAccessor = (d) => dateParser(d.date);

const dimensions = {
  width: window.innerWidth * 0.9,
  height: 400,
  marign: {
    top: 15,
    right: 15,
    bottom: 40,
    left: 60,
  },
};
dimensions.boundedWidth = dimensions.width - dimensions.marign.left - dimensions.marign.right;
dimensions.boundedHeight = dimensions.height - dimensions.marign.top - dimensions.marign.bottom;

const drawChart = async () => {
  const dataset = await d3.json("./my_weather_data.json");

  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("height", dimensions.height)
    .attr("width", dimensions.width);

  const bounds = wrapper.append("g").style(
    "transform",
    `translate(
        ${dimensions.marign.left}px,${dimensions.marign.top}px
      )`
  );

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0]);

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const freezingTemperaturePlacement = yScale(32);

  const freezingTemperatures = bounds
    .append("rect")
    .attr("x", 0)
    .attr("y", freezingTemperaturePlacement)
    .attr("width", dimensions.boundedWidth)
    .attr("height", dimensions.boundedHeight - freezingTemperaturePlacement)
    .attr("fill", "#e0f3f3");

  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  const line = bounds
    .append("path")
    .attr("d", lineGenerator(dataset))
    .attr("fill", "none")
    .attr("stroke", "#af9358")
    .attr("stroke-width", 2);

  const yAxisGenerator = d3.axisLeft().scale(yScale);
  const yAxis = bounds.append("g").call(yAxisGenerator);

  const xAxisGenerator = d3.axisBottom().scale(xScale);
  const xAxis = bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${dimensions.boundedHeight}px)`);
};

await drawChart();
