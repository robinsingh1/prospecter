/** @jsx React.DOM */

module.exports = React.createClass({
  // createSignalModal
  createMiningJob: function(date) {
    var thiss = this;
    $.ajax({
      //url:'http://127.0.0.1:5000/mining_job/hiring',
      url:'https://nameless-retreat-3525.herokuapp.com/mining_job/hiring',
      data: {profile_id: thiss.props.currentProfile.objectId, timestamp: date},
      success: function(res) { console.log(res) },
      error: function(err) {console.log(err.responseText) }
    })
    this.props.createMiningJob(this.props.currentProfile, date)
  },

  render: function() {
    // moment.utc(moment().startOf('day')).valueOf()/1000
    // recieve completed days as props
    //console.log(this.props.currentProfile)
    mining_days = this.props.currentProfile.mining_days
    dates = []
    for(i=0;i< 30; i++) {  
      date = moment().subtract((i+1), 'days').startOf('day')
      mining_day = _.indexOf(mining_days, date.valueOf()/1000) != -1
      dates.push(<DownloadDateRow updateDate={this.updateDate}
                                  createMiningJob={this.createMiningJob}
                                  mining_day={mining_day}
                                  date={date}/>)
    }

    return (
      <div className="modal fade bs-createMiningJob-modal-md" 
           tabIndex="-1" role="dialog" 
           aria-labelledby="mySmallModalLabel" aria-hidden="true" 
           id="createMiningJobModal" 
           style={{top:'50px',overflow:'hidden'}}>
        <div className="modal-dialog modal-sm" style={{width:350}}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                <i className="fa fa-cloud-download" />&nbsp;
                Download Prospects
              </h4>
              <a href="javascript:" className="btn btn-success btn-sm" 
                 onClick={this.createMiningJob}
                 style={{float:'right',marginTop:-28,
                         marginRight:-5,display:'none'}}>
                 Download
              </a>
            </div>
            <div className="modal-body">

              <ul className="list-group date-download-prospects" 
                  style={{height:400,overflow:'auto',
                  borderBottom:'solid 1px #ddd',
                  cursor:'pointer',
                  borderTop:'solid 1px #ddd'}}>
                <h6 style={{margin:0}}>{dates}</h6>
              </ul>

            </div>
          </div>
        </div>
      </div>
    );
  },
});

var DownloadDateRow = React.createClass({
  updateDate: function() {
    //this.createMiningJob()
    date = this.props.date.startOf('day').valueOf()/1000
    //date = moment().subtract((i+1), 'days').startOf('day')
    this.props.createMiningJob(date)
  },

  render: function() {
    loading = (this.props.mining_day) ?  <div className="profile-loading" style={{float:'right',height:20,width:20}}>
            <div className="double-bounce1" style={{backgroundColor:'#5cb85c'}}></div>
            <div className="double-bounce2" style={{backgroundColor:'#5cb85c'}}></div>
          </div> : ""
    loading = ""
    return (
        <li onClick={this.updateDate} style={{textAlign:'center'}}
          className="list-group-item download-date bg-success"
          style={(this.props.mining_day) ? {backgroundColor:'#dff0d8',textAlign:'center'} : {textAlign:'center'}}>
          <span style={{width:85}}>
            <i className="fa fa-calendar" />&nbsp;
            {this.props.date.format('ll')} &nbsp; &nbsp; &nbsp;
          </span>
          <a href="javascript:" style={{width:89}}
      className={(this.props.mining_day) ? "btn btn-success btn-xs disabled" : "btn btn-success btn-xs"}>
            {(this.props.mining_day) ? "Downloading" : "Download" }</a>
          {loading}
        </li>
    )
  }
})

