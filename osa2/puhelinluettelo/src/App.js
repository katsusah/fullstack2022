import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Grace Hopper'},
  ]) 

  const names = persons.map(person => person.name)

  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
    }

    console.log('uusi nimi', newName)
    console.log(persons.indexOf(newName));

    if (names.indexOf(newName) !== -1) {
      alert(`${newName} is already added to phonebook`) // ilmoittaa, jos nimi löytyy jo puhelinluettelosta
      return
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      <p>
        {persons.map(person =>
          <li key={person.name}>{person.name}</li>
        )}
      </p>
    </div>
  )

}

export default App