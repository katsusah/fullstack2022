const Persons = ({ personsToShow, confirmDelete}) => {
    return (
        <div>
            {personsToShow.map(person =>
                <li key={person.name}>
                    {person.name} {person.number} <button onClick={() => confirmDelete(person.id)}>delete</button>      
                </li>
            )}
        </div>
    )
}
  
export default Persons