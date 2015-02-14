/** @jsx React.DOM */

module.exports = React.createClass({
  // DataRow
  getInitialState: function() {
    return { }
  },

  clickCheck: function() {
    domNode = this.getDOMNode()
    isChecked = $($(domNode).find('input[type="checkbox"]')[0]).prop('checked')
    //console.log(isChecked)
    this.setState({checked: isChecked})
    this.props.checkboxAction(isChecked, this.props.prospect.objectId)
  },

  rowClick: function() {
    $($(this.getDOMNode()).find('input[type="checkbox"]')[0]).click()
  },

  keyboardClick: function() {
    $($('.keySelect').find('input[type="checkbox"]')[0]).click()
  },

  componentDidMount: function() { },

  render: function() {
    keyboardSelected = {borderLeft:'7px solid rgba(0,0,0,0)'}
    thissss = this
    if(this.props.keyboardSelected) {
      // Adjust Scroll depending on where the prospect is
      keyboardSelected = {borderLeft:'7px solid #0096ff !important'}
      Mousetrap.unbind('x')
      Mousetrap.bind('x', function() { 
        thissss.keyboardClick()
        if(thissss.state.checked)
          console.log("lmao")
      });
    }

    prospect = this.props.prospect
    company = (prospect.company) ? prospect.company : prospect.company_info
    company = (company) ? company : {}
    console.log(prospect)

    if(this.props.masterCheckboxChecked && this.state.checked)
      checked = true
    else if(this.props.alreadyChecked)
      checked = true
    else if(this.state.checked)
      checked = true
    else if(this.props.masterCheckboxChecked || this.state.checked)
      checked = true
    else
      checked = false

    // console.log(this.state.checked)
    // console.log(checked)
    // {prospect.employeeCountRange.name + " employees" }
    // Today
    
    color = {}
    if(this.state.checked || this.props.alreadyChecked)
      color = {backgroundColor: '#eef8ff'}
      
    rowCl = (this.props.keyboardSelected) ? "prospects-tr keySelect" : "prospects-tr"
    websiteBtn = (prospect.website) ?  <a href={"http://"+prospect.website.replace('http://','')} className="btn btn-xs btn-primary btn-gradient" style={{float:'right',marginLeft:5}}> <i className="fa fa-globe" /> </a> : ""
    //if(parseInt(prospect.linkedin_url.split('/').pop())){
    if(company.linkedin_url){
      btnClass = "btn btn-primary btn-xs btn-gradient"
    } else {
      btnClass = "btn btn-primary btn-xs btn-gradient disabled"
    }
    if(company.logo)
      logo = company.logo

    return (
      <tr className={rowCl} 
          onClick={this.rowClick}
          style={keyboardSelected}>
          <td style={color}>
              <input type="checkbox" 
                     onChange={this.clickCheck} 
                     checked={checked}/>
          </td>
          <td style={color}>
              <div style={{backgroundImage: "url("+company.logo+")"}} 
              className="company-img-thumbnail"/>
          </td>

          <td style={color}
              className="fixed-data-column">
            <span style={{fontWeight:'bold',fontSize:15}}>{company.company_name}</span>
            <h6 style={{fontWeight:'400',margin:'0px',fontSize:11}}>
              {company.headcount}</h6>
          </td>


          <td style={color}
              className="fixed-data-column">
            <h6 style={{margin:'0px',fontSize:13}}>{company.industry}</h6>
            <h6 style={{margin:'0px',fontStyle:'italic',marginTop:5,fontSize:11}}>
              {company.city}</h6>
          </td>

          <td style={color}>
            &nbsp; &nbsp;
            <div style={{width:290,marginTop:-15}}>
            <a href="javascript:" className={btnClass}
              onClick={this.openLinkedinCompanyProfile}>
              <i className="fa fa-search" /> &nbsp;
              Search Profiles
            </a>
            &nbsp; &nbsp;
            <a href="javascript:" className={btnClass}
              onClick={this.openSimilarCompanies}>
              <i className="fa fa-copy" /> &nbsp;
              Find Similar Companies
            </a>
            </div>
          </td>
          <td style={color}
              className="fixed-data-column">
            <h6 style={{margin:'0px',fontSize:11,paddingTop:5}}>{moment(company.createdAt).fromNow()}</h6>
          </td>

          <td style={color}> <h6 style={{margin:'0px'}}>{""}</h6> </td>

          <td style={color}>
            <div style={{width:92, paddingTop:5}}>
              {this.props.li}&nbsp;
              {websiteBtn}
            </div>
          </td>
        </tr>
    );
  },

  openLinkedinCompanyProfile: function(e) {
    console.log(this.props.prospect.linkedin_url)
    cid = this.props.prospect.company_info.linkedin_url.split('?')[0].split('/company/')[1]
    console.log(cid)
    window.open("https://www.linkedin.com/vsearch/p?f_CC="+cid)
    e.stopPropagation()
  },

  openSimilarCompanies: function(e) {
    cid = this.props.prospect.company_info.linkedin_url.split('?')[0].split('/company/')[1]
    //window.open("https://www.linkedin.com/vsearch/c?rsid=526440371409184768175&pivotType=sim&pid="+cid+"&trk=sim_companies_res_sim&trkInfo=VSRPsearchId%3A526440371409184768175%2CVSRPtargetId%3A1025%2CVSRPcmpt%3Aprimary")
    window.open("https://www.linkedin.com/vsearch/c?rsid=526440371409184768175&pivotType=sim&pid="+cid+"&trk=sim_companies_res_sim&trkInfo=VSRPsearchId%3A526440371409184768175%2CVSRPtargetId%3A1025%2CVSRPcmpt%3Aprimary")
    e.stopPropagation()
  },

  deleteProspect: function() {
    this.props.deleteProspect(this.props.prospect.objectId, 'Prospect')
  }
});

