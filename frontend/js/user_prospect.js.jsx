/** @jsx React.DOM */

module.exports = React.createClass({
  // UserProspect
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
            <h6 style={{fontWeight:'400',margin:'0px'}}>
              {(prospect.pos) ? prospect.pos.trim() : ""}
            </h6>
          </td>
          <td style={color}
              className="fixed-data-column">
            <span style={{fontWeight:'bold'}}>
              {prospect.company_name}
            </span>
            <h6 style={{fontWeight:'400',margin:'0px'}}>
              {(prospect.employeeCountRange) ? prospect.employeeCountRange.name + " employees" : ""}
            </h6>
          </td>

          <td style={color}>
            <h6 style={{margin:'0px'}}>{prospect.city}</h6></td>
          <td style={color}>
            <a href={"mailto:"+prospect.email} style={{margin:'0px'}}>
            {(prospect.email) ? prospect.email.toLowerCase() : ""}
          </a></td>
          <td style={color}>{this.props.li}&nbsp;{this.props.link}</td>
          <td style={color}>
            {websiteBtn}
          </td>
        </tr>
    );
  },

  deleteProspect: function() {
    this.props.deleteProspect(this.props.prospect.objectId, 'Prospect')
  }
});

