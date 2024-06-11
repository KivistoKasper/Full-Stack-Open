import { useState } from 'react'


const Part = (props) => {
  //console.log(props.info)
  return (
    <div>
      <p>{props.info.name} {props.info.number}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,number: '+355 11 55'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person =>
          <Part key={person.name} info={person}/>
        )}
      </div>
    </div>
  )

}

export default App