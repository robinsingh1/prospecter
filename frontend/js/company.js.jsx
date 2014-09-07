/** @jsx React.DOM */
// 

module.exports = React.createClass({
  //CompanyProspect
  render: function () {
    prospect = this.props.prospect
    website = (prospect.website) ? <a href={'http://'+prospect.website} ><i className="fa fa-globe"/></a> : ''
    linkedin_profile = (prospect.profile != "") ? <a href={prospect.profile} ><i className="fa fa-linkedin-square"/></a> : ''

  /*
            <a href="javascript:" className="btn btn-success btn-xs"
              style={{background: 'linear-gradient(#34c520,#219211)'}}> 
              <i className="fa fa-search" /> &nbsp;
              Find Prospects
            </a>
  */

  console.log

  //<td><a href="javascript:" onClick={this.deleteProspect}><i className="fa fa-times-circle" /></a></td>
    return (
        <tr>
          <td style={{width:'300px'}}>
            <span style={{fontWeight:'bold'}}>{prospect.name}</span>
            <h6 style={{fontWeight:'400',margin:'0px'}}>{prospect.headcount}</h6>
          </td>
          <td><h6 style={{margin:'0px'}}>{moment(prospect.createdAt,'YYYY-MM-DDTh:mm:ss').fromNow()}</h6></td>
          <td><h6 style={{margin:'0px'}}>{prospect.industry}</h6></td>
          <td>
            <span className="label label-primary" style={{display: 'block', width: 'auto', marginRight: 'auto', marginLeft: 'auto', width: '25px'}}>0</span>
          </td>
          <td><span className="label label-info">Hiring</span></td>
          <td>
            &nbsp; &nbsp;
            <a href="javascript:" className="btn btn-success btn-xs"
              onClick={this.openLinkedinCompanyProfile}
              style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)'}}> 
              <i className="fa fa-search" /> &nbsp;
              Search Profiles
            </a>
            &nbsp; &nbsp;
            <a href="javascript:" className="btn btn-success btn-xs"
              onClick={this.openSimilarCompanies}
              style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)'}}> 
              <i className="fa fa-copy" /> &nbsp;
              Find Similar Companies
            </a>
          </td>
          <td> {linkedin_profile} &nbsp; {website} </td>
        </tr>
    );
  },

  openLinkedinCompanyProfile: function() {
    cid = this.props.prospect.profile.split('?')[0].split('/company/')[1]
    window.open("https://www.linkedin.com/vsearch/p?f_CC="+cid)
  },

  openSimilarCompanies: function() {
    cid = this.props.prospect.profile.split('?')[0].split('/company/')[1]
    window.open("https://www.linkedin.com/vsearch/c?rsid=526440371409184768175&pivotType=sim&pid="+cid+"&trk=sim_companies_res_sim&trkInfo=VSRPsearchId%3A526440371409184768175%2CVSRPtargetId%3A1025%2CVSRPcmpt%3Aprimary")
  },

  deleteProspect: function() {
    this.props.deleteProspect(this.props.prospect.objectId, 'CompanyProspect')
  }
});
