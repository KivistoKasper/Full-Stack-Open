import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="updateInfo">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Part = (props) => {
  //console.log(props.info)
  return (
    <div>
      {props.info.name} {props.info.number}
      <Button handleClick={props.deletePerson} text="delete"/>
    </div>
  )
}

const FilterForm = ({newFilter, handleFilterChange}) => {
  return (
    <form>
      <div>
        filter with <input value ={newFilter} onChange={handleFilterChange}/> 
      </div>
    </form>
  )
}

const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({personsToShow, deletePerson}) => {
  return (
    <div>
      {personsToShow.map(person =>
          <Part key={person.name} 
          info={person} 
          deletePerson={() => deletePerson(person)}/>
        )}
    </div>
  )
}

const App = () => { 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

// get data from server
useEffect(() => {
  personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
}, [])


const addPerson = event => {
  event.preventDefault();
  //console.log('click ', event.target.value);
  if ( persons.some(person => person.name === newName) ){
    //console.log('included error')
    const msg = `${newName} is already added to phonebook, replace the old number with a new one?`;
    if (confirm(msg)){
      const person = persons.find(p => p.name === newName);
      updatePerson(person, newNumber);
    }
    return;
  }

  const nameObject = {
    name: newName,
    number: newNumber
  }

  // send data to server
  personService.create(nameObject)
    .then(returnedPerson => {
      //console.log(returnedPerson)
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      // show info message
      setMessage(`${returnedPerson.name} was added to phonebook`)
      setTimeout(() => {
        setMessage(null)
      },3000)
    })
}

// delete person 
const deletePerson = person => {
  // confirm deletion
  const msg = `Delete ${person.name} ?`;
  if (!confirm(msg)){
    return;
  }

  //console.log(`Deletetion: ${person.name}`)
  // delete from server
  personService.deleteOne(person.id)
    .then(deletedPerson => {
      //console.log(deletedPerson);
      // delete locally
      const filteredPersons = persons.filter(p => p.id !== person.id);
      setPersons(filteredPersons);
      // show info message
      setMessage(`${person.name} was deleted from phonebook`)
      setTimeout(() => {
        setMessage(null)
      },3000)
    });
}

// update persons
const updatePerson = (person, newNumber) => {
  const newObj = {
    name: person.name,
    number: newNumber
  }
  personService.update(person.id, newObj)
    .then(updatedPerson =>{
      //console.log('update ', updatedPerson)
      const updatedPersons = persons.map( p => p.id !== person.id ? p : updatedPerson)
      setPersons(updatedPersons)
      setNewName('');
      setNewNumber('');
      // show info message
      setMessage(`${updatedPerson.name}'s number was updated`)
      setTimeout(() => {
        setMessage(null)
      },3000)
    })
    .catch(error => {
      // Tässä voisi vielä tarkastella virhekoodin, ettei kyseessä ole jokin toinen virhe...
      // show error message
      setError(`${newObj.name} has already been deleted from the server`)
      setTimeout(() => {
        setError(null)
      },5000)
      // delete locally
      const filteredPersons = persons.filter(p => p.id !== person.id);
      setPersons(filteredPersons);
    });
}

const handleNameChange = event => {
  //console.log('inout change ', event.target.value);
  setNewName(event.target.value);
}
const handleNumberChange = event => {
  //console.log('inout change ', event.target.value);
  setNewNumber(event.target.value);
}
const handleFilterChange = event => {
  //console.log('filter ', event.target.value);
  setNewFilter(event.target.value);
}

const personsToShow  = persons.filter(person =>
   person.name.toLowerCase().includes(newFilter.toLowerCase()));
//console.log('flr', personsToShow )

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message}/>
        <Error message={error}/>
        <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h3>add a new</h3>
        <PersonForm 
          addPerson={addPerson}
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />

      <h3>Numbers</h3>
        <Persons personsToShow={personsToShow}
        deletePerson={deletePerson}
        />

    </div>
  )

}

export default App