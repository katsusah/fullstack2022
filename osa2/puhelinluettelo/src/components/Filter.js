const Filter = ({ showPersons }) => {
    return (
        <p>
        filter shown with <input onChange={showPersons} />
        </p>
    )
}
  
export default Filter