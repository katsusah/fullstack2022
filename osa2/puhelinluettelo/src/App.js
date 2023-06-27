import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const showPersons = (event) => { // etsii tiedot henkilön nimen perusteella
    const filterName = event.target.value
    console.log(filterName)
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    setPersonsToShow(filteredPersons)
  }

  const handleNameChange = (event) => { // lisää uuden nimen luetteloon
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => { // lisää uuden numeron luetteloon
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
    console.log('kaikki henkilöt', persons)

    if (persons.map(person => person.name).indexOf(newName) !== -1) { // ilmoittaa, jos nimi löytyy jo puhelinluettelosta
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    setPersonsToShow(persons.concat(personObject))
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showPersons={showPersons}/>
      <h2>Add a new</h2>
      <PersonForm persons={persons} addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2> 
      <ul>
        <Persons personsToShow={personsToShow} />
      </ul>
    </div>
  )
}

export default App