import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
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
    if (persons.some(person => person.name === newName)) { // tarkistaa onko nimi jo luettelossa
      updatePerson(persons.find(person => person.name === newName).id)
    } else {
      personService // asettaa henkilön tiedot listaan
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setPersonsToShow(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const updatePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = { ...person, number: newNumber }
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setPersonsToShow(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(person => person.id !== id))
          setPersonsToShow(persons.filter(person => person.id !== id))
        })
    }
  }
  
  const confirmDelete = (id) => { // varmistaa, että henkilö halutaan poistaa ja hoitaa poiston tietokannasta
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
          .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setPersonsToShow(persons.filter(person => person.id !== id))
        })
    }
  }
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showPersons={showPersons}/>
      <h2>Add a new</h2>
      <PersonForm persons={persons} addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2> 
      <ul>
        <Persons personsToShow={personsToShow} confirmDelete={confirmDelete} />
      </ul>
    </div>
  )
}

export default App