import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const showPersons = (event) => { // etsii tiedot henkilön nimen perusteella
    const filterName = event.target.value
    const filteredPersons = persons.filterName(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    setPersonsToShow(filteredPersons)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => { // lisää henkilön tiedot
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    console.log('uusi nimi', newName)
    console.log('uusi numero', newNumber)

    if (persons.map(person => person.name).indexOf(newName) !== -1) { // ilmoittaa, jos nimi löytyy jo puhelinluettelosta
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={showPersons} />
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App