const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>

            <ul>
            <li>Capital: {country.capital}</li>
            <li>Population: {country.population}</li>
            </ul>

            <h2>Languages</h2>
            <ul>
                {country.languages.map(language => 
                    <li>{language.name}</li>
                )}
            </ul>

            <img src={country.flag} width="200"/>
        </div>
    )
}

export default Country