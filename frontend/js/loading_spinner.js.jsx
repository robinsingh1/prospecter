/** @jsx React.DOM */

module.exports = React.createClass({
  // LoadingSpinner
  render: function() {
    return (
    <div className="spinner" style={{marginTop:'180px'}}>
      <div className="spinner-container container1">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
      </div>
      <div className="spinner-container container2">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
      </div>
      <div className="spinner-container container3">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
      </div>
    </div>
    )
  }
});
