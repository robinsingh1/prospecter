/** @jsx React.DOM */

module.exports = React.createClass({
  // Campaigns
  getInitialState: function() {
    return {
      selectedScreen: 'Overview'
    }
  },
  toggleScreen: function() {
    this.props.toggleScreen('CampaignDetail')
  },
  render: function() {

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <th></th>
            <th>Campaign Name</th>
            <th>Prospect List</th>
            <th style={{textAlign:'center'}}>Opened</th>
            <th style={{textAlign:'center'}}>Replied</th>
            <th style={{textAlign:'center'}}>Link Clicks</th>
            <th style={{textAlign:'center'}}>Bounces</th>
            <th style={{width:150,textAlign:'center'}}>
              Status
            </th>
          </thead>
          <tbody>
            <tr style={{cursor:'pointer'}} onClick={this.toggleScreen}>
              <td></td>
              <td>
                <h6>
                  VP of Business Development Outreach
                </h6>
              </td>
              <td>
                <h6>
                  VP of Business Developments
                </h6>
              </td>
              <td style={{textAlign:'center',padding:12}}>
                <span className="label label-success">100%</span>
              </td>
              <td style={{textAlign:'center',padding:12}}>
                <span className="label label-info">100%</span>
              </td>
              <td style={{textAlign:'center',padding:12}}>
                <span className="label label-primary">18%</span>
              </td>
              <td style={{textAlign:'center',padding:12}}>
                <span className="label label-danger">11%</span>
              </td>
              <td style={{textAlign:'center',padding:12}}>
                <h4 style={{margin:0}}>
                  <span className="label label-success">Ready</span>
                </h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

