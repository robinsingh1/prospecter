/** @jsx React.DOM */
var HorizantalSpinner = require('./horizantal_spinner.js.min.js')

module.exports = React.createClass({
  // UserProspect
  getInitialState: function() {
    return { 
      prospect: this.props.prospect,
      checked: false,
    }
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

    prospect = this.state.prospect

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
      
    //rowCl = (this.props.keyboardSelected) ? "prospects-tr keySelect" : "prospects-tr"
    websiteBtn = (prospect.websiteUrl) ? "http://"+prospect.websiteUrl.replace('http://','') : false
    websiteShinyBtn = (websiteBtn) ? <a href={websiteBtn} className="btn btn-xs btn-primary btn-gradient"><i className="fa fa-globe" /></a> : ""
    
    prospect_email = prospect.email

    if(prospect.email == "no_email"){
      if(prospect.email_guesses) {
        guess = _.findWhere(prospect.email_guesses, {tried: false})
        name = this.props.prospect.name.trim()

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

    if(prospect_email) {
        prospect_email = (prospect_email) ? prospect_email.toLowerCase() : ""
        //prospect_email = <a href={"mailto:"+prospect_email} style={{margin:'0px'}}> {prospect_email} </a>
        prospect_email = <input onClick={this.emailInputClick} type="text" value={prospect_email} className="form-control form-sm" style={{fontSize:12, width:200, height:26, marginTop: 5}}/>
    }

    company_size = (prospect.company_size) ? prospect.company_size : ""

    if(this.props.prospect.loading)
      prospect_email = <label className="label label-primary" style={{backgroundColor: 'rgb(0, 122, 265)'}}>Loading...</label>
    if(this.props.prospect.loading)
      company_size = <label className="label label-primary" style={{backgroundColor: 'rgb(0, 122, 265)'}}>Loading...</label>

    prospect_name = <span style={{fontWeight:'bold'}}>{prospect.name}</span>
    prospect_company_name = <span style={{fontWeight:'bold'}}> {prospect.company_name} </span>
    position = (prospect.pos) ? prospect.pos.trim() : ""
    if(!this.props.prospect.loading){
      if(typeof(prospect.domain) == "undefined")
        prospect_email = <UserUpdateForm updateProspect={this.updateProspect} var="website" formText="Enter Website."/> 
      if(typeof(prospect.name) == "undefined" || prospect.name == "LinkedIn Member")
        prospect_name = <UserUpdateForm updateProspect={this.updateProspect} var="name"formText="Enter Full Name."/> 
      if(typeof(prospect.company_name) == "undefined" || prospect.company_name == "")
        prospect_company_name = <UserUpdateForm updateProspect={this.updateProspect} var="company_name" formText="Enter Company Name."/> 
      if(typeof(position) == "undefined" || position == "")
        position = <UserUpdateForm updateProspect={this.updateProspect} var="pos" formText="Enter Title."/> 
    }
    return (
      <tr className="prospects-tr"
          onClick={this.rowClick}
          style={keyboardSelected}>
          <td style={color}>
              <input type="checkbox" 
                     onChange={this.clickCheck} 
                     checked={checked}/>
          </td>
          <td style={color} className="fixed-data-column">
              {prospect_name}
            <h6 style={{fontWeight:'400',margin:'0px'}}>
              {position}
            </h6>
          </td>
          <td style={color} className="fixed-data-column">
            {prospect_company_name}
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
            <div style={{width:77,paddingTop:5}}>
              <a onClick={this.openSimilars} 
                href="javascript:"
                className="btn btn-xs btn-primary btn-gradient similar_link">
                <i className="fa fa-copy" style={{fontWeight:'bold'}}/></a>&nbsp;
            <a href={this.props.liProfile} className="btn btn-xs btn-primary btn-gradient linkedin_link"><i className="fa fa-linkedin-square" /></a>
            &nbsp;
            {this.props.link}
            {websiteShinyBtn}
            </div>
          </td>
        </tr>
    );
  },

  emailInputClick: function(e) {e.stopPropagation() },


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
  },
  
  updateProspect: function(prop, value) {
    prospect = this.state.prospect
    prospect[prop] = value
    this.setState({prospect: value})
  }
});

var UserUpdateForm = React.createClass({
  getInitialState: function() {
    return {
      submitted: false,
      value: "",
    }
  },
  formClick: function(e) { e.stopPropagation() },

  submitForm: function(e) {
    e.preventDefault()
    console.log($(e.target).find('input').val())
    console.log(e.target)
    console.log(this.props.var)
    this.props.updateProspect(this.props.var, $(e.target).find('input').val())
    this.setState({submitted: true})
  },

  handleChange: function(event) {
    console.log(event.target.value)
    this.setState({value: event.target.value});
  },

  render: function() {
    //"Enter Website."
    btn = (this.state.submitted) ? "btn btn-xs btn-success" : "btn btn-xs btn-default"
    return (
      <form onClick={this.formClick} onSubmit={this.submitForm} style={{width:200}}>
        <input style={{width:'70%', marginRight:10, display:'inline', height:24,
                      marginBottom:6}}
          type="text" className="form-control input-sm" 
          disabled={this.state.submitted}
          onChange={this.handleChange}
          value={this.state.value}
          placeholder={this.props.formText} />
        <button type="submit" className={btn}
          style={{display:'inline'}}>
          <i className="fa fa-check"/></button>
      </form>
    )
  }
})
