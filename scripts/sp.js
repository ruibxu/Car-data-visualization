function changeaxis(value1, value2){
    var att1="";
    var att2="";
    if(value1==1){
        att1="Sales_in_thousands";

    }
    else if(value1==2){
        att1="year_resale_value";
    }
    else if(value1==3){
        att1="Price_in_thousands";
    }
    else if(value1==4){
        att1="Engine_size";
 
    }
    else if(value1==5){
        att1="Horsepower";

    }
    else if(value1==6){
        att1="Wheelbase";
    }
    else if(value1==7){
        att1="Curb_weight";

    }
    else if(value1==8){
        att1="Fuel_capacity";

    }
    else if(value1==9){
        att1="Fuel_efficiency";

    }
    else if(value1==10){
        att1="Power_perf_factor";

    }

    if(value2==1){
        att2="Sales_in_thousands";

    }
    else if(value2==2){
        att2="year_resale_value";
    }
    else if(value2==3){
        att2="Price_in_thousands";
    }
    else if(value2==4){
        att2="Engine_size";
 
    }
    else if(value2==5){
        att2="Horsepower";

    }
    else if(value2==6){
        att2="Wheelbase";

    }
    else if(value2==7){
        att2="Curb_weight";

    }
    else if(value2==8){
        att2="Fuel_capacity";

    }
    else if(value2==9){
        att2="Fuel_efficiency";

    }
    else if(value2==10){
        att2="Power_perf_factor";
    }

    createsp(att1,att2);

}

function createsp(att1,att2){
        d3.selectAll("svg").remove();
        var margin = {top: 30, right: 30, bottom: 100, left: 100},
            width = 1500- margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

        //set the width and height
        var svg = d3.select("#svg")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        
        
            d3.csv("../Car_sales.csv", function(data){
        // x axis
            var x = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return + eval("d."+att1) })+10])
            .range([ 0, width ]);

            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        // y axis
            var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return + eval("d."+att2) })+10])
            .range([ height, 0]);
            svg.append("g")
            .call(d3.axisLeft(y));
        // y axis labels
            svg.append("text")
            .attr("transform", "translate(0," + height + ")")
            .attr("y", height - 730)
            .attr("x", width - 1800)
            .attr("transform", "rotate(-90)")
            .text(att2);
        // x axis labels
            svg.append("text")
            .attr("transform", "translate(0," + height + ")")
            .attr("y", height - 620)
            .attr("x", width - 700)
            .text(att1);
        // legend
            svg.append("circle")
            .attr("cx",1200)
            .attr("cy",70)
            .attr("r", 6)
            .style("fill", "#B19CD8")
        
            svg.append("text")
            .attr("x", 1220)
            .attr("y", 70)
            .text("Car model")
            .style("font-size", "15px")

        // dots
            svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", function (d) { return x(eval("d."+att1)); } )
                .attr("cy", function (d) { return y(eval("d."+att2)); } )
                .attr("r", 2.0)
                .style("fill", "#B19CD8")
        
        })

}

function updateSelect(){
    var select= document.getElementById("inputXAxis");
    var select2= document.getElementById("inputYAxis");
    var value1 = select.selectedIndex;
    var value2 = select2.selectedIndex;
    console.log(value1);
    console.log(value2);
    if(value1!=0 && value2!= 0 && value1!= value2){
        changeaxis(value1,value2);
    }
    else{
        d3.selectAll("svg").remove();
    }
    
}