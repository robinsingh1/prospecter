/** @jsx React.DOM */
var HorizantalSpinner = require('./horizantal_spinner.js.min.js')
var LoadingSpinner = require('./loading_spinner.js.min.js')

module.exports = React.createClass({
  getInitialState: function() {
    loading  = true
    if(this.props.prospect.company)
      if(this.props.prospect.company.email_pattern)
        loading  = false
    if(!this.props.prospect.company_name.length)
      loading = false
    return { 
      prospect: this.props.prospect,
      checked: false,
      initialLoading: loading,
      loading: loading,
      editMode: false,
      mouseOver: false
    }
  },

  mouseEnter: function() {
    this.setState({mouseOver: true})
  },

  mouseLeave: function() {
    this.setState({mouseOver: false})
  },

  clickCheck: function(e) {
    e.stopPropagation()
    domNode = this.getDOMNode()
    //isChecked = $($(domNode).find('input[type="checkbox"]')[0]).prop('checked')
    isChecked = $($(domNode).find('input[type="checkbox"]')[0]).prop('checked')
    $($(this.getDOMNode()).find('input[type="checkbox"]')[0]).click()
    //console.log(isChecked)
    this.setState({checked: isChecked})
    this.props.checkboxAction(isChecked, this.state.prospect.objectId)
  },

  rowClick: function() {
    $($(this.getDOMNode()).find('input[type="checkbox"]')[0]).click()
  },

  keyboardClick: function() {
    $($('.keySelect').find('input[type="checkbox"]')[0]).click()
  },

  componentDidUpdate: function() {
    //
  },

  _make_email: function(name, pattern) {
    name = name.trim()
    vars = {
      first_name: _.first(name.split(' ')),
      last_name: _.last(name.split(' ')),
      first_initial: _.first(name.split(' '))[0],
      last_initial: _.last(name.split(' '))[0],
      domain: prospect.company.domain
    }
    pattern = (pattern[0]) ? pattern[0].pattern : ""
    prospect_email = Mustache.render(pattern, vars).toLowerCase()
    //console.debug('PROSPECT EMAIL')
    //console.debug(prospect_email)
    return <ReadOnlyForm icon="envelope" value={prospect_email}/>
  },

  realtimeCompanyInfo: function() {
    var _this = this;
    channel.bind(this.state.prospect.company_name.replace(' ','-'), function(data) {
      _prospect = _this.state.prospect; _prospect.company = data.company;
      _this.setState({prospect: _prospect})
      console.log(data.company)
      console.log('no listening for email')
      if(_prospect.company.email_pattern){
         _this.setState({loading: false}) 
      } else {
        console.log('binding for email pattern')
        console.log(data.company.domain)
        _this.realtimeEmailPattern(data.company.domain)
      }
    });
  },

  realtimeEmailPattern: function(domain) {
    var _this = this;
    channel.bind(domain, function(data) {
      // add email pattern
      console.log('got email pattern')
      console.log(data)
      console.log(_this.state.prospect)
      _prospect = _this.state.prospect
      if(_prospect.company)
        _prospect.company.email_pattern = data.email_pattern
      else
        _prospect.company= {'email_pattern': data.email_pattern}

      _this.setState({prospect: prospect})
      _this.setState({loading: false})
    })
  },

  componentDidMount: function() { 
    //TODO - start if loading is true 
    //if(this.state.loading){
      if(this.state.prospect.company)
        this.realtimeEmailPattern(this.state.prospect.company.domain)
      else
        this.realtimeCompanyInfo(this.state.prospect.company_name)
    //}
  },

  _keyboardShortcuts: function() {
    keyboardSelected = {borderLeft:'7px solid rgba(0,0,0,0)'}
    thissss = this
    if(this.props.keyboardSelected) {
      keyboardSelected = {borderLeft:'7px solid #0096ff !important'}
      Mousetrap.unbind('x')
      Mousetrap.bind('x', function() { 
        thissss.keyboardClick()
        if(thissss.state.checked)
          console.log("lmao")
      });
    }
  },

  render: function() {
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

    checked        = this.state.checked || this.props.alreadyChecked
    color = (checked) ? {backgroundColor: '#eef8ff'} : {}
    infoColor = (checked) ? {backgroundColor: '#eef8ff',paddingBottom:2} : {paddingBottom:2}
    checkboxColor = (checked) ? {backgroundColor: '#eef8ff',verticalAlign:'middle'} : {verticalAlign:'middle'}
    company = (prospect.company) ? prospect.company : {}
    prospect_email = <ReadOnlyForm disabled={true} icon="envelope" value={"No Email Found"}/>
    if(company.email_pattern)
      if(company.email_pattern.length)
        prospect_email = this._make_email(prospect.name, company.email_pattern)

    //console.log(prospect.name)
    if(prospect.name == "LinkedIn Member" || _.last(prospect.name) == ".")
      prospect_email = <ReadOnlyForm disabled={true} icon="envelope" 
                                     value={"Ambiguous Name"}/>
    prospect_email = (this.state.loading) ? <LoadingLabel /> : prospect_email
    if(!this.props.prospect.company_name.length)
        prospect_email = ""

    if(company.phone && company.phone != "null")
      phone = <div style={{display:'block',paddingTop:2}}><ReadOnlyForm icon="phone" value={company.phone}/></div> 
    else 
      phone = ""

    company_size   = (this.state.loading) ? <LoadingLabel /> : ""
    if(company.headcount){ 
      company_size = prospect.company.headcount+" employees" 
    }

    if(company.address)
      city = (company.address) ? company.address.normalizedLocation : prospect.locale
    else if(prospect.locale != "" && prospect.locale)
      city = prospect.locale
    else if(_.isEqual(company, {}))
      city = <LoadingLabel />
    else
      city = ""

    company_url = (company.domain) ? <ShinyButton icon={"globe"} link={"http://"+company.domain} /> : ""
    position    = (prospect.title) ? prospect.title.trim() : ""

    prospect_company_name = prospect.company_name
    prospect_name = prospect.name
    if(!this.state.prospect.loading){
      if(typeof(prospect.company_name) == "undefined" || prospect.company_name == "" || prospect.company_name == "not_found")
        prospect_company_name = <UserUpdateForm updateProspect={this.updateProspect} var="company_name" prospect={this.state.prospect} formText="Enter Company Name."/> 
      if(typeof(prospect.name) == "undefined" || prospect.name == "LinkedIn Member")
        prospect_name = <UserUpdateForm updateProspect={this.updateProspect} var="name" formText="Enter Full Name."/> 
      if(typeof(position) == "undefined" || position == "")
        position = <UserUpdateForm updateProspect={this.updateProspect} var="pos" prospect={this.state.prospect} formText="Enter Title."/> 
    }
    if(this.state.editMode){
        pcn = prospect_company_name; pn = prospect_name; pos = position;
        pcn = (pcn != "" && pcn) ? pcn : "Enter Company Name."
        pn  = (pn != "" && pn) ? pn : "Enter Full Name."
        pos = (pos != "" && pos) ? pos : "Enter Title."
        prospect_company_name = <UserUpdateForm updateProspect={this.updateProspect} var="company_name" prospect={this.state.prospect} value={pcn} single={1}/> 
        prospect_name = <UserUpdateForm updateProspect={this.updateProspect} var="name" value={pn} single={1}/> 
        position = <UserUpdateForm updateProspect={this.updateProspect} var="pos" prospect={this.state.prospect} value={pos} single={1}/> 
    }
    if(!this.props.prospect.company_name.length)
        prospect_company_name = <UserUpdateForm updateProspect={this.updateProspect} var="company_name" prospect={this.state.prospect} formText={"Enter Company Name"} /> 

    liProfileSimilars = (prospect.linkedin_url) ? <a onClick={this.openSimilars} style={{marginLeft:5, float:'right'}} href="javascript:" className="btn btn-xs btn-primary btn-gradient similar_link"> <i className="fa fa-copy" style={{fontWeight:'bold'}}/></a> : ""
    
    if(typeof(prospect_name) == "string")
      if(prospect_name.indexOf(".") != -1 || prospect_name == "LinkedIn Member")
        prospect_name = <span>{prospect_name}<button className="btn btn-xs btn-default" style={{marginLeft:5,marginTop:-4,width:25,fontSize:11,lineHeight:1}} onClick={this.searchProspect}> <i className="fa fa-search"/></button></span>

    optionsMenu = <div style={{fontSize:10, cursor:'pointer',height:20,marginTop:-20}}>
            <a className="text-muted" onClick={this.toggleEditMode}>
              <i className={(this.state.editMode) ? "fa fa-check" : "fa fa-pencil"}/>
            </a>
            <a className="text-muted" onClick={this.searchProspect} style={{marginTop:5}}>
              <i className="fa fa-search"/>
            </a>
            <a className="text-muted" onClick={this.archiveProspects}
              style={{marginTop:5}}>
              <i className="fa fa-archive"/>
            </a>
            </div>
          
    keyboardSelected = {borderLeft:'7px solid rgba(0,0,0,0)'}
            //keyboardSelected = {}
    //
    if(this.props.keyboardSelected) {
      keyboardSelected = {borderLeft:'7px solid #0096ff !important'}
    }
    

    return (
      <tr className="prospects-tr"
          onClick={this.rowClick}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          style={keyboardSelected}>
          <td style={checkboxColor}>
              <input type="checkbox" 
                     onChange={this.clickCheck} 
                     style={{lineHeight:'normal',marginTop:-8,height:17}}
                     checked={checked}/>
          </td>
          <td style={checkboxColor}>
            {(this.state.mouseOver) ? optionsMenu : <div style={{height:20}}>&nbsp;&nbsp;&nbsp;</div>}
          </td>
          <td style={checkboxColor}>
           {(this.state.loading) ? <LoadingPulse /> : ""}
           {(!this.state.loading && this.state.initialLoading) ? <i className="fa fa-check-circle " style={{color:'rgb(0, 122, 265)',paddingLeft:6,}}/> : ""}
          </td>
          <td style={color} className="fixed-data-column">
            <span style={{fontWeight:'bold'}}>{prospect_name}</span>
            <h6 style={{fontWeight:'400',margin:'0px'}}> {position} </h6>
          </td>
          <td style={color} className="fixed-data-column">
            <span style={{fontWeight:'bold'}}> {prospect_company_name} </span>
            <h6 style={{fontWeight:'400',margin:'0px'}} className="company-size">
            {company_size}
            </h6>
            <h6 style={{fontWeight:'400',margin:'0px',display:'none',fontStyle:'italic'}} 
                className="company-size">
              {(prospect.industry) ? prospect.industry : ""}
            </h6>
          </td>

          <td style={color}>
            <h6 style={{margin:'0px'}}>{city}</h6></td>
          <td style={infoColor}> {prospect_email} {phone} </td>
          <td style={color}>
            <div style={{width:92,paddingTop:5,height:5}}>
              <a href="javascript:" 
                onClick={this.openLinkedinProfile} 
                className="btn btn-xs btn-primary btn-gradient linkedin_link" 
                style={{float:'right',marginLeft:5}}>
                <i className="fa fa-linkedin-square" /></a>
              &nbsp; &nbsp;
              {liProfileSimilars}
              {company_url}
            </div>
          </td>
        </tr>
    );
  },

  searchProspect: function(e) {
    e.preventDefault()
    e.stopPropagation()
    url = "http://www.google.com/#q="
    prospect = this.state.prospect
    name = (prospect.name != "LinkedIn Member") ? prospect.name : ""
    args = '-inurl:"/dir/" -inurl:"/find/" -inurl:"/updates"'
    if(name == "" && prospect.company_name != "not_found")
      linkedin = '"at '+prospect.company_name+'" site:linkedin.com '+args
    else
      linkedin = " site:linkedin.com/in/ OR site:linkedin.com/pub/ -site:linkedin.com/pub/dir/"
    window.open(url+name+" "+prospect.company_name+" "+prospect.title+linkedin)
  },

  archiveProspects: function() {
    console.log(this.getDOMNode())
    //$(this.getDOMNode()).click()
    this.props.archiveProspects([this.state.prospect.objectId])
  },

  toggleEditMode: function(e) {
    e.stopPropagation()
    this.setState({editMode: !this.state.editMode})
  },

  openTest: function() {
    e.stopPropagation()
  },

  openLinkedinProfile: function(e) {
    window.open(this.state.prospect.linkedin_url)
    e.stopPropagation()
  },

  emailInputClick: function(e) {e.stopPropagation() },

  openSimilars: function(e) {
    // TODO - move to backend
    console.log('similars')
    if(this.state.prospect.linkedin_url.indexOf('profile') != -1){
      urlargs = this.state.prospect.linkedin_url.split('?')[1].split('&')
      args = []
      for(i=0;i< urlargs.length; i++)
        args.push(urlargs[i].split('='))
      args = _.object(args)
    }
    window.open("https://www.linkedin.com/vsearch/p?pivotType=sim&pid="+args.id)
    e.stopPropagation()
  },

  deleteProspect: function() {
    this.props.deleteProspect(this.state.prospect.objectId, 'Prospect')
  },
  
  updateProspect: function(prop, value) {
    prospect = this.state.prospect
    prospect[prop] = value
    this.setState({prospect: prospect})
  },
  
  refresh: function(e) {
    e.preventDefault()
    e.stopPropagation()
    prospect = this.state.prospect
    console.log(prospect)

    $.ajax({
      //url:'https://nameless-retreat-3525.herokuapp.com/profile_detail',
      url:'http://127.0.0.1:5000/profile_detail',
      type:'GET',
      dataType:'json',
      data: prospect,
      //headers:appConfig.headers,
      success: function(res) { console.log(res)},
      error: function(err) { console.log(err.responseText) }
    })
  },
});

