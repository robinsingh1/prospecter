/** @jsx React.DOM */

module.exports = React.createClass({
  checkboxAction: function(e) {
    checkboxVal = $(e.target).is(':checked')
    checkboxes = _.rest($('body').find('input[type="checkbox"]'))
    console.log(checkboxes)
    if(checkboxVal){
      _.map(checkboxes, function(checkbox){
        if(!$(checkbox).prop('checked'))
          $(checkbox).click()
      })
      
    } else {
      _.map(checkboxes, function(checkbox){
        if($(checkbox).prop('checked'))
          $(checkbox).click()
      })
    }
  },

  componentDidMount: function() {

  },

  render: function() {
    return (
            <tr>
              <th style={{paddingLeft:11}}>
                <input type="checkbox" onChange={this.checkboxAction}/>
              </th>
              <th style={{width:20}}></th>
              <th></th>
              <th>Name</th>
              <th >Company</th>
              <th style={{width:'170px'}}>City</th>
              <th style={{width:300}}>Email</th>
              <th>&nbsp;</th>
            </tr>
    );
  }
});
