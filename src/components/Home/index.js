import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div>
    <Header />
    <div className="home-container">
      <h1 className="home-heading">Find The Job That Fits Your Life</h1>
      <p className="home-text">
        Millions of people are searching for jobs,salary information,company
        reviews.Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="home-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home