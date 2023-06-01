function changeXaxis(value){
    if(value==1){
        var att="Sales_in_thousands";
        createHistogram(att);
    }
    else if(value==2){
        var att="year_resale_value";
        createHistogram(att);
    }
    else if(value==3){
        var att="Engine_size";
        createHistogram(att); 
    }
    else if(value==4){
        var att="Horsepower";
        createHistogram(att); 
    }
    else if(value==5){
        var att="Wheelbase";
        createHistogram(att); 
    }
    else if(value==6){
        var att="Curb_weight";
        createHistogram(att); 
    }
    else if(value==7){
        var att="Fuel_capacity";
        createHistogram(att); 
    }
    else if(value==8){
        var att="Fuel_efficiency";
        createHistogram(att); 
    }
    else{
        d3.selectAll("svg").remove();
    }
    

}


function createHistogram(att){
    d3.selectAll("svg").remove();
    var margin = {top: 30, right: 30, bottom: 100, left: 100};
    var width = 750 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;
    var svg = d3.select("#svg1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
    d3.csv("Car_sales_more.csv", function(data){

        //x-axis
        var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return + eval("d."+att)+10 })]) 
        .range([ 0, width])

        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        //histogram
        var histogram = d3.histogram()
            .value(function(d) { return eval("d."+att); })   
            .domain(x.domain())  
            .thresholds(x.ticks(9));

        var bins = histogram(data);

        // y-axis
        var y = d3.scaleLinear()
        .range([ height, 0]);
        y.domain([0, d3.max(bins, function(d) { return d.length})]);
        
        svg.append("g")
        .call(d3.axisLeft(y));


        var color = d3.scaleOrdinal().domain(bins)
        .range(['purple', 'pink', 'black', 'gray',"red", "orange", 'yellow', "green", 'blue'])

        //labels
        svg.append("text")
        .attr("transform", "translate(0," + height + ")")
        .attr("y", height - 320)
        .attr("x", width - 850)         
        .attr("transform", "rotate(-90)")
        .text("Number of car models");

        svg.append("text")
        .attr("transform", "translate(0," + height + ")")
        .attr("y", height - 220)
        .attr("x", width - 400)
        .text(att);

        //bars 
        const b = bins.filter(x => x.length != 0)
        svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0)-1 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill",  "#B19CD8")
          .on("click", function(d) {
            k = bins.filter(x => x.length!=0).indexOf(d)
            var current_color = d3.select(this).style("fill");
            d3.select(this).style("fill",function(){return (current_color==d3.color("#B19CD8"))?color(k):"#B19CD8"} );
            current_color = d3.selectAll(".a"+k).style("fill");
            d3.selectAll(".a"+k).style("fill", function(){return (current_color==d3.color("#B19CD8"))?color(k):"#B19CD8"} );
           // current_color = d3.selectAll(".c"+k).style("stroke");
            d3.selectAll(".b"+k).style("fill", function(){return (current_color==d3.color("#B19CD8"))?color(k):"#B19CD8"} );
            current_color = d3.selectAll(".d"+k).style("fill");
           // d3.selectAll(".c"+k).style("stroke", function(){return (current_color==d3.color("#B19CD8"))?color(k):"#B19CD8"} );
          });
        
        
        svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text(att + " Histogram");
        
        
        biplot(b,att);
        mds(b,att);
        pcd(b);
        area(att);
    })
}

function biplot(value,att) {
    
    var margin = {top: 50, right: 30, bottom: 50, left: 60},
    width = 400- margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    var svg2 = d3.select("#svg2")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("Car_sales_more.csv", function(data) {
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
            value.map(x => { x.map(
                y => { if (y.Model == d.Model) { 
                    (d3.select(this).attr("class", "a"+value.indexOf(x))) 
                } 
                }) 
            })
            return "#B19CD8"
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
    .attr("y", height - 330)
    .attr("x", width - 500)
    .attr("transform", "rotate(-90)")
    .text("PC2");

    // x axis labels
    svg2.append("text")
    .attr("transform", "translate(0," + height + ")")
    .attr("y", height - 250)
    .attr("x", width - 180)
    .text("PC1");


    svg2.selectAll("lines")
        .data(data)
        .enter()
        .append('line')
        .style("stroke", "black")
        .attr('x1', x(0))
        .attr('y1', y(0))
        .attr("x2", function (d) { return x(d.x*9); })
        .attr("y2", function (d) { return y(d.y*9); })
        
    svg2.selectAll("attr")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function (d) { return x(d.x*9); })
        .attr("y", function (d) { return y(d.y*9); })
        .text(function (d) { return d.attributes })
        
    });


}

