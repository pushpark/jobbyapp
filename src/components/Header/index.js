import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="links-container">
        <Link to="/" className="link-item">
          <p className="link-text">Home</p>
        </Link>
        <Link to="/jobs" className="link-item">
          <p className="link-text">Jobs</p>
        </Link>
      </div>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
      <ul className="buttons-container">
        <Link to="/" className="Link-button">
          <li>
            <AiFillHome />
          </li>
        </Link>
        <Link to="/jobs" className="Link-button">
          <li>
            <BsBriefcaseFill />
          </li>
        </Link>
        <button type="button" className="logout-icon" onClick={onClickLogout}>
          <li>
            <FiLogOut />
          </li>
        </button>
      </ul>
    </div>
  )
}
export default withRouter(Header)
