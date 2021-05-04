import { useState } from 'react'
import { Link } from "react-router-dom"
import { API_URL } from '../Constants'

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function handleSignup(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { email: email, password: password }})
    }
    fetch(API_URL + '/signup', requestOptions)
      .then(response => {
        if (response.ok) {
          console.log(response.headers.get('Authorization'));
          localStorage.setItem('token', response.headers.get('Authorization'));
          return response.json();
        } else {
          throw new Error(response)
        }
      })
      .then(json => console.dir(json))
      .catch(err => console.error(err))
  }

  return (
    <div id="signup">
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input 
            type='email' 
            id='email' 
            name='email'
            value={email} 
            onChange={changeEmail}/>
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input 
            type='password' 
            id='password' 
            name='password'
            value={password} 
            onChange={changePassword}/>
        </div>
        <input 
          type='submit' 
          value='Sign Up'/>
      </form>
      <Link to={'/login'}>Have an account? Log in here.</Link>
    </div>
  );
}

export default SignUp;