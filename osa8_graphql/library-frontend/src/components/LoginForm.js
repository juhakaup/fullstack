import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken, setPage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if ( result.data ) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('library-user-token', token)
            setPage('authors')
            setPassword('')
            setUsername('')
        }
    }, [result.data]) // eslint-disable-line

    if (!show) {
        return null
      }
    
    const submit = async (event) => {
        event.preventDefault()
        
        login({ variables: { username, password } })
    }

    return (
        <form onSubmit={submit}> 
            <h3>login</h3>
            <br/>
            username
            <br/>
            <input value={username} onChange={({ target }) => setUsername(target.value)} />
            <br/>
            password
            <br/>
            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm