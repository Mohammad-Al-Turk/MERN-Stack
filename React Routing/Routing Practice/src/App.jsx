import React from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import Welcome from "./Components/Welcome";
import Show from "./Components/Show";
import TextWithColor from "./Components/TextWithColor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/welcome" element={<Welcome/>} />
        <Route path="/:show" element={<Show/>}/>
        <Route path="/:word/:color/:bgcolor" element={<TextWithColor/>}/>

      </Routes>
    </>
  )
}

export default App
