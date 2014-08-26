/** @jsx React.DOM */

module.exports = React.createClass({
  checkboxAction: function(e) {
    checkboxVal = $(e.target).is(':checked')
    this.props.masterCheckboxChanged(checkboxVal)
  },

  componentDidMount: function() {

  },

  render: function() {
    return (
            <tr>
              <th><input type="checkbox" onChange={this.checkboxAction}/></th>
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
