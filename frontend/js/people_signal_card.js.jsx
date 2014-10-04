

module.exports = React.createClass({
  // SignalCard
  prospectPerson: function() {
    // Add To Signal List
    // Add Company
    // Add Prospect
    person = this.props.person
    personId = person.objectId
    company = this.props.person.company
    companyId = company.objectId
    person.signalId = person.signalId
    company.signalId = company.objectId
    p = person; c = company;
    delete p.objectId; delete c.objectId;
    delete p.className; delete c.className;
    delete p.__type; delete c.__type;
    delete p.createdAt; delete c.createdAt;
    delete p.updatedAt; delete c.updatedAt;
    p.companySignal = p.company
    delete p.company

    p.linkedin_url = p.url
    p.company = JSON.parse(localStorage.currentUser).company
    p.archived = true
    p.loading = true
    p.city = p.title.split('-')[0]
    p.pos = p.title.split('-').slice(-1)[0].split(' at ')[0]
    p.company_name = p.title.split('-').slice(-1)[0].split(' at ').slice(-1)[0] 
    name = p.link_text.split('|')[0]
    name = name.split('-')[0]
    p.name = name
    p.websiteUrl = company.websiteUrl
    // Automatically Add To The Signal List It Belongs To
    
    console.log(this.props.profile)
    p.lists = [{'__type':'Pointer','className':'ProspectList','objectId':this.props.profile.prospect_list.objectId}] 

    $.ajax({
      url:'https://api.parse.com/1/classes/Prospects',
      type:'POST',
      headers:appConfig.headers,
      data:JSON.stringify(p),
      success: function(res) {
        console.log(res)
         $.ajax({
          url:'https://api.parse.com/1/classes/PeopleSignal/'+personId,
          type:'PUT',
          headers:appConfig.headers,
          data: JSON.stringify({prospectId: res.objectId, prospected_on: Date.now()/1000}),
          success:function(res) { console.log(res) },
          error: function() { }
         })
      },
      error: function(err) { }
    })

    //Create Company Prospect with Pointer to CompanySignal
    $.ajax({
      url:'https://api.parse.com/1/classes/CompanyProspects',
      type:'POST',
      headers:appConfig.headers,
      data:JSON.stringify(c),
      success: function(res) {
        //Update Company Signal With Pointer to Company Prospect and date prospected
        console.log(res)
         $.ajax({
           url:'https://api.parse.com/1/classes/CompanySignal/'+companyId,
          type:'PUT',
          headers:appConfig.headers,
          data: JSON.stringify({prospectId: res.objectId, prospected_on: Date.now()/1000}),
          success:function(res) { console.log(res) },
          error: function(err) { }
         })
      },
      error: function(err) { }
    })
  },

  render: function() {
    person = this.props.person
    signal = (person.signals) ? person.signals[0] : {}
    
    return (
      <div className="panel panel-default signal-card">
        <div className="panel-body" style={{paddingLeft:25, paddingRight:25}}>
          <h4 >
            {person.title}
          </h4>
          <h6 style={{display:'inline-block',width:'100%'}}>
            <span style={{ float:'left',maxWidth: '60%', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'}}>
              {person.link_text}</span>
          </h6>
        <div id="signal-stuff" 
            style={(_.isEqual(signal, {})) ? {display:'none'} : {display:'block'}}>
          <h6> <i className="fa fa-building" />
            &nbsp; {signal.company}</h6>
          <h6> <i className="fa fa-map-marker" />
            &nbsp; {signal.location}</h6>
          <h6> <i className="fa fa-suitcase" />
            &nbsp;{signal.job_title} </h6>
        </div>

          <a href="javascript:" className="btn btn-success"
            onClick={this.prospectPerson}
            style={{float:'right',marginTop:15, fontWeight:'bold',width:'100%'}}> 
            Prospect This Person</a>
        </div>
      </div>
    );
  }
});
