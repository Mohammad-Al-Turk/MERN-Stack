import { Routes, Route } from "react-router-dom";
import CharacterDetails from './components/CharacterDetails';
import PlanetDetails from './components/PlanetDetails';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <SearchBar />
      <Routes>
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/planets/:id" element={<PlanetDetails />} />
      </Routes>
    </>
  )
}

export default App;