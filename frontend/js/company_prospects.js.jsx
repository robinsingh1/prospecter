/** @jsx React.DOM */

var CompanyProspect = require('./company.js.min.js');
var LoadingSpinner = require('./loading_spinner.js.min.js')

module.exports = React.createClass({
  getInitialState: function() {
    return {  prospects   : [],
              currentPage : 1,
              loading     : true,
              pages       : 1,
              count       : "~", }
  },
  /*
   *
    cid = this.props.prospect.profile.split('?')[0].split('/company/')[1]
    console.log(this.props)
    window.open("https://www.linkedin.com/vsearch/p?f_CC="+cid)
  */
  
  render: function() {
    console.log('company')
    prospects = []
    for(i=0;i<this.state.prospects.length;i++) {
      url = this.state.prospects[i].url

      if(url != "no linkedin website" && typeof(url) != "undefined" && url != ""){
        url = url.replace('http://','')
        the_link = <a href={'http://'+url}><i className="fa fa-globe"/></a>
      } else {
        the_link = ""
      }

      profile = this.state.prospects[i].profile
      //profile = profile.replace('http://','')
      li = <a href={'http://'+profile} ><i className="fa fa-linkedin-square" /></a>

      if(this.props.prospectType == 'Prospect') {
        prospects.push(
          <UserProspect deleteProspect={this.deleteProspect} 
                        prospect={this.state.prospects[i]} 
                        key={this.generate_id()}
                        link={the_link} li={li}/>
        )
      } else {
        prospects.push(
          <CompanyProspect deleteProspect={this.deleteProspect} 
                           key={this.generate_id()}
                           prospect={this.state.prospects[i]} />
        )
      }
    }

    previous = (this.state.currentPage - 1) ? '' : 'disabled'
    forward = (this.state.currentPage == this.state.pages) ? 'disabled' : ''

    lowerLimit = (this.state.currentPage-1)*100
    upperLimit = this.state.currentPage*100

    lowerLimit = (lowerLimit) ? lowerLimit : 1
    upperLimit = (upperLimit > this.state.count) ? this.state.count : upperLimit
  
    console.log(prospects.length)
    companyStyle= (prospects.length) ? {padding:'0'} : {display:'none'}

    return (
      <div>
      <div className="container bg-radius" style={{width:'100%',padding:'0'}}>
        {(prospects.length == 0 && this.state.loading == false) ? <EmptyCompanyProspectsPanel /> : ""}
        {(this.state.loading) ? <LoadingSpinner /> : ""}
        <div className="col-md-12" style={companyStyle}>
          <div id="autoscroll" style={{height:'400px',overflow:'auto'}}>
            <table className="table table-striped">
              <thead style={{backgroundColor:'white'}}>
                <CompanyProspectHeader />
              </thead>
              <tbody>
                {prospects}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        <div className="panel-footing" id="navbar" style={{height:'35px',padding:'0px',paddingTop:'7px'}}>
          <span style={{float:'right',marginRight:'20px'}}>
          <a href="javascript:" style={{marginRight:'5px'}}onClick={this.paginatePrevious} className={"blue-gradient btn btn-primary btn-xs " + previous} ><i className="fa fa-fast-backward" /></a>
          <a href="javascript:" onClick={this.paginatePrevious} className={"blue-gradient btn btn-primary btn-xs " + previous} ><i className="fa fa-chevron-left" /></a>
          &nbsp; &nbsp;
          <span className="">{lowerLimit + ' - '+upperLimit+' of '+this.state.count}</span>
          &nbsp; &nbsp;
          <a href="javascript:" onClick={this.paginateForward} className={"blue-gradient btn btn-primary btn-xs " + forward}><i className="fa fa-chevron-right" /></a>
          <a href="javascript:" style={{marginLeft:'5px'}} onClick={this.paginateForward} className={"blue-gradient btn btn-primary btn-xs " + forward}><i className="fa fa-fast-forward" /></a>
          </span>
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    thisss = this;
    parse_headers = {'X-Parse-Application-Id':'N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ', 'X-Parse-REST-API-Key':'VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb'}
    company = JSON.stringify(JSON.parse(localStorage.currentUser).company)

    $.ajax({
      url: 'https://api.parse.com/1/classes/CompanyProspect',
      type:'GET',
      headers: parse_headers,
      async: true,
      data: 'where={"company":'+company+'}&count=1',
      success: function(res){
        thisss.setState({prospects: res.results})
        thisss.setState({count: res.count})
        thisss.setState({pages: Math.ceil(res.count/100)})
        thisss.setState({loading: false})
      },
      error: function(res){
        console.log('error')
        console.log(res)
      }
    });
  },

  generate_id : function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  },
});

var SideMenuCompanyProspects = React.createClass({
  render: function() {
        
    return (
      <div className="col-md-2" style={{padding:'0',height:'400px',backgroundColor:'#e0e9ee',borderRight:'1px solid #b0b8bf',textAlign:'center'}}>
        <div className="prospect-list-header">
          Lists
        </div>
        <div className="btn-group-vertical" style={{width:'100%'}}>
          <button type="button" className="list-names btn btn-default">Templates</button>
          <button type="button" className="list-names btn btn-default">Schedules</button>
          <button type="button" className="list-names btn btn-default">Rules</button>
        </div>
        <br/>
        <br/>
        <a href="javascript:" className="btn btn-primary" 
              style={{ backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)'}}>
          <i className="fa fa-plus-circle" />&nbsp;New Class
        </a>
        <br/>
      </div>
    );
  },

  paginatePrevious: function() {
    console.log('previous')
    console.log((this.state.currentPage - 1)*100)
    thiss = this;
    $.ajax({
      url: 'https://api.parse.com/1/classes/Prospect?skip='+(thiss.state.currentPage-2)*100,
      type:'GET',
      headers: parse_headers,
      data: 'where={"company":'+company+'}&count=1',
      success: function(res){
        thiss.setState({prospects: res.results})
        thiss.setState({currentPage: thiss.state.currentPage - 1})
      },
      error: function(res){
        console.log(res)
      }
    });
  },

  paginateForward: function() {
    console.log('forward')

    thiss = this;
    $.ajax({
      url: 'https://api.parse.com/1/classes/Prospect?skip='+thiss.state.currentPage*100,
      type:'GET',
      headers: parse_headers,
      data: 'where={"company":'+company+'}&count=1',
      success: function(res){
        thiss.setState({prospects: res.results})
        thiss.setState({currentPage: thiss.state.currentPage + 1})
      },
      error: function(res){
        console.log(res)
      }
    });
  },
});

var EmptyCompanyProspectsPanel = React.createClass({
  openLinkedinWindow: function() {
    window.open('https://www.linkedin.com/vsearch/c?type=companies')
  },

  render: function() {
    return (
      <div className="col-md-offset-3 col-md-6" style={{height:400}}>
      <div className="panel panel-default" style={{marginTop:100,height:200}}>
        <div className="panel-body">
          <h1 className="lead" style={{textAlign:'center'}}>Start Prospecting On Linkedin</h1>
          <a href="javascript:" onClick={this.openLinkedinWindow} className="btn btn-success" style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%) !important',display:'block',marginRight:'auto',marginLeft:'auto',width:200, marginTop:50}}>
            <i className="fa fa-search" /> &nbsp;
            Search for companies!</a>
        </div>
      </div>
    </div>
    );
  }
});

var CompanyProspectHeader = React.createClass({
  render: function() {
    return (
      <tr>
        <th>Name</th>
        <th>Added On</th>
        <th>Industry</th>
        <th># of Prospects</th>
        <th>Signals</th>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
      </tr>
    );
  }
});
