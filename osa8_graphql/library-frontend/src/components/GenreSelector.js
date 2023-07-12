import { useQuery } from "@apollo/client"
import { ALL_GENRES } from "../queries"

const GenreSelector = ({ setGenre, selectedGenre }) => {
    const result = useQuery(ALL_GENRES)

    if (result.loading) {
        return (
            <div>Loading genres...</div>
        )
    }

    const genres = result.data.allGenres

    const selectedStyle = {
        background: 'lightblue',
        boxShadow: 'inset 4px 4px 5px 0 rgba(0, 0, 0, 0.3), inset -4px -4px 5px 0 rgba(255, 255, 255, 0.5)',
        padding: '10px',
        borderRadius: '5px'

    }

    const unselectedStyle = {
        padding: '10px',
        borderRadius: '5px'
    }

    return (
        <div>
            {genres.map(genre => (
                <button style={(selectedGenre === genre) ? selectedStyle : unselectedStyle} onClick={() => setGenre(genre)}>{genre}</button>
            ))}
            <button style={unselectedStyle} onClick={() => setGenre(null)}>all genres</button>
        </div>
    )
}

export default GenreSelector