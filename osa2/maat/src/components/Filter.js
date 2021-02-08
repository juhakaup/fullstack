const Filter = ({ filter, handleFilterChange }) => {
    console.log(filter)
    return (
        <div>
            filter shown with: <input 
            value={filter}
            onChange={handleFilterChange}></input>
        </div>
    )
}

export default Filter