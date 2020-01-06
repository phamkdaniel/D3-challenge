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

    // parse data as numbers
    data.forEach(function(d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    })

    // scale functions
    var xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.poverty) +2])
      .range([0, width]);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.healthcare) +2])
      .range([height, 0]);

    // axis functions
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // append axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis)

    chartGroup.append("g")
      .call(leftAxis)

    // axes labels
    chartGroup.append("text")
      .attr("y", height + margin.bottom/2)
      .attr("x", width / 2)
      .text("In Poverty (%)");

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .text("Lacks Healthcare (%)");

    // add circles
    var radius = 15;
    var circles = svg.selectAll("g")
      .data(data)
      .enter()
      .append("g");

    circles.append("circle")
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.healthcare))
      .attr("r", radius)
      .attr("fill", "blue")
      .attr("opacity", ".5");

    // add state abbreviations
    circles.append("text")
      .attr("x", d => xScale(d.poverty) - radius/1.3)
      .attr("y", d => yScale(d.healthcare) + radius/2)
      .text(d => d.abbr)
      .style("fill", "white");

}).catch(error => console.log(error));
