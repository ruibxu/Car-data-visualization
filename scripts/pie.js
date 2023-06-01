


function changeXaxis(value){
    if(value==1){
        var att="Sales_in_thousands";
        createpie(att);
    }
    else if(value==2){
        var att="year_resale_value";
        createpie(att);
    }
    else if(value==3){
        var att="Price_in_thousands";
        createpie(att); 
    }
    else if(value==4){
        var att="Engine_size";
        createpie(att); 
    }
    else if(value==5){
        var att="Horsepower";
        createpie(att); 
    }
    else if(value==6){
        var att="Wheelbase";
        createpie(att); 
    }
    else if(value==7){
        var att="Curb_weight";
        createpie(att); 
    }
    else if(value==8){
        var att="Fuel_capacity";
        createpie(att); 
    }
    else if(value==9){
        var att="Fuel_efficiency";
        createpie(att); 
    }
    else if(value==10){
        var att="Power_perf_factor";
        createpie(att); 
    }
    else{
        d3.selectAll("svg").remove();
    }

}


function createpie(att){
    d3.selectAll("svg").remove();
    var width = 700
    height = 700
    margin = 40

    var radius = width / 2 - margin


    var svg = d3.select("#svg")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


d3.csv("../Car_sales.csv", function(data) {
    var sector1=0;
    var sector2=0;
    var sector3=0;
    for (var i = 0; i < data.length; i++) {
        if (eval("data[i]."+att)<=(d3.max(data, function(d) { return + eval("d."+att)})/3)){
            sector1++;
        }
        else if (eval("data[i]."+att)<=(d3.max(data, function(d) { return + eval("d."+att)})*2/3)){
            sector2++;
        }
        else if (eval("data[i]."+att)<=(d3.max(data, function(d) { return + eval("d."+att)}))){
            sector3++;
        }
    }
    var range = ["<="+parseInt(d3.max(data, function(d) { return + eval("d."+att)})/3),"<="+parseInt(d3.max(data, function(d) { return + eval("d."+att)})*2/3),"<="+parseInt(d3.max(data, function(d) { return + eval("d."+att)}))];
    var sector=[sector1, sector2, sector3];

    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var pie2 = pie(d3.entries(sector))

    var color = d3.scaleOrdinal()
    .domain(sector)
    .range(["#ec6b56", "#ffc154", "#47b39c"])

    var textArc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

    svg
    .selectAll('myPie')
    .data(pie2)
    .enter()
    .append('path')
        .attr('d', textArc)
        .attr('fill', function(d){ return(color(sector[d.data.key])) })

    svg
    .selectAll('myPie')
    .data(pie2)
    .enter()
    .append('text')
    .text(function(d){ return range[d.data.key]})
    .attr("transform", function(d) { return "translate(" + textArc.centroid(d) + ")";  })
    .style("font-size", 15)
    .style("text-anchor", "middle")
    
});
      
}

function updateSelect(){
    var select= document.getElementById("inputAxis");
    var value = select.selectedIndex;
    changeXaxis(value);
}