var UserUpdateForm = React.createClass({
  getInitialState: function() {
    return {
      submitted: false,
      value: this.props.value
    }
  },

  formClick: function(e) { e.stopPropagation() },

  submitForm: function(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.updateProspect(this.props.var, $(e.target).find('input').val())
    this.setState({submitted: true})
    prospect = this.props.prospect
    prospect[this.props.var] = $(e.target).find('input').val()

    // persist
    data = {}
    varr = this.props.var
    val = $(e.target).find('input').val()
    data[varr] = val
    objectId = this.state.prospect.objectId

    $.ajax({
      //url:'https://nameless-retreat-3525.herokuapp.com/profile_detail',
      url:'http://127.0.0.1:5000/profile_detail',
      data: prospect,
      //headers:appConfig.headers,
      success: function(res) { console.log(res)},
      error: function(err) { console.log(err.responseText) }
    })

    /*
    $.ajax({
      url:'https://api.parse.com/1/classes/Prospect/'+objectId,
      type: 'PUT',
      data: JSON.stringify(data),
      headers: appConfig.headers,
      success: function(res) { console.log(res) 
        // sent current prospect state as data to 
        $.ajax({
          url:'https://nameless-retreat-3525.herokuapp.com/profile_detail',
          data: prospect,
          headers:appConfig.headers,
          success: function(res) { console.log(res)},
          error: function(err) { console.log(err.responseText) }
        })
      },
      error: function(err) { console.log(err.responseText) }
    })
    */
  },

  handleChange: function(event) {
    console.log(event.target.value)
    this.setState({value: event.target.value});
  },

  render: function() {
    //"Enter Website."
    btn = (this.state.submitted) ? "btn btn-xs btn-success" : "btn btn-xs btn-default"
    single = {display:'inline', width:22, marginLeft:5}
    single.display = (this.props.single) ? 'none' : 'inline'
    input = {width:'100%', display:'inline', height:24, marginBottom:6}
    input.width = (this.props.single) ? '100%' : '70%'
    return (
      <form onClick={this.formClick} onSubmit={this.submitForm} >
        <input style={input}
          type="text" className="form-control input-sm" 
          disabled={this.state.submitted}
          onChange={this.handleChange}
          value={this.state.value}
          placeholder={this.props.formText} />
        <button type="submit" className={btn}
          style={single}>
          <i className="fa fa-check" /></button>
      </form>
    )
  },

  profileSearch: function(e) {
    e.preventDefault()
    url = "http://www.google.com/#q="
    prospect = this.state.prospect
    name = (prospect.name != "LinkedIn Member") ? prospect.name : ""
    args = '-inurl:"/dir/" -inurl:"/find/" -inurl:"/updates"'
    if(name == "" && prospect.company_name != "not_found")
      linkedin = '"at '+prospect.company_name+'" site:linkedin.com '+args
    else
      linkedin = " site:linkedin.com/in/ OR site:linkedin.com/pub/ -site:linkedin.com/pub/dir/"
    window.open(url+name+" "+prospect.company_name+" "+prospect.pos+linkedin)
  },

  websiteSearch: function(e) {
    e.preventDefault()
    url = "http://www.google.com/#q="
    window.open(url+this.state.prospect.company_name+" site:linkedin.com/company")
  },

  _make_email: function(name, pattern) {
    name = name.trim()
    vars = {
      first_name: _.first(name.split(' ')),
      last_name: _.last(name.split(' ')),
      first_initial: _.first(name.split(' '))[0],
      last_initial: _.last(name.split(' '))[0],
      domain: prospect.company.domain
    }
    pattern = (pattern) ? pattern[0].pattern : ""
    prospect_email = Mustache.render(pattern, vars).toLowerCase()
    //console.debug('PROSPECT EMAIL')
    //console.debug(prospect_email)
    return <ReadOnlyForm icon="envelope" value={prospect_email}/>

    if(prospect_email) {
        prospect_email = (prospect_email) ? prospect_email.toLowerCase() : ""
        prospect_email = <input onClick={this.emailInputClick} type="text" value={prospect_email} className="form-control form-sm" style={{fontSize:12, width:160, height:22, marginTop: 0}}/>
        prospect_email = <div className="input-group input-group-xs">
          <span className="input-group-addon" id="sizing-addon3" style={{paddingTop:2,paddingBottom:2}}>
            <i className="fa fa-envelope"/>
          </span>
          {prospect_email}
        </div>
    }
    return email
  },
})

