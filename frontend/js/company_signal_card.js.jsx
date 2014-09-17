

module.exports = React.createClass({
  // SignalCard
  render: function() {
    company = this.props.company
    return (
      <div className="panel panel-default signal-card">
        <div className="panel-body" style={{paddingLeft:25, paddingRight:25}}>
          <h4 style={{display:'inline-block',width:'100%'}}>
            <span style={{ float:'left',maxWidth: '60%', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'}}>
              {company.name}</span>
            <span className="label label-success" 
              style={{marginLeft:7, float:'right',fontSize:12,
                maxWidth: '40%', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'}}>
              <i className="fa fa-suitcase"/> &nbsp;
              {company.signals[0].job_title}
            </span>
          </h4>
          <a href="javascript:" className="btn btn-success"
            style={{float:'right',marginTop:15, fontWeight:'bold'}}> 
            Prospect This Company</a>
          <p style={{fontSize:12,width:'75%'}}>
            {company.signals[0].summary}
          </p>
          <h6> <i className="fa fa-map-marker" />
            &nbsp; {company.signals[0].location}</h6>
        </div>
      </div>
    );
  }
});