function mds(value,att){
    
    var margin = {top: 70, right: 50, bottom: 50, left: 100},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


    var svg3 = d3.select("#svg3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("Car_sales_more.csv", function(data) {

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
        value.map(x => { x.map(
            y => { if (y.Model == d.Model) { 
                (d3.select(this).attr("class", "b"+value.indexOf(x))) 
            } 
            }) 
        })
        return "#B19CD8"
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
    .attr("y", height - 320)
    .attr("x", width - 430)
    .attr("transform", "rotate(-90)")
    .text("MDS2");
    // x axis labels
    svg3.append("text")
    .attr("transform", "translate(0," + height + ")")
    .attr("y", height - 230)
    .attr("x", width - 150)
    .text("MDS1");

    })
}
function pcd(value){
    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 10, bottom: 10, left: 0},
    width = 800 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg4 = d3.select("#svg4")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("Car_sales_more.csv", function(data) {

    // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
    var dimensions = ["Sales_in_thousands","year_resale_value","Engine_size","Horsepower","Wheelbase","Curb_weight","Fuel_capacity","Fuel_efficiency"]

    var color = d3.scaleOrdinal()
    .domain(["0", "1", "2" ])
    .range([ "orange", "green", "purple"])


  // For each dimension, I build a linear scale. I store all in a y object
  var y = {}
  for (i in dimensions) {
      var name = dimensions[i]
      y[name] = d3.scaleLinear()
      .domain( d3.extent(data, function(d) { return +d[name]; }) )
      .range([height, 0])
  }
  x = d3.scalePoint()
  .padding(1)
  .range([0, width])

  .domain(dimensions);

  // Highlight the specie that is hovered
  var highlight = function(d){

    selected_cluster = d.cluster

    // first every group turns grey
    d3.selectAll(".line")
      .transition().duration(200)
      .style("stroke", "lightgrey")
      .style("opacity", "0.2")
    // Second the hovered specie takes its color
    d3.selectAll("." + "x"+selected_cluster)
      .transition().duration(200)
      .style("stroke", color(selected_cluster))
      .style("opacity", "1")
  }

  // Unhighlight
  var doNotHighlight = function(d){
    d3.selectAll(".line")
      .transition().duration(200).delay(1000)
      .style("stroke", function(d){ return( color(d.cluster))} )
      .style("opacity", "1")
  }

  // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
  function path(d) {
      return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
  }

  // Draw the lines
  svg4
    .selectAll("myPath")
    .data(data)
    .enter()
    .append("path")
      .attr("class", function (d) { return "line "+ "x" + d.cluster } ) 
      .attr("d",  path)
      .style("fill", "none" )
      .style("stroke", function(d){ return( color(d.cluster))} )
      .style("opacity", 0.5)
      .on("mouseover", highlight)
      .on("mouseleave", doNotHighlight )

  // Draw the axis:
  svg4.selectAll("myAxis")
    // For each dimension of the dataset I add a 'g' element:
    .data(dimensions).enter()
    .append("g")
    .attr("class", "axis")
    // I translate this element to its right position on the x axis
    .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
    // And I build the axis with the call function
    .each(function(d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); })
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


function area(att){

    var margin = {top: 30, right: 30, bottom: 40, left: 60},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    var svg = d3.select("#svg5")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("CarArea.csv",

    function(d){
    return { Engine_size : d.Engine_size, Horsepower : d.Horsepower }
    },

    function(data) {

    var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.Engine_size; }))
    .range([ 0, width ]);

    xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.Horsepower; })])
    .range([ height, 0 ]);

    yAxis = svg.append("g")
    .call(d3.axisLeft(y));
    
    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    var brush = d3.brushX()                   
        .extent( [ [0,0], [width,height] ] )  
        .on("end", updateChart)              


    var area = svg.append('g')
    .attr("clip-path", "url(#clip)")


    var areaGenerator = d3.area()
    .x(function(d) { return x(d.Engine_size) })
    .y0(y(0))
    .y1(function(d) { return y(d.Horsepower) })


    area.append("path")
    .datum(data)
    .attr("class", "myArea")  
    .attr("fill", "#B19CD8")
    .attr("fill-opacity", .3)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("d", areaGenerator )

    area
    .append("g")
        .attr("class", "brush")
        .call(brush);

    var idleTimeout
    function idled() { idleTimeout = null; }


    function updateChart() {


    extent = d3.event.selection


    if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
        x.domain([ 4,8])
    }else{
        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
        area.select(".brush").call(brush.move, null) 
    }


    xAxis.transition().duration(1000).call(d3.axisBottom(x))
    area
        .select('.myArea')
        .transition()
        .duration(1000)
        .attr("d", areaGenerator)
    }


    svg.on("dblclick",function(){
    x.domain(d3.extent(data, function(d) { return d.Engine_size; }))
    xAxis.transition().call(d3.axisBottom(x))
    area
        .select('.myArea')
        .transition()
        .attr("d", areaGenerator)
    });

    svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Area graph demonstrate how engine size affect horse power");

    // y axis labels
    svg.append("text")
    .attr("transform", "translate(0," + height + ")")
    .attr("y", height - 270)
    .attr("x", width - 700)
    .attr("transform", "rotate(-90)")
    .text("Horse Power");
    // x axis labels
    svg.append("text")
    .attr("transform", "translate(0," + height + ")")
    .attr("y", height - 195)
    .attr("x", width - 300)
    .text("Engine Size");

    
    })
}


function updateSelect(){
    var select= document.getElementById("inputAxis");
    var value = select.selectedIndex;
    changeXaxis(value);
}



