var width = 400;
var width_plot = 800;
var height = 1000;
var height_plot = 500;

var margin = {top: 40, right: 10, bottom: 60, left: 60};

    // SVG drawing area
var svg = d3.select("#titles").append("svg")
        .attr("width", width)
        .attr("height", height);


var svgPlot = d3.select("#svgArea").append("svg")
	.attr("width", width_plot)
	.attr("height", 400)
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	.attr('class', 'svgPlot');

var svgBubble = d3.select("#svgArea").append("svg")
	.attr("width", width_plot)
	.attr("height", 500)
	.attr('class', 'svgBubble')
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv('data/outputs.csv')
	.then(function(data) {
		console.log(data)

		var title = svg.selectAll('text')
					.data(data)
					.enter()
					.append('text')
					.text(function(d, index) {
						return d.title;
					})
					.attr('x', 20)
					.attr('y', function(d, i) {
						return (i + 1) * 20;
					})
					.style('cursor', 'pointer')
					.attr('class', 'titles labels')
        			.on('click', function(d, i) {
		             	getPlot(i[""], i["title"]);
		             	getNodeLink(i[""], i["title"]);
		             	d3.selectAll('text')
		             		.style('fill', 'black')
		             	d3.select(event.currentTarget)
                			.style('fill', '#FF8C00')
                			.attr('font-weight', '800')
        			});
	

})




function getPlot(index, title) {
	
	console.log(title);


	d3.json('data/sentiment_score.json')
	.then(function(data) {
		
		// [0] neg, [1] neu, [2] pos
		var inputData = [
			data[index].neg,
			data[index].neu,
			data[index].pos
		];

		var inputKey = [
			"negative",
			"neutral",
			"positive"
		];

		var xScale = d3.scaleLinear() 
		.domain([0, 1])
		.range([0, 300]);

		svgPlot.selectAll('line').remove();
		svgPlot.selectAll('text').remove();
		// x axis
		svgPlot.append('line')
			.attr('x1', 150)
			.attr('x2', 450)
			.attr('y1', 250)
			.attr('y2', 250)
			.attr('stroke', 'black');

		
		// y axis
		svgPlot.append('line')
			.attr('x1', 150)
			.attr('x2', 150)
			.attr('y1', 50)
			.attr('y2', 250)
			.attr('stroke', 'black');


		svgPlot.selectAll('text')
			.data(inputKey)
			.enter()
			.append('text')
			.attr('x', 70)
			.attr('y', function(d,i) {
				return (i) * 50 + 100;
			})
			.text(function(d) {
				return d;
			})

		svgPlot.append('text')
			.attr('x', 50)
			.attr('y', 20)
			.attr('class', 'subheading')
			.text("Sentiment Analysis on: " + title);

		// percentage marks
		svgPlot.append('text')
			.attr('x', 150)
			.attr('y', 265)
			.text('0%');

		svgPlot.append('text')
			.attr('x', 435)
			.attr('y', 265)
			.text('100%');

		svgPlot.append('text')
			.attr('x', 278)
			.attr('y', 265)
			.text('50%');

		// gray lines every 25%
		svgPlot.append('line')
			.attr('x1', 300)
			.attr('x2', 300)
			.attr('y1', 50)
			.attr('y2', 250)
			.attr('stroke', 'lightgray');
		svgPlot.append('line')
			.attr('x1', 225)
			.attr('x2', 225)
			.attr('y1', 50)
			.attr('y2', 250)
			.attr('stroke', 'lightgray');
		svgPlot.append('line')
			.attr('x1', 375)
			.attr('x2', 375)
			.attr('y1', 50)
			.attr('y2', 250)
			.attr('stroke', 'lightgray');
		svgPlot.append('line')
			.attr('x1', 450)
			.attr('x2', 450)
			.attr('y1', 50)
			.attr('y2', 250)
			.attr('stroke', 'lightgray');


		svgPlot.selectAll("rect").remove();
	    var rect = svgPlot.selectAll("rect").data(inputData);
	    rect.enter()
	        .append("rect")
	        .attr("class", "bar")
	        
	        .attr("x", function(d, i) {
	         return 150;
	        })
	        .attr("y", function(d, i) {
	          return (i) * 50 + 80;
	        })
	        .attr("height", 40)
	        .transition()
	        .duration(1000)
	        .attr("width", function(d) {
	          return xScale(d);
	        })
	        .attr('fill', function(d) {
	        	if (inputData[0] == d) {
	        		return 'red';
	        	}
	        	if (inputData[1] == d) {
	        		return 'gray';
	        	}
	        	if (inputData[2] == d) {
	        		return 'blue';
	        	}
	        });
			

	})

}



var myColor = d3.scaleSequential().domain([1,25])
  .interpolator(d3.interpolatePuRd);
// svg.selectAll(".secondrow").data(data).enter().append("circle").attr("cx", function(d,i){return 30 + i*60}).attr("cy", 150).attr("r", 19).attr("fill", function(d){return myColor(d) })



function getNodeLink(index, title) {
	var csvString = 'data/tale'+index+'.csv';
	console.log(csvString);


	d3.csv(csvString)
		.then(function(data) {


			//d[0] = word
			//d[1] = frequency
			//d[2] = x
			//d[3] = y
			data.forEach(function(d) {
				
				d[1] = +d[1];
				d.x = Math.random() * 10;
				d.y = Math.random() * 10;
			})

			data = data.filter((element) => {
				return (element[1] > 2);
			})

			data = data.sort((a,b) => {
				return b[1]-a[1];
			})

			if (data.length > 15) {
				console.log(data.slice(0,15));
				data = data.slice(0,15);
			}
			console.log(data);







			svgBubble.selectAll('text').remove();
			svgBubble.selectAll('circle').remove();
			svgBubble.selectAll('g').remove();

			var node = svgBubble.selectAll("circle")
		      .data(data).enter()
		      .append("circle")
		      .attr("cx", function(d) {return d.x * 50 + 200})
		      .attr("cy", function(d) {return d.y * 30 + 100})
		      // .attr('cx', function(d, index) {
		      // 	return index * 2 + 40;
		      // })
		      // .attr('cy', function(d) {
		      // 	return 100;
		      // })
		      .transition()
		      .duration(1000)
		      .attr("r", function(d) {
		      	if (d[1] < 10) {
		      		return d[1] * 3;
		      	}
		        return d[1] * 1.5;
		      })
		      .attr("fill", function(d) {
		        return myColor(d[1]);
		      });

		    svgBubble.selectAll("text")
		      .data(data).enter()
		      .append("text")
		      .attr("x", function(d) {
		      	return d.x * 50 + 200;
		      })
		      .attr("y", function(d) {
		      		return d.y * 30+100;
		      	})
		      .text(function(d) {
		      	return d[0];
		      })
		      .attr('stroke', function(d) {
		      	if (d[1] > 20) {
		      		return 'white';
		      	}
		      }) 
		      .style("font-size", "13px");

		      svgBubble.selectAll("text")
		      .data(data).enter()
		      .append("text")
		      .attr("x", function(d) {
		      	return d.x * 50 + 200;
		      })
		      .attr("y", function(d) {
		      		return d.y*30+100;
		      	})
		      .text(function(d) {
		      	return d[1];
		      })
		      .style("font-size", "8px");
		
			

			svgBubble.selectAll("circle").append('title')
				.text(function(d) { 
					return d[0] + " : " + d[1] ; 
				});

	


			svgBubble.append('text')
			.attr('x', 50)
			.attr('y', 20)
			.attr('class', 'subheading')
			.text("Words Frequencies of " + title);

			
			
	})
}

