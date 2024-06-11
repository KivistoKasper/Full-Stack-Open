import { useState } from 'react'


const Part = (props) => {
  //console.log(props.info)
  return (
    <div>
      {props.info.name} {props.info.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


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
  //persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));
}

const personsToShow  = persons.filter(person =>
   person.name.toLowerCase().includes(newFilter.toLowerCase()));
//console.log('flr', personsToShow )

  return (
    <div>
      <h2>Phonebook</h2>
        <form>
          <div>filter with <input value ={newFilter} onChange={handleFilterChange}/> </div>
        </form>

      <h2>add a new</h2>
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

      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
            <Part key={person.name} info={person} />
          )}
      </div>
    </div>
  )

}

export default App