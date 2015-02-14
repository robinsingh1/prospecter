
module.exports = React.createClass({
  //CompanyDetail
  getInitialState: function() {
    return {
      currentScreen:"press",
    }
  },

  changeScreen: function() {
  },

  toggleDetailMode: function() {
    console.log("detail mode")
    this.props.toggleDetailMode()
  },

  getData: function() {
    company = this.props.detailCompany
    qry = {company_name: company.company_name}
    var _this = this;
    Parse._get('CompanyBlogPost', qry).done(function(res) {
      _this.setState({blog_posts: res.results})
    })
    Parse._get('CompanyTechnology', qry).done(function(res) {
      _this.setState({technologies: res.results})
    })
    Parse._get('CompanyPressRelease', qry).done(function(res) {
      _this.setState({press_releases: res.results})
    })
    Parse._get('CompanyGlassdoorReview', qry).done(function(res) {
      _this.setState({reviews: res.results})
    })
    Parse._get('CompanyEmployee', qry).done(function(res) {
      _this.setState({employees: res.results})
    })
    Parse._get('CompanySimilar', qry).done(function(res) {
      _this.setState({similar: res.results})
    })
    Parse._get('CompanyHiring', qry).done(function(res) {
      _this.setState({hiring: res.results})
    })
    Parse._get('CompanyNews', qry).done(function(res) {
      _this.setState({news: res.results})
    })
  },

  changeScreen: function(e) {
    this.setState({currentScreen: $(e.target).text().toLowerCase()})
  },

  render: function() {
    console.log(this.props.detailCompany)
    console.log(this.state.currentScreen)
    this.getData()

    tab_1 = "campaign-tab-link"
    tab_2 = "campaign-tab-link"
    tab_3 = "campaign-tab-link"
    tab_4 = "campaign-tab-link"
    tab_5 = "campaign-tab-link"
    if(this.state.currentScreen == "press")
      screen = <CompanyPress />
    else if(this.state.currentScreen == "news")
      screen = <CompanyNews />
    else if(this.state.currentScreen == "blog posts")
      screen = <CompanyBlogPosts />
    else if(this.state.currentScreen == "hiring")
      screen = <CompanyHiring />
    else if(this.state.currentScreen == "employees")
      screen = <CompanyEmployees />
    else if(this.state.currentScreen == "similar")
      screen = <CompanySimilar />
    else if(this.state.currentScreen == "technologies")
      screen = <CompanyTechnology />
    return (
      <div>
        <div className="company_detail_overlay" onClick={this.toggleDetailMode}> </div>
      <div className="company_detail_mode"> 
    <div className="row">
      <div className="col-md-2">
      <div style={{backgroundImage: "url("+company.logo+")",height:100,width:100,marginLeft:10,marginTop:10}} 
          className="company-img-thumbnail"/>
      </div>
      <div className="col-md-3" style={{paddingRight:0,paddingLeft:28,paddingTop:8}}>
        <h4 style={{fontWeight:"bold",fontSize:14}}>{company.name}</h4>
        <h6 style={{fontWeight:"bold"}}>{company.industry}</h6>
        <h6 style={{fontWeight:"bold"}}>{company.headcount}</h6>
        <h6 style={{fontWeight:"bold"}}>{company.city}</h6>
      </div>
      <div className="col-md-7">
        <p className="lead" style={{marginTop:10,fontSize:12,height:100,overflow:'auto'}}>{company.description}</p>
      </div>
    </div>


              <ul className="nav nav-tabs campaign-tabs detail-tab" role="tablist" style={{paddingRight:0}}>
                <li className="campaign-tab"> <a onClick={this.changeScreen} href="javascript:" className={tab_1}>Press</a></li>
                <li className="campaign-tab" ><a onClick={this.changeScreen} href="javascript:" className={tab_2}>News</a></li>
                <li className="campaign-tab" >
                  <a onClick={this.changeScreen} href="javascript:" className={tab_3} style={{fontSize:12}}>
                    Blogs</a></li>
                <li className="campaign-tab"><a onClick={this.changeScreen} href="javascript:" className={tab_4}>Hiring</a></li>
                <li className="campaign-tab"><a onClick={this.changeScreen} href="javascript:" className={tab_5}>Employees</a></li>
                <li className="campaign-tab"><a onClick={this.changeScreen} href="javascript:" className={tab_5}>Similar</a></li>
                <li className="campaign-tab"><a onClick={this.changeScreen} href="javascript:" className={tab_5}>Technologies</a></li>
              </ul>
      {screen}
      </div>
      </div>
    )
  }
});

var CompanyPress = React.createClass({
  render: function() {
    return (
      <div>
        Press
      </div>
    )
  }
})

var CompanyNews = React.createClass({
  render: function() {
    return (
      <div>
        Press
      </div>
    )
  }
})

var CompanyBlogPosts = React.createClass({
  render: function() {
    return (
      <div>
        Press
      </div>
    )
  }
})
var CompanyHiring = React.createClass({
  render: function() {
    return (
      <div>
        Press
      </div>
    )
  }
})
var CompanyEmployees = React.createClass({
  render: function() {
    return (
      <div>
        Press
      </div>
    )
  }
})
var CompanySimilar = React.createClass({
  render: function() {
    return (
      <div>
        Press
      </div>
    )
  }
})
var CompanyTechnology = React.createClass({
  render: function() {
    return (
      <div>
        Press
      </div>
    )
  }
})
