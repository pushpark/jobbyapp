import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsListItem = props => {
  const {item} = props
  return (
    <Link to={`./jobs/${item.id}`} className="list-item-link">
      <li className="jobs-list-item">
        <div className="list-item-upper-container">
          <div className="item-upper-logo-container">
            <img
              className="item-logo"
              src={item.companyLogoUrl}
              alt="company logo"
            />
            <div>
              <h1 className="job-title">{item.title}</h1>
              <div className="ratings-container">
                <AiFillStar className="ratings-star" />
                <p className="rating-text">{item.rating}</p>
              </div>
            </div>
          </div>
          <div className="salary-container">
            <div className="location-container">
              <FaMapMarkerAlt className="icon" />
              <p className="location">{item.location}</p>
              <BsBriefcaseFill className="icon" />
              <p className="location">{item.employmentType}</p>
            </div>
            <p className="salary">{item.packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line1" />
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <p className="description">{item.jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsListItem
