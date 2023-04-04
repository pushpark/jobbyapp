import './index.css'

const Filters = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onSelectEmploymentType,
    onSelectSalaryRange,
  } = props

  const renderEmploymentType = () =>
    employmentTypesList.map(each => {
      const onClickCategory = event =>
        onSelectEmploymentType(each.employmentTypeId, event.target.checked)

      return (
        <li className="list-item" key={each.employmentTypeId}>
          <input
            type="checkbox"
            id={each.employmentTypeId}
            className="checkbox"
            onChange={onClickCategory}
          />
          <label className="label" htmlFor={each.employmentTypeId}>
            {each.label}
          </label>
        </li>
      )
    })

  const renderSalaryRanges = () =>
    salaryRangesList.map(each => {
      const onChangeSalaryRange = event => {
        onSelectSalaryRange(event.target.value)
      }
      return (
        <li className="list-item" key={each.salaryRangeId}>
          <input
            type="radio"
            name="group"
            value={each.salaryRangeId}
            id={each.salaryRangeId}
            className="checkbox"
            onChange={onChangeSalaryRange}
          />
          <label htmlFor={each.salaryRangeId} className="label">
            {each.label}
          </label>
        </li>
      )
    })

  return (
    <div>
      <h1 className="type-heading">Type of Employment</h1>
      <ul className="types-list"> {renderEmploymentType()}</ul>
      <hr className="line" />
      <h1 className="type-heading">Salary Range</h1>
      <ul className="types-list"> {renderSalaryRanges()}</ul>
    </div>
  )
}

export default Filters
