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

    //console.log(this.state.checked)
    //console.log(checked)
    //{prospect.employeeCountRange.name + " employees" }
    
    color = {}
    if(this.state.checked || this.props.alreadyChecked)
      color = {backgroundColor: '#eef8ff'}
      
    rowCl = (this.props.keyboardSelected) ? "prospects-tr keySelect" : "prospects-tr"
    websiteBtn = (prospect.websiteUrl) ?  <a href={"http://"+prospect.websiteUrl.replace('http://','')} > <i className="fa fa-globe" /> </a> : ""
    return (
      <tr className={rowCl} 
          onClick={this.rowClick}
          style={keyboardSelected}>
          <td style={color}>
              <input type="checkbox" 
                     onChange={this.clickCheck} 
                     checked={checked}/>
          </td>

          <td style={color}
              className="fixed-data-column">
            <span style={{fontWeight:'bold'}}>{prospect.name}</span>
            <h6 style={{fontWeight:'400',margin:'0px'}}>{prospect.headcount}</h6>
          </td>

          <td style={color}
              className="fixed-data-column">
            <h6 style={{margin:'0px'}}>{moment(prospect.createdAt,'YYYY-MM-DDTh:mm:ss').fromNow()}</h6>
          </td>

          <td style={color}
              className="fixed-data-column">
            <h6 style={{margin:'0px'}}>{prospect.industry}</h6>
          </td>

          <td style={color}>
            &nbsp; &nbsp;
            <a href="javascript:" className="btn btn-primary btn-xs"
              onClick={this.openLinkedinCompanyProfile}
              style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)'}}> 
              <i className="fa fa-search" /> &nbsp;
              Search Profiles
            </a>
            &nbsp; &nbsp;
            <a href="javascript:" className="btn btn-primary btn-xs"
              onClick={this.openSimilarCompanies}
              style={{backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)'}}> 
              <i className="fa fa-copy" /> &nbsp;
              Find Similar Companies
            </a>
          </td>

          <td style={color}>
            <h6 style={{margin:'0px'}}>{prospect.city}</h6>
          </td>

          <td style={color}>
            {this.props.li}&nbsp;{this.props.link}
            {websiteBtn}
          </td>
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
    this.props.deleteProspect(this.props.prospect.objectId, 'Prospect')
  }
});

