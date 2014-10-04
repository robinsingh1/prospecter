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
    
    //console.log('CALENDAR PROPS')
    //console.log(this.props.currentProfile)
    qry = 'where='+JSON.stringify({profile:{
      __type:'Pointer',
      className:'ProspectProfile',
      objectId:this.props.currentProfile.objectId
    }})
    // Get Signal Reports Of Current Profile
    $.ajax({
      url: 'https://api.parse.com/1/classes/SignalReport?order=-createdAt',
      type:'GET',
      data: qry,
      headers:appConfig.parseHeaders,
      success: function(res) {
        //console.log(res.results)
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
    this.getSignalReport()
  },

  render: function() {
    reports = []
    for(i=0;i< this.state.reports.length; i++) {
      reports.push(<SignalReportRow setCurrentReport={this.setCurrentReport}
                                      setCurrentView={this.setCurrentView}
                                      report={this.state.reports[i]} />)
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
                  <i className="fa fa-clock-o" />
                </th>
                <th>Company Signals</th>
                <th>Prospect Signals</th>
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
  }
});

var SignalReportRow = React.createClass({
  rowClick: function() {
    this.props.setCurrentReport(this.props.report)
  },

  render: function() {
    if(!this.props.report.mining_job)
      icon = <i className="fa fa-wifi" />
    else
      icon = <i className="fa fa-cloud-download" style={{color:'#555'}}/>

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
        <td>
          <span className="label label-success">
            {this.props.report.company_count}
          </span>
          <h6 style={{display:'inline-block'}}>
            &nbsp; Companies found.
          </h6>
        </td>
        <td>
          <span className="label label-success">
            {this.props.report.people_count}
          </span>
          <h6 style={{display:'inline-block'}}>
            &nbsp; People found.
          </h6>
        </td>
        <td>
          <a href="javascript:" 
             style={{fontWeight:'bold',marginTop:5}}
             className="btn btn-xs btn-success">
            Prospect All
          </a>
        </td>
      </tr>
    )
  }
});