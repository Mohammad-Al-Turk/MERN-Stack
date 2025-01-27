import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [fname, setFname] = useState("");
  const [xname, setXname] = useState("");
  const [fnameError, setFnameError] = useState("");


  const [lname, setLname] = useState("");
  const [lnameError, setLnameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");  
  const [passwordError, setPasswordError] = useState("");

  const [cPassword, setCPassword] = useState("");  
  const [cPasswordError, setCPasswordError] = useState("");


  


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
  const handleFname = (e) => {
    setFname(e.target.value);
    if (e.target.value.length < 1) {
      setFnameError("Last Name is required!"); 
    } else if (e.target.value.length < 3) {
      setFnameError("Last Name must be 3 characters or longer!"); 
    } else {
      setXname(e.target.value)
      setFnameError(""); 
    }
};


const handleLname = (e) => {
  setLname(e.target.value);
  if (e.target.value.length < 1) {
    setLnameError("First Name is required!"); 
  } else if (e.target.value.length < 3) {
    setLnameError("First Name must be 3 characters or longer!"); 
  } else {
    setLnameError(""); 
  }
};




const handleEmail = (e) => {
  setEmail(e.target.value);
  if (e.target.value.length < 1) {
    setEmailError("Email is required!"); 
  } else if (e.target.value.length < 3) {
    setEmailError("Email must be 3 characters or longer!"); 
  } else {
    setEmailError(""); 
  }
};

const handlePassword = (e) => {
  setPassword(e.target.value);
  console.log(e.target.value)

  if (e.target.value.length < 1) {
    setPasswordError("Password is required!"); 
  } else if (e.target.value.length < 8) {
    setPasswordError("Password must be 8 characters or longer!"); 
  } else {
    setPasswordError(""); 
  }
};

const handleCPassword = (e) => {
  setCPassword(e.target.value);
  console.log(e.target.value)
  if (e.target.value != password) {
    setCPasswordError("passwords must macth"); 
  } 
  else {
    setCPasswordError(""); 
  }
};



  return (
    <div>
    <form onSubmit={createUser}>

    <label htmlFor="">First Name: </label>
    <input type="text"  value={fname} onChange={handleFname}/><br />
    {fnameError ? <p style={{color: 'red'}}>{fnameError}</p> : ""}<br/>
    

    <label htmlFor="">Last Name: </label>
    <input type="text" value={lname} onChange={handleLname}/><br />
    {lnameError ? <p style={{color: 'red'}}>{lnameError}</p> : ""}<br/>



    <label htmlFor="">Email: </label>
    <input type="email" value={email} onChange={handleEmail}/><br />
    {emailError ? <p style={{color: 'red'}}>{emailError}</p> : ""}<br/>


    <label htmlFor="">Password: </label>
    <input type="password" value={password} onChange={handlePassword}/><br />
    {passwordError ? <p style={{color: 'red'}}>{passwordError}</p> : ""}<br/>


    <label htmlFor="">Confirm Password: </label>
    <input type="password" value={cPassword} onChange={handleCPassword}/>
    {cPasswordError ? <p style={{color: 'red'}}>{cPasswordError}</p> : ""}<br/>



    </form>

      <h3>Live Data Preview:</h3>
      <p><strong>First Name:</strong> {xname}</p>
      <p><strong>Last Name:</strong> {lname}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Password:</strong> {password}</p>
      <p><strong>Confirm Password:</strong> {cPassword}</p>
    </div>


  )
}
export default App
