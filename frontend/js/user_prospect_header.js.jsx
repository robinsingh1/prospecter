/** @jsx React.DOM */

module.exports = React.createClass({
  checkboxAction: function(e) {
    checkboxVal = $(e.target).is(':checked')
    checkboxes = _.rest($('body').find('input[type="checkbox"]'))
    console.log(checkboxes)
    if(checkboxVal){
      // make sure all checkboxes are checked
      _.map(checkboxes, function(checkbox){
        if(!$(checkbox).prop('checked'))
          $(checkbox).click()
      })
      
    } else {
      // make sure all checkboxes are unchecked
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
              <th>Name</th>
              <th >Company</th>
              <th style={{width:'170px'}}>City</th>
              <th>Email</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
    );
  }
});
