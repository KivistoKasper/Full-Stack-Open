import { useState, useEffect } from 'react'
import countryService from './services/countries'
import './index.css'


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const FilterCountries = ({newFilter, handleFilterChange}) => {
  return (
    <form>
      <div>
        find countries <input value={newFilter} onChange={handleFilterChange}/> 
      </div>
    </form>
  )
}


const Country = ({country}) => {
  console.log('flag: ', Object.values(country.flags)[0])
  return(
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      
      <p> <span style={{fontWeight: 'bold'}}>Languages</span> </p>
      <ul>
        {Object.values(country.languages).map(language => 
          <li key={language}>
            {language}
          </li>
        )}
      </ul>

      <img src={Object.values(country.flags)[0]} 
      alt={`Flag of ${country.name.common}`}
      className="flag"
      />

    </div>
  )

}


const Countries = ({countriesToShow, showCountry, handleShow}) => {
  

  if ( showCountry !== ''){
    console.log('show country ', showCountry)
    return(
      <div>
        <Country country={showCountry}/>
      </div>
    )
  }

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
              <Button handleClick={() => handleShow(c)} text="show"/>
            </div>
          )}
      </div>
    )
  }
  else if ( arrSize == 1){
    const country = countriesToShow[0];
    //console.log('coutry ', country)
    return(
      <Country country={country}/>
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
  const [showCountry, setShowCountry] = useState('');

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
    setShowCountry('');
  }
  
  const handleShow = country => {
    //console.log('show country ', country)
    countryService.get(country.name.common)
    .then(c => {
      setShowCountry(c)
      console.log('show c ', c)
    })
  }

  const countriesToShow  = countries.filter(c =>
    c.name.common.toLowerCase().includes(newFilter.toLowerCase()));
    //console.log('flr', personsToShow )

  return (
   <div>
      <FilterCountries newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <div>
        <Countries countriesToShow={countriesToShow} 
        showCountry={showCountry} 
        handleShow={handleShow}
        />    
      </div>
   </div>
   
  )
}

export default App
