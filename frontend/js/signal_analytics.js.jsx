/** @jsx React.DOM */

module.exports = React.createClass({
  // SignalAnalytics
  getInitialState: function() {
    return {
      reports : []
    }
  },

  componentDidMount: function() {


var margin = {top: 1, right: 1, bottom: 6, left: 1},
    width = 850 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),
    format = function(d) { return formatNumber(d) + " TWh"; },
    color = d3.scale.category20();

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .size([width, height]);

var path = sankey.link();

//d3.json("https://gist.githubusercontent.com/rsimba/33fbc755fa71e6aea446/raw/880345a16dbae39753682bb659249404a3820146/gistfile1.json", function(energy) {
//d3.json("https://gist.githubusercontent.com/rsimba/70d4d3393d33777f4c11/raw/228e30d788591b15d85f20f8baf2ccd50b79298c/gistfile1.json", function(energy) {
/*
url = "http://127.0.0.1:5000/v1/report/profile"
  */
url = "https://api.parse.com/1/classes/ProspectProfile/TjCZRfHB7N"
d3.json(url)
  .header("X-Parse-Application-Id", "N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ")
  .header("X-Parse-REST-API-Key", "VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb")
  .header("Content-Type", "application/json")
  .get(function(error, energy) {
    console.log(error)
    console.log(energy)
    energy = energy.sankey
  sankey
      .nodes(energy.nodes)
      .links(energy.links)
      .layout(32);

  var link = svg.append("g").selectAll(".link")
      .data(energy.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

  link.append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

  var node = svg.append("g").selectAll(".node")
      .data(energy.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { this.parentNode.appendChild(this); })
      .on("drag", dragmove));

  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      //.style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { return d.node + "\n" + d.value; });

  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      //.text(function(d) { return d.name; })
      .text(function(d) { return d.name + "\n" + d.value; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

  function dragmove(d) {
    d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
});


  },
  
  render: function() {
    //TODO - add 2 pie charts for clearspark analysis
    return (
      <div>
        <div style={{height:44,borderBottom:'solid 1px rgb(221, 221, 221)'}}>
          <h4 onClick={this.returnToCalendarView}
              style={{fontWeight:200, float:'left',cursor:'pointer',marginTop:7,
                      paddingLeft:20,paddingTop:5, display:'inline-block'}}>
                <i className="fa fa-pie-chart" style={{marginRight:5}}/> 
                Analytics - 
                {this.props.currentProfile.name}
          </h4>
        </div>
        <div id="chart"></div>
      </div>
    )
  }
})
