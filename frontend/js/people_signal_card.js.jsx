

module.exports = React.createClass({
  // SignalCard
  render: function() {
    person = this.props.person
    return (
      <div className="panel panel-default signal-card">
        <div className="panel-body" style={{paddingLeft:25, paddingRight:25}}>
          <h4 >
            {person.title}
          </h4>
          <h6 style={{display:'inline-block',width:'100%'}}>
            <span style={{ float:'left',maxWidth: '60%', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'}}>
              {person.link_text}</span>
          </h6>
          <h6> <i className="fa fa-building" />
            &nbsp; {person.signals[0].company}</h6>
          <h6> <i className="fa fa-map-marker" />
            &nbsp; {person.signals[0].location}</h6>
          <h6> <i className="fa fa-suitcase" />
            &nbsp;{person.signals[0].job_title} </h6>

          <a href="javascript:" className="btn btn-success"
            style={{float:'right',marginTop:15, fontWeight:'bold',width:'100%'}}> 
            Prospect This Person</a>
        </div>
      </div>
    );
  }
});
