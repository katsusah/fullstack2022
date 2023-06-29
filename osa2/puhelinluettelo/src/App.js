import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

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
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
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
          setNotificationMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
        .catch(error => {
          setNotificationMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)      
          setPersons(persons.filter(person => person.id !== id))
          setPersonsToShow(persons.filter(person => person.id !== id))
          setNotificationMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
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
          setNotificationMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
    }
  }
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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