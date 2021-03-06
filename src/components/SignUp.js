import { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { API_URL } from '../Constants'
import { fetchApi } from './helpers/Fetching'

function SignUp(props) {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [name, setName] = useState({
    first_name: '',
    last_name: ''
  })
  const history = useHistory();

  function changeUser(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function changeName(e) {
    setName({...name, [e.target.name]: e.target.value});
  }

  async function handleSignup(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, name})
    }
    try {
      const response = await fetch(API_URL + '/signup', requestOptions);
      if (response.ok) {
        console.log(response.headers.get('Authorization'));
        localStorage.setItem('token', response.headers.get('Authorization'));
        const json = await response.json();
        await updateProfile(json.data.id);
        await props.onSignup();
        history.push('/');
        console.dir(json);
      } else {
        throw new Error(response)
      }
    } catch(err) {
      console.error(err)
    }
  }

  async function updateProfile(id) {
    const path = '/profiles/' + id;
    await fetchApi(path, 'PUT', name);
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
            value={user.email} 
            onChange={changeUser}/>
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input 
            type='password' 
            id='password' 
            name='password'
            value={user.password} 
            onChange={changeUser}/>
        </div>
        <div>
          <label htmlFor='firstName'>First Name:</label>
          <input 
            type='text' 
            required
            id='firstName' 
            name='first_name'
            value={name.first_name} 
            onChange={changeName}/>
        </div>
        <div>
          <label htmlFor='lastName'>Last Name:</label>
          <input 
            type='text' 
            required
            id='lastName' 
            name='last_name'
            value={name.last_name} 
            onChange={changeName}/>
        </div>
        <input 
          type='submit' 
          className='button'
          value='Sign Up'/>
      </form>
      <Link to={'/login'}>Have an account? Log in here.</Link>
    </div>
  );
}

export default SignUp
