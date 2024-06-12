import { useState, useEffect } from 'react'
import personService from './services/persons'

const Part = (props) => {
  //console.log(props.info)
  return (
    <div>
      {props.info.name} {props.info.number}
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

const Persons = ({personsToShow}) => {
  return (
    <div>
      {personsToShow.map(person =>
          <Part key={person.name} info={person} />
        )}
    </div>
  )
}

const App = () => { 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
  if ( persons.some(person => person.name ===newName) ){
    //console.log('included error')
    const msg = `${newName} is already added to phonebook`;
    alert(msg);
    return;
  }

  const nameObject = {
    name: newName,
    number: newNumber
  }

  // send data to server
  personService.create(nameObject)
    .then(returnedPerson => {
      console.log(returnedPerson)
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    })
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
        <Persons personsToShow={personsToShow}/>

    </div>
  )

}

export default App