var ReadOnlyForm = React.createClass({
  render: function() {
    style = {fontSize:12, width:'70%', height:22, marginTop: 0, zIndex:1,cursor:'default'}

    style.fontStyle = (this.props.disabled) ? 'italic' : ''
    return (
      <div className="input-group input-group-xs" style={{display:'inline-block'}}>
        <span className="input-group-addon" id="sizing-addon3" 
          style={{paddingTop:2,paddingBottom:2,display:'inline-block',
                  height:22,width:37,float:'left',marginTop:0}}>
          <i className={"fa fa-"+this.props.icon} />
        </span>
          <input disabled={this.props.disabled} onClick={this.emailInputClick} type="text" value={this.props.value} className="form-control form-sm" style={style}/>
      </div>
    )
  },
  emailInputClick: function(e) {
    e.stopPropagation()
  }
})

var LoadingLabel = React.createClass({
  render: function() {
    return (
        <label className="label label-primary" style={{backgroundColor: 'rgb(0, 122, 265)'}}>Loading...</label>
    )
  }   
})

var WarningLabel = React.createClass({
  render: function() {
    return (
        <label className="label label-warning" style={{display:'block',width:'90%'}}>Warning...</label>
    )
  }   
})

var ShinyButton = React.createClass({
  openLink: function(e) {
    e.stopPropagation()
    window.open(this.props.link)
  },

  render: function() {
    return (
      <a href="javascript:" 
         onClick={this.openLink}
         className="btn btn-xs btn-primary btn-gradient" 
         style={{marginLeft:-5, float:'right'}}>
       <i className="fa fa-globe" />
      </a>
    )
  }
})

var LoadingPulse = React.createClass({
  render: function() {
    return (
      <div className="profile-loading" style={{marginTop:0}}>
        <div className="double-bounce1" style={{backgroundColor:'rgb(0, 122, 265)'}}></div>
        <div className="double-bounce2" style={{backgroundColor:'rgb(0, 122, 265)'}}></div>
      </div>
    )
  }
})
