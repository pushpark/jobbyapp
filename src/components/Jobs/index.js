import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import JobsListItem from '../JobsListItem'
import Header from '../Header'
import Filters from '../Filters'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const fetchingStatus = {
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    profileStatus: fetchingStatus.inProgress,
    jobsListStatus: fetchingStatus.inProgress,
    profile: {},
    searchInput: '',
    activeSalaryRangeId: '',
    activeEmploymentTypeId: [],
    jobsList: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsList()
  }

  getJobsList = async () => {
    const {
      activeEmploymentTypeId,
      activeSalaryRangeId,
      searchInput,
    } = this.state
    this.setState({jobsListStatus: fetchingStatus.loading})
    const types = activeEmploymentTypeId.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${types}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobsList = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList, jobsListStatus: fetchingStatus.success})
    } else {
      this.setState({jobsListStatus: fetchingStatus.failure})
    }
  }

  getProfile = async () => {
    this.setState({profileStatus: fetchingStatus.loading})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const profile = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({profileStatus: fetchingStatus.success, profile})
    } else {
      this.setState({profileStatus: fetchingStatus.failure, profile: ''})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSelectEmploymentType = (id, checked) => {
    const {activeEmploymentTypeId} = this.state
    if (checked) {
      this.setState(
        {activeEmploymentTypeId: [...activeEmploymentTypeId, id]},
        this.getJobsList,
      )
    } else {
      this.setState(
        {
          activeEmploymentTypeId: activeEmploymentTypeId.filter(
            each => each !== id,
          ),
        },
        this.getJobsList,
      )
    }
  }

  onClickSearchButton = () => {
    this.getJobsList()
  }

  onSelectSalaryRange = id => {
    console.log(id)
    this.setState({activeSalaryRangeId: id}, this.getJobsList)
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          className="input"
          value={searchInput}
          onChange={this.onChangeInput}
          placeholder="Search"
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  profile = () => {
    const {profile} = this.state
    return (
      <div className="profile-container">
        <img
          className="profile-image"
          src={profile.profileImageUrl}
          alt="profile"
        />
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-para">{profile.shortBio}</p>
      </div>
    )
  }

  onClickRetryProfile = () => this.getProfile()

  failureProfile = () => (
    <div className="failure-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryProfile}
      >
        Retry
      </button>
    </div>
  )

  onClickRetryList = () => {
    this.getJobsList()
  }

  failureJobsList = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryList}
      >
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case fetchingStatus.loading:
        return this.renderLoading()
      case fetchingStatus.success:
        return this.profile()
      case fetchingStatus.failure:
        return this.failureProfile()
      default:
        return null
    }
  }

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobsList = () => {
    const {jobsListStatus, jobsList} = this.state
    switch (jobsListStatus) {
      case fetchingStatus.loading:
        return this.renderLoading()
      case fetchingStatus.success:
        if (jobsList.length === 0) {
          return this.renderNoJobs()
        }
        return (
          <ul className="jobs-list">
            {jobsList.map(each => (
              <JobsListItem key={each.id} item={each} />
            ))}
          </ul>
        )
      case fetchingStatus.failure:
        return this.failureJobsList()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-filters-container">
            <div className="search-bar-small">{this.renderSearchBar()}</div>
            {this.renderProfile()}
            <hr className="line" />
            <Filters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onSelectEmploymentType={this.onSelectEmploymentType}
              onSelectSalaryRange={this.onSelectSalaryRange}
            />
          </div>
          <div className="jobs-container">
            <div className="search-bar-bg">{this.renderSearchBar()}</div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
