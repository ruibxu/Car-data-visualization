var margin = {top: 50, right: 30, bottom: 50, left: 60},
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;


var svg = d3.select("#svg")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("../pca.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([-5, 5])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-5, 5])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.PC1); } )
      .attr("cy", function (d) { return y(d.PC2); } )
      .attr("r", 3)
      .style("fill", "#B19CD8")

    svg.append("text")
  .attr("x", (width / 2))             
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .style("text-decoration", "underline")  
  .text("Biplot for the car datas");

  svg.append("text")
.attr("transform", "translate(0," + height + ")")
.attr("y", height - 630)
.attr("x", width - 900)
.attr("transform", "rotate(-90)")
.text("PC2");

// x axis labels
svg.append("text")
.attr("transform", "translate(0," + height + ")")
.attr("y", height - 550)
.attr("x", width - 350)
.text("PC1");


let points=[[-0.5428466976009529,0.43876128184640517],
  [0.3301747558386996,0.5404908778541142],
  [0.2122254836323933,-0.059524458150277154],
  [0.1938772893647851,0.1522127070106136],
  [-0.3474517883944854,-0.2002714988499863],
  [0.01290528210653494,-0.25670057609431507],
  [-0.019163160309970142,-0.32935463132411547],
  [0.16027883536299556,-0.28561370229243904]]

svg.append("marker")
  .attr("id", "arrow" + i)
  .attr("markerWidth", 10)
  .attr("markerHeight", 10)
  .attr("refX", 0)
  .attr("refY", 3)
  .attr("orient", "auto")
  .append("path")
  .attr("d", "M0,0 L0,6 L9,3 z")
  .style("stroke", colors[i])
  .style("fill", colors[i]);

svg.append("line")
      .attr("x1", xScale(0))
      .attr("y1", yScale(0))
      .attr("x2", xScale(scalerVal*tempData[0]))
      .attr("y2", yScale(scalerVal*tempData[1]))
      .style("fill", colors[i])
      .style("stroke", colors[i])
      .attr("marker-end", "url(#arrow" + i + ")");


});

