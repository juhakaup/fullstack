import axios from 'axios'
import React, {useState, useEffect} from 'react'
import ListCountries from './components/ListCountries'
import Filter from './components/Filter'

function App() {
  const [countryList, setCountryList] = useState([])
  const [filter, setFilter] = useState('')
  const filteredCountries = countryList.filter(
    country => country.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    console.log('use effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountryList(response.data)
    })
  },[])

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <ListCountries countryList={filteredCountries} setFilter={setFilter}/>
    </div>
  );
}

export default App;
