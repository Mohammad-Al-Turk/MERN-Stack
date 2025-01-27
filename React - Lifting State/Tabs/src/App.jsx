import { useState } from 'react'
import './App.css'
import Tab from './components/Tab'
import Content from './components/Content'


function App() {
  const [clickedTab, setClickedTab] = useState(1)

  const update = (tab) =>{
    setClickedTab(tab);
  }
  return (
    <>
      <Tab updateTab = {update}/>
      <Content showContent = {clickedTab}/>
    </>
  )
}

export default App
