var color = ["orange","blue","red"]
function biplot() {
    
    var margin = {top: 50, right: 30, bottom: 50, left: 60},
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
    var svg2 = d3.select("#svg")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("../Car_sales_more.csv", function(data) {
    // Add X axis
    var x = d3.scaleLinear()
        .domain([-5, 5])
        .range([ 0, width ]);
    svg2.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([-5, 5])
        .range([ height, 0]);
    svg2.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg2.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.PC1); } )
        .attr("cy", function (d) { return y(d.PC2); } )
        .attr("r", 3)
        .style("stroke", "black")
        .style("fill",  function (d) {
            if(d.cluster == 0)return color[0]
            if(d.cluster == 1)return color[1]
            if(d.cluster == 2)return color[2]
        })
            

    svg2.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Biplot for the car datas");

    svg2.append("text")
    .attr("transform", "translate(0," + height + ")")
    .attr("y", height - 630)
    .attr("x", width - 900)
    .attr("transform", "rotate(-90)")
    .text("PC2");

    // x axis labels
    svg2.append("text")
    .attr("transform", "translate(0," + height + ")")
    .attr("y", height - 550)
    .attr("x", width - 350)
    .text("PC1");


    svg2.selectAll("lines")
        .data(data)
        .enter()
        .append('line')
        .style("stroke", "lightgreen")
        .attr('x1', x(0))
        .attr('y1', y(0))
        .attr("x2", function (d) { return x(d.x*5); })
        .attr("y2", function (d) { return y(d.y*5); })
        
    svg2.selectAll("attr")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function (d) { return x(d.x*5); })
        .attr("y", function (d) { return y(d.y*5); })
        .text(function (d) { return d.attributes })
        
    });


}

function mds(){
    
    var margin = {top: 70, right: 50, bottom: 50, left: 100},
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;


    var svg3 = d3.select("#svg")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("../Car_sales_more.csv", function(data) {

    // Add X axis
    var x = d3.scaleLinear()
    .domain([-200, 200])
    .range([ 0, width ]);
    svg3.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([-200, 200])
    .range([ height, 0]);
    svg3.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    svg3.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.MDS1); } )
    .attr("cy", function (d) { return y(d.MDS2); } )
    .attr("r", 3)
    .style("stroke", "black")
    .style("fill",  function (d) {
        if(d.cluster == 0)return color[0]
        if(d.cluster == 1)return color[1]
        if(d.cluster == 2)return color[2]
    })

    svg3.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("MDS(Euclidian distance) for the car datas");

    // y axis labels
    svg3.append("text")
    .attr("transform", "translate(0," + height + ")")
    .attr("y", height - 650)
    .attr("x", width - 850)
    .attr("transform", "rotate(-90)")
    .text("MDS2");
    // x axis labels
    svg3.append("text")
    .attr("transform", "translate(0," + height + ")")
    .attr("y", height - 530)
    .attr("x", width - 350)
    .text("MDS1");

    })
}
function pcd(){
    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 10, bottom: 10, left: 0},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg4 = d3.select("#svg")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("../Car_sales_more.csv", function(data) {

    // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
    var dimensions = ["Sales_in_thousands","year_resale_value","Engine_size","Horsepower","Wheelbase","Curb_weight","Fuel_capacity","Fuel_efficiency"]

    // For each dimension, I build a linear scale. I store all in a y object
    var y = {}
    for (i in dimensions) {
        var name = dimensions[i]
        y[name] = d3.scaleLinear()
        .domain( d3.extent(data, function(d) { return +d[name]; }) )
        .range([height, 0])
    }

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
        .range([0, width])
        .padding(1)
        .domain(dimensions);

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
        return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    // Draw the lines
    svg4
        .selectAll("myPath")
        .data(data)
        .enter().append("path")
        .attr("d",  path)
        .style("fill", "none")
        .style("stroke",  function (d) {
            if(d.cluster == 0)return color[0]
            if(d.cluster == 1)return color[1]
            if(d.cluster == 2)return color[2]
        })
        .style("opacity", 0.7)

    // Draw the axis:
    svg4.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
        .data(dimensions).enter()
        .append("g")
        // I translate this element to its right position on the x axis
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        // And I build the axis with the call function
        .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
        // Add axis title
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { return d; })
        .style("fill", "black")

    svg4.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Parallel coordinates chart for the car datas");

    })
    
}
biplot();
mds();
pcd();