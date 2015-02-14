/** @jsx React.DOM */
var paths = require('../lib/paths.min.js')

module.exports = React.createClass({
  // SignalAnalytics
  getInitialState: function() {
    return {
      reports : []
    }
  },

  componentDidMount: function() {

  },
  
  render: function() {
    return (
      <div>
        Analytics
        <Sankey />
        <Dial />
      </div>
    )
  }
})

var Sankey = React.createClass({
  componentDidMount: function() {
  },

  render: function() {
    return (
      <div> 
      </div>
    )
  }
})

var Dial = React.createClass({
  getInitialState: function() {
    return {
      x: 0,
      y: 0,
      speeds: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },

  componentWillMount: function() {
    //setInterval(this.update, 16);
  },

  diff: function(x, y) {
    var deltaX = x - this.state.x;
    var deltaY = y - this.state.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  },

  avgSpeed: function() {
    var tot = 0, len = this.state.speeds.length;
    for (var i = 0; i < len; i++) {
      tot += this.state.speeds[i];
    }

    return tot / len;
  },

  update: function() {
    mousex = 0
    mousey = 0
    var speed = this.diff(mousex || 0, mousey || 0);
    this.state.speeds.shift();
    this.state.speeds.push(speed);

    this.setState({
      x: mousex || 0,
      y: mousey || 0
    });
  },

  render: function() {
    var speed = Math.max(Math.min(this.avgSpeed(), 39.9), 0.1);
    var pie = window.paths.Pie({
      r: 50,
      R: 80,
      center: [0, 0],
      data: [speed, 40 - speed],
      accessor: function(x) { return x }
    });

    var sankey = window.paths.Sankey({
      data: {
        nodes:[
          [{id:"pippo"},{id:"pluto"},{id:"paperino"}],
          [{id:"qui"},{id:"quo"},{id:"qua"}],
          [{id:"nonna papera"},{id:"ciccio"}]
        ],
        links:[
          {start:"pippo", end:"quo", weight:10},
          {start:"pippo", end:"qua", weight:30},
          {start:"pluto", end:"nonna papera", weight:10},
          {start:"pluto", end:"qui", weight:10},
          {start:"pluto", end:"quo", weight:10},
          {start:"paperino", end:"ciccio", weight:100},
          {start:"qui", end:"ciccio", weight: 20},
          {start:"quo", end:"ciccio", weight: 10},
          {start:"qua", end:"nonna papera", weight: 30}
        ]
      },
      compute: {
        //color: function(i) { return somePalette[i]; }
        color: function(i) { return '#000'; }
      },
      node_accessor: function (x) { return x.id; },
      width: 500,
      height: 400,
      gutter: 10,
      rect_width: 10
    });
    console.log(sankey)

    /*
          {{# curvedRectangles:num }}
            <path on-mouseenter="highlight" on-mouseleave="exit" d="{{ curve.path.print() }}" fill="#acd1e9" style="opacity: {{ opacity(index, index_) }}"/>
            {{# num==index_ }}
              <text transform="{{ translate_rect(curve) }}" text-anchor="middle">{{ item.weight }} </text>
            {{/ end if }}
          {{/ curvedRectangles }}

          {{# rectangles }}
            <path d="{{ curve.path.print() }}" fill="{{ color(group) }}" style="opacity: {{ opacity_rect(item, start_, end_) }}" />
            {{# firsthalf(group) }}
              <text transform="translate(7,0) {{ translate_rect(curve) }}" style="opacity: {{ opacity_rect(item, start_, end_) }}" text-anchor="start">{{ item.id }} </text> {{/ end if }}
            {{^ firsthalf(group) }}
              <text transform="translate(-7,0) {{ translate_rect(curve) }}" style="opacity: {{ opacity_rect(item, start_, end_) }}" text-anchor="end">{{ item.id }} </text>
            {{/ end else }}
          {{/ rectangles }}
    */
    curvedRectangles = _.map(sankey.curvedRectangles, function(rect) {
      return (<path on-mouseenter="highlight" on-mouseleave="exit" d={rect.curve.path.print()}
                       fill="#acd1e9" style={{opacity: 0.5}} />  
            )
    })

    rectangles = _.map(sankey.rectangles, function(rect) {
      return (<path on-mouseenter="highlight" on-mouseleave="exit" d={rect.curve.path.print()}
                       fill="#acd1e9" style={{opacity: 0.5}} />
              )
    })

    texts = _.map(sankey.rectangles, function(rect) {
      return (<text transform={'translate(-7,0) translate('+rect.curve.centroid[0]+','+rect.curve.centroid[1]+')'} style={{opacity: 1}} text-anchor="end">{ rect.item.id } </text>)
    })

    rectangles = _.flatten(_.zip(rectangles, texts))

    return <div className="panel panel-default" >
      <div className="panel-body">
        <svg width="500" height="400">
          <g>{curvedRectangles}</g>
          <g>{rectangles}</g>
        </svg>
      </div>
    </div>
  }, 
});

