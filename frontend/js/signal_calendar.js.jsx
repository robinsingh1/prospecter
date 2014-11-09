/** @jsx React.DOM */

module.exports = React.createClass({
  // SignalCalendar
  getInitialState: function() {
    return {
      reports : []
    }
  },

  getSignalReport: function() {
    thissss = this;
    qry = {'where' : JSON.stringify({profile:{
      __type:'Pointer',
      className:'ProspectProfile',
      objectId:this.props.currentProfile.objectId
    }})}

    // Get Signal Reports Of Current Profile
    $.ajax({
      url: 'https://api.parse.com/1/classes/SignalReport?order=-createdAt',
      type:'GET',
      data: qry,
      headers:appConfig.parseHeaders,
      success: function(res) {
        console.log(res.results)
        thissss.setState({reports: res.results})
      },
      error: function(err) {
        console.log(err)
      }
    });
  },

  componentDidMount: function() {
    this.getSignalReport()
  },

  componentDidUpdate: function() {
    //this.getSignalReport()
  },

  render: function() {
    reports = []
    for(i=0;i< this.props.reports.length; i++) {
      reports.push(<SignalReportRow setCurrentReport={this.setCurrentReport}
                                    prospectSignalReport={this.prospectSignalReport}
                                    setCurrentView={this.setCurrentView}
                                    report={this.props.reports[i]} />)
    }

    return (
      <div className="container" style={{paddingLeft:0,
                                         paddingRight:0,width:'100%'}}>
        <div style={{height:44,borderBottom:'solid 1px rgb(221, 221, 221)'}}>
          <h4 onClick={this.returnToCalendarView}
              style={{fontWeight:200, float:'left',cursor:'pointer',marginTop:7,
                      paddingLeft:20,paddingTop:5, display:'inline-block'}}>
                <i className="fa fa-calendar" style={{marginRight:5}}/> 
                {this.props.currentProfile.name}
          </h4>
          

        </div>
        <div className="col-md-12" style={{paddingLeft:0,paddingRight:0,
                                           height:356,overflow:'auto'}}>
          <div style={{overflow:'auto'}}>
            <table className="table table-striped" style={{marginBottom:0}}>
              <thead>
                <th></th>
                <th style={{textAlign:'center'}}>
                  <i className="fa fa-clock-o" /> Last Ran
                </th>
                <th style={{textAlign:'center'}}>Posted Job Listing</th>
                <th>Company Signals</th>
                <th style={{display:'block'}}>Prospect Signals</th>
                <th style={{width:150,textAlign:'center'}}></th>
              </thead>
              <tbody className="reports">
                {reports}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  },

  setCurrentReport: function(newReport) {
    this.props.setCurrentReport(newReport)
  },

  prospectSignalReport: function(signalReport) {
    this.props.prospectSignalReport(this.props.currentProfile, signalReport)
  },
});

var SignalReportRow = React.createClass({
  getInitialState: function() {
    return {
      companyCount: '~',
      peopleCount: '~'
    }
  },

  rowClick: function() {
    if(this.props.report.done)
      this.props.setCurrentReport(this.props.report)
    else
      alertify.log("This mining job is still in progress. You'll be notified when it's completed")
  },

  prospectSignalReport: function(e) {
    this.props.prospectSignalReport(this.props.report)
    e.stopPropagation()
  },

  componentDidMount: function() { 
    report = appConfig.pointer('SignalReport', this.props.report.objectId)
    qry = {
      where:JSON.stringify({ report: report }),
      count: 1
    }
    var thiss = this;
    $.ajax({
      url:'https://api.parse.com/1/classes/PeopleSignal',
      data: qry,
      headers: appConfig.headers,
      success: function(res) { thiss.setState({peopleCount: res.count})},
      error: function(err) { console.log(err.responseText) },
    })

    $.ajax({
      url:'https://api.parse.com/1/classes/CompanySignal',
      data: qry,
      headers: appConfig.headers,
      success: function(res) { thiss.setState({companyCount: res.count})},
      error: function(err) { console.log(err.responseText) },
    })
  },

  render: function() {
    prospected = this.props.report.prospected
    if(!this.props.report.mining_job)
      icon = <i className="fa fa-wifi" />
    else
      icon = <i className="fa fa-cloud-download" style={{color:'#555'}}/>

    loading = (!this.props.report.done) ? <div className="profile-loading" style={{marginLeft:30}}>
          <div className="double-bounce1" style={{backgroundColor:'#5cb85c'}}></div>
          <div className="double-bounce2" style={{backgroundColor:'#5cb85c'}}></div>
          </div> : <a href="javascript:" 
                    onClick={this.prospectSignalReport}
             style={{fontWeight:'bold',marginTop:5}}
     className={(prospected) ? "btn btn-xs btn-success disabled" : "btn btn-xs btn-success"}>
             {(prospected) ? 'Prospected' : 'Prospect All'}
          </a>
    // Make an Alert when somebody clicks on in progress signal report
    return (
      <tr onClick={this.rowClick} style={{cursor:'pointer'}}>
        <td style={{textAlign:'right',paddingTop:15}}>
          {icon}     
        </td>
        <td style={{textAlign:'center'}}>
          <h6> 
            {moment(this.props.report.createdAt).fromNow()}
          </h6>
        </td>
        <td style={{textAlign:'center'}}>
          <h6>
          {'lol'}
          </h6>
        </td>
        <td>
          <span className="label label-success">
            {this.state.companyCount}
          </span>
          <h6 style={{display:'inline-block'}}>
            &nbsp; Companies found.
          </h6>
        </td>
        <td style={{display:'block'}}>
          <span className="label label-success">
            {this.props.report.people_count}
          </span>
          <h6 style={{display:'inline-block'}}>
            &nbsp; People found.
          </h6>
        </td>
        <td style={(this.props.report.done) ? {} : {paddingTop:17}}>
          {loading}
        </td>
      </tr>
    )
  }
});
