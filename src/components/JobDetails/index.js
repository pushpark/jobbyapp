import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import {Component} from 'react'
import Header from '../Header'
import './index.css'

const fetchingStatus = {
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobDetails extends Component {
  state = {jobDetails: '', similarJobs: '', status: fetchingStatus.inProgress}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: fetchingStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const jobDetailsConvert = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        title: jobDetails.title,
      }
      const similarJobsConvert = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      console.log(jobDetailsConvert)
      console.log(similarJobsConvert)
      this.setState({
        jobDetails: jobDetailsConvert,
        similarJobs: similarJobsConvert,
        status: fetchingStatus.success,
      })
    } else {
      this.setState({status: fetchingStatus.failure})
    }
  }

  onClickRetryList = () => this.getDetails()

  renderLoader = () => (
    <div className="loader-container1" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryList}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails} = this.state
    return (
      <div className="jobs-list-item">
        <div className="list-item-upper-container">
          <div className="item-upper-logo-container">
            <img
              className="item-logo"
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="job-title">{jobDetails.title}</h1>
              <div className="ratings-container">
                <AiFillStar className="ratings-star" />
                <p className="rating-text">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="salary-container">
            <div className="location-container">
              <FaMapMarkerAlt className="icon" />
              <p className="location">{jobDetails.location}</p>
              <BsBriefcaseFill className="icon" />
              <p className="location">{jobDetails.employmentType}</p>
            </div>
            <p className="salary">{jobDetails.packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line1" />
        <div className="description-container">
          <div className="heading-card">
            <h1 className="description-heading1">Description</h1>
            <a href={jobDetails.companyWebsiteUrl} className="website-link">
              Visit
              <FiExternalLink />
            </a>
          </div>
          <p className="description1">{jobDetails.jobDescription}</p>
          <h1 className="description-heading1">Skills</h1>
          <ul className="skills-list">
            {jobDetails.skills.map(each => (
              <li key={each.name} className="skill-item">
                <img
                  className="skill-image"
                  src={each.imageUrl}
                  alt={each.name}
                />
                <p className="skill-name">{each.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="life-container">
          <div className="life-inner-container">
            <h1 className="description-heading1">Life at Company</h1>
            <p className="description1">
              {jobDetails.lifeAtCompany.description}
            </p>
          </div>
          <img
            className="life-image"
            alt="life at company"
            src={jobDetails.lifeAtCompany.imageUrl}
          />
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <div className="similar-jobs-container">
        <h1 className="description-heading1">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(each => (
            <li key={each.id} className="list-item-upper-container">
              <div className="item-upper-logo-container">
                <img
                  className="item-logo"
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
                />
                <div>
                  <h1 className="job-title">{each.title}</h1>
                  <div className="ratings-container">
                    <AiFillStar className="ratings-star" />
                    <p className="rating-text">{each.rating}</p>
                  </div>
                </div>
              </div>

              <h1 className="description-heading">Description</h1>
              <p className="description1">{each.jobDescription}</p>
              <div className="salary-container">
                <div className="location-container">
                  <FaMapMarkerAlt className="icon" />
                  <p className="location">{each.location}</p>
                  <BsBriefcaseFill className="icon" />
                  <p className="location">{each.employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {status} = this.state
    console.log(status)
    switch (status) {
      case fetchingStatus.loading:
        return this.renderLoader()
      case fetchingStatus.failure:
        return this.failureView()
      case fetchingStatus.success:
        return (
          <div className="success-view-container">
            {this.renderSuccessView()}
            {this.renderSimilarJobs()}
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobDetails
