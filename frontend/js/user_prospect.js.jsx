/** @jsx React.DOM */
var HorizantalSpinner = require('./horizantal_spinner.js.min.js')

module.exports = React.createClass({
  // UserProspect
  getInitialState: function() {
    return { }
  },

  clickCheck: function(e) {
    e.stopPropagation()
    domNode = this.getDOMNode()
    //isChecked = $($(domNode).find('input[type="checkbox"]')[0]).prop('checked')
    isChecked = $($(domNode).find('input[type="checkbox"]')[0]).prop('checked')
    $($(this.getDOMNode()).find('input[type="checkbox"]')[0]).click()
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
    
    prospect_email = prospect.email
    if(typeof(prospect.domain) == "undefined")
      prospect.email = "website not found"
    if(prospect.email == "no_email") {
      if(prospect.email_guesses) {
        guess = _.findWhere(prospect.email_guesses, {tried: false})
        name = this.props.prospect.name

        vars = {
          first: _.first(name.split(' ')),
          last: _.last(name.split(' ')),
          fi: _.first(name.split(' '))[0],
          li: _.last(name.split(' '))[0]
        }
        if(guess){
          prospect_email = Mustache.render(guess.pattern.pattern, vars)
          prospect_email = prospect_email+"@"+prospect.domain
        }
      }
    }
    prospect_email = (prospect_email) ? prospect_email.toLowerCase() : ""
    prospect_email = <a href={"mailto:"+prospect_email} style={{margin:'0px'}}> {prospect_email} </a>
    company_size = (prospect.company_size) ? prospect.company_size : ""

    if(this.props.prospect.loading)
      prospect_email = <HorizantalSpinner />
    if(this.props.prospect.loading)
      company_size = <HorizantalSpinner />
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
            <h6 style={{fontWeight:'400',margin:'0px'}}>
              {(prospect.pos) ? prospect.pos.trim() : ""}
            </h6>
          </td>
          <td style={color}
              className="fixed-data-column">
            <span style={{fontWeight:'bold'}}>
              {prospect.company_name}
            </span>
            <h6 style={{fontWeight:'400',margin:'0px'}} className="company-size">
            {company_size}
            </h6>
            <h6 style={{fontWeight:'400',margin:'0px',display:'none',fontStyle:'italic'}} className="company-size">
              {(prospect.industry) ? prospect.industry : ""}
            </h6>
          </td>

          <td style={color}>
            <h6 style={{margin:'0px'}}>{prospect.city}</h6></td>
          <td style={color}>
            {prospect_email}
          </td>
          <td style={color}>
            <div style={{width:51}}>
              <a onClick={this.openSimilars} 
                href="javascript:"
                className="btn btn-xs btn-primary btn-gradient similar_link">
                <i className="fa fa-copy" style={{fontWeight:'bold'}}/></a>&nbsp;
            <a href={this.props.liProfile} className="btn btn-xs btn-primary btn-gradient linkedin_link"><i className="fa fa-linkedin-square" /></a>
            &nbsp;{this.props.link}
            </div>
          </td>
          <td style={color}>
            {websiteBtn}
          </td>
        </tr>
    );
  },

  openSimilars: function(e) {
    if(this.props.liProfile.indexOf('profile') != -1){
      urlargs = this.props.liProfile.split('?')[1].split('&')
      args = []
      for(i=0;i< urlargs.length; i++)
        args.push(urlargs[i].split('='))
      args = _.object(args)
    }
    window.open("https://www.linkedin.com/vsearch/p?pivotType=sim&pid="+args.id)
    e.stopPropagation()
  },

  openLinkedinProfile: function(e) {
    id = this.state.linkedin_id
    window.open("https://www.linkedin.com/vsearch/p?pivotType=sim&pid="+id)
    e.stopPropagation()
  },

  deleteProspect: function() {
    this.props.deleteProspect(this.props.prospect.objectId, 'Prospect')
  }
});

