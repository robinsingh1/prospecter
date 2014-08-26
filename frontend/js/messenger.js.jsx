/** @jsx React.DOM */

module.exports = React.createClass({
  //Messenger
  render: function() {
    return (
        <div className="alert alert-success" 
             data-alert="alert" 
             style={{position:'absolute',
                     top: 31, 
                     right:30, 
                     display:'none',
                     width:200}}>
                     <a className="close" 
                       href="javascript:" 
                       onClick={this.hideAlert}>&times;</a>
            Test
        </div>
    );
  }
});
