import { useState, useEffect } from 'react'
import axios from 'axios'


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
  /*
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
    */ 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

// get data from server
useEffect(() => {
  axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
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
  axios.post('http://localhost:3001/persons', nameObject)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    })

  setPersons(persons.concat(nameObject));
  setNewName('');
  setNewNumber('');
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