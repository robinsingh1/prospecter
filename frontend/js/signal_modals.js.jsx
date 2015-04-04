var CreateHiringSignalModal = require('./create_hiring_signal_modal.js.min.js')
var CreateFundingSignalModal = require('./create_funding_signal_modal.js.min.js')
var CreateProspectProfileModal = require('./create_prospect_profile_modal.js.min.js')
var CreateCompanyProfileModal = require('./create_company_profile_modal.js.min.js')
var CreateTerritoryStrategyModal = require('./create_territory_strategy_modal.js.min.js')
var CreateMiningJobModal = require('./create_mining_job_modal.js.min.js')

module.exports = React.createClass({
  addProfile: function() {
    this.props.addProfile(newProfile)
  },

  render: function() {
    return (
      <div>
        <CreateMiningJobModal createMiningJob={this.createMiningJob}
                              currentProfile={this.state.currentProfile}/>
        <CreateHiringSignalModal addProfile={this.addProfile}/>
        <CreateFundingSignalModal addProfile={this.addProfile}/>
        <CreateCompanyProfileModal addProfile={this.addProfile}/>
        <CreateProspectProfileModal addProfile={this.addProfile} 
                      updateProfileWithObjectId={this.updateProfileWithObjectId}/>
        <CreateTerritoryStrategyModal addProfile={this.addProfile} 
                      updateProfileWithObjectId={this.updateProfileWithObjectId}/>
      </div>
    )
  }
})
