/** @jsx React.DOM */

module.exports = React.createClass({
  // SignalCalendar
  getInitialState: function() {
    return {
      reports : [],
      currentTerritory:'all',
    }
  },

  getSignalReport: function(currentTerritory) {
    thissss = this;
    if(currentTerritory == "all"){
      qry = {'where' : JSON.stringify({profile:{
        __type:'Pointer',
        className:'ProspectProfile',
        objectId:this.props.currentProfile.objectId
      }, is_parent: true }), order:'-createdAt'}
    } else {
      qry = {'where' : JSON.stringify({parent:
            appConfig.pointer('SignalReport', currentTerritory.objectId), 
            }), order:'-createdAt'}
    }
    console.log(qry)

    // Get Signal Reports Of Current Profile
    $.ajax({
      url: 'https://api.parse.com/1/classes/SignalReport',
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
    this.getSignalReport(this.state.currentTerritory)
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('UPDATED')
    console.log(this.state.currentTerritory)
    console.log(nextState.currentTerritory)
    //if(this.state.currentTerritory != nextState.currentTerritory)
    if(!_.isEqual(this.state.currentTerritory, nextState.currentTerritory))
      this.getSignalReport(nextState.currentTerritory)
  },

  allTerritories: function() {
    this.setState({currentTerritory: 'all'})
  },

  render: function() {
    reports = (this.props.reports) ? this.props.reports : []

    for(i=0;i< this.state.reports.length; i++) {
      reports.push(<SignalReportRow setCurrentReport={this.setCurrentReport}
                                    prospectSignalReport={this.prospectSignalReport}
                                    setCurrentView={this.setCurrentView}
                                    rowClick={this.rowClick}
                                    report={this.state.reports[i]} />)
    }

    territory = (this.state.currentTerritory == 'all') ? '' : ' - '+this.state.currentTerritory.territory
    return (
      <div className="container" style={{paddingLeft:0,
                                         paddingRight:0,width:'100%'}}>
        <div style={{height:44,borderBottom:'solid 1px rgb(221, 221, 221)'}}>
          <h4 onClick={this.allTerritories}
              style={{fontWeight:200, float:'left',cursor:'pointer',marginTop:7,
                      paddingLeft:20,paddingTop:5, display:'inline-block'}}>
                <i className="fa fa-globe" style={{marginRight:5}}/> 
                {this.props.currentProfile.name}
                {territory}
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
                <th style={{textAlign:'',paddingLeft:50}}>
                  Territory Name
                </th>
                <th>Company Signals</th>
                <th style={{display:'block'}}>Prospect Companies</th>
                <th style={{width:150,textAlign:'center',display:'none'}}></th>
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

  setTerritory: function(territory) {
    //
    this.setState({currentTerritory: territory})
  },

  rowClick: function(report) {
    console.log(report)
    if(report.prospected)
      this.props.setReport('TerritoryDetail', report)
    else
      this.setTerritory(report)
    /*
    if(this.state.selectedTerritory != 'all')
      this.setCurrentReport(report) // 
    else
      this.setTerritory(report)
    */
  }
});

var SignalReportRow = React.createClass({
  getInitialState: function() {
    return {
      companyCount: '~',
      peopleCount: '~',
      loading: this.props.report.done,
    }
  },

  setTerritory: function() {
    this.props.setTerritory('')
  },

  rowClick: function() {
    this.props.rowClick(this.props.report)
  },

  prospectSignalReport: function(e) {
    this.props.prospectSignalReport(this.props.report)
    e.stopPropagation()
  },

  componentDidMount: function() { 
  },

  render: function() {
    prospected = this.props.report.prospected
    icon = <i className="fa fa-globe" />
    icon = ""
    //
    loading = (this.state.loading) ? <div className="profile-loading" style={{marginLeft:30}}>
          <div className="double-bounce1" style={{backgroundColor:'#5cb85c'}}></div>
          <div className="double-bounce2" style={{backgroundColor:'#5cb85c'}}></div>
          </div> : <a href="javascript:" onClick={this.prospectSignalReport}
             style={{fontWeight:'bold',marginTop:5}}
     className={(prospected) ? "btn btn-xs btn-success disabled" : "btn btn-xs btn-success"}>
             {(prospected) ? 'Prospected' : 'Prospect All'}
          </a>
    // if done  - loading
    loading = (this.props.report.prospected) ? <span className="label label-success"> Prospected</span>  : loading
    loading  = <span className="label label-success"> Prospected</span>

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
        <td style={{textAlign:'',paddingLeft:50}}>
          <h6>
            <i className="fa fa-globe" />&nbsp;
            <span>
            {this.props.report.territory}
            </span>
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
        <td style={{display:'block'}}>
          <span className="label label-success">
            {this.props.report.people_count}
          </span>

          {(this.props.report.prospected) ? <div style={{marginTop:6,padding:6, display:'block',width:146}} className="label label-primary"><i className="fa fa-check-circle" /> &nbsp; Prospected</div> : <a href="javascript:" className="btn btn-success btn-xs"
            style={{backgroundImage: 'linear-gradient(#8add6d, #60b044)',marginTop:4}}
            style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)',marginTop:4}}>
            <i className="fa fa-cloud-download" /> &nbsp;
            Download Prospects
          </a>}
          <h6 style={{display:'none'}}>
            &nbsp; People found.
          </h6>
        </td>
        <td style={(this.props.report.done) ? {display:'none'} : {display:'none',paddingTop:17}}>
          {loading}
        </td>
      </tr>
    )
  }
});
