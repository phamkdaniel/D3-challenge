var input = d3.csv('./assets/data/data.csv');

// set graph dimensions
var svgWidth = 1200;
var svgHeight = 660;

var margin = {
  top: 20,
  right: 40,
  bottom: 100,
  left: 100
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// add svg object to body of page
var svg = d3.select('#scatter')
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// read data
input.then(function(data) {
    console.log(data);

    abbreviations = data.map(e => e.abbr)

    data.forEach(function(d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    })

    // add x axis
    var xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d=> d.poverty) +2])
      .range([0, width]);
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // add y axis 
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d=> d.healthcare) +2])
      .range([height, 0]);
    chartGroup.append("g")
      .call(d3.axisLeft(yScale));

    // add scatter
    chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.healthcare))
      .attr("r", 1.5)
      .attr("fill", "pink")
      .attr("opacity", ".5");
  
}).catch(error => console.log(error));
