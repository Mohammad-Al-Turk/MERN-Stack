import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello Dojo</h1>
      <h3>Thing I need to do</h3>
      <li>Learn React</li>
      <li>Climb Mt Everest</li>
      <li>Run a marathon</li>
      <li>Feed the dogs</li>
    </>
  )
}

export default App
