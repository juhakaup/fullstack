import Country from './Country'

const ListCountries = ({ countryList, setFilter }) => {
  if(countryList.length > 0) {
    if(countryList.length === 1) {
      return (
       <Country country={countryList[0]} /> 
      )
    } else if(countryList.length <= 10) {
      return(
        <>
        {countryList.map(country => 
        <li>
          {country.name} 
          <button onClick={()=>setFilter(country.name)}>show</button>
        </li>)}
        </>
     )
    } else {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }
  }
  return (
  <div>
      nothing
    </div>
  )
  }

export default ListCountries