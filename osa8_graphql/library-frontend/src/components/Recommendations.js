import { useQuery } from "@apollo/client";
import { ME } from "../queries";

const Recommendations = ({ show }) => {

    const getUser = useQuery(ME, {
        skip: !show
    })

    if (!show) {
        return null
    }

    if (getUser.loading) {
        return (<div>Loading...</div>)
    }

    const favoriteGenre = getUser.data.me.favoriteGenre
    const books = getUser.data.me.recommended

    return (
        <div>
            <h2>recommendations</h2>

            Books in your favorite genre {favoriteGenre ? <b>{favoriteGenre}</b> : 'there'}

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations;