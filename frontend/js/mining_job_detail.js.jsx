/** @jsx React.DOM */

module.exports = React.createClass({
  // SignalDetail
  getInitialState: function() {
    return {
      currentSignal: 'PeopleSignal',
      signals: [],
      //allProspected: this.props.currentProfileReport.prospected,
      companyCount: '~',
      peopleCount: '~'
    }
  },

  getSignals: function(currentSignal) {
    var thissss = this;
    currentReport = this.props.currentProfileReport.objectId
    currentProfileReport = appConfig.pointer('SignalReport', currentReport)
    currentProfile = appConfig.pointer('ProspectProfile', 
                                   this.props.currentProfile.objectId)

    qry = {
      //where:JSON.stringify({ profile: currentProfile }),
      where:JSON.stringify({ report: currentProfileReport}),
      include:'company_signal,company_signal.signals,signals',
      order:'createdAt',
      limit:100
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
    console.log(this.props.currentProfileReport.objectId)
    this.getSignals(this.state.currentSignal)
    currentProfile = appConfig.pointer('ProspectProfile', 
                                   this.props.currentProfile.objectId)
    qry = {
      where:JSON.stringify({ profile: currentProfile }),
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

  componentWillUpdate: function(nextProps, nextState) {
    if(this.state.currentSignal != nextState.currentSignal)
      this.getSignals(nextState.currentSignal)
  },

  returnToCalendarView: function() {
    console.log('return to calendar view')
  },

  render: function() {
    signals = []
    for(i=0;i< this.state.signals.length; i++) {
      if(this.state.currentSignal == 'CompanySignal')
        signals.push(<CompanyHiringSignalRow signal={this.state.signals[i]} 
                                       allProspected={this.state.allProspected}/>)
      else
        signals.push(<PeopleSignalRow signal={this.state.signals[i]} 
                                       allProspected={this.state.allProspected}/>)
    }

    currentProfileReport = this.props.currentProfileReport
    companyBtn = (this.state.currentSignal == "CompanySignal") ? "btn btn-xs btn-default active" : "btn btn-xs btn-default"
    peopleBtn = (this.state.currentSignal == "PeopleSignal") ? "btn btn-xs btn-default active" : "btn btn-xs btn-default"
    return (
      <div className="container" style={{height:356,paddingLeft:0,
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
            {moment(currentProfileReport.createdAt).fromNow()} &nbsp;
          </h6>

          {(this.state.allProspected) ?
          <a href="javascript:" style={{fontWeight:'bold',float:'right',
                                        marginRight:10,marginTop:10}}
             className="btn btn-success btn-xs disabled">
            Prospected
          </a> :
          <a href="javascript:" style={{fontWeight:'bold',float:'right',
                                        marginRight:10,marginTop:10}}
             onClick={this.prospectAll}
             className="btn btn-success btn-xs">
            Prospect
          </a>
          }

          <div className="btn-group" 
               style={{float:'right',marginTop:10,marginRight:10}}
               data-toggle="buttons">
            <label className={peopleBtn} style={{}}
                 onClick={this.setPersonState}>
              <input type="checkbox"/>
              <i className="fa fa-user"/> &nbsp;
              {this.state.peopleCount}
            </label>
            <label className={companyBtn} style={{}} 
              onClick={this.setCompanyState}>
              <input type="checkbox"/>
              <i className="fa fa-building"/> &nbsp;
              {this.state.companyCount}
            </label>
          </div>
        </div>

        <div className="col-md-12" style={{paddingLeft:0,paddingRight:0}}>
          <div style={{overflow:'auto',height:356}}>
            <table className="table table-striped">
              <thead>
                <th style={{textAlign:'center',width:90}}>
                  <i className="fa fa-clock-o" />
                </th>

                <th style={{width:200}}>
                  {(this.state.currentSignal == 'CompanySignal') ?  
                    "Companies" : "People" }
                </th>

                <th>Company</th>

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
    console.log('PROSPECT')
    console.log(this.state.currentSignal)
    console.log(this.props.currentProfileReport.objectId)
    report_id = this.props.currentProfileReport.objectId
    var thiss = this;

    $.ajax({
      //url: 'http://127.0.0.1:5000/signal_to_prospect',
      url: 'https://nameless-retreat-3525.herokuapp.com/signal_to_prospect',
      data: {all_signals:true, report_id: report_id, 
             signal_type: thiss.state.currentSignal},
      success: function(res) { console.log(res)},
      error: function(err) { console.log(err.responseText)},
    })
  }
});

var CompanyHiringSignalRow = React.createClass({
  render: function() {
    //console.log(company)
    company = (this.props.signal) ? this.props.signal : {}
    return (
      <tr style={{}}>
        <td style={{textAlign:'center',width:120}}>
          <h6> 
            {moment(this.props.signal.createdAt).fromNow()}
          </h6>
        </td>

        <td>
          <h6>{company.name}</h6>
          <h6>{company.revenue}</h6>
          <h6><a href="javascript:" >{company.websiteUrl}</a></h6>
          <h6>{company.city}</h6>
        </td>

        <td>
          {(this.props.allProspected) ? 
          <a href="javascript:" className="btn btn-success btn-xs disabled"
            style={{fontWeight:'bold'}}>
            Prospected
          </a> : <a href="javascript:" className="btn btn-success btn-xs"
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
  turnSignalIntoProspect: function() {
    var thiss = this;
    console.log(this.props.signal)
    $.ajax({
      //url:'http://127.0.0.1:5000/signal_to_prospect',
      url:'http://nameless-retreat-3525.herokuapp.com/signal_to_prospect',
      data: {signal_id: thiss.props.signal.objectId, signal_type:'PeopleSignal',
             all_signals:false},
      success: function(res) { console.log(res) },
      error: function(err) { console.log(err.responseText) } 
    })
  },

  render: function() {
    //console.log(company)
    people = (this.props.signal) ? this.props.signal : {}
    company = (people.company_signal) ? people.company_signal : {}
    name = people.link_text.split('|')[0]
    //city = people.split('-')[0]
    city = ""
    //console.log(people)
    return (
      <tr style={{}}>
        <td style={{textAlign:'center',width:120}}>
          <h6> 
            {moment(this.props.signal.createdAt).fromNow()}
          </h6>
        </td>

        <td>
          <h6>{name + " - "} <span style={{fontStyle:'italic'}}>
              {people.title}</span></h6>
        </td>

        <td>
          <h6>{people.prospect_company + " - "} <span style={{fontStyle:'italic'}}>
              {people.industry}</span></h6>
          <h6>{people.company_size} <span style={{fontStyle:'italic'}}>
          </span><a href={people.website}>{people.website}</a></h6>
          
        </td>

        <td>
          {(this.props.allProspected) ? 
          <a href="javascript:" className="btn btn-success btn-xs disabled"
            style={{fontWeight:'bold'}}>
            Prospected
            </a> : <a href="javascript:" className="btn btn-success btn-xs"
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
