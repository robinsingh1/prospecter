module.exports = React.createClass({
  // BatchStage
  // Different Stages of People Added to Prospect List
  render: function() {
    if(this.props.hasScheduledEmail)
        batchStageStyle = {top:-42, left:6}
    else
      batchStageStyle = {}

    return (
      <div className="followup-placement arrow_box tmp" style={batchStageStyle}>
        <span className="badge">
          {this.props.batchCount}
        </span>&nbsp;
        <h6 style={{display:'inline-block'}}> 
          prospects in the sales cycle.</h6>
      </div>
    );
  }
});

