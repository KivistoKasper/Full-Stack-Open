import { useState } from 'react'


const Part = (props) => {
  //console.log(props.info)
  return (
    <div>
      <p>{props.info.name}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

const addNumber = event => {
  event.preventDefault();
  //console.log('click ', event.target.value);

 

  

  if ( persons.some(person => person.name ===newName) ){
    console.log('included error')
    const msg = `${newName} is already added to phonebook`;
    alert(msg);
    return;
  }

  const nameObject = {
    name: newName,
  }

  setPersons(persons.concat(nameObject));
  setNewName('');
}

const handleInputChange = event => {
  //console.log('inout change ', event.target.value);
  setNewName(event.target.value);
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
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