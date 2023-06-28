const Persons = ({ personsToShow }) => {
    return (
        <div>
            {personsToShow.map(person =>
                <li key={person.name}>{person.name} {person.number}</li>
            )}
        </div>
    )
}
  
export default Persons