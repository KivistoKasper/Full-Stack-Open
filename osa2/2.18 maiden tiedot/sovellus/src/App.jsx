import { useState, useEffect } from 'react'
import countryService from './services/countries'

const FilterCountries = ({newFilter, handleFilterChange}) => {
  return (
    <form>
      <div>
        find countries <input value={newFilter} onChange={handleFilterChange}/> 
      </div>
    </form>
  )
}

const Countries = ({countriesToShow}) => {
  const arrSize = countriesToShow.length;
  console.log('arrSize ', arrSize)
  if (arrSize > 10){
    return(
      <div>
        Too many matches, specify another filter.
      </div>
    )
  }
  else if (2 <= arrSize && arrSize <= 10){
    return (
      <div>
        {countriesToShow.map(c =>
            <div key={c.name.common}>
              {c.name.common}
            </div>
          )}
      </div>
    )
  }
  else if ( arrSize == 1){
    const country = countriesToShow[0];
    console.log('coutry ', country)
    return(
      <h1>{country.name.common}</h1>
    )
  }
  else {
    return(
      <div>
        No matches
      </div>
    )
  }
  
}

function App() {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');

  // get data from server
  useEffect(() => {
    countryService.getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, []);

  //console.log('maa1 ', countries[1])


  const handleFilterChange = event => {
    //console.log('filter ', event.target.value);
    setNewFilter(event.target.value);
  }

  const countriesToShow  = countries.filter(c =>
    c.name.common.toLowerCase().includes(newFilter.toLowerCase()));
    //console.log('flr', personsToShow )

  return (
   <div>
      <FilterCountries newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <div>
        <Countries countriesToShow={countriesToShow}/>    
      </div>
   </div>
   
  )
}

export default App
