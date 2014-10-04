/** @jsx React.DOM */

module.exports = React.createClass({
  // SignalDetail
  getInitialState: function() {
    return {
      signals: []
    }
  },

  componentDidMount: function() {
    thissss = this;
    currentProfileReport = JSON.stringify({
      __type: 'Pointer',
      className: 'SignalReport',
      objectId: this.props.currentProfileReport.objectId
    })

    qry = 'where={"signal_report":'+currentProfileReport+'}&include=company_signal,company_signal.signals&order=-createdAt'
    $.ajax({
      url: 'https://api.parse.com/1/classes/PeopleSignal?'+qry,
      type:'GET',
      headers:appConfig.parseHeaders,
      success: function(res) {
        console.log('SIGNAL DETAIL')
        console.log(res.results)
        thissss.setState({signals: res.results})
      },
      error: function(err) {
        console.log(err)
      }
    });
  },

  returnToCalendarView: function() {
    console.log('return to calendar view')
  },

  render: function() {
    signals = []
    for(i=0;i< this.state.signals.length; i++)
      signals.push(<SignalRow signal={this.state.signals[i]} />)

    currentProfileReport = this.props.currentProfileReport
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

          <a href="javascript:" style={{fontWeight:'bold',float:'right',
                                        marginRight:10,marginTop:10}}
             className="btn btn-success btn-xs">
            Prospect All
          </a>

          <div className="btn-group" 
               style={{float:'right',marginTop:10,marginRight:10}}
               data-toggle="buttons">
            <label className="btn btn-xs btn-default active" style={{width:30}}>
              <input type="checkbox"/>
              <i className="fa fa-user"/> 
            </label>
            <label className="btn btn-xs btn-default" style={{width:30}}>
              <input type="checkbox"/>
              <i className="fa fa-building"/> 
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

                <th>People</th>

                <th>Companies</th>

                <th style={{width:90,textAlign:'center'}}>
                </th>

              </thead>
              <tbody className="reports">
                {signals}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

var SignalRow = React.createClass({
  render: function() {
    company = (this.props.signal.company_signal) ? this.props.signal.company_signal : {}
    return (
      <tr>
        <td style={{textAlign:'center'}}>
          <h6> 
            {moment(this.props.signal.createdAt).fromNow()}
          </h6>
        </td>

        <td>
          <h6>{this.props.signal.link_text}</h6>
          <h6>{this.props.signal.title}</h6>
        </td>

        <td>
          <h6>{company.name}</h6>
          <h6>{this.props.signal.title}</h6>
        </td>

        <td>
          <a href="javascript:" className="btn btn-success btn-xs"
            style={{fontWeight:'bold'}}>
            Prospect
          </a>
        </td>
      </tr>
    )
  }
})
