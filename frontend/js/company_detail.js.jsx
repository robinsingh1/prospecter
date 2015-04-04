
module.exports = React.createClass({
  //CompanyDetail
  getInitialState: function() {
    return {
      currentScreen:"press",
      press: [],
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
    console.log(company.company_name)
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
    this.setState({currentScreen: $(e.target).text().toLowerCase().trim()})
  },

  componentDidUpdate: function() {
    //this.getData()
  },

  componentWillReceiveProps: function() {
    this.getData()
  },

  componentDidMount: function() {
    this.getData()
  },

  render: function() {
    //console.log(this.state)
    tab_1 = "campaign-tab-link"
    tab_2 = "campaign-tab-link"
    tab_3 = "campaign-tab-link"
    tab_4 = "campaign-tab-link"
    tab_5 = "campaign-tab-link"

    if(this.state.currentScreen == "press")
      the_screen = <CompanyPress press={this.state.press}/>
    else if(this.state.currentScreen == "news")
      the_screen = <CompanyNews news={this.state.news}/>
    else if(this.state.currentScreen == "blogs")
      the_screen = <CompanyBlogPosts blog_posts={this.state.blog_posts}/>
    else if(this.state.currentScreen == "hiring")
      the_screen = <CompanyHiring hiring={this.state.hiring}/>
    else if(this.state.currentScreen == "employees")
      the_screen = <CompanyEmployees employees={this.state.employees}/>
    else if(this.state.currentScreen == "similar")
      the_screen = <CompanySimilar similar={this.state.similar}/>
    else if(this.state.currentScreen == "tech")
      the_screen = <CompanyTechnology technologies={this.state.technologies}/>
    else if(this.state.currentScreen == "reviews")
      the_screen = <CompanyReviews reviews={this.state.reviews}/>
    else 
      the_screen = "lol"
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
                <li className="campaign-tab"><a onClick={this.changeScreen} href="javascript:" className={tab_5}>Tech</a></li>
                <li className="campaign-tab"><a onClick={this.changeScreen} href="javascript:" className={tab_5}>Reviews</a></li>
              </ul>
      {the_screen}
      </div>
      </div>
    )
  }
});

var CompanyReviews = React.createClass({
  componentDidUpdate: function() {
    console.log(this.props.reviews)
  },
  render: function() {
    review_rows = ""
    review_rows = _.map(this.props.reviews, function(review) {
            return <tr>
              <td> {review.extra} </td>
              <td>{review.pros}</td>
              <td>{review.cons}</td>
              <td>{review.summary}</td>
            </tr>
          })
    return (
      <div style={{height:304,overflow:'auto'}}>
        <table className="table table-striped">
          <thead>
            <th>Info</th>
            <th>Pros</th>
            <th>Cons</th>
            <th>Summary</th>
          </thead>
          <tbody>
            {review_rows}
          </tbody>
        </table>
      </div>
    )
  }
})

var CompanyPress = React.createClass({
  componentDidUpdate: function() {
    console.log(this.props.press)
  },
  render: function() {
    press_rows = ""
    press_rows = _.map(this.props.press, function(technology) {
            return <tr>
              <td>
              <div style={{backgroundImage: "url("+technology.logo+")",height:20,width:20,marginLeft:10,marginTop:10}} className="company-img-thumbnail"/>
              </td>
              <td>{technology.tech_name}</td>
              <td>{technology.tech_desc}</td>
            </tr>
          })
    press_rows = (press_rows.length) ? press_rows : <EmptyInfoPanel />
    return (
      <div style={{height:304,overflow:'auto'}}>
        <table className="table table-striped">
          <thead>
            <th></th>
            <th>Name</th>
            <th>Description</th>
          </thead>
          <tbody>
            {press_rows}
          </tbody>
        </table>
      </div>
    )
  }
})

var EmptyInfoPanel = React.createClass({
  render: function() {
    return (
      <div style={{position:'absolute',top:250,left:50}}>
        <h1 className="text-muted" style={{fontWeight:'bold',color:'#ccc'}}>
          <i className="fa fa-search" /> &nbsp;
          Unable to find information
        </h1>
      </div>
    )
  },
})


var CompanyNews = React.createClass({
  render: function() {
    news_rows = <EmptyInfoPanel />
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <th></th>
            <th>Name</th>
            <th>Description</th>
          </thead>
          <tbody>
            {news_rows}
          </tbody>
        </table>
      </div>
    )
  }
})
var CompanyBlogPosts = React.createClass({
  render: function() {
    rows = ""
    rows = _.map(this.props.blog_posts, function(blog) {
            return <tr>
              <td>
                <a href={blog.link}>{blog.link_text}</a>
              </td>
              <td>{blog.link_span}</td>
            </tr>
          })
    rows = (rows.length) ? rows : <EmptyInfoPanel />
    return (
      <div style={{height:304,overflow:'auto'}}>
        <table className="table table-striped">
          <thead>
            <th>Blog Post</th>
            <th>Description</th>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
});

var CompanyHiring = React.createClass({
  render: function() {
    hiring_rows = ""
    hiring_rows = _.map(this.props.hiring, function(hiring) {
            return <tr>
              <td>{hiring.date}</td>
              <td>{hiring.job_title}</td>
              <td>{hiring.location}</td>
              <td>{hiring.summary}</td>
            </tr>
          })

    hiring_rows = (hiring_rows.length) ? hiring_rows : <EmptyInfoPanel />
    return (
      <div style={{height:304,overflow:'auto'}}>
        <table className="table table-striped">
          <thead>
            <th>Date</th>
            <th>Job Title </th>
            <th>Location </th>
            <th>Summary</th>
          </thead>
          <tbody>
            {hiring_rows}
          </tbody>
        </table>
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
    similar_rows = ""
    similar_rows = _.map(this.props.similar, function(similar) {
            return <tr>
              <td>
                <a href={similar.link}>
                  {similar.title}</a>
              </td>
              <td>{similar.description}</td>
            </tr>
          })
    return (
      <div style={{height:304,overflow:'auto'}}>
        <table className="table table-striped">
          <thead>
            <th>Title </th>
            <th>Description </th>
          </thead>
          <tbody>
            {similar_rows}
          </tbody>
        </table>
      </div>
    )
  }
})
var CompanyTechnology = React.createClass({
  render: function() {
    tech_rows = ""
    tech_rows = _.map(this.props.technologies, function(technology) {
            return <tr>
              <td>
              <div style={{backgroundImage: "url("+technology.logo+")",height:20,width:20,marginLeft:10,marginTop:10}} className="company-img-thumbnail"/>
              </td>
              <td>{technology.tech_name}</td>
              <td>{technology.tech_desc}</td>
            </tr>
          })
    return (
      <div style={{height:304,overflow:'auto'}}>
        <table className="table table-striped">
          <thead>
            <th></th>
            <th>Name</th>
            <th>Description</th>
          </thead>
          <tbody>
            {tech_rows}
          </tbody>
        </table>
      </div>
    )
  }
})
