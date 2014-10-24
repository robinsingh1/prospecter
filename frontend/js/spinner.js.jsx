
module.exports = React.createClass({
  // Spinner
  render: function() {
    circleStyle=(this.props.circleStyle) ? this.props.circleStyle : {}
    spinnerStyle=this.props.spinnerStyle ? this.props.spinnerStyle : {}
    return (
      <div className="spinner" style={spinnerStyle}>
        <div className="spinner-container container1">
          <div className="circle1" style={circleStyle}></div>
          <div className="circle2" style={circleStyle}></div>
          <div className="circle3" style={circleStyle}></div>
          <div className="circle4" style={circleStyle}></div>
        </div>
        <div className="spinner-container container2">
          <div className="circle1" style={circleStyle}></div>
          <div className="circle2" style={circleStyle}></div>
          <div className="circle3" style={circleStyle}></div>
          <div className="circle4" style={circleStyle}></div>
        </div>
        <div className="spinner-container container3">
          <div className="circle1" style={circleStyle}></div>
          <div className="circle2" style={circleStyle}></div>
          <div className="circle3" style={circleStyle}></div>
          <div className="circle4" style={circleStyle}></div>
        </div>
      </div>

    )
  },
})
