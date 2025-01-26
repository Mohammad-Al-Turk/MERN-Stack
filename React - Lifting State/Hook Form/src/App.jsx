import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [cpassword, setCpassword] = useState("");  

  
  const createUser = (e) => {
    e.preventDefault();
    const newUser = { 
      fname: fname, 
      lname: lname, 
      email: email, 
      password: password,
      cpassword: cpassword 
  };

  }

  return (
    <div>
    <form onSubmit={createUser}>
    <div>
    <label htmlFor="">First Name: </label>
    <input type="text"  value={fname} onChange={ (e) => setFname(e.target.value)}/><br />

    <label htmlFor="">Last Name: </label>
    <input type="text" value={lname} onChange={ (e) => setLname(e.target.value)}/><br />


    <label htmlFor="">Email: </label>
    <input type="email" value={email} onChange={ (e) => setEmail(e.target.value)}/><br />

    <label htmlFor="">Password: </label>
    <input type="password" value={password} onChange={ (e) => setPassword(e.target.value)}/><br />

    <label htmlFor="">Confirm Password: </label>
    <input type="password" value={cpassword} onChange={ (e) => setCpassword(e.target.value)}/>
    </div>
    </form>

      <h3>Live Data Preview:</h3>
      <p><strong>First Name:</strong> {fname}</p>
      <p><strong>Last Name:</strong> {lname}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Password:</strong> password</p>
      <p><strong>Confirm Password:</strong> cpassword</p>
    </div>


  )
}
export default App
