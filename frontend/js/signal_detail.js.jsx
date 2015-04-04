/** @jsx React.DOM */

var CompanyDetail = require('./company_detail.js.min.js')

module.exports = React.createClass({
  // SignalDetail
  getInitialState: function() {
    return {
      currentSignal: 'CompanySignal',
      signals: [],
      allCompanyProspected: this.props.currentProfileReport.allCompanyProspected,
      allPeopleProspected: this.props.currentProfileReport.allPeopleProspected,
      companyCount: '~',
      peopleCount: '~',
      detailMode: false,
      detailCompany: {},
    }
  },

  getSignals: function(currentSignal) {
    var thissss = this;
    currentReport = this.props.currentProfileReport.objectId
    currentProfileReport = appConfig.pointer('SignalReport', currentReport)

    qry = {
      where:JSON.stringify({ report: currentProfileReport }),
      include:'company,signal.signal,signal',
      order:'-title_score',
      limit:1000,
    }

    $.ajax({
      url: 'https://api.parse.com/1/classes/'+currentSignal,
      data: qry,
      type:'GET',
      headers:appConfig.parseHeaders,
      success: function(res) {
        console.log('SIGNAL DETAIL')
        console.log(res.results)
        console.log('PROFILE REPORT')
        console.log(thissss.props.currentProfileReport.objectId)
        thissss.setState({signals: res.results})
      },
      error: function(err) { console.log(err.responseText) }
    });
  },

  setCompanyState: function() { this.setState({currentSignal: 'CompanySignal'}) }, 
  setPersonState: function() { this.setState({currentSignal: 'PeopleSignal'}) }, 

  componentDidMount: function() {
    console.log('detail')
    console.log(this.props.currentProfileReport.objectId)
    this.getSignals(this.state.currentSignal)
    qry = {
      where:JSON.stringify({ report: currentProfileReport }),
      count: 1,
      limit:100,
      order:'createdAt'
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

  componentWillUpdate: function(nextProps, nextState) {
    if(this.state.currentSignal != nextState.currentSignal)
      this.getSignals(nextState.currentSignal)
  },

  researchSignalReport: function() {
    $.ajax({
      url:"https://prospecter.herokuapp.com/v1/research_signal_report",
      data: {report: this.props.currentProfileReport.objectId},
    })
  },

  returnToCalendarView: function() {
    console.log('return to calendar view')
  },

  render: function() {
    signals = []
    for(i=0;i< this.state.signals.length; i++) {
      if(this.state.currentSignal == 'CompanySignal')
        signals.push(<CompanyHiringSignalRow signal={this.state.signals[i]} 
                                       toggleDetailMode={this.toggleDetailMode}
                                 allProspected={this.state.allCompanyProspected}/>)
      else
        signals.push(<PeopleSignalRow signal={this.state.signals[i]} 
                                 allProspected={this.state.allPeopleProspected}/>)
    }

    currentProfileReport = this.props.currentProfileReport
    companyBtn = (this.state.currentSignal == "CompanySignal") ? "btn btn-xs btn-default active" : "btn btn-xs btn-default"
    peopleBtn = (this.state.currentSignal == "PeopleSignal") ? "btn btn-xs btn-default active" : "btn btn-xs btn-default"
    score_column=(this.state.currentSignal == "PeopleSignal") ? <th>Score</th> : ""
    logo_column=(this.state.currentSignal == "CompanySignal") ? <th></th> : ""
    allProspected = (this.state.currentSignal == "CompanySignal") ? this.state.allCompanyProspected : this.state.allPeopleProspected
    return (
      <div className="container" style={{height:456,paddingLeft:0,
                                         paddingRight:0,width:'100%'}}>
        <div style={{height:44,borderBottom:'solid 1px rgb(221, 221, 221)'}}>
          <h4 onClick={this.returnToCalendarView}
              style={{float:'left',cursor:'pointer',marginTop:7,fontWeight:200,
                      paddingLeft:20,paddingTop:5,display:'inline-block'}}>
              
                <i className="fa fa-calendar" style={{marginRight:5}}/> 
                {this.props.currentProfile.name}
          </h4>
          <h6 style={{fontSize:13,paddingLeft:5,paddingTop:5,display:'inline-block'}}>
            <i className="fa fa-chevron-right" style={{fontSize:9}}/> &nbsp;
            <i className="fa fa-clock-o" /> &nbsp;
            {moment(currentProfileReport.createdAt).calendar()} &nbsp;
          </h6>

          {(allProspected) ?
          <a href="javascript:" style={{fontWeight:'bold',float:'right',
                                        marginRight:10,marginTop:10}}
             className="btn btn-success btn-xs disabled">
            Prospected
          </a> :
          <a href="javascript:" style={{fontWeight:'bold',float:'right',
                                        marginRight:10,marginTop:10}}
             onClick={this.prospectAll}
             className="btn btn-success btn-xs green-gradient">
            Prospect All
          </a>
          }

          <a href="javascript:" className="btn btn-default btn-xs"
            onClick={this.researchSignalReport}>
            <i className="fa fa-refresh" />&nbsp;
            Research Companies
          </a>
          <div className="btn-group" 
               style={{float:'right',marginTop:10,marginRight:10}}
               data-toggle="buttons">
            <label className={peopleBtn} style={{width:50}}
                 onClick={this.setPersonState}>
              <input type="checkbox"/>
              <i className="fa fa-user"/> &nbsp;
              {this.state.peopleCount}
            </label>
            <label className={companyBtn} style={{width:50}} 
              onClick={this.setCompanyState}>
              <input type="checkbox"/>
              <i className="fa fa-building"/> &nbsp;
              {this.state.companyCount}
            </label>
          </div>
        </div>

        <div className="col-md-12" style={{paddingLeft:0,paddingRight:0}}>
          {(this.state.detailMode) ? <CompanyDetail toggleDetailMode={this.toggleDetailMode} detailCompany={this.state.detailCompany}/> : ""}
          <div style={{overflow:'auto',height:456}}>
            <table className="table table-striped">
              <thead>
                <th style={{textAlign:'center',width:90,display:'none'}}>
                  <i className="fa fa-clock-o" />
                </th>

                {logo_column}
                <th style={{width:200}}>
                  {(this.state.currentSignal == 'CompanySignal') ?  
                    "Companies" : "People" }
                </th>

                <th style={{width:200}}>Signal</th>
                <th>Source </th>
                {score_column}

                <th style={{width:90,textAlign:'center'}}> </th>

              </thead>
              <tbody className="reports">
                {signals}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  },

  prospectAll: function() {
    console.log(this.state.currentSignal)
    console.log(this.props.currentProfileReport.objectId)
    report_id = this.props.currentProfileReport.objectId
    var thiss = this;
    $.ajax({
      //url: 'http://127.0.0.1:5000/signal_to_prospect',
      //url: 'https://nameless-retreat-3525.herokuapp.com/signal_to_prospect',
      //url: 'https://prospecter.herokuapp.com/signal_to_prospect',
      url: 'https://prospecter.herokuapp.com/v1/prospectify',
      data: {report: report_id, 
             signal_type: thiss.state.currentSignal},
      success: function(res) { console.log(res)},
      error: function(err) { console.log(err.responseText)},
    })

    if(this.state.currentSignal == "CompanySignal")
      this.setState({allCompanyProspected: true})
    else
      this.setState({allPeopleProspected: true})
  },

  toggleDetailMode: function(company) {
    this.setState({detailMode: !this.state.detailMode})
    this.setState({detailCompany: company})
  }
});

var CompanyHiringSignalRow = React.createClass({
  toggleDetailMode: function() {
    this.props.toggleDetailMode(this.props.signal.company)
  },

  render: function() {
    company = this.props.signal.company
    signal = this.props.signal.signal[0]
    return (
      <tr style={{}}>
        <td style={{textAlign:'center',width:120,display:'none'}}>
          <h6> 
            {moment(this.props.signal.createdAt).calendar()}
          </h6>
        </td>

        <td style={{width:50,paddingLeft:25}}>
          <div style={{backgroundImage: "url("+company.logo+")",height:60,width:60}} 
          className="company-img-thumbnail"/>
        </td>
        <td style={{width:250}}>
          <a href="javascript:" onClick={this.toggleDetailMode}>{company.name}</a>
          <h6>{company.industry}</h6>
          <h6>{(company.address) ? company.address.normalizedLocation : ""}</h6>
          <h6>{company.revenue}</h6>
          <h6>{company.headcount}</h6>
          <h6><a href="javascript:" >{company.website}</a></h6>
          <h6>{company.city}</h6>
        </td>

        <td style={{width:250}}>
          <h6>{signal.job_title}</h6>
          <h6>{signal.company_name}</h6>
          <h6>{signal.location}</h6>
          <h6>{signal.summary}</h6>
        </td>
        <td style={{width:100}}> 
          <label className="label label-default">{_.title(signal.source.replace("_"," "))} </label>
          <h6 style={{fontSize:10,fontStyle:"italic"}}>{moment(signal.timestamp*1000).fromNow()}</h6>
        </td>
        <td>
          {(this.props.allProspected) ? 
            <a href="javascript:" 
               className="btn btn-success btn-xs disabled green-gradient"
            style={{fontWeight:'bold'}}>
            Prospected
            </a> : <a href="javascript:" 
                      className="btn btn-success btn-xs green-gradient"
                  onClick={this.turnCompanySignalToProspect}
            style={{fontWeight:'bold'}}>
            Prospect
          </a> }
        </td>
      </tr>
    )
  },
  turnCompanySignalToProspect: function() {
    var thiss = this;
    $.ajax({
      //url: 'https://nameless-retreat-',
      //url: 'http://127.0.0.1:5000/signal_to_prospect',
      url: 'https://nameless-retreat-3525.herokuapp.com/signal_to_prospect',
      data: {all_signals:false, signal_id: company.objectId,
             signal_type: 'CompanySignal'},
      success: function(res) { console.log(res)},
      error: function(err) { console.log(err.responseText)},
    })
  }
})

var PeopleSignalRow = React.createClass({
  getInitialState: function() {
    return {
      prospected: this.props.signal.prospected
    }
  },

  turnSignalIntoProspect: function() {
    var thiss = this;
    console.log(this.props.signal)
    /*
    $.ajax({
      //url:'http://127.0.0.1:5000/signal_to_prospect',
      url:'http://nameless-retreat-3525.herokuapp.com/signal_to_prospect',
      data: {signal_id: thiss.props.signal.objectId, signal_type:'PeopleSignal',
             all_signals:false},
      success: function(res) { console.log(res) },
      error: function(err) { console.log(err.responseText) } 
    })
    */
    this.setState({ prospected: true })
  },

  render: function() {
    //console.log(company)
    people = (this.props.signal) ? this.props.signal : {}
    company = people.company
    signal = people.signal.signal[0]
    console.log(people)
    time = moment(currentProfileReport.createdAt).fromNow()
    //time = (time.indexOf("hours") == -1) ? time : ""

    return (
      <tr style={{}}>
        <td style={{textAlign:'center',width:120}}>
          <h6 style={{display:"none"}}> 
            {moment(this.props.signal.createdAt).calendar()}
          </h6>
        </td>

        <td>
          <label className="label label-danger" >
          <i className="fa fa-fire" /> &nbsp;
          {people.title_score}
          </label>
        </td>
        <td>
          <h6>{people.name + " - "} <span style={{fontStyle:'italic'}}>
              {people.title}</span></h6>
          <h6><a href="javascript:" >{company.website}</a></h6>
          <h6>{company.name}</h6>
          <h6>{company.city}</h6>
        </td>

        <td >
          <h6>{signal.job_title}</h6>
          <h6>{signal.company_name}</h6>
          <h6>{signal.location}</h6>
          <h6>{signal.summary}</h6>
        </td>

        <td style={{width:100}}>
          <label className="label label-default">{_.title(signal.source.replace("_"," "))} </label>
          <h6 style={{fontSize:10,fontStyle:"italic"}}>{moment(signal.timestamp*1000).fromNow()}</h6>
        </td>

        <td>
        </td>

        <td>
          {(this.props.allProspected || this.state.prospected) ? 
          <a href="javascript:" className="btn btn-success btn-xs green-gradient disabled"
            style={{fontWeight:'bold'}}>
            Prospected
            </a> : <a href="javascript:" className="btn btn-success btn-xs green-gradient"
                      onClick={this.turnSignalIntoProspect}
            style={{fontWeight:'bold'}}>
            Prospect
          </a>
          }
        </td>
      </tr>
    )
  }
})